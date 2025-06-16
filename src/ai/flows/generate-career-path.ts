"use server";

/**
 * @fileOverview Generates a career path for a given career goal.
 *
 * - generateCareerPath - A function that generates a career path.
 * - GenerateCareerPathInput - The input type for the generateCareerPath function.
 * - GenerateCareerPathOutput - The return type for the generateCareerPath function.
 * - ToolDetail - The type for tool details.
 * - VideoDetail - The type for YouTube video details.
 */

import { ai } from "@/ai/genkit";
import { z } from "genkit";

const GenerateCareerPathInputSchema = z.object({
  careerGoal: z
    .string()
    .describe("The desired career to generate a learning path for."),
});
export type GenerateCareerPathInput = z.infer<
  typeof GenerateCareerPathInputSchema
>;

const ToolDetailSchema = z.object({
  name: z.string().describe("The name of the tool."),
  learningUrl: z
    .string()
    .describe(
      "A direct URL to a specific, high-quality learning resource for the tool (e.g., official documentation, a renowned tutorial site). Avoid generic search links."
    )
    .optional(),
});
export type ToolDetail = z.infer<typeof ToolDetailSchema>;

const VideoDetailSchema = z.object({
  title: z.string().describe("The title of the YouTube video."),
  url: z.string().describe("The direct URL to the YouTube video."),
});
export type VideoDetail = z.infer<typeof VideoDetailSchema>;

const CareerPathStepSchema = z.object({
  step: z
    .string()
    .describe("A concise title for this step in the career path."),
  description: z
    .string()
    .describe(
      "A detailed description of what this step entails, including key concepts, sub-topics, and specific skills to acquire. Be comprehensive."
    ),
  tools: z
    .array(ToolDetailSchema)
    .describe(
      "Tools to use for this step, including their names and optional direct learning URLs."
    ),
  projects: z
    .array(z.string())
    .describe(
      "Detailed project suggestions to solidify learning. For each project, briefly explain its purpose and what skills it would develop. Consider offering projects of varying complexity if applicable (e.g., beginner, intermediate)."
    ),
  youtubeVideos: z
    .array(VideoDetailSchema)
    .describe(
      "The two most popular and relevant YouTube videos for this step, including their titles and URLs."
    )
    .optional(),
  estimatedDuration: z
    .string()
    .describe(
      'An estimated timeframe to complete this step (e.g., "2-4 weeks", "1 month").'
    )
    .optional(),
  keyLearningOutcomes: z
    .array(z.string())
    .describe(
      "A list of 2-3 key learning outcomes or skills the user should have gained after completing this step."
    )
    .optional(),
});

const GenerateCareerPathOutputSchema = z.object({
  careerPath: z
    .array(CareerPathStepSchema)
    .describe(
      "An ordered list of detailed steps required to learn, tools to use (with potential learning URLs), projects to work on, and recommended YouTube videos for the inputted career goal."
    ),
});
export type GenerateCareerPathOutput = z.infer<
  typeof GenerateCareerPathOutputSchema
>;

export async function generateCareerPath(
  input: GenerateCareerPathInput
): Promise<GenerateCareerPathOutput> {
  return generateCareerPathFlow(input);
}

const generateCareerPathPrompt = ai.definePrompt({
  name: "generateCareerPathPrompt",
  input: { schema: GenerateCareerPathInputSchema },
  output: { schema: GenerateCareerPathOutputSchema },
  prompt: `You are an expert career coach specializing in creating highly detailed and actionable learning paths for individuals aiming to achieve specific career goals. Your responses should be thorough, practical, and encouraging.

  For the given career goal, create a structured learning path with an ordered list of steps. Each step should be as detailed as possible.

  For each step in the career path, provide the following:
  1.  'step': A concise title for the step (e.g., "Mastering Foundational JavaScript", "Building a Portfolio with React").
  2.  'description': A detailed description of what this step involves. Explain the core concepts, list important sub-topics to cover, and mention specific skills the user should focus on acquiring during this phase. Be as comprehensive as possible to give the user a clear understanding of the learning objectives.
  3.  'tools': List relevant tools, technologies, or software to master or utilize during this step. For each tool, provide its 'name'. Optionally, include a 'learningUrl' field with a direct URL to a specific, high-quality learning resource (e.g., official documentation, a renowned tutorial site, an acclaimed course). Prioritize official or highly reputable sources. Avoid generic search links. If a specific, high-quality resource is known, provide its URL; otherwise, omit the 'learningUrl' for that tool.
  4.  'projects': Suggest detailed project ideas to solidify learning and build practical experience. For each project, briefly explain its purpose and what specific skills or concepts it would help the user practice and demonstrate. If applicable, consider offering a range of project ideas (e.g., a smaller project for quick wins, a more complex one for deeper understanding).
  5.  'youtubeVideos': Identify and include the two most popular and relevant YouTube videos that would significantly help someone learn about this step. Provide the 'title' and the direct 'url' for each video. Popularity can be judged by high view counts, strong like-to-dislike ratios, positive comments, and the authority of the channel, all in relation to the specific topic of the step. If you cannot find two suitable videos, provide one. If none are found, omit the 'youtubeVideos' field or provide an empty array.
  6.  'estimatedDuration': (Optional) Provide a rough estimate of the time it might take to complete this step, e.g., "2-4 weeks", "1 month (part-time study)". This helps with planning.
  7.  'keyLearningOutcomes': (Optional) List 2-3 key skills or pieces of knowledge the user should aim to have confidently acquired by the end of this step.

  Career Goal: {{{careerGoal}}}

  Ensure the entire path is logical, progressive, and empowers the user to reach their goal.
  `,
});

const generateCareerPathFlow = ai.defineFlow(
  {
    name: "generateCareerPathFlow",
    inputSchema: GenerateCareerPathInputSchema,
    outputSchema: GenerateCareerPathOutputSchema,
  },
  async (input) => {
    const { output } = await generateCareerPathPrompt(input);
    return output!;
  }
);

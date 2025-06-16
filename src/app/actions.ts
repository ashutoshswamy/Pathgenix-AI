// src/app/actions.ts
"use server";

import {
  generateCareerPath,
  type GenerateCareerPathInput,
  type GenerateCareerPathOutput,
} from "@/ai/flows/generate-career-path";
import { z } from "zod";

const GenerateCareerPathInputSchema = z.object({
  careerGoal: z
    .string()
    .min(3, { message: "Career goal must be at least 3 characters." }),
});

export async function getCareerPathAction(
  input: GenerateCareerPathInput
): Promise<GenerateCareerPathOutput | { error: string }> {
  const parsedInput = GenerateCareerPathInputSchema.safeParse(input);
  if (!parsedInput.success) {
    return { error: parsedInput.error.errors.map((e) => e.message).join(", ") };
  }

  try {
    const result = await generateCareerPath(parsedInput.data);
    return result;
  } catch (error) {
    console.error("Error generating career path:", error);
    // Check if error is an instance of Error to safely access message property
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    return { error: `Failed to generate career path: ${errorMessage}` };
  }
}

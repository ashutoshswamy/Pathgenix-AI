"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { getCareerPathAction } from "../actions";
import type {
  GenerateCareerPathOutput,
  ToolDetail,
  VideoDetail,
} from "@/ai/flows/generate-career-path";
import {
  Compass,
  Sparkles,
  Loader2,
  Navigation,
  Wrench,
  Lightbulb,
  ExternalLink,
  AlertCircle,
  Film,
  Github,
  Linkedin,
  Twitter,
  MessageSquare,
} from "lucide-react";
// import type { Metadata } from 'next'; // Metadata export removed

// Metadata export removed as this is a Client Component
// export const metadata: Metadata = {
//   title: 'Generate Your Career Path',
//   description: 'Define your career goal and let Pathgenix AI create a personalized, step-by-step learning roadmap with tools, projects, and video recommendations.',
//   openGraph: {
//     title: 'Generate Your Career Path with Pathgenix AI',
//     description: 'Input your career aspirations and receive a custom-generated learning plan from Pathgenix AI.',
//   },
//   twitter: {
//     title: 'Generate Your Career Path with Pathgenix AI',
//     description: 'Input your career aspirations and receive a custom-generated learning plan from Pathgenix AI.',
//   }
// };

const formSchema = z.object({
  careerGoal: z.string().min(3, {
    message: "Career goal must be at least 3 characters.",
  }),
});

export default function PathgenixAIGeneratorPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [careerPath, setCareerPath] =
    React.useState<GenerateCareerPathOutput | null>(null);
  const [apiError, setApiError] = React.useState<string | null>(null);
  const [submittedCareerGoal, setSubmittedCareerGoal] = React.useState<
    string | null
  >(null);
  const { toast } = useToast();
  const [currentYear, setCurrentYear] = React.useState<number | null>(null);

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      careerGoal: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setCareerPath(null);
    setApiError(null);
    setSubmittedCareerGoal(values.careerGoal);

    const result = await getCareerPathAction(values);

    if ("error" in result) {
      setApiError(result.error);
      toast({
        title: "Error Generating Path",
        description: result.error,
        variant: "destructive",
      });
    } else {
      setCareerPath(result);
    }
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center p-4 sm:p-8 pt-12 sm:pt-16">
      <main className="w-full max-w-3xl space-y-10">
        <header className="text-center space-y-3">
          <div className="flex items-center justify-center space-x-3 drop-shadow-lg">
            <Compass
              className="h-10 w-10 sm:h-12 sm:w-12 text-primary"
              strokeWidth={1.5}
            />
            <h1 className="text-4xl sm:text-5xl font-headline font-bold text-primary">
              Pathgenix AI
            </h1>
          </div>
          <p className="text-md sm:text-lg text-muted-foreground">
            Chart your course to your dream career.
          </p>
        </header>

        <Card className="w-full shadow-lg border-border/50">
          <CardHeader>
            <CardTitle className="font-headline text-xl sm:text-2xl">
              Define Your Destination
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              What career are you aiming for? Let our AI chart a path for you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="careerGoal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base">
                        Your Career Goal
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Senior Software Engineer, UX Designer, Data Scientist"
                          {...field}
                          className="text-base py-4 sm:py-5"
                          aria-label="Enter your career goal"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-md sm:text-lg py-4 sm:py-5 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <Sparkles className="mr-2 h-5 w-5" />
                  )}
                  Generate Career Path
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {isLoading && (
          <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center">
            <Loader2 className="h-12 w-12 sm:h-16 sm:w-16 animate-spin text-primary" />
            <p className="text-lg sm:text-xl text-muted-foreground">
              Generating your personalized career path...
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground/70">
              This may take a moment, good things are worth the wait!
            </p>
          </div>
        )}

        {apiError && !isLoading && (
          <Alert variant="destructive" className="shadow-lg">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle className="text-md sm:text-lg font-semibold">
              Oops! Something went wrong.
            </AlertTitle>
            <AlertDescription className="text-sm sm:text-base">
              {apiError} Please try refining your career goal or try again
              later.
            </AlertDescription>
          </Alert>
        )}

        {careerPath && !isLoading && !apiError && (
          <Card className="w-full shadow-lg border-border/50">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl md:text-3xl text-primary font-headline flex items-center">
                <Navigation
                  className="mr-2 sm:mr-3 h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8"
                  strokeWidth={1.5}
                />
                Your Path to:{" "}
                <span className="ml-1.5 sm:ml-2 font-bold">
                  {submittedCareerGoal || form.getValues("careerGoal")}
                </span>
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Follow these steps to achieve your career goal. Each step
                includes recommended tools and project ideas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {careerPath.careerPath.length > 0 ? (
                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                  defaultValue="item-0"
                >
                  {careerPath.careerPath.map((step, index) => (
                    <AccordionItem
                      value={`item-${index}`}
                      key={index}
                      className="border-b-border/50"
                    >
                      <AccordionTrigger className="text-md sm:text-lg md:text-xl hover:no-underline py-4 sm:py-5 text-left">
                        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                          <div className="bg-primary text-primary-foreground rounded-full h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 flex items-center justify-center font-bold text-xs sm:text-sm shrink-0">
                            {index + 1}
                          </div>
                          <span className="font-medium">{step.step}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pl-6 sm:pl-8 md:pl-12 pr-2 space-y-4 sm:space-y-6 pb-5 sm:pb-6 pt-2 sm:pt-3 text-sm sm:text-base">
                        <p className="text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                        {step.estimatedDuration && (
                          <p className="text-xs sm:text-sm text-accent italic">
                            Estimated duration: {step.estimatedDuration}
                          </p>
                        )}
                        {step.keyLearningOutcomes &&
                          step.keyLearningOutcomes.length > 0 && (
                            <div>
                              <h4 className="font-semibold text-sm sm:text-md mb-1 sm:mb-2 flex items-center text-foreground/90">
                                Key Learning Outcomes:
                              </h4>
                              <ul className="list-disc list-inside space-y-1 pl-4 text-muted-foreground text-xs sm:text-sm">
                                {step.keyLearningOutcomes.map(
                                  (outcome, outcomeIndex) => (
                                    <li key={outcomeIndex}>{outcome}</li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}
                        {step.tools && step.tools.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-sm sm:text-md md:text-lg mb-2 flex items-center text-foreground/90">
                              <Wrench className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                              Recommended Tools:
                            </h4>
                            <ul className="list-none space-y-1.5 sm:space-y-2 pl-3 sm:pl-4">
                              {step.tools.map(
                                (toolInput: ToolDetail, toolIndex: number) => {
                                  let effectiveToolName: string;
                                  let effectiveLearningUrl: string | undefined;

                                  if (
                                    typeof toolInput.name === "object" &&
                                    toolInput.name !== null &&
                                    typeof (toolInput.name as any).name ===
                                      "string"
                                  ) {
                                    effectiveToolName = (toolInput.name as any)
                                      .name;
                                    effectiveLearningUrl =
                                      (toolInput.name as any).learningUrl ||
                                      toolInput.learningUrl;
                                  } else if (
                                    typeof toolInput.name === "string"
                                  ) {
                                    effectiveToolName = toolInput.name;
                                    effectiveLearningUrl =
                                      toolInput.learningUrl;
                                  } else {
                                    effectiveToolName = "Invalid tool";
                                    effectiveLearningUrl =
                                      toolInput.learningUrl;
                                  }

                                  const learnUrl =
                                    effectiveLearningUrl ||
                                    `https://www.google.com/search?q=learn+${encodeURIComponent(
                                      effectiveToolName
                                    )}`;
                                  const buttonText = effectiveLearningUrl
                                    ? "Open Resource"
                                    : "Search Online";
                                  const ariaLabelText = effectiveLearningUrl
                                    ? `Open learning resource for ${effectiveToolName}`
                                    : `Search for learning resources for ${effectiveToolName}`;

                                  return (
                                    <li
                                      key={toolIndex}
                                      className="flex items-center justify-between space-x-2 group text-xs sm:text-sm"
                                    >
                                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                                        {effectiveToolName}
                                      </span>
                                      <Button
                                        variant="link"
                                        size="sm"
                                        className="p-0 h-auto text-accent hover:text-accent/80 text-xs sm:text-sm"
                                        asChild
                                        aria-label={ariaLabelText}
                                      >
                                        <a
                                          href={learnUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          {buttonText}
                                          <ExternalLink className="ml-1 h-3 w-3 sm:ml-1.5 sm:h-3.5 sm:w-3.5" />
                                        </a>
                                      </Button>
                                    </li>
                                  );
                                }
                              )}
                            </ul>
                          </div>
                        )}
                        {step.projects && step.projects.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-sm sm:text-md md:text-lg mb-2 flex items-center text-foreground/90">
                              <Lightbulb className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                              Project Ideas:
                            </h4>
                            <ul className="list-disc list-inside space-y-1 sm:space-y-1.5 pl-4 sm:pl-6 text-muted-foreground text-xs sm:text-sm">
                              {step.projects.map((project, projectIndex) => (
                                <li key={projectIndex}>{project}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {step.youtubeVideos &&
                          step.youtubeVideos.length > 0 && (
                            <div>
                              <h4 className="font-semibold text-sm sm:text-md md:text-lg mb-2 flex items-center text-foreground/90">
                                <Film className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                                Recommended Videos:
                              </h4>
                              <ul className="list-none space-y-1.5 sm:space-y-2 pl-3 sm:pl-4">
                                {step.youtubeVideos.map(
                                  (video: VideoDetail, videoIndex: number) => (
                                    <li
                                      key={videoIndex}
                                      className="flex items-center justify-between space-x-2 group text-xs sm:text-sm"
                                    >
                                      <span
                                        className="text-muted-foreground group-hover:text-foreground transition-colors truncate"
                                        title={video.title}
                                      >
                                        {video.title}
                                      </span>
                                      <Button
                                        variant="link"
                                        size="sm"
                                        className="p-0 h-auto text-accent hover:text-accent/80 text-xs sm:text-sm"
                                        asChild
                                        aria-label={`Watch video: ${video.title}`}
                                      >
                                        <a
                                          href={video.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          Watch Video
                                          <ExternalLink className="ml-1 h-3 w-3 sm:ml-1.5 sm:h-3.5 sm:w-3.5" />
                                        </a>
                                      </Button>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}
                        {(!step.tools || step.tools.length === 0) &&
                          (!step.projects || step.projects.length === 0) &&
                          (!step.youtubeVideos ||
                            step.youtubeVideos.length === 0) &&
                          (!step.keyLearningOutcomes ||
                            step.keyLearningOutcomes.length === 0) && (
                            <p className="text-muted-foreground italic text-xs sm:text-sm">
                              No specific resources listed for this step. Focus
                              on understanding the core concepts outlined in the
                              description.
                            </p>
                          )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <p className="text-muted-foreground text-center py-4 text-sm sm:text-base">
                  No career path steps were generated. Try a different career
                  goal.
                </p>
              )}
            </CardContent>
          </Card>
        )}
      </main>
      <footer className="w-full max-w-3xl mt-12 sm:mt-16 mb-6 sm:mb-8 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-muted-foreground">
          <div className="md:col-span-2">
            <h3 className="text-lg sm:text-xl font-headline font-semibold text-primary mb-1.5 sm:mb-2">
              Pathgenix AI
            </h3>
            <p className="text-xs sm:text-sm">
              Your personalized AI guide to navigating the complexities of
              career development. Discover tailored learning paths, essential
              tools, and curated resources to achieve your professional goals.
            </p>
          </div>
          <div className="md:text-right">
            <h3 className="text-md sm:text-lg font-headline font-semibold text-primary mb-1">
              Connect with Us
            </h3>
            <p className="text-2xs sm:text-xs text-muted-foreground/90 mb-2 sm:mb-3">
              Developed by Ashutosh Swamy
            </p>
            <div className="flex space-x-3 sm:space-x-4 md:justify-end">
              <a
                href="https://github.com/ashutoshswamy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a
                href="https://linkedin.com/in/ashutoshswamy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a
                href="https://twitter.com/ashutoshswamy_"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a
                href="https://tally.so/r/nrRyJv"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Feedback"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
            </div>
          </div>
        </div>
        <hr className="my-6 sm:my-8 border-border/50" />
        <div className="container mx-auto text-center">
          {currentYear && (
            <p className="text-xs sm:text-sm text-muted-foreground/80">
              &copy; {currentYear} Pathgenix AI. All rights reserved.
            </p>
          )}
        </div>
      </footer>
    </div>
  );
}

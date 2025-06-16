"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ArrowRight,
  Navigation,
  BookOpenText,
  Film,
  Sparkles,
  Eye,
  Github,
  Linkedin,
  Twitter,
  MessageSquare,
} from "lucide-react";
// import type { Metadata } from 'next'; // Metadata export removed

// Metadata export removed as this is a Client Component
// export const metadata: Metadata = {
//   title: 'Welcome to Pathgenix AI - Your Career Navigator',
//   description: 'Pathgenix AI is your personalized AI guide to navigating the complexities of career development. Discover tailored learning paths, essential tools, curated resources, and video recommendations to achieve your professional goals.',
//   openGraph: {
//     title: 'Welcome to Pathgenix AI - Your Career Navigator',
//     description: 'Pathgenix AI: AI-powered career path generation for your professional growth.',
//   },
//   twitter: {
//     title: 'Welcome to Pathgenix AI - Your Career Navigator',
//     description: 'Pathgenix AI: AI-powered career path generation for your professional growth.',
//   }
// };

export default function LandingPage() {
  const [currentYear, setCurrentYear] = React.useState<number | null>(null);

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const features = [
    {
      icon: (
        <Navigation className="h-8 w-8 sm:h-10 sm:w-10 text-primary stroke-[1.5px]" />
      ),
      title: "Personalized Career Paths",
      description:
        "Receive step-by-step roadmaps tailored to your specific career aspirations, guiding you from start to finish.",
    },
    {
      icon: (
        <BookOpenText className="h-8 w-8 sm:h-10 sm:w-10 text-primary stroke-[1.5px]" />
      ),
      title: "Curated Learning Resources",
      description:
        "Discover essential tools, practical project ideas, and direct links to high-quality learning materials for each step.",
    },
    {
      icon: (
        <Film className="h-8 w-8 sm:h-10 sm:w-10 text-primary stroke-[1.5px]" />
      ),
      title: "Top YouTube Video Picks",
      description:
        "Access the most popular and relevant YouTube videos, handpicked to supplement your learning journey effectively.",
    },
    {
      icon: (
        <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 text-primary stroke-[1.5px]" />
      ),
      title: "AI-Powered Insights",
      description:
        "Leverage cutting-edge AI to analyze career trends and provide actionable, intelligent guidance for your future.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Hero Section */}
      <section className="flex-grow flex flex-col items-center justify-center pt-16 pb-12 md:pt-24 md:pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-card/30 to-background">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-primary mb-4 sm:mb-6 leading-tight">
            Unlock Your Dream Career with Pathgenix AI
          </h1>
          <p className="text-md sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-10 max-w-2xl mx-auto">
            Your personalized AI guide to navigating the complexities of career
            development. Discover tailored learning paths, essential tools, and
            curated resources to achieve your professional goals.
          </p>
          <div className="mb-10 sm:mb-12">
            <Link href="/generate-path" passHref>
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-md sm:text-lg py-3 px-6 sm:py-4 sm:px-8 md:py-7 md:px-10 rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105"
              >
                Chart Your Path Now
                <ArrowRight className="ml-1.5 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-12 md:py-20 bg-background px-4 sm:px-6 lg:px-8"
      >
        <div className="container mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline font-semibold text-primary mb-3 sm:mb-4">
              Why Choose Pathgenix AI?
            </h2>
            <p className="text-md sm:text-lg text-muted-foreground max-w-xl mx-auto">
              We provide the clarity and direction you need to succeed in
              today's competitive job market.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="shadow-lg border-border/50 hover:shadow-xl transition-shadow duration-300 bg-card flex flex-col"
              >
                <CardHeader className="items-center text-center pt-6 sm:pt-8 pb-3 sm:pb-4">
                  <div className="p-3 sm:p-4 bg-primary/10 rounded-full mb-3 sm:mb-4 inline-block">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl sm:text-2xl font-headline text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center pb-6 sm:pb-8 flex-grow">
                  <CardDescription className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 md:py-20 bg-card/70 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <Eye className="h-10 w-10 sm:h-12 sm:w-12 text-primary mx-auto mb-3 sm:mb-4 stroke-[1.5px]" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline font-semibold text-primary mb-3 sm:mb-4">
            Ready to Take Control of Your Career?
          </h2>
          <p className="text-md sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-xl mx-auto">
            Stop wandering and start building. Let Pathgenix AI illuminate your
            way forward.
          </p>
          <Link href="/generate-path" passHref>
            <Button
              size="lg"
              variant="outline"
              className="text-md sm:text-lg py-3 px-6 sm:py-4 sm:px-8 md:py-7 md:px-10 rounded-lg border-primary text-primary hover:bg-primary/10 hover:text-primary shadow-md hover:shadow-lg transition-shadow transform hover:scale-105"
            >
              Generate Your Personalized Path
              <ArrowRight className="ml-1.5 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 sm:py-10 bg-background border-t border-border/30 px-4 sm:px-6 lg:px-8">
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

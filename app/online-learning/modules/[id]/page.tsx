import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { notFound } from "next/navigation";
import { MODULES_DATA } from "@/lib/constant";
import Video from "@/app/_components/Video";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { prisma } from "@/prisma/client";

export const dynamic = "force-dynamic";

const ModulePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

 const module = await prisma.module.findUnique({
   where: { id: parseInt(id) },
   include: {
     Category: true,
     sections: {
       include: {
         steps: true,
       },
     },
   },
 });

  if (!module) {
    notFound();
  }

  return (
    <>
      <Video
        videoSrc="https://yoxrhuucqgkdxhpfubee.supabase.co/storage/v1/object/public/banner-video//question.mp4"
        heading="Explore in demand technologies"
        subtext="Because learning never stops — nor should you.">
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white">
          <ChevronDown size={28} className="animate-bounce" />
          <span className="text-m mt-1">Scroll down to start the quiz</span>
        </div>
      </Video>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-red-900">
        {module.title}
      </h1>

      <div className="space-y-12">
        <Carousel className="w-full max-w-4xl mx-auto relative">
          <CarouselContent>
            {module.sections.map((section, sectionIndex) => (
              <CarouselItem key={`section-${section.id}`}>
                <div className="p-2">
                  <Card className="border-red-900">
                    <CardContent className="flex flex-col p-6">
                      <h2 className="scroll-m-20 border-none pb-4 text-3xl font-semibold tracking-tight text-red-900 mb-6">
                        {section.title}
                      </h2>
                      {/* Steps */}
                      {section.steps.map((step, stepIndex) => (
                        <div key={`step-content-${step.id}`} className="mb-8">
                          <span className="text-lg font-semibold mb-2 text-red-900">
                            Step {stepIndex + 1}
                          </span>
                          <p className="mb-4">{step.text}</p>
                          {step.subtext && (
                            <p className="text-sm text-gray-600 mb-4">
                              {step.subtext}
                            </p>
                          )}
                          {step.subimage && (
                            <div className="flex justify-center mt-4">
                              <Image
                                src={step.subimage}
                                alt={`Additional image for Step ${stepIndex + 1}`}
                                width={300}
                                height={300}
                                className="rounded-md"
                              />
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Q&A Section */}
                      <div className="mt-8 pt-6 border-t border-gray-200">
                        <div className="flex flex-col gap-8">
                          {/* Question subimage if available */}
                          {section.questionSubimage && (
                            <div className="flex justify-center mt-4">
                              <Image
                                src={section.questionSubimage}
                                alt="Question illustration"
                                width={300}
                                height={300}
                                className="rounded-md"
                              />
                            </div>
                          )}
                          {/* Question section */}
                          <div>
                            <h3 className="font-semibold mb-2 text-red-900">
                              Question:
                            </h3>
                            <p>{section.questionText}</p>
                          </div>

                          {/* Answer section */}
                          <div>
                            <h3 className="font-semibold mb-2 text-red-900">
                              Answer:
                            </h3>
                            <p>{section.questionAnswer}</p>
                          </div>

                          {/* Explanation section */}
                          <div>
                            <h3 className="font-semibold mb-2 text-red-900">
                              Explanation:
                            </h3>
                            <p>{section.questionExplanation}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 bg-red-800 text-white hover:bg-red-900 border-none shadow-md" />
          <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 bg-red-800 text-white hover:bg-red-900 border-none shadow-md" />
        </Carousel>
        <div className="flex items-center justify-center space-x-2 mt-8">
          <Checkbox
            id="terms"
            className="border-red-800 text-red-800"
            checked={module.attempt}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I have finished this module!
          </label>
        </div>
        <div className="flex justify-center mt-10">
          <Link
            href={`/online-learning/${module.categoryId}`}
            className="px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-900 transition-colors duration-300"
          >
            Back to Tools Guide
          </Link>
        </div>
      </div>
    </>
  );
};

export default ModulePage;

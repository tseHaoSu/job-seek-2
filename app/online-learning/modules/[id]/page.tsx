import React from "react";
import Image from "next/image";
import Link from "next/link";
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

export default async function ModulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const moduleData = Object.values(MODULES_DATA).find(
    (module) => module.id === id
  );

  if (!moduleData) {
    notFound();
  }

  return (
    <>
      {/* Keep the video static across all module pages */}
      <Video
        videoSrc="/video/question.mp4"
        heading="Explore in demand technologies"
        subtext="Because learning never stops — nor should you."
      />
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-red-900">
        {moduleData.title}
      </h1>

      <div className="space-y-12">
        {moduleData.sections.map((section, sectionIndex) => (
          <section key={sectionIndex}>
            <h2 className="mt-10 scroll-m-20 border-none pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              {section.title}
            </h2>
            <div className="my-6">
              <Carousel className="w-full max-w-4xl mx-auto relative">
                <CarouselContent>
                  {section.steps.map((step, stepIndex) => (
                    <CarouselItem key={stepIndex}>
                      <div className="p-2">
                        <Card className="border-red-900">
                          <CardContent className="flex flex-col p-6">
                            <span className="text-lg font-semibold mb-2 text-red-900">
                              Step {stepIndex + 1}
                            </span>
                            <p className="mb-4">{step.text}</p>
                            {step.subtext && (
                              <p className="text-sm text-gray-600 mb-4">
                                {step.subtext}
                              </p>
                            )}
                            <div className="flex justify-center">
                              <Image
                                src="/modules/1.png"
                                alt={`Step ${stepIndex + 1} for ${section.title}`}
                                width={300}
                                height={300}
                                className="rounded-md"
                              />
                            </div>
                            {step.subimage && (
                              <div className="flex justify-center mt-4">
                                <Image
                                  src="/modules/2.png"
                                  alt={`Additional image for Step ${stepIndex + 1}`}
                                  width={300}
                                  height={300}
                                  className="rounded-md"
                                />
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 bg-red-800 text-white hover:bg-red-900 border-none shadow-md" />
                <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 bg-red-800 text-white hover:bg-red-900 border-none shadow-md" />
              </Carousel>
            </div>
            <div className="mt-8">
              <Carousel className="w-full max-w-4xl mx-auto relative">
                <CarouselContent>
                  <CarouselItem>
                    <Card className="border-red-900 ">
                      <CardContent className="p-6">
                        <div className="flex justify-center mb-4">
                          <Image
                            src="/modules/5.png"
                            alt={`Question image for ${section.title}`}
                            width={300}
                            height={300}
                            className="rounded-md"
                          />
                        </div>
                        <h3 className="font-semibold mb-2 text-red-900">
                          Question:
                        </h3>
                        <p>{section.question.text}</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                  <CarouselItem>
                    <Card className="border-red-900">
                      <CardContent className="p-6">
                        <h3 className="font-semibold mb-2 text-red-900">
                          Answer:
                        </h3>
                        <p>{section.question.answer}</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                  <CarouselItem>
                    <Card className="border-red-900">
                      <CardContent className="p-6">
                        <h3 className="font-semibold mb-2 text-red-900">
                          Explanation:
                        </h3>
                        <p>{section.question.explanation}</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 bg-red-800 text-white hover:bg-red-900 border-none shadow-md" />
                <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 bg-red-800 text-white hover:bg-red-900 border-none shadow-md" />
              </Carousel>
            </div>
          </section>
        ))}
        <div className="flex items-center justify-center space-x-2 mt-8">
          <Checkbox id="terms" className="border-red-800 text-red-800" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I have finished this module!
          </label>
        </div>
        <div className="flex justify-center mt-10">
          <Link
            href="/online-learning/1"
            className="px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-900 transition-colors duration-300"
          >
            Back to Tools Guide
          </Link>
        </div>
      </div>
    </>
  );
}

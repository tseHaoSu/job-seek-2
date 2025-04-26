import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MODULES_DATA } from "@/lib/constant";
import Video from "@/app/_components/Video";
import { Checkbox } from "@/components/ui/checkbox";


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

      <div className="space-y-8">
        {moduleData.sections.map((section, sectionIndex) => (
          <section key={sectionIndex}>
            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              {section.title}
            </h2>
            <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
              {section.steps.map((step, stepIndex) => (
                <li key={stepIndex} className="leading-7">
                  {step.text}
                  {step.subtext && (
                    <p className="leading-7 [&:not(:first-child)]:mt-2">
                      {step.subtext}
                    </p>
                  )}
                  {/* Use a static image for all steps */}
                  <Image
                    src="/modules/1.png"
                    alt={`Step ${stepIndex + 1} for ${section.title}`}
                    width={300}
                    height={300}
                    className="rounded-md"
                  />
                  {step.subimage && (
                    <Image
                      src="/modules/2.png"
                      alt={`Additional image for Step ${stepIndex + 1}`}
                      width={300}
                      height={300}
                      className="rounded-md mt-2"
                    />
                  )}
                </li>
              ))}
            </ol>

            <div className="mt-6 border-l-2 pl-6 italic bg-muted p-4 rounded-md">
              {/* Use a static image for questions */}
              <Image
                src="/modules/5.png"
                alt={`Question image for ${section.title}`}
                width={300}
                height={300}
                className="rounded-md"
              />
              <h3 className="font-semibold mb-2">Question:</h3>
              <p>{section.question.text}</p>
              <h3 className="font-semibold mt-4 mb-2">Answer:</h3>
              <p>{section.question.answer}</p>
              <h3 className="font-semibold mt-4 mb-2">Explanation:</h3>
              <p>{section.question.explanation}</p>
            </div>
          </section>
        ))}
        <div className="flex items-center justify-center space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I have Finished this module!
          </label>
        </div>
        <div className="flex justify-center mt-10">
          <Link
            href="/online-learning/1"
            className="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 transition-colors duration-300"
          >
            Back to Tools Guide
          </Link>
        </div>
      </div>
    </>
  );
}

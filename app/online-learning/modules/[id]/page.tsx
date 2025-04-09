import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <div className="max-w-3xl mx-auto py-6">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-red-900">
        How to use PowerPoint
      </h1>

      <div className="space-y-8">
        {/* Creating a New Slide Section */}
        <section>
          <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Creating a New Slide
          </h2>
          <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
            <li className="leading-7">
              Click &ldquo;New slide&rdquo; in the upper toolbar to create a new
              slide page
            </li>
            <Image
              src="/modules/1.png"
              alt="Creating a New Slide"
              width={300}
              height={300}
              className="rounded-md"
            />
            <li className="leading-7">
              Select the Insert tab at the top.
              <p className="leading-7 [&:not(:first-child)]:mt-2">
                Click the following icon to choose to insert pictures into PPT
              </p>
              <Image
                src="/modules/2.png"
                alt="Creating a New Slide"
                width={300}
                height={300}
                className="rounded-md"
              />
              <p className="leading-7 [&:not(:first-child)]:mt-2">
                Click the following icons to insert additional text boxes
              </p>
              <Image
                src="/modules/3.png"
                alt="Creating a New Slide"
                width={300}
                height={300}
                className="rounded-md"
              />
            </li>
            <li className="leading-7">
              After adding the text box, return to the &ldquo;Home&rdquo; tab.
              You can see that you can start adjusting the text size and font as
              well as other functions.
            </li>
            <Image
              src="/modules/4.png"
              alt="Creating a New Slide"
              width={300}
              height={300}
              className="rounded-md"
            />
          </ol>

          <div className="mt-6 border-l-2 pl-6 italic bg-muted p-4 rounded-md">
            <Image
              src="/modules/5.png"
              alt="Creating a New Slide"
              width={300}
              height={300}
              className="rounded-md"
            />
            <h3 className="font-semibold mb-2">Question:</h3>
            <p>Can I create a new slide by pressing this icon?</p>
            <h3 className="font-semibold mt-4 mb-2">Answer:</h3>
            <p>No</p>
            <h3 className="font-semibold mt-4 mb-2">Explanation:</h3>
            <p>Click the icon to choose to insert pictures into slide</p>
          </div>
        </section>

        {/* Saving PowerPoint Section */}
        <section>
          <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors">
            How to save the PowerPoint
          </h2>
          <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
            <li className="leading-7">
              Find the save icon in the upper toolbar and click it to save
            </li>
            <Image
              src="/modules/6.png"
              alt="Creating a New Slide"
              width={300}
              height={300}
              className="rounded-md"
            />
            <li className="leading-7">
              Click &ldquo;File&rdquo; on the far left of the upper toolbar, and
              select &ldquo;Save as&rdquo; in the list on the left to choose
              what file to save the file as.
            </li>
            <Image
              src="/modules/7.png"
              alt="Creating a New Slide"
              width={300}
              height={300}
              className="rounded-md"
            />
          </ol>

          <div className="mt-6 border-l-2 pl-6 italic bg-muted p-4 rounded-md">
            <h3 className="font-semibold mb-2">Question:</h3>
            <p>
              Can I save PowerPoint as PDF when saving using the Save as method?
            </p>
            <h3 className="font-semibold mt-4 mb-2">Answer:</h3>
            <p>Yes</p>
            <h3 className="font-semibold mt-4 mb-2">Explanation:</h3>
            <p>
              Click &ldquo;File&rdquo; on the far left of the upper toolbar, and
              select &ldquo;Save as&rdquo; in the list on the left to choose
              what file to save the file as.
            </p>
          </div>
        </section>

        {/* Playing the PowerPoint Section */}
        <section>
          <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors">
            How to Play the PowerPoint
          </h2>
          <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
            <li className="leading-7">
              Select the last show icon in the upper toolbar and click it to
              show the slideshow you made.
            </li>
            <Image
              src="/modules/8.png"
              alt="Creating a New Slide"
              width={300}
              height={300}
              className="rounded-md"
            />
            <li className="leading-7">
              Select the &ldquo;Slide Show&rdquo; tab and select the two buttons
              below to start playing the slide show.
            </li>
            <Image
              src="/modules/9.png"
              alt="Creating a New Slide"
              width={200}
              height={300}
              className="rounded-md"
            />
          </ol>

          <div className="mt-6 border-l-2 pl-6 italic bg-muted p-4 rounded-md">
            <Image
              src="/modules/10.png"
              alt="Creating a New Slide"
              width={200}
              height={300}
              className="rounded-md"
            />
            <h3 className="font-semibold mb-2">Question:</h3>
            <p>
              Can I press this icon to play the slideshow I created from the
              beginning?
            </p>
            <h3 className="font-semibold mt-4 mb-2">Answer:</h3>
            <p>Yes</p>
            <h3 className="font-semibold mt-4 mb-2">Explanation:</h3>
            <p>
              Select the &ldquo;Slide Show&rdquo; tab and select the buttons
              below to start playing the slide show from beginning.
            </p>
          </div>
        </section>
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
            href="/online-learning/tool-selection"
            className="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 transition-colors duration-300"
          >
            Back to Tools Guide
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;

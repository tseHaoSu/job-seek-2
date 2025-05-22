"use client";


import Video from "@/app/_components/Video";
import { Bot, ChevronDown } from "lucide-react";
import Form from "../_components/Form";

const Page = () => {
  return (
    <>
      <Video
        videoSrc="https://yoxrhuucqgkdxhpfubee.supabase.co/storage/v1/object/public/banner-video//resume.mp4"
        heading="Craft Your Resume with Confidence"
        subtext="Let our AI guide you step-by-step to create a resume that stands out—simple, smart, and stress-free."
      >
        <div className="absolute bottom-13 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white">
          <ChevronDown size={28} className="animate-bounce" />
          <span className="text-m mt-1">
            Scroll down to generate the resume
          </span>
        </div>
      </Video>
      <div className="space-y-8 text-center">
        <h1 className="text-4xl font-extrabold lg:text-4xl text-red-900 leading-tight flex items-center justify-center gap-2">
          <Bot size={50} className="inline-block" />
          Resume Guidance AI
        </h1>
        <h3 className="text-xl md:text-xl text-gray-700 leading-relaxed">
          Resume Guidance AI can help you create a resume that stands out. Just
          fill in the form below with your details, and we will generate a
          resume and give you a structured guidance.
        </h3>
        <Form />
      </div>
    </>
  );
};

export default Page;

import React from "react";
import Form from "./_components/Form";
import { Bot } from "lucide-react";
import Video from "@/app/_components/Video";

const page = () => {
  return (
    <>
      <Video
        videoSrc="https://yoxrhuucqgkdxhpfubee.supabase.co/storage/v1/object/public/banner-video//resume.mp4"
        heading="Empowering Experience with Digital Confidence"
        subtext="Because learning never stops — nor should you."
      />
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

export default page;

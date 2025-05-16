"use client";

import Video from "@/app/_components/Video";
import SearchInput from "./_components/SearchInput";
import { ChevronDown } from "lucide-react";
import SearchBar from "./_components/SearchBar";
import Header from "./_components/Header";
import JobTabs from "./_components/JobTabs";

const page = () => {
  return (
    <>
      <Video
        videoSrc="https://yoxrhuucqgkdxhpfubee.supabase.co/storage/v1/object/public/banner-video//question.mp4"
        heading="Explore the opportunities that await you"
        subtext="Fresh jobs, tailored to your skills and interests with the help of AI.">

        <div className="absolute bottom-13 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white">
          <ChevronDown size={28} className="animate-bounce" />
          <span className="text-m mt-1">Scroll down to know more</span>
        </div>
      </Video>
      <Header />
      <SearchBar />
      <JobTabs defaultTab="jobs"/> 
    </>
  );
};

export default page;

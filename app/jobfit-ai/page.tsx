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
        videoSrc="https://yoxrhuucqgkdxhpfubee.supabase.co/storage/v1/object/public/banner-video//writing.mp4"
        heading="JobFit AI"
        subtext="Discover Australia's latest job opportunities and instantly tailor your
       resume with our powerful AI tool, maximizing your chances of landing your
       dream position."
      >
        <div
          className="absolute bottom-13 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white cursor-pointer"
          onClick={() => {
            document.getElementById("search")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <ChevronDown size={28} className="animate-bounce" />
          <span className="text-m mt-1">Scroll down to know more</span>
        </div>
      </Video>
      <div id="search">
        <SearchBar />
      </div>
      <JobTabs defaultTab="jobs" />
    </>
  );
};

export default page;

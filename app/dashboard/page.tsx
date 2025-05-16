import React from "react";
import Dashboard from "./_components/Dashboard";
import { DashboardHeader } from "./_components/DashboardHeader";
import { ChevronDown } from "lucide-react";
import Video from "../_components/Video";


const page = () => {
  return (
    <>
      <Video
        videoSrc="https://yoxrhuucqgkdxhpfubee.supabase.co/storage/v1/object/public/banner-video//learning.mp4"
        heading="Ready to Learn, Apply, and Grow?"
        subtext="From everyday tools to job search help — everything you need is right here.">
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white">
          <ChevronDown size={28} className="animate-bounce" />
          <span className="text-m mt-1">Scroll down to know more</span>
        </div>
      </Video>
      <Dashboard />
    </>
  );
};

export default page;

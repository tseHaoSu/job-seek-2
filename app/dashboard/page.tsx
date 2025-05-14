import React from "react";
import Dashboard from "./_components/Dashboard";
import { DashboardHeader } from "./_components/DashboardHeader";
import Video from "../_components/Video";


const page = () => {
  return (
    <>
      <Video
        videoSrc="https://yoxrhuucqgkdxhpfubee.supabase.co/storage/v1/object/public/banner-video//learning.mp4"
        heading="Ready to Learn, Apply, and Grow?"
        subtext="From everyday tools to job search help — everything you need is right here."
      />
      <Dashboard />
    </>
  );
};

export default page;

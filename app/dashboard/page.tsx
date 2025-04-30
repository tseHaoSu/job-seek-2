import React from "react";
import Dashboard from "./_components/Dashboard";
import { DashboardHeader } from "./_components/DashboardHeader";
import Video from "../_components/Video";


const page = () => {
  return (
    <>
      <Video
        videoSrc="https://yoxrhuucqgkdxhpfubee.supabase.co/storage/v1/object/public/banner-video//learning.mp4"
        heading="Explore in demand technologies"
        subtext="Because learning never stops — nor should you."
      />
      <Dashboard />
    </>
  );
};

export default page;

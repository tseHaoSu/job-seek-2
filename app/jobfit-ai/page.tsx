"use client";

import Video from "@/app/_components/Video";
import SearchInput from "./_components/SearchInput";
import SearchBar from "./_components/SearchBar";
import Header from "./_components/Header";
import JobTabs from "./_components/JobTabs";

const page = () => {
  return (
    <>
      <Video
        videoSrc="https://yoxrhuucqgkdxhpfubee.supabase.co/storage/v1/object/public/banner-video//question.mp4"
        heading="Explore the opportunities that await you"
        subtext="Fresh jobs, tailored to your skills and interests with the help of AI."
      />
      <Header />
      <SearchBar />
      <JobTabs defaultTab="jobs"/> 
    </>
  );
};

export default page;

import React from 'react'
import Hero from './_components/Hero'
import Banner from './_components/Banner';
import CareerCards from './_components/CareerCards';
import Video from "@/app/_components/Video";


const page = () => {
  return (
    <>
      <Video
        videoSrc="https://yoxrhuucqgkdxhpfubee.supabase.co/storage/v1/object/public/banner-video//resume.mp4"
        heading="Confidently Navigate Your Career Journey"
        subtext="Take the stress out of job searching with guided support and smart tools."
      />
      <Hero />
      <Banner />
      <CareerCards />
    </>
  );
}

export default page
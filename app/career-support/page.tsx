import React from 'react'
import Hero from './_components/Hero'
import Banner from './_components/Banner';
import CareerCards from './_components/CareerCards';
import Video from "@/app/_components/Video";


const page = () => {
  return (
    <>
      <Video
        videoSrc="/video/resume.mp4"
        heading="Empowering Experience with Digital Confidence"
        subtext="Because learning never stops — nor should you."
      />
      <Hero />
      <Banner />
      <CareerCards />
    </>
  );
}

export default page
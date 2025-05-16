import { Button } from '@/components/ui/button';
import { Sparkles, ChevronDown } from 'lucide-react';
import Link from 'next/link';
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
      >
      <Link href="/career-support/resume-support">
        <Button
          variant="default"
          className="bg-red-100 text-red-700 hover:bg-red-50 hover:text-red-800 text-md w-70 h-12 rounded-xl shadow-lg hover:scale-105 duration-300"
        >
          <Sparkles className="mr-2" />
            Generate your resume Now!
        </Button>
      </Link>
      <div className="absolute bottom-13 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white">
        <ChevronDown size={28} className="animate-bounce" />
        <span className="text-m mt-1">Scroll down to know more</span>
      </div>
      </Video>
      <Hero />
      <Banner />
      <CareerCards />
    </>
  );
}

export default page
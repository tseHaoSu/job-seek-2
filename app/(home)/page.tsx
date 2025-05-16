import Banner from "../_components/Banner";
import Cards from "../_components/Cards";
import DataSection from "../_components/DataSection";
import Hero from "../_components/Hero";
import SecondBanner from "../_components/SecondBanner";
import BottomBanner from "../_components/BottomBanner"
import Video from "../_components/Video";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import MainFeature from "../_components/MainFeature";

export default function Home() {
  return (
    <>
      <Video
        videoSrc="https://yoxrhuucqgkdxhpfubee.supabase.co/storage/v1/object/public/banner-video//teaching.mp4"
        heading="Build Digital Confidence at Work - One Step at a Time."
        subtext="Interactive support to help mature-age workers master everyday workplace tools with ease!"
      >

      <Link href="/dashboard">
        <Button
          variant="default"
          className="bg-red-100 text-red-700 hover:bg-red-50 hover:text-red-800 text-md w-48 h-12 rounded-xl shadow-lg hover:scale-105 duration-300"
        >
          <Sparkles className="mr-2" />
            Go to Dashboard
        </Button>
      </Link>
      </Video>
      <DataSection />
      <Banner />
      <MainFeature/>
      <BottomBanner />
    </>
  );
}

import Banner from "../_components/Banner";
import Cards from "../_components/Cards";
import DataSection from "../_components/DataSection";
import Hero from "../_components/Hero";
import SecondBanner from "../_components/SecondBanner";
import Video from "../_components/Video";
import AIAssistant from "../_components/AIAssistant";
import { PrismaClient } from "@prisma/client";
import Dashboard from "../dashboard/_components/Dashboard";

export default function Home() {
  return (
    <>
      <Video
        videoSrc="https://yoxrhuucqgkdxhpfubee.supabase.co/storage/v1/object/public/banner-video//teaching.mp4"
        heading="Empowering Experience with Digital Confidence"
        subtext="Because learning never stops — nor should you."
      />
      <Hero />
      <Banner />
      <Cards />
      <SecondBanner />
      <DataSection />
    </>
  );
}

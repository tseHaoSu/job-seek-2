import Banner from "../_components/Banner";
import Cards from "../_components/Cards";
import DataSection from "../_components/DataSection";
import Hero from "../_components/Hero";
import SecondBanner from "../_components/SecondBanner";
import Video from "../_components/Video";

export default function Home() {
  return (
    <>
      <Video
        videoSrc="https://yoxrhuucqgkdxhpfubee.supabase.co/storage/v1/object/public/banner-video//teaching.mp4"
        heading="Build Digital Confidence at Work — One Step at a Time."
        subtext="Interactive support to help mature-age workers master everyday workplace tools with ease!"
      />
      <Hero />
      <Banner />
      <DataSection />
    </>
  );
}


import Banner from "../_components/Banner";
import Cards from "../_components/Cards";
import DataSection from "../_components/DataSection";
import Hero from "../_components/Hero";
import SecondBanner from "../_components/SecondBanner";
import Video from "../_components/Video";
import AIAssistant from "../_components/AIAssistant";


export default function Home() {
  return (
    <>
      <Video
        videoSrc="/video/teaching.mp4"
        heading="Empowering Experience with Digital Confidence"
        subtext="Because learning never stops — nor should you."
      />
      <div className="space-y-20 p-4 sm:px-6 lg:px-8">
        <Hero />
        <Banner />
        <Cards />
        <SecondBanner />
        <DataSection />
      </div>
      <AIAssistant />
    </>
  );
}

import Banner from "./_components/Banner";
import Cards from "./_components/Cards";
import DataSection from "./_components/DataSection";
import Hero from "./_components/Hero";
import SecondBanner from "./_components/SecondBanner";

export default function Home() {
  return (
    <div className="space-y-20 p-4 sm:px-6 lg:px-8">
      <Hero />
      <Banner />
      <Cards />
      <SecondBanner />
      <DataSection />
    </div>
  );
}

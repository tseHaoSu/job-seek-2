import Video from "@/app/_components/Video";
import Categories from "./_components/Categories";
import Header2 from "./_components/Header2";
import { ChevronDown } from "lucide-react";

const Page = () => {
  return (
    <>
      <Video
        videoSrc="https://yoxrhuucqgkdxhpfubee.supabase.co/storage/v1/object/public/banner-video//writing.mp4"
        heading="Start Building Your Digital Skills"
        subtext="Choose a tool category to begin - from workplace communication to productivity essentials.">

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white">
          <ChevronDown size={28} className="animate-bounce" />
          <span className="text-m mt-1">Scroll down to know more</span>
        </div>
      </Video>
      <Header2 />
      <Categories />
    </>
  );
};

export default Page;

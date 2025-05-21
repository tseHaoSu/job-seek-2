import Video from "@/app/_components/Video";
import Categories from "./_components/Categories";
import Header2 from "./_components/Header2";
import { ChevronDown } from "lucide-react";
import ScrollDownButton from "./_components/ScrollDownButton";

const Page = () => {
  return (
    <>
      <Video
        videoSrc="https://yoxrhuucqgkdxhpfubee.supabase.co/storage/v1/object/public/banner-video//writing.mp4"
        heading="Start Building Your Digital Skills"
        subtext="Choose a tool category to begin - from workplace communication to productivity essentials.">

        <ScrollDownButton />
      </Video>
      <div id="header2">
        <Header2 />
      </div>
        <Categories />
    </>
  );
};

export default Page;

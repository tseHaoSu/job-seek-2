import Video from "@/app/_components/Video";
import { ChevronDown } from "lucide-react";
import Header from "./_components/Header";
import Questions from "./_components/Questions";
import ScrollDownButton from "./_components/ScrollDownButton";

const page = () => {
  return (
    <>
      <Video
        videoSrc="https://yoxrhuucqgkdxhpfubee.supabase.co/storage/v1/object/public/banner-video//art.mp4"
        heading="Quiz For Personalized Recommendations"
        subtext="Recommend a personalized set of tools from: Word, PowerPoint,
        Excel, Acrobat, Zoom, Teams, Meet, SEEK, LinkedIn, Gmail."
      >
        <ScrollDownButton />
      </Video>
      <div id="header2">
        <Questions />
      </div>
    </>
  );
};

export default page;

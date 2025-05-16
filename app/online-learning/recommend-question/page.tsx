import Video from "@/app/_components/Video";
import { ChevronDown } from "lucide-react";
import Header from "./_components/Header";
import Questions from "./_components/Questions";

const page = () => {
  return (
    <>
      <Video
        videoSrc="https://yoxrhuucqgkdxhpfubee.supabase.co/storage/v1/object/public/banner-video//art.mp4"
        heading="Quiz For Personalized Recommendations"
        subtext="Recommend a personalized set of tools from: Word, PowerPoint,
        Excel, Acrobat, Zoom, Teams, Meet, SEEK, LinkedIn, Gmail."
      >
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white">
          <ChevronDown size={28} className="animate-bounce" />
          <span className="text-m mt-1">Scroll down to start the quiz</span>
        </div>
        </Video>
      <Questions />
    </>
  );
};

export default page;

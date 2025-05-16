import Video from "@/app/_components/Video";

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
      />
      <Questions />
    </>
  );
};

export default page;

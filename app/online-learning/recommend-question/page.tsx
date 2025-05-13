import Video from "@/app/_components/Video";

import Header from "./_components/Header";
import Questions from "./_components/Questions";

const page = () => {
  return (
    <>
      <Video
        videoSrc="https://yoxrhuucqgkdxhpfubee.supabase.co/storage/v1/object/public/banner-video//art.mp4"
        heading="Master the Tools You Use at Work"
        subtext="Step-by-step guides for Word, Zoom, Gmail, and more — designed just for you."
      />
      <Header />
      <Questions />
    </>
  );
};

export default page;

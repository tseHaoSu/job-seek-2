import Video from "@/app/_components/Video";
import Categories from "./_components/Categories";
import Header2 from "./_components/Header2";

const Page = () => {
  return (
    <>
      <Video
        videoSrc="https://yoxrhuucqgkdxhpfubee.supabase.co/storage/v1/object/public/banner-video//question.mp4"
        heading="Start Building Your Digital Skills"
        subtext="Choose a tool category to begin - from workplace communication to productivity essentials."
      />
      <Header2 />
      <Categories />
    </>
  );
};

export default Page;

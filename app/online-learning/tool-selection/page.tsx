import Video from "@/app/_components/Video";
import Categories from "./_components/Categories";
import Header2 from "./_components/Header2";

const Page = () => {
  return (
    <>
      <Video
        videoSrc="https://yoxrhuucqgkdxhpfubee.supabase.co/storage/v1/object/public/banner-video//question.mp4"
        heading="Explore in demand technologies"
        subtext="Because learning never stops — nor should you."
      />
      <Header2 />
      <Categories />
    </>
  );
};

export default Page;

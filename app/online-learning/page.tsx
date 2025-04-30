import Banner from "./_components/Banner";
import Categories from "./_components/Categories";
import Header from "./_components/Header";
import Header2 from "./_components/Header2";
import Video from "@/app/_components/Video";

const Page = () => {
  return (
    <>
      <Video
        videoSrc="https://yoxrhuucqgkdxhpfubee.supabase.co/storage/v1/object/public/banner-video//question.mp4"
        heading="Explore in demand technologies"
        subtext="Because learning never stops — nor should you."
      />
      <Header />
      <Banner />
      <Header2 />
      <Categories />
    </>
  );
};

export default Page;

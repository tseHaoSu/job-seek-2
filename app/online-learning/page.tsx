import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
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
        heading="Master the Tools You Use at Work"
        subtext="Step-by-step guides for Word, Zoom, Gmail, and more - designed just for you.">

        <Link href="/online-learning/1">
          <Button
          variant="default"
          className="bg-red-100 text-red-700 hover:bg-red-50 hover:text-red-800 text-md w-48 h-12 rounded-xl shadow-lg hover:scale-105 duration-300"
        >
          <Sparkles className="mr-2" />
            Start Learning!
          </Button>
        </Link>
      </Video>
      
      <Header2 />
      <Banner />
      <Categories />
    </>
  );
};

export default Page;

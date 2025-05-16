import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const header = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center ">
      <div className="md:mt-0">
        <Image
          src="/stock/old-man.jpeg"
          width={500}
          height={500}
          alt="Picture of the author"
          className="rounded-2xl shadow-2xl w-full object-cover hover:shadow-red-200 duration-300"
        />
      </div>
      <div className="space-y-8">
        <h1 className="text-4xl font-extrabold lg:text-5xl text-red-900 leading-tight">
          Tools Walkthrough
        </h1>
        <h3 className="text-xl md:text-xl text-gray-700 leading-relaxed">
          Confidently learn workplace tools through easy, guided walkthroughs. Choose a recommended path or explore on your own to get started.
        </h3>
      </div>
    </div>
  );
};

export default header;

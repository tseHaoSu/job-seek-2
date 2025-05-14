import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="space-y-8">
        <h1 className="text-4xl font-extrabold lg:text-5xl text-red-900 leading-tight">
          Start Your Digital Confidence Journey
        </h1>
        <h3 className="text-xl md:text-2xl text-gray-700 leading-relaxed">
          Practical step-by-step help with the workplace tools you use every
          day.
        </h3>
      </div>
      <div className="md:mt-0">
        <Image
          src="/stock/man.jpeg"
          width={500}
          height={500}
          alt="Picture of the author"
          className="rounded-2xl shadow-2xl w-full object-cover hover:shadow-red-200 duration-300"
        />
      </div>
    </div>
  );
};

export default Hero;

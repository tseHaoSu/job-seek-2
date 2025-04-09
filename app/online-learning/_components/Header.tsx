import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const header = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center ">
      <div className="md:mt-0">
        <Image
          src="/old-man.jpeg"
          width={500}
          height={500}
          alt="Picture of the author"
          className="rounded-2xl shadow-2xl w-full object-cover hover:shadow-red-200 duration-300"
        />
      </div>
      <div className="space-y-8">
        <h1 className="text-4xl font-extrabold lg:text-5xl text-red-900 leading-tight">
          Select a Module to Start Learning!
        </h1>
        <h3 className="text-xl md:text-2xl text-gray-700 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
          tempora sapiente fuga, illo vitae hic itaque. Quisquam, iusto? Quasi,
          corrupti!
        </h3>
        <div>
          <Link href="/online-learning/1">
            <Button
              variant="outline"
              className="bg-red-800 hover:bg-red-900 text-white text-lg w-48 h-12 rounded-xl shadow-lg hover:scale-105 duration-300 hover:text-white"
            >
              <Sparkles className="mr-2" />
              Try it out
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default header;

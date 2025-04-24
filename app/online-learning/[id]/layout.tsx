import NavBar from "@/app/_components/NavBar";
import React from "react";
import Video from "@/app/_components/Video";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="space-y-20 sm:px-6 lg:px-8">{children}</div>
    </>
  );
};

export default layout;

import React from "react";

interface VideoProps {
  videoSrc: string;
  heading: string;
  subtext: string;
  children?: React.ReactNode;
}

const Video: React.FC<VideoProps> = ({ videoSrc, heading, subtext, children }) => {
  return (
    <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[800px] -mt-[100px] mb-12">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content overlay */}
      <div className="absolute inset-0 bg-black/40 flex items-center">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {heading}
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8">{subtext}</p>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;

import React from 'react'

const page = () => {
  return (
    <div className="fixed inset-0 w-screen h-screen z-0">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="https://yoxrhuucqgkdxhpfubee.supabase.co/storage/v1/object/public/banner-video//under-construction.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default page
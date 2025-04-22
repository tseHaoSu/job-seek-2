import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="space-y-20 sm:px-6 lg:px-8 mt-10 p-5">{children}</div>;
};

export default layout;

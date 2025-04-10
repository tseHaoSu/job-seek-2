import React from "react";
import Data from "./Data";

const DataSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="space-y-6">
        <h1 className="text-4xl font-extrabold lg:text-5xl text-red-900 leading-tight">
          Working Population by Age Group (Australia)
        </h1>
        <h4 className="text-xl md:text-xl text-gray-700 leading-relaxed">
          This visualization shows the percentage of people above 50 and below
          50 in the working population, in Australia. As clearly seen the
          percentage of people below 50 that are working is steadily going down.
          This is mainly due to them not being able to keep up with the
          ever-changing technology that is needed to be relevant in most jobs.
          Our website aims to bridge the gap that those mature age Aussies face
          so that they can keep up with the ever changing technology.
        </h4>
      </div>
      <div>
        <Data />
      </div>
    </div>
  );
};

export default DataSection;

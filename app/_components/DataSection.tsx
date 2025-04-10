import React from "react";
import Data from "./Data";

const DataSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      <div className="space-y-6">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-red-900 leading-tight">
          Working Population by Age Group (Australia)
        </h1>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-xl md:text-l text-gray-700 leading-relaxed">
          <li>
            This visualization shows the percentage of people above 50 and below
            50 in the working population, in Australia.
          </li>
          <li>
            As clearly seen the percentage of people below 50 that are working
            is steadily going down.
          </li>
          <li>
            This is mainly due to them not being able to keep up with the
            ever-changing technology that is needed to be relevant in most jobs.
          </li>
          <li>
            Our website aims to bridge the gap that those mature age Aussies
            face so that they can keep up with the ever changing technology.
          </li>
        </ul>
      </div>
      <div>
        <Data />
      </div>
    </div>
  );
};

export default DataSection;

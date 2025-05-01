import React from "react";
import Data from "./Data";

const DataSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      <div className="space-y-6">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-red-900 leading-tight">
          Working Population by Age Group (Australia)
        </h1>
        <p className="my-6 text-xl md:text-l text-gray-700 leading-relaxed">
          Older Australians are quietly disappearing from the workforce — not
          because they lack ability, but because they're being left behind by
          digital change. Recent data shows a{" "}
          <span className="font-bold text-red-600">
            steady drop in workforce participation for Australians over 50
          </span>
          , while younger workers increasingly dominate. Between 2022 and 2025,
          the{" "}
          <span className="font-bold text-red-600">
            percentage of workers under 50 has consistently grown
          </span>{" "}
          — highlighting a widening skills gap. This isn't about retirement.
          It's about relevance. Without digital confidence, experienced workers
          lose opportunities, income, and sometimes even their sense of purpose.{" "}
          <span className="font-bold text-red-600">
            StillSkilled is here to change that
          </span>
          . We offer mature-age Australians a safe, simple space to explore
          digital tools and stay connected to modern work — confidently and on
          their own terms.
        </p>
      </div>
      <div>
        <Data />
      </div>
    </div>
  );
};

export default DataSection;

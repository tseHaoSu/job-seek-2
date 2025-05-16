"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import JobsForYou from "./JobsForYou";
import FavoriteJobs from "./FavoriteJobs";
import { Briefcase, Heart } from "lucide-react";

const JobTabs = ({ defaultTab = "jobs" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className="w-full border-b border-gray-200 mb-6">
      <div className="container mx-auto px-4">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab("jobs")}
            className={cn(
              "py-4 font-bold text-gray-600 relative flex items-center",
              activeTab === "jobs" && "text-red-900"
            )}
          >
            <Briefcase className="h-4 w-4 mr-2" />
            Jobs for you
            {activeTab === "jobs" && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-900"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab("favorites")}
            className={cn(
              "py-4 font-bold text-gray-600 relative flex items-center",
              activeTab === "favorites" && "text-red-900"
            )}
          >
            <Heart className="h-4 w-4 mr-2" />
            Favorites
            {activeTab === "favorites" && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-900"></div>
            )}
          </button>
        </div>
      </div>
      <div className="container mx-auto px-4 py-6">
        {activeTab === "jobs" && <JobsForYou />}
        {activeTab === "favorites" && <FavoriteJobs />}
      </div>
    </div>
  );
}

export default JobTabs;

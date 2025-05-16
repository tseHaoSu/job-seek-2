"use client";

import React from "react";
import { Heart, Trash2, Building, MapPin, Calendar } from "lucide-react";

const FavoriteJobs = () => {
  // Sample favorites data - you'll replace this with your actual data
  const favorites = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp",
      location: "Melbourne",
      salary: "$95,000 - $120,000",
      date: "Yesterday",
    },
    {
      id: 2,
      title: "React Engineer",
      company: "Digital Solutions",
      location: "Sydney",
      salary: "$100,000 - $130,000",
      date: "3 days ago",
    },
    {
      id: 3,
      title: "UX Designer",
      company: "CreativeMinds",
      location: "Brisbane",
      salary: "$85,000 - $110,000",
      date: "1 week ago",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        <Heart
          className="inline-block h-6 w-6 mr-2 text-red-900"
          fill="#7f1d1d"
        />
        Your Favorites
      </h2>
      <div className="space-y-3">
        {favorites.map((job) => (
          <div
            key={job.id}
            className="flex justify-between items-center py-4 px-3 border-b border-gray-200 hover:bg-gray-50 rounded-md"
          >
            <div>
              <h3 className="font-bold text-red-900">{job.title}</h3>
              <div className="flex items-center text-sm text-gray-700 mt-1">
                <Building className="h-4 w-4 mr-1" />
                {job.company}
              </div>
              <div className="flex items-center text-sm text-gray-700 mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                {job.location}
              </div>
              <p className="text-sm font-medium mt-1">{job.salary}</p>
            </div>
            <div className="flex flex-col items-end gap-3">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                {job.date}
              </div>
              <button className="text-gray-500 hover:text-red-900 transition-colors">
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state - show this when there are no favorites */}
      {favorites.length === 0 && (
        <div className="text-center py-8">
          <Heart
            className="h-12 w-12 mx-auto text-gray-300"
            strokeWidth={1.5}
          />
          <p className="mt-2 text-gray-500">You haven't saved any jobs yet</p>
          <p className="text-gray-500">Jobs you favorite will appear here</p>
        </div>
      )}
    </div>
  );
};

export default FavoriteJobs;

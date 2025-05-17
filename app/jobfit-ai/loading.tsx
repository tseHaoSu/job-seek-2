"use client";

import React from "react";

export function LoadingProgress() {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-900" />
    </div>
  );
}

export default function Loading() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full max-w-[1200px] mx-auto px-4">
      {/* Left side - Job listings */}
      <div className="w-full lg:w-2/5 pt-5">
        <div className="h-6 w-36 bg-gray-200 animate-pulse rounded mb-4"></div>
        <div className="pr-0 lg:pr-4 max-h-[800px]">
          <div className="space-y-3">
            {/* 5 shimmer job cards */}
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 animate-pulse"
              >
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
                <div className="h-5 bg-gray-200 rounded w-1/3 mb-3"></div>
                <div className="flex gap-2 mb-3">
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                  <div className="h-6 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-28"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider line */}
      <div className="hidden lg:block border-r border-gray-200 mx-4"></div>

      {/* Right side - Job details */}
      <div className="w-full lg:w-3/5 mt-6 lg:mt-0">
        <div className="bg-white rounded-lg p-6 shadow-sm animate-pulse">
          {/* Job title and favorite */}
          <div className="flex justify-between items-start mb-4">
            <div className="h-8 bg-gray-200 rounded w-2/3"></div>
            <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
          </div>

          {/* Company info */}
          <div className="mb-6 flex items-center">
            <div className="w-14 h-14 bg-gray-200 rounded-full mr-3"></div>
            <div className="h-5 bg-gray-200 rounded w-40"></div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-5">
            <div className="h-6 bg-gray-200 rounded w-20"></div>
            <div className="h-6 bg-gray-200 rounded w-24"></div>
            <div className="h-6 bg-gray-200 rounded w-16"></div>
          </div>

          {/* Job details box */}
          <div className="flex flex-col gap-3 mb-8 bg-gray-50 p-4 rounded-lg border border-gray-100">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-center">
                <div className="h-5 w-5 bg-gray-300 rounded-full mr-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>

          {/* Job description */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="h-6 w-6 bg-gray-300 rounded-full mr-2"></div>
              <div className="h-6 bg-gray-200 rounded w-40"></div>
            </div>
            <div className="border-l-4 border-red-100 pl-4">
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            </div>
          </div>

          {/* Job function */}
          <div className="mb-8">
            <div className="flex items-center mb-3">
              <div className="h-5 w-5 bg-gray-300 rounded-full mr-2"></div>
              <div className="h-6 bg-gray-200 rounded w-32"></div>
            </div>
            <div className="flex flex-wrap gap-2 ml-4">
              <div className="h-6 bg-gray-200 rounded w-24"></div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-8 flex gap-4">
            <div className="flex-1 h-14 bg-gray-200 rounded"></div>
            <div className="h-14 bg-gray-200 rounded w-40"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

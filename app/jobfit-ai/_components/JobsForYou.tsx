"use client";

import React, { useState } from "react";
import {
  Building,
  MapPin,
  Calendar,
  DollarSign,
  Briefcase,
  Heart,
} from "lucide-react";

const JobsForYouContent = () => {
  // Sample job data - you'll replace this with your actual data
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp",
      location: "Melbourne",
      salary: "$95,000 - $120,000",
      date: "2 days ago",
      description:
        "We are seeking a skilled Frontend Developer with expertise in React, TypeScript, and modern web technologies. You will be responsible for building responsive and interactive user interfaces for our enterprise applications.",
      requirements: [
        "3+ years of experience with React and modern JavaScript",
        "Strong knowledge of HTML, CSS, and responsive design",
        "Experience with state management libraries (Redux, Context API)",
        "Familiarity with UI testing frameworks",
        "Bachelor's degree in Computer Science or related field preferred",
      ],
      employmentType: "Full-time",
      experienceLevel: "Mid-Senior level",
    },
    {
      id: 2,
      title: "React Engineer",
      company: "Digital Solutions",
      location: "Sydney",
      salary: "$100,000 - $130,000",
      date: "1 day ago",
      description:
        "Join our innovative team building next-generation web applications. As a React Engineer, you will create performant and scalable frontend solutions that delight our users and drive business growth.",
      requirements: [
        "4+ years of frontend development experience",
        "Deep understanding of React and its ecosystem",
        "Experience with GraphQL and RESTful APIs",
        "Knowledge of CI/CD pipelines and deployment strategies",
        "Strong problem-solving skills and attention to detail",
      ],
      employmentType: "Full-time",
      experienceLevel: "Senior level",
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "InnovateAU",
      location: "Remote",
      salary: "$110,000 - $140,000",
      date: "3 days ago",
      description:
        "InnovateAU is looking for a talented Full Stack Developer to join our remote team. You'll work on cutting-edge projects across the entire technology stack, from database design to frontend implementation.",
      requirements: [
        "5+ years of experience in full stack development",
        "Proficiency in React, Node.js, and SQL/NoSQL databases",
        "Experience with cloud services (AWS, Azure, or GCP)",
        "Strong communication skills and ability to work remotely",
        "History of delivering complex applications in a team environment",
      ],
      employmentType: "Full-time",
      experienceLevel: "Senior level",
    },
  ];

  const [selectedJob, setSelectedJob] = useState(jobs[0]);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left Side - Job Cards */}
      <div className="w-full lg:w-2/5">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Recommended for you
        </h2>
        <div className="space-y-3 pr-0 lg:pr-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className={`border ${
                selectedJob.id === job.id
                  ? "border-red-900 bg-red-50"
                  : "border-gray-200"
              } rounded-lg p-4 hover:shadow-md transition-all cursor-pointer`}
              onClick={() => setSelectedJob(job)}
            >
              <h3 className="font-bold text-lg text-red-900">{job.title}</h3>
              <p className="text-gray-700">{job.company}</p>
              <p className="text-gray-700">{job.location}</p>
              <p className="mt-2 font-semibold">{job.salary}</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-sm text-gray-500">{job.date}</span>
                <button
                  className="text-red-900 font-medium hover:text-red-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add favorite logic here
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Job Detail */}
      <div className="w-full lg:w-3/5 border-l-0 lg:border-l border-gray-200 pl-0 lg:pl-6">
        {selectedJob && (
          <div>
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-red-900">
                {selectedJob.title}
              </h2>
              <button className="p-2 rounded-full hover:bg-red-100">
                <Heart className="h-6 w-6 text-red-900" />
              </button>
            </div>

            <div className="flex flex-col gap-3 mb-6">
              <div className="flex items-center">
                <Building className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-800 font-medium">
                  {selectedJob.company}
                </span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-800">{selectedJob.location}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-800 font-semibold">
                  {selectedJob.salary}
                </span>
              </div>
              <div className="flex items-center">
                <Briefcase className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-800">
                  {selectedJob.employmentType} · {selectedJob.experienceLevel}
                </span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-800">Posted {selectedJob.date}</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                Job Description
              </h3>
              <p className="text-gray-700 mb-4">{selectedJob.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                Requirements
              </h3>
              <ul className="list-disc list-inside space-y-1">
                {selectedJob.requirements.map((req, index) => (
                  <li key={index} className="text-gray-700">
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <button className="w-full py-3 bg-red-900 text-white rounded-md font-medium hover:bg-red-800 transition-colors">
                Apply Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsForYouContent;

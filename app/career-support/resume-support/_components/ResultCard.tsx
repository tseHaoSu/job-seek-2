"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DownloadIcon, XIcon } from "lucide-react";
import { generateResumePDF } from "./generatePDF";

interface ResultCardProps {
  resumeData: {
    name: string;
    cv_heading?: string;
    profile_heading?: string;
    profile_content?: string;
    education_heading?: string;
    education_list?: string[];
    education_content?: string;
    experience_heading?: string;
    experience_list?: string[];
    experience_content?: string;
    logs?: string[];
  };
  onClose: () => void;
}

const ResultCard = ({ resumeData, onClose }: ResultCardProps) => {
  const sections = [
    {
      title: "Basic Information",
      prompt: "Please complete your basic information like name, phone and email.",
      content: [
        `Name: ${resumeData.name}`
      ],
    },
    {
      title: "Profile",
      prompt: resumeData.profile_heading,
      content: resumeData.profile_content,
    },
    {
      title: "Education",
      prompt: resumeData.education_heading,
      content: resumeData.education_content,
      list: resumeData.education_list,
    },
    {
      title: "Experience",
      prompt: resumeData.experience_heading,
      content: resumeData.experience_content,
      list: resumeData.experience_list,
    },
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto border-none">
      <CardHeader className="border-none">
        <CardTitle className="text-red-800">
          Generated Resume Guidance
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {sections.map((section, index) => (
          <div
            key={index}
            className="border border-transparent rounded-md overflow-hidden shadow-md"
          >
            {/* title */}
            <div className="bg-red-100 text-red-700 px-4 py-2 font-semibold">
              {section.title}
            </div>

            {/* two column */}
            <div className="grid grid-cols-1">
              {/* right generation context */}
              <div className="bg-white p-4 text-gray-900 text-sm flex flex-col justify-start">
                {section.list && section.list.length > 0 ? (
                  <div className="space-y-2">
                    <ul className="list-disc pl-5 text-gray-800">
                      {section.list.map((item: string, idx: number) => (
                        <li key={idx} className="mb-1">
                          {item}
                        </li>
                      ))}
                    </ul>
                    {section.content && typeof section.content === "string" && (
                      <p className="mt-2 whitespace-pre-wrap">
                        {section.content}
                      </p>
                    )}
                    {Array.isArray(section.content) && (
                      <ul className="list-disc pl-5 text-gray-800 mt-2">
                        {section.content.map((line: string, idx: number) => (
                          <li key={idx}>{line}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <>
                    {Array.isArray(section.content) ? (
                      <ul className="list-disc pl-5 text-gray-800">
                        {section.content.map((line: string, idx: number) => (
                          <li key={idx}>{line}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="whitespace-pre-wrap">
                        {section.content || "No content generated."}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button
          onClick={onClose}
          variant="outline"
          className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
        >
          <XIcon size={16} className="mr-1" />
          Close
        </Button>
        <Button
          className="mr-2 bg-red-100 text-red-700 hover:bg-red-50 hover:text-red-800"
          onClick={() => generateResumePDF(resumeData)}
        >
          <DownloadIcon size={16} className="mr-1" />
          Download PDF
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResultCard;

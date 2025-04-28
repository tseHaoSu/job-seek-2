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

interface ResultCardProps {
  resumeData: any;
  onClose: () => void;
}

const ResultCard = ({ resumeData, onClose }: ResultCardProps) => {
  const sections = [
    {
      title: "Basic Information",
      prompt: "Please complete your basic information like name, phone and email.",
      content: resumeData.cv_heading,
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
        <CardTitle className="text-red-800">Generated Resume Guidance</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {sections.map((section, index) => (
          <div key={index} className="border border-transparent rounded-md overflow-hidden shadow-md">
            {/* title */}
            <div className="bg-red-800 text-white px-4 py-2 font-semibold">
              {section.title}
            </div>

            {/* two column */}
            <div className="grid grid-cols-2">
              {/* left description */}
              <div className="bg-red-100 p-4 text-gray-700 text-sm whitespace-pre-wrap">
                {section.prompt || "No prompt available."}
              </div>

              {/* right generation context */}
              <div className="bg-white p-4 text-gray-900 text-sm space-y-2 whitespace-pre-wrap">
                {section.list && section.list.length > 0 && (
                  <ul className="list-disc list-inside text-gray-800">
                    {section.list.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}
                <p>{section.content || "No content generated."}</p>
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
        <Button className="bg-red-800 hover:bg-red-900 focus:ring-red-400">
          <DownloadIcon size={16} className="mr-1" />
          Download PDF
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResultCard;

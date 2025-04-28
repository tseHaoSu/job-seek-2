"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import EducationSection from "./EducationInfoSection";
import PersonalInfoSection from "./PersonalInfoSection";
import ResultCard from "./ResultCard";
import { formSchema } from "./schema";
import { ResumeData } from "./types";
import WorkExperienceSection from "./WorkExperienceSection";
import LoadingAnimation from "./LoadingAnimation";

const Form = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const [resumeData, setResumeData] = useState<any>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ResumeData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      education: [
        {
          institution: "",
          degree_type: "",
          degree_name: "",
          year_start: 2020,
          year_end: 2024,
        },
      ],
      work_experience: [
        {
          organization: "",
          job_title: "",
          year_start: 2024,
          year_end: 2025,
        },
      ],
    },
  });

  const onSubmit = async (data: ResumeData) => {
    setIsSubmitting(true);
    setServerError("");
    setSuccess(false);
    setResumeData(null);
    try {
      const response = await axios.post("/api/generate-cv", data);
      console.log("Submission successful:", response.data);
      setSuccess(true);
      setResumeData(response.data);
      reset();
    } catch (error) {
      console.error(error);
      setServerError("Failed to submit resume data");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 border-none">
      <Card className="w-full max-w-4xl mx-auto mb-6 border-none">
        <CardHeader>
          <CardTitle className="text-red-800">Your Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-start gap-6">
              <PersonalInfoSection
                register={register}
                errors={errors}
                isSubmitting={isSubmitting}
              />
              <EducationSection
                control={control}
                register={register}
                errors={errors}
                isSubmitting={isSubmitting}
              />
              <WorkExperienceSection
                control={control}
                register={register}
                errors={errors}
                isSubmitting={isSubmitting}
              />
              {serverError && (
                <div className="text-red-500 text-sm mt-2">{serverError}</div>
              )}
              {success && (
                <div className="text-red-800 text-sm mt-2">
                  Resume submitted successfully!
                </div>
              )}
            </div>
            <CardFooter className="px-0 pt-6 justify-center">
              <Button
                className="mr-2 bg-red-100 text-red-700 hover:bg-red-50 hover:text-red-800 justify-center"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    Submitting...
                  </span>
                ) : (
                  "Submit Resume"
                )}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
      
      <div className="relative w-full max-w-4xl mx-auto">

      {/* animation */}
      {isSubmitting && (
        <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center z-50 rounded-md">
          <LoadingAnimation />
          <p className="text-red-800 mt-4 text-center text-lg">AI is generating your resume, please wait...</p>
        </div>
      )}
      
        {resumeData && (
          <ResultCard
            resumeData={resumeData}
            onClose={() => setResumeData(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Form;

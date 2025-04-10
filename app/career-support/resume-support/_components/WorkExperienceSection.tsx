import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  useFieldArray,
} from "react-hook-form";
import { ResumeData } from "./types";
import { MinusIcon, PlusIcon } from "lucide-react";

interface WorkExperienceSectionProps {
  control: Control<ResumeData>;
  register: UseFormRegister<ResumeData>;
  errors: FieldErrors<ResumeData>;
  isSubmitting: boolean;
}

const WorkExperienceSection = ({
  control,
  register,
  errors,
  isSubmitting,
}: WorkExperienceSectionProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "work_experience",
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-red-800">Work Experience</h3>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() =>
            append({
              organization: "",
              job_title: "",
              year_start: 2010,
              year_end: 2020,
            })
          }
          disabled={isSubmitting}
          className="text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <PlusIcon size={30} className="text-red-500" />
          Add Experience
        </Button>
      </div>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="p-4 border border-none rounded-md space-y-4 bg-red-50/40"
        >
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-red-800">
              Experience #{index + 1}
            </h4>
            {fields.length > 1 && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => remove(index)}
                disabled={isSubmitting}
                className="bg-red-100 hover:bg-red-200 text-red-700"
              >
                <MinusIcon size={15} />
                Remove
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <div className="flex flex-col space-y-1.5">
              <Label
                htmlFor={`work_experience.${index}.organization`}
                className="text-red-800"
              >
                Organization
              </Label>
              <Input
                id={`work_experience.${index}.organization`}
                placeholder="Company Name"
                {...register(`work_experience.${index}.organization`)}
                disabled={isSubmitting}
                className="border-red-200 focus:border-red-300 focus:ring-red-200 placeholder:text-gray-300"
              />
              {errors.work_experience?.[index]?.organization && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.work_experience[index]?.organization?.message}
                </p>
              )}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label
                htmlFor={`work_experience.${index}.job_title`}
                className="text-red-800"
              >
                Job Title
              </Label>
              <Input
                id={`work_experience.${index}.job_title`}
                placeholder="Your Position"
                {...register(`work_experience.${index}.job_title`)}
                disabled={isSubmitting}
                className="border-red-200 focus:border-red-300 focus:ring-red-200 placeholder:text-gray-300"
              />
              {errors.work_experience?.[index]?.job_title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.work_experience[index]?.job_title?.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 items-start">
              <div className="flex flex-col space-y-1.5">
                <Label
                  htmlFor={`work_experience.${index}.year_start`}
                  className="text-red-800"
                >
                  Start Year
                </Label>
                <Input
                  id={`work_experience.${index}.year_start`}
                  type="number"
                  placeholder="2010"
                  {...register(`work_experience.${index}.year_start`, {
                    valueAsNumber: true,
                  })}
                  disabled={isSubmitting}
                  className="border-red-200 focus:border-red-300 focus:ring-red-200 placeholder:text-gray-300"
                />
                {errors.work_experience?.[index]?.year_start && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.work_experience[index]?.year_start?.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label
                  htmlFor={`work_experience.${index}.year_end`}
                  className="text-red-800"
                >
                  End Year
                </Label>
                <Input
                  id={`work_experience.${index}.year_end`}
                  type="number"
                  placeholder="2020"
                  {...register(`work_experience.${index}.year_end`, {
                    valueAsNumber: true,
                  })}
                  disabled={isSubmitting}
                  className="border-red-200 focus:border-red-300 focus:ring-red-200 placeholder:text-gray-300"
                />
                {errors.work_experience?.[index]?.year_end && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.work_experience[index]?.year_end?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkExperienceSection;

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
import { MinusIcon, Plus, PlusIcon } from "lucide-react";

interface EducationSectionProps {
  control: Control<ResumeData>;
  register: UseFormRegister<ResumeData>;
  errors: FieldErrors<ResumeData>;
  isSubmitting: boolean;
}

const EducationSection = ({
  control,
  register,
  errors,
  isSubmitting,
}: EducationSectionProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-red-700">Education</h3>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() =>
            append({
              institution: "",
              degree_type: "",
              degree_name: "",
              year_start: 2000,
              year_end: 2004,
            })
          }
          disabled={isSubmitting}
          className="text-red-600 hover:bg-red-50 hover:text-red-800"
        >
          <PlusIcon size={30} className="text-red-500" />
          Add Education
        </Button>
      </div>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="p-4 border-none rounded-md space-y-4 bg-red-50/40"
        >
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-red-800">Education #{index + 1}</h4>
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
                htmlFor={`education.${index}.institution`}
                className="text-red-700"
              >
                Institution
              </Label>
              <Input
                id={`education.${index}.institution`}
                placeholder="University or College Name"
                {...register(`education.${index}.institution`)}
                disabled={isSubmitting}
                className="border-red-200 focus:border-red-300 focus:ring-red-200 placeholder:text-gray-300"
              />
              {errors.education?.[index]?.institution && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.education[index]?.institution?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label
                htmlFor={`education.${index}.degree_type`}
                className="text-red-700"
              >
                Degree Type
              </Label>
              <Input
                id={`education.${index}.degree_type`}
                placeholder="Bachelor's, Master's, etc."
                {...register(`education.${index}.degree_type`)}
                disabled={isSubmitting}
                className="border-red-200 focus:border-red-300 focus:ring-red-200 placeholder:text-gray-300"
              />
              {errors.education?.[index]?.degree_type && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.education[index]?.degree_type?.message}
                </p>
              )}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label
                htmlFor={`education.${index}.degree_name`}
                className="text-red-700"
              >
                Degree Name
              </Label>
              <Input
                id={`education.${index}.degree_name`}
                placeholder="Computer Science, Business, etc."
                {...register(`education.${index}.degree_name`)}
                disabled={isSubmitting}
                className="border-red-200 focus:border-red-300 focus:ring-red-200 placeholder:text-gray-300"
              />
              {errors.education?.[index]?.degree_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.education[index]?.degree_name?.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 items-start">
              <div className="flex flex-col space-y-1.5">
                <Label
                  htmlFor={`education.${index}.year_start`}
                  className="text-red-700"
                >
                  Start Year
                </Label>
                <Input
                  id={`education.${index}.year_start`}
                  type="number"
                  placeholder="2000"
                  {...register(`education.${index}.year_start`, {
                    valueAsNumber: true,
                  })}
                  disabled={isSubmitting}
                  className="border-red-200 focus:border-red-300 focus:ring-red-200 placeholder:text-gray-300"
                />
                {errors.education?.[index]?.year_start && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.education[index]?.year_start?.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label
                  htmlFor={`education.${index}.year_end`}
                  className="text-red-700"
                >
                  End Year
                </Label>
                <Input
                  id={`education.${index}.year_end`}
                  type="number"
                  placeholder="2004"
                  {...register(`education.${index}.year_end`, {
                    valueAsNumber: true,
                  })}
                  disabled={isSubmitting}
                  className="border-red-200 focus:border-red-300 focus:ring-red-200 placeholder:text-gray-300"
                />
                {errors.education?.[index]?.year_end && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.education[index]?.year_end?.message}
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

export default EducationSection;

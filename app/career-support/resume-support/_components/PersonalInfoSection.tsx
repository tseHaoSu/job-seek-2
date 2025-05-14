import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ResumeData } from "./types";

interface PersonalInfoSectionProps {
  register: UseFormRegister<ResumeData>;
  errors: FieldErrors<ResumeData>;
  isSubmitting: boolean;
}

const PersonalInfoSection = ({
  register,
  errors,
  isSubmitting,
}: PersonalInfoSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-red-800">
          Personal Information
        </h3>
      </div>
      <div className="p-4 border border-none rounded-md space-y-4 bg-red-50/40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name" className="text-red-800">
              Full Name
            </Label>
            <Input
              id="name"
              placeholder="Full Name"
              {...register("name")}
              disabled={isSubmitting}
              className="border-red-200 focus:border-red-300 focus:ring-red-200 placeholder:text-gray-300"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email" className="text-red-800">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              {...register("email")}
              disabled={isSubmitting}
              className="border-red-200 focus:border-red-300 focus:ring-red-200 placeholder:text-gray-300"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="phone" className="text-red-800">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (123) 456-7890"
              {...register("phone")}
              disabled={isSubmitting}
              className="border-red-200 focus:border-red-300 focus:ring-red-200 placeholder:text-gray-300"
              />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;

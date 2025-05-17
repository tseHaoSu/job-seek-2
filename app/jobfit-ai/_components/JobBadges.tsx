"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  getCountryColor,
  getEmploymentTypeColor,
  getSeniorityColor,
} from "@/lib/constant";

interface JobBadgesProps {
  seniority: string | null;
  employmentType: string | null;
  country: string | null;
}

const JobBadges = ({ seniority, employmentType, country }: JobBadgesProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-5">
      {seniority && (
        <Badge
          className={`${getSeniorityColor(seniority)} shadow-sm`}
          variant="outline"
        >
          {seniority}
        </Badge>
      )}
      {employmentType && (
        <Badge
          className={`${getEmploymentTypeColor(employmentType)} shadow-sm`}
          variant="outline"
        >
          {employmentType}
        </Badge>
      )}
      {country && (
        <Badge
          className={`${getCountryColor(country)} shadow-sm`}
          variant="outline"
        >
          {country}
        </Badge>
      )}
    </div>
  );
};

export default JobBadges;

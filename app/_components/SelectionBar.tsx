"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type DataType = "data1" | "data2" | "data3" | "data4";

interface SelectionBarProps {
  onSelectionChange: (value: DataType) => void;
  selectedValue: DataType;
}

const SelectionBar: React.FC<SelectionBarProps> = ({
  onSelectionChange,
  selectedValue,
}) => {
  const handleValueChange = (value: string) => {
    onSelectionChange(value as DataType);
  };

  return (
    <Select value={selectedValue} onValueChange={handleValueChange}>
      <SelectTrigger className="w-64 bg-white border-red-600 text-red-900 hover:bg-red-50 focus:ring-red-600 focus:border-red-600">
        <SelectValue placeholder="Select data" className="text-red-900" />
      </SelectTrigger>
      <SelectContent className="bg-white border-red-600">
        <SelectGroup>
          <SelectItem
            value="data1"
            className="text-red-900 hover:bg-red-50 focus:bg-red-50 focus:text-red-900"
          >
            Age Demographics
          </SelectItem>
          <SelectItem
            value="data2"
            className="text-red-900 hover:bg-red-50 focus:bg-red-50 focus:text-red-900"
          >
            Job Postings
          </SelectItem>
          <SelectItem
            value="data3"
            className="text-red-900 hover:bg-red-50 focus:bg-red-50 focus:text-red-900"
          >
            Employment Trends
          </SelectItem>
          <SelectItem
            value="data4"
            className="text-red-900 hover:bg-red-50 focus:bg-red-50 focus:text-red-900"
          >
            Job Vacancies
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectionBar;

"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";

interface SearchInputProps {
  onSearch?: (searchValue: string) => void;
}

const SearchInput = ({ onSearch}: SearchInputProps) => {
  const searchParams = useSearchParams();
  const searchParamValue = searchParams.get("search") || "";
  const [value, setValue] = useState(searchParamValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className="w-full max-w-3xl relative">
      <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500 h-4 w-4" />
      <Input
        className="w-full border-gray-200 focus:ring-red-900 focus:border-red-900 font-medium pl-9 h-10 placeholder:text-gray-400"
        placeholder="Job title, company, or keyword"
        value={value}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onSearch && onSearch(value);
          }
        }}
      />
    </div>
  );
};

export default SearchInput;

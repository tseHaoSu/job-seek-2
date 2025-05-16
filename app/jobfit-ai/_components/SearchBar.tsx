"use client";

import React, { useState } from "react";
import SearchInput from "./SearchInput";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin, Briefcase } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import qs from "query-string";

const SearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [searchValue, setSearchValue] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");

  const handleSearch = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          search: searchValue,
          location,
          jobType,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  };

  return (
    <div className="w-full bg-white px-4 py-6 border-b border-gray-200">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-4 items-center w-full">
          {/* Search Input - Increased width allocation */}
          <div className="w-full md:w-[55%] lg:w-[60%]">
            <SearchInput onSearch={(value) => setSearchValue(value)} />
          </div>

          {/* Location Select */}
          <div className="w-full md:w-36 lg:w-40">
            <Select onValueChange={setLocation}>
              <SelectTrigger className="w-full border-gray-200 focus:ring-red-900 focus:border-red-900">
                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent className="border-gray-200">
                <SelectItem value="melbourne">Melbourne</SelectItem>
                <SelectItem value="sydney">Sydney</SelectItem>
                <SelectItem value="brisbane">Brisbane</SelectItem>
                <SelectItem value="perth">Perth</SelectItem>
                <SelectItem value="adelaide">Adelaide</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Job Type Select */}
          <div className="w-full md:w-36 lg:w-40">
            <Select onValueChange={setJobType}>
              <SelectTrigger className="w-full border-gray-200 focus:ring-red-900 focus:border-red-900">
                <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent className="border-gray-200">
                <SelectItem value="fulltime">Full-time</SelectItem>
                <SelectItem value="parttime">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search Icon Button */}
          <Button
            className="w-12 h-10 bg-red-900 hover:bg-red-800 text-white rounded-md p-0 min-w-0"
            type="button"
            onClick={handleSearch}
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

"use client";

import React, { use, useEffect, useState } from "react";
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
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import qs from "query-string";

const SearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [locationOpen, setLocationOpen] = useState(false);
  const [jobTypeOpen, setJobTypeOpen] = useState(false);

  useEffect(() => {
    const search = searchParams.get("search") || "";
    const locationParam = searchParams.get("location") || "";
    const jobTypeParam = searchParams.get("jobType") || "";

    setSearchValue(search);
    setLocation(locationParam === "" ? "all" : locationParam);
    setJobType(jobTypeParam === "" ? "all" : jobTypeParam);
  }, [searchParams]);

  const handleSearch = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }

    const locationParam = location === "all" ? "" : location;
    const jobTypeParam = jobType === "all" ? "" : jobType;
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          search: searchValue,
          location: locationParam,
          jobType: jobTypeParam,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url, { scroll: false });
  };

  const handleLocationChange = (value: string) => {
    setLocation(value);
  };

  const handleJobTypeChange = (value: string) => {
    setJobType(value);
  };

  return (
    <div className="w-full bg-white px-4 py-6 border-b border-gray-200">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-4 items-center w-full">
          <div className="w-full md:w-[55%] lg:w-[60%]">
            <SearchInput onSearch={(value) => setSearchValue(value)} />
          </div>

          <div className="w-full md:w-36 lg:w-40">
            <Select
              open={locationOpen}
              onOpenChange={setLocationOpen}
              onValueChange={handleLocationChange}
              value={location}
            >
              <SelectTrigger className="w-full border-gray-200 focus:ring-red-900 focus:border-red-900 hover:border-red-900">
                <MapPin className="h-4 w-4 mr-2 text-red-900" />
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent className="border-gray-200 bg-white">
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="New South Wales">New South Wales</SelectItem>
                <SelectItem value="Victoria">Victoria</SelectItem>
                <SelectItem value="Queensland">Queensland</SelectItem>
                <SelectItem value="Western Australia">
                  Western Australia
                </SelectItem>
                <SelectItem value="South Australia">South Australia</SelectItem>
                <SelectItem value="Tasmania">Tasmania</SelectItem>
                <SelectItem value="Australian Capital Territory">
                  Australian Capital Territory
                </SelectItem>
                <SelectItem value="Northern Territory">
                  Northern Territory
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-36 lg:w-40">
            <Select
              open={jobTypeOpen}
              onOpenChange={setJobTypeOpen}
              onValueChange={handleJobTypeChange}
              value={jobType}
            >
              <SelectTrigger className="w-full border-gray-200 focus:ring-red-900 focus:border-red-900 hover:border-red-900">
                <Briefcase className="h-4 w-4 mr-2 text-red-900" />
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent className="border-gray-200 bg-white">
                <SelectItem value="all">All Job Types</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Temporary">Temporary</SelectItem>
                <SelectItem value="Volunteer">Volunteer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            className="w-12 h-10 bg-red-900 hover:bg-red-800 text-white rounded-md p-0 min-w-0"
            type="button"
            onClick={() => handleSearch()}
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

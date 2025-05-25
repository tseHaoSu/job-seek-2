"use client";

import React, { useState } from "react";
import Data1 from "./Data1";
import { Data2 } from "./Data2";
import { Data3 } from "./Data3";
import SelectionBar, { DataType } from "./SelectionBar";
import { Data4 } from "./Data4";

const DataSection = () => {
  const [selectedData, setSelectedData] = useState<DataType>("data1");

  const renderSelectedData = () => {
    switch (selectedData) {
      case "data1":
        return <Data1 />;
      case "data2":
        return <Data2 />;
      case "data3":
        return <Data3 />;
      case "data4":
        return <Data4 />;
      default:
        return <Data1 />;
    }
  };

  return (
    <>
      <div className="flex justify-center mb-12 ">
        <SelectionBar
          onSelectionChange={setSelectedData}
          selectedValue={selectedData}
        />
      </div>
      <div>{renderSelectedData()}</div>
    </>
  );
};

export default DataSection;

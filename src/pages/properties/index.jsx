import React from "react";
import Filter from "./components/Filter";
import PropertiesList from "./components/PropertiesList";

const PropertiesPage = () => {
  return (
    <div className="pt-24 pb-12 bg-[#F6F6F6] flex">
      <div
        className="w-[25vw] top-[10%] left-0 h-[200px]"
        style={{
          position: "sticky",
        }}
      >
        <Filter />
      </div>
      <div className="w-[75vw]">
        <PropertiesList />
      </div>
    </div>
  );
};

export default PropertiesPage;

import React from "react";
import Filter from "./components/Filter";
import PropertiesList from "./components/PropertiesList";

const PropertiesPage = () => {
  return (
    <div className="bg-[#F6F6F6] flex min-h-screen pt-20 pb-12">
      <div
        className="w-full max-w-[25vw] max-lg:hidden top-[5vh] left-0 h-screen"
        style={{
          position: "sticky",
        }}
      >
        <Filter />
      </div>
      <div className="w-full lg:w-[75vw] flex flex-col justify-center items-center ">
        <PropertiesList />
      </div>
    </div>
  );
};

export default PropertiesPage;

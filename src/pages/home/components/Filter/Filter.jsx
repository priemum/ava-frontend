import React, { useState } from "react";
import { Purpose } from "../../../../constants";
import { MdExpandMore } from "react-icons/md";
const HomeFilter = () => {
  const [selectedPurpose, setSelectedPurpose] = useState(0);
  return (
    <div
      className="flex justify-center items-center text-white h-[30vh] -mt-[25vh] z-30 backdrop-blur-[2px]"
      style={{
        background:
          "linear-gradient(0deg, #FFF 25%, rgba(255, 255, 255, 0.00) 99.8%)",
      }}
    >
      <div className="bg-primary/30 backdrop-blur-[21px] h-[30vh] w-3/4 rounded-md shadow-lg drop-shadow-lg flex flex-col p-10">
        <div className="flex gap-x-8 text-small px-4">
          {Purpose.map((item, index) => {
            return (
              <div
                key={index}
                className="flex items-center gap-x-1 w-20 cursor-pointer"
                onClick={() => setSelectedPurpose(index)}
              >
                <p>{item}</p>
                <MdExpandMore />
              </div>
            );
          })}
        </div>
        <div className="bg-white/50 h-1 w-full gap-x-2 self-center flex my-3">
          {Purpose.map((item, index) => {
            return (
              <div
                key={index}
                className={`w-28 h-full transition-all duration-500 ${
                  selectedPurpose == index && "bg-white scale-y-125"
                }`}
              />
            );
          })}
        </div>
        <div>filter</div>
      </div>
    </div>
  );
};

export default HomeFilter;

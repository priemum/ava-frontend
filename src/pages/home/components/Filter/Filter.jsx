import React, { useState } from "react";
import {
  API_BASE_URL,
  Purpose,
  RentFrequency,
  CompletionStatus,
} from "../../../../constants";
import { MdExpandMore } from "react-icons/md";
const HomeFilter = () => {
  const [selectedPurpose, setSelectedPurpose] = useState(0);
  return (
    <div
      className="flex justify-center items-center text-white h-[30vh] -mt-[30vh] z-30 "
      style={{
        background:
          "linear-gradient(0deg, #FFF 20%, rgba(255, 255, 255, 0.00) 99.8%)",
      }}
    >
      <div className="bg-black/30 backdrop-blur-[21px] h-[30vh] w-3/4 rounded-md shadow-lg drop-shadow-lg flex flex-col p-10">
        <div className="flex gap-x-8 text-small px-4">
          <div
            className="flex items-center gap-x-1 w-20 cursor-pointer"
            onClick={() => setSelectedPurpose(0)}
          >
            <p>Rent</p>
            <MdExpandMore />
          </div>
          <div
            className="flex items-center gap-x-1 w-16 cursor-pointer"
            onClick={() => setSelectedPurpose(1)}
          >
            <p>Buy</p>
            <MdExpandMore />
          </div>
        </div>
        <div className="bg-white/50 h-1 w-full gap-x-2 self-center flex my-3">
          <div
            className={`w-28 h-full transition-all duration-500 ${
              selectedPurpose == 0 && "bg-white scale-y-125"
            } `}
          />
          <div
            className={`w-24 h-full transition-all duration-500 ${
              selectedPurpose == 1 && "bg-white scale-y-125"
            } `}
          />{" "}
        </div>
        <div>filter</div>
      </div>
    </div>
  );
};

export default HomeFilter;

import React from "react";
import bath from "../../../../assets/icons/bath.svg";
import bedroom from "../../../../assets/icons/bedroom.svg";
import squareft from "../../../../assets/icons/squareft.svg";
import { FaCoins } from "react-icons/fa";

const PropertyCard = ({
  image,
  startingPrice,
  bathsNumber,
  bedroomNumber,
  area,
  name,
  smallDescription,
}) => {
  return (
    <div className="group w-[280px] md:w-[300px] lg:w-[250px] xl:w-[320px] 2xl:w-[360px] h-[450px]  drop-shadow-md rounded-md relative overflow-hidden">
      {/* <img
        src={image}
        className="h-[260px] md:h-[220px] lg:h-[220px] xl:h-[280px] 2xl:h-[300px] rounded-t-md w-full"
        alt=""
      /> */}
      <img
        src={image}
        className="h-full w-full rounded-t-md object-cover"
        alt=""
      />
      <div
        style={{
          background:
            "linear-gradient(147deg, rgba(111, 111, 111, 0.40) 0%, rgba(111, 111, 111, 0.05) 100%)",
        }}
        className="absolute w-full -bottom-[70px] group-hover:bottom-0 transition-all duration-300 bg-transparent backdrop-blur-[21px] text-white rounded-sm"
      >
        <div className="px-5">
          <div className="w-[190px] bg-primary text-white flex gap-x-3 px-2 py-2 items-center rounded-md -translate-y-4">
            <FaCoins size={20} />
            {startingPrice}
          </div>
          <div className="h-20 xl:h-16">
            <p className="font-semibold text-smaller">{name}</p>
            <p>{smallDescription}</p>
          </div>
          <div className="h-[1px] bg-gray-300 mt-3" />
          <div className="py-2 flex justify-between items-center font-bold text-[18px] rounded-b-md">
            <div className="flex flex-col items-center justify-center space-y-1">
              <div className="flex gap-x-1 items-center">
                <p>{bathsNumber} </p>
                <img src={bath} className="w-[24px] h-[24px]" alt="" />
              </div>
              <p className="font-normal text-[12px]">Baths</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-1">
              <div className="flex gap-x-1 items-center">
                <p>{bedroomNumber} </p>
                <img src={bedroom} className="w-[24px] h-[24px]" alt="" />
              </div>
              <p className="font-normal text-[12px]">Rooms</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-1">
              <div className="flex gap-x-1 items-center">
                <p className="text-tiny lg:text-smaller">{area} </p>
                <img src={squareft} className="w-[24px] h-[24px]" alt="" />
              </div>
              <p className="font-normal text-[12px]">Square (Ft)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;

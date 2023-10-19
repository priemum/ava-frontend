import React from "react";
import { API_BASE_URL } from "../../../../constants";
import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const AddressCard = ({ Name, Latitude, Longitude, Image, Places }) => {
  const navigate = useNavigate();
  return (
    <div className="h-[500px] w-[420px] relative rounded-md  group">
      <div className="w-full h-full overflow-hidden rounded-md">
        <img
          src={API_BASE_URL + Image}
          className="w-full h-full object-cover object-center rounded-md group-hover:scale-150 transition-all duration-[2s] ease-out"
          alt={Name}
        />
      </div>
      <div className="absolute top-0 left-0 h-full w-full bg-primary/30 rounded-md" />
      <div className="bg-white shadow-md py-1 px-3 rounded-md absolute top-3 left-3">
        {Places + " Place"}
      </div>
      <div className="absolute bottom-6 left-6 ">
        <p className="font-bold text-med text-white drop-shadow-2xl">{Name}</p>
      </div>
      <div
        onClick={() => {}}
        className="w-24 h-24 bg-primary/30 backdrop-blur-[15px] text-white absolute -right-4 -bottom-4 rounded-md flex flex-col gap-y-2 justify-center items-center cursor-pointer"
      >
        <MdArrowOutward size={24} />
        <p>See More</p>
      </div>
    </div>
  );
};

export default AddressCard;

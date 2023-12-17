import React from "react";
import { API_BASE_URL } from "../../../../constants";
import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const AddressCard = ({ Name, Latitude, Longitude, Image, Places }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="w-[300px] h-[400px] sm:h-[450px] sm:w-[350px] 2xl:h-[500px] 2xl:w-[420px] relative rounded-md  group">
      <div className="w-full h-full overflow-hidden rounded-md">
        <img
          src={API_BASE_URL + Image}
          className="w-full h-full object-cover object-center rounded-md group-hover:scale-150 transition-all duration-[2s] ease-out"
          alt={Name}
        />
      </div>
      <div className="absolute top-0 left-0 h-full w-full bg-primary/30 rounded-md" />
      <div className="bg-white shadow-md py-1 px-3 rounded-md absolute top-3 left-3">
        {Places + " " + t("Place")}
      </div>
      <div className="absolute bottom-6 left-6 ">
        <p className="font-bold text-med text-white drop-shadow-2xl">{Name}</p>
      </div>
      <div
        onClick={() => {
          navigate("properties");
        }}
        className="w-20 h-20 2xl:w-24 2xl:h-24 bg-primary/30 backdrop-blur-[15px] text-white absolute -right-3 -bottom-3 2xl:-right-4 2xl:-bottom-4 rounded-md flex flex-col gap-y-2 justify-center items-center cursor-pointer"
      >
        <MdArrowOutward size={24} />
        <p> {t("SeeMore")}</p>
      </div>
    </div>
  );
};

export default AddressCard;

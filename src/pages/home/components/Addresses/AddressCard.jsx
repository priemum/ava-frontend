import React from "react";
import { API_BASE_URL } from "../../../../constants";
import { MdArrowOutward } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetGeneralDataQuery } from "../../../../redux/generalData/generalDataSlice";
import { useGetLNGQuery } from "../../../../redux/languages/languagesSlice";
const AddressCard = ({ Name, Image, Places, Properties, id }) => {
  const navigate = useNavigate();
  const { addressId } = useParams();
  const { t } = useTranslation();
  const { data, isSuccess } = useGetLNGQuery();
  const { i18n } = useTranslation();
  const {
    data: generalData,
    isLoading: generalDataIsLoading,
    isFetching: generalDataIsFetching,
    isSuccess: generalDataIsSuccess,
    isError: generalDataIsError,
  } = useGetGeneralDataQuery();
  return (
    generalDataIsSuccess &&
    isSuccess && (
      <div className="w-[300px] h-[400px] sm:h-[450px] sm:w-[350px] relative rounded-md  group">
        <div className="w-full h-full overflow-hidden rounded-md">
          <img
            src={API_BASE_URL + Image}
            className="w-full h-full object-cover object-center rounded-md group-hover:scale-150 transition-all duration-[2s] ease-out"
            alt={Name}
          />
        </div>
        <div className="absolute top-0 left-0 h-full w-full bg-primary/30 rounded-md" />
        {Places > 0 && (
          <div className="bg-white shadow-md py-1 px-3 rounded-md absolute top-3 left-3 font-semibold">
            {Places + " " + t("Places")}
          </div>
        )}
        {Properties > 0 && (
          <div className="bg-white shadow-md py-1 px-3 rounded-md absolute top-3 left-3 font-semibold">
            {Properties + " " + t("Properties")}
          </div>
        )}
        <div className="absolute bottom-6 left-6 ">
          <p className="font-bold text-med text-white drop-shadow-2xl w-[280px] sm:w-[300px]">
            {Name}
          </p>
        </div>
        <div
          onClick={() => {
            if (Places > 0) {
              if (addressId) navigate(`/addresses/${id}`);
              else navigate(`addresses/${id}`);
            } else {
              const filterUrl = `${generalData.MinPrice}/${
                generalData.MaxPrice
              }/${generalData.MinSize}/${
                generalData.MaxSize
              }/all/all/all/all/all/all/all/${[id]}/0/100/0/100/false`;
              navigate(`/properties/${filterUrl}/false`);
            }
          }}
          className={`w-20 h-20  bg-primary/30 backdrop-blur-sm text-white absolute  ${
            data.normalData.find((x) => x.Code.toLowerCase() == i18n.language)
              .Direction == "ltr"
              ? "-right-3"
              : "-left-3"
          } -bottom-3  rounded-md flex flex-col gap-y-2 justify-center items-center cursor-pointer`}
        >
          <MdArrowOutward size={24} />
          <p className="text-[14px]"> {t("SeeMore")}</p>
        </div>
      </div>
    )
  );
};

export default AddressCard;

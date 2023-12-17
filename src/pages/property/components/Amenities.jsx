import React from "react";
import { API_BASE_URL } from "../../../constants";
import AmenityIcon from "../../../assets/icons/AmenityIcon.svg";
import { showModal } from "../../../redux/modal.slice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const Amenities = ({ data }) => {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const showAmenitiesModal = () => {
    dispatch(
      showModal({
        data: (
          <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 p-4 lg:p-8 place-items-center overflow-y-scroll mt-8">
            {data.map((item, index) => {
              return (
                <AmenitiesCard
                  key={index}
                  popUp
                  icon={item.Image.URL}
                  name={
                    item.Aminities_Translation.find(
                      (x) => x.Language.Code.toLowerCase() == i18n.language
                    ).Name
                  }
                />
              );
            })}
          </div>
        ),
      })
    );
  };
  const AmenitiesCard = ({ icon, name, count, data, popUp }) => {
    return (
      <div
        className="w-[150px] h-[150px] sm:w-[210px] sm:h-[210px] flex flex-col justify-center items-center relative rounded-xl cursor-pointer border-[1px]  border-primary"
        onClick={() => {
          showAmenitiesModal();
        }}
      >
        <div
          className={`space-y-4 z-30 text-primary font-semibold flex flex-col justify-center items-center`}
        >
          {!count ? (
            <img
              src={API_BASE_URL + icon}
              alt={name + "Amenity icon"}
              className="!w-16 !h-16"
            />
          ) : (
            <p className="text-tiny sm:text-smaller font-bold">{"+ " + data}</p>
          )}
          <p className="text-tiny sm:text-smaller">
            {!count ? name : t("FindMore")}
          </p>
        </div>

        <div
          className={`absolute w-full h-full left-0 top-0 rounded-xl z-10 ${
            popUp ? "bg-white/50" : "bg-primary/10"
          } backdrop-blur-[21px] shadow-lg drop-shadow-lg`}
        >
          {/* <div
            style={{
              backgroundImage: `url(${pattern})`,
            }}
            className="w-full h-full bg-no-repeat bg-center bg-cover rounded-xl"
          /> */}
        </div>
      </div>
    );
  };
  return (
    <div className="mt-12">
      <div className="flex items-center self-start  flex-1">
        <img src={AmenityIcon} alt="property Icon" />
        <p className="text-small md:text-med font-bold">
          {t("AdvantagesServices")}
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 max-lg:place-items-center">
        {data.map((item, index) => {
          if (index < 5)
            return (
              <AmenitiesCard
                key={index}
                icon={item.Image.URL}
                name={
                  item.Aminities_Translation.find(
                    (x) => x.Language.Code.toLowerCase() == i18n.language
                  ).Name
                }
                count={index > 3}
                data={data.length - 4}
              />
            );
        })}
      </div>
    </div>
  );
};

export default Amenities;

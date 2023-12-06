import React from "react";
import { API_BASE_URL } from "../../../constants";
import pattern from "../../../assets/images/AmenityPattern.png";
import AmenityIcon from "../../../assets/icons/AmenityIcon.svg";
import { showModal } from "../../../redux/modal.slice";
import { useDispatch } from "react-redux";

const Amenities = ({ data }) => {
  const dispatch = useDispatch();
  const showAmenitiesModal = () => {
    dispatch(
      showModal({
        data: (
          <div className="grid grid-cols-3 gap-6 p-8 place-items-center">
            {data.map((item, index) => {
              return (
                <AmenitiesCard
                  key={index}
                  popUp
                  icon={item.Image.URL}
                  name={
                    item.Aminities_Translation.find(
                      (x) => x.Language.Code == "En"
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
        className="w-[225px] h-[225px] flex flex-col justify-center items-center relative rounded-xl cursor-pointer"
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
            <p className="text-smaller font-bold">{"+ " + data}</p>
          )}
          <p className="text-smaller">{!count ? name : "Find More"}</p>
        </div>

        <div
          className={`absolute w-full h-full left-0 top-0 rounded-xl z-10 ${
            popUp ? "bg-white/50" : "bg-primary/30"
          } backdrop-blur-[21px] shadow-lg drop-shadow-lg`}
        >
          <div
            style={{
              backgroundImage: `url(${pattern})`,
            }}
            className="w-full h-full bg-no-repeat bg-center bg-cover rounded-xl"
          />
        </div>
      </div>
    );
  };
  return (
    <div className="mt-12">
      <div className="flex items-center self-start flex-1">
        <img src={AmenityIcon} alt="property Icon" />
        <p className="text-med font-bold">Advantages and services</p>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {data.map((item, index) => {
          return (
            <AmenitiesCard
              key={index}
              icon={item.Image.URL}
              name={
                item.Aminities_Translation.find((x) => x.Language.Code == "En")
                  .Name
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

import React, { useState } from "react";
import { Purpose } from "../../../../constants";
import { MdExpandMore, MdLocationOn } from "react-icons/md";
// import {useGetActiveCategoryQuery} from "../../../../redux/categories/categoriesSlice"
// import {useGetActiveCategoryQuery} from "../../../../redux/"
import Button from "../../../../components/UI/Button";
const CustomInput = ({
  icon,
  placeholder,
  type,
  name,
  id,
  value,
  onChange,
}) => {
  return (
    <div className="px-4 py-2 flex bg-white rounded-md items-center text-primary">
      {icon}
      <input
        type={type}
        className="bg-transparent py-1 px-2 w-full outline-none placeholder:text-primary"
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        id={id}
        value={value}
      />
    </div>
  );
};

const SelectInput = ({
  selectID,
  firstOption,
  options,
  data,
  onChange,
  value,
}) => {
  return (
    <select
      value={value}
      onChange={onChange}
      id={selectID}
      className="px-4 py-3 flex bg-white rounded-md items-center text-primary outline-none"
    >
      <option className="py-1 px-2" value={""}>
        {firstOption}
      </option>
      {data
        ? data.ids.map((item, index) => {
            return (
              <option
                key={index}
                value={data.entities[item].id}
                // selected={value == data.entities[item].id}
                className="py-1 px-2"
              >
                {data.entities[item].nameEn}
              </option>
            );
          })
        : options}
    </select>
  );
};
const HomeFilter = () => {
  const [selectedPurpose, setSelectedPurpose] = useState(0);
  return (
    <div className="h-[20vh] -mt-64">
      <div
        className="flex justify-center items-center text-white z-30 backdrop-blur-[2px] absolute w-screen left-0"
        style={{
          background: "linear-gradient(0deg, #FFF 5%, transparent 90%)",
        }}
      >
        <div className="bg-primary/30 backdrop-blur-[21px]  w-3/4 rounded-md shadow-lg drop-shadow-lg flex flex-col p-10 max-w-[1920px]">
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            <CustomInput
              placeholder={"Enter Location"}
              icon={<MdLocationOn className="text-small" />}
              id={""}
              value={""}
              onChange={() => {}}
              type="text"
              name={""}
            />
            <SelectInput firstOption={"Choose Category"} />
            <SelectInput firstOption={"Beds & Baths"} />
            <SelectInput firstOption={"Area"} />
            <SelectInput firstOption={"Price"} />
            <button className=" w-full bg-buttonGrad rounded-md text-primary font-bold text-smaller tracking-wider">
              Find
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeFilter;

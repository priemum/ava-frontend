import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import MultiRangeSlider from "../../../components/Forms/MultiRangeSlider";
import { useGetActiveCategoryQuery } from "../../../redux/categories/categoriesSlice";
import { useNavigate } from "react-router-dom";
import { Purpose, RentFrequency, CompletionStatus } from "../../../constants";
const Filter = () => {
  const rooms = [0, 1, 2, 3, 4, 5, 6];
  const [searchTerm, setSearchTerm] = useState("");
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [parentType, setParentType] = useState(0);
  const [category, setCategory] = useState();
  const [type, setType] = useState(0);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const {
    data: categories,
    isLoading: categoriesIsLoading,
    isFetching: categoriesIsFetching,
    isSuccess: categoriesIsSuccess,
  } = useGetActiveCategoryQuery();
  return (
    <div className="m-8 rounded-lg shadow-md bg-white">
      <div className="flex flex-col space-y-2 p-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t("Search")}
          className="bg-[#F6F6F6] w-full rounded-md p-2 shadow-sm"
        />
        <button className="w-full p-2 rounded-md shadow-sm bg-secondary font-semibold">
          {t("Search")}
        </button>
      </div>
      <div className="h-px w-full bg-primary/20" />
      <div className="flex flex-col p-8 space-y-2">
        <p className="font-semibold text-smaller">{t("Price")}:</p>
        <MultiRangeSlider max={1000000} min={20000} />
        <p className="font-semibold text-smaller pt-8">{t("Size")}:</p>
        <MultiRangeSlider max={2000} min={100} />
      </div>
      <div className="h-px w-full bg-primary/20 mt-8" />
      <div className="flex flex-col p-8 space-y-2">
        <p className="font-semibold text-smaller">{t("Bedrooms")}:</p>
        <div className="grid grid-cols-5 gap-4">
          {rooms.map((item, index) => {
            return (
              <div
                key={index}
                className={`h-10 w-10 border-[1px] border-secondary ${
                  item == bedrooms
                    ? "text-primary bg-secondary"
                    : "text-secondary bg-transparent"
                } flex justify-center items-center text-smaller p-3 rounded-md cursor-pointer font-bold transition-all duration-300`}
                onClick={() => setBedrooms(item)}
              >
                {item == 0 ? "All" : item == 6 ? item + "+" : item}
              </div>
            );
          })}
        </div>
      </div>
      <div className="h-px w-full bg-primary/20" />
      <div className="flex flex-col p-8 space-y-2">
        {categoriesIsFetching || categoriesIsLoading ? (
          <div className="text-center text-smaller font-bold">
            {t("Loading")}
          </div>
        ) : (
          categoriesIsSuccess && (
            <div>
              <div className="flex justify-center items-center border-[1px] rounded-md p-1 gap-x-2 bg-[#F6F6F6]">
                {categories.ids.map((item, index) => {
                  if (categories.entities[item].ParentID == null)
                    return (
                      <React.Fragment key={index}>
                        <div
                          className={`py-4 rounded-md text-tiny w-full flex justify-center items-center cursor-pointer transition-all duration-300 ${
                            parentType == item
                              ? "bg-secondary text-primary"
                              : "bg-transparent text-primary"
                          }`}
                          onClick={() => setParentType(item)}
                        >
                          {
                            categories.entities[item].Category_Translation.find(
                              (x) =>
                                x.Language.Code.toLowerCase() == i18n.language
                            ).Name
                          }
                        </div>
                        <div className="h-10 w-1 bg-white/50" />
                      </React.Fragment>
                    );
                })}
              </div>

              <div className="pt-4 grid grid-cols-2 place-items-center gap-4">
                {categories.ids.map((item, index) => {
                  if (categories.entities[item].ParentID == parentType)
                    return (
                      <div
                        key={index}
                        className={`h-10 w-32 border-[1px] border-secondary ${
                          type == item
                            ? "text-primary bg-secondary"
                            : "text-secondary bg-transparent"
                        } flex justify-center items-center text-smaller p-3 rounded-md cursor-pointer transition-all duration-300`}
                        onClick={() => setType(item)}
                      >
                        {
                          categories.entities[item].Category_Translation.find(
                            (x) =>
                              x.Language.Code.toLowerCase() == i18n.language
                          ).Name
                        }
                      </div>
                    );
                })}
              </div>
            </div>
          )
        )}
      </div>
      <div className="h-px w-full bg-primary/20" />
      <div className="flex flex-col p-8 space-y-2">
        <p className="font-semibold text-smaller">{t("Bathrooms")}:</p>
        <div className="grid grid-cols-5 gap-4">
          {rooms.map((item, index) => {
            return (
              <div
                key={index}
                className={`h-10 w-10 border-[1px] border-secondary ${
                  item == bathrooms
                    ? "text-primary bg-secondary"
                    : "text-secondary bg-transparent"
                } flex justify-center items-center text-smaller p-3 rounded-md cursor-pointer font-bold transition-all duration-300`}
                onClick={() => setBathrooms(item)}
              >
                {item == 0 ? "All" : item == 6 ? item + "+" : item}
              </div>
            );
          })}
        </div>
      </div>
      {/* <div className="h-px w-full bg-primary/20" />
      <div className="flex flex-col p-8 pb-16 space-y-2">
        <p className="font-semibold text-smaller">{t("Size")}:</p>
        <MultiRangeSlider max={2000} min={100} />
      </div> */}
    </div>
  );
};

export default Filter;

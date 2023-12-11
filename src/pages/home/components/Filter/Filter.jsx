import React, { useState, useEffect } from "react";
import {
  Purpose,
  RentFrequency,
  CompletionStatus,
} from "../../../../constants";
import { MdExpandMore } from "react-icons/md";
import CustomInput from "../../../../components/Forms/CustomInput";
import { useGetActiveCategoryQuery } from "../../../../redux/categories/categoriesSlice";
import MultiRangeSlider from "../../../../components/Forms/MultiRangeSlider";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { numberWithComma } from "../../../../helpers/numberComma";
import { useSelector } from "react-redux";
import {
  selectCurrentCurrency,
  selectCurrentUnit,
} from "../../../../redux/websiteSettings.slice";
const defaultFormState = {
  Addresses: [],
  CategoryID: "",
  purpose: "Rent",
  rentFrequency: "",
  completionStatus: "",
  Bedrooms: [],
  Bathrooms: [],
  PriceMin: 20000,
  PriceMax: 1000000,
  AreaMin: 100,
  AreaMax: 2000,
};
const HomeFilter = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const currentCurrency = useSelector(selectCurrentCurrency);
  const currentUnit = useSelector(selectCurrentUnit);
  const [parentType, setParentType] = useState();
  const [priceMin, setPriceMin] = useState(20000);
  const [areaMin, setAreaMin] = useState(100);
  const [priceMax, setPriceMax] = useState(1000000);
  const [areaMax, setAreaMax] = useState(2000);
  const rooms = [1, 2, 3, 4, 5, 6];
  const [form, setForm] = useState(defaultFormState);
  const {
    data: categories,
    isLoading: categoriesIsLoading,
    isFetching: categoriesIsFetching,
    isSuccess: categoriesIsSuccess,
  } = useGetActiveCategoryQuery();
  useEffect(() => {
    if (categoriesIsSuccess && categories.count !== 0) {
      setParentType(categories.parentCategories[0].id);
    }
  }, [categoriesIsSuccess]);
  const [rent_buy, setRent_buy] = useState(RentFrequency);
  useEffect(() => {
    if (form.purpose == "Rent") {
      setRent_buy(RentFrequency);
    } else if (form.purpose == "Buy") {
      setRent_buy(CompletionStatus);
    }
  }, [form.purpose]);
  return (
    <div className="h-[600px] sm:h-[400px] xl:h-[300px] -mt-[295px] w-full relative">
      <div
        className="flex justify-center items-center text-white z-30 backdrop-blur-[3px] absolute w-screen left-0 h-full"
        style={{
          background: "linear-gradient(0deg, #FFF 25%, transparent 100%)",
        }}
      >
        <div className="bg-primary/40 w-[90%] md:w-[85%] lg:w-3/4 rounded-md shadow-lg drop-shadow-lg flex flex-col p-10 max-w-[1920px] h-full">
          <CustomInput
            keepOnSelect
            containerStyle={"!w-[300px]"}
            readOnly
            value={
              form.purpose +
              `${
                form.rentFrequency.length !== 0 ||
                form.completionStatus.length !== 0
                  ? " / "
                  : ""
              }` +
              (form.purpose == "Rent"
                ? form.rentFrequency
                : form.completionStatus)
            }
            select
            otherOptions={
              <div className="flex flex-col space-y-2">
                <React.Fragment>
                  <div className="flex justify-center items-center border-[1px] rounded-md p-1 gap-x-2 backdrop-blur-[21px]">
                    {Purpose.map((item, index) => {
                      return (
                        <React.Fragment key={index}>
                          <div
                            className={`py-4 rounded-md text-tiny w-full flex justify-center items-center cursor-pointer transition-all duration-300 ${
                              form.purpose == item
                                ? "bg-secondary text-primary"
                                : "bg-transparent text-white"
                            }`}
                            onClick={() =>
                              setForm({
                                ...form,
                                purpose: item,
                                rentFrequency: "",
                                completionStatus: "",
                              })
                            }
                          >
                            {item}
                          </div>
                          {index !== Purpose.length - 1 && (
                            <div className="h-10 w-1 bg-white/50" />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                  <div className="grid grid-cols-2 place-items-center gap-4">
                    {rent_buy.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className={`h-10 w-32 border-[1px] border-secondary ${
                            form.rentFrequency == item ||
                            form.completionStatus == item
                              ? "text-primary bg-secondary"
                              : "text-secondary bg-transparent"
                          } flex justify-center items-center text-smaller p-3 rounded-md cursor-pointer transition-all duration-300`}
                          onClick={() => {
                            if (form.purpose == "Rent") {
                              setForm({ ...form, rentFrequency: item });
                            } else if (form.purpose == "Buy") {
                              setForm({ ...form, completionStatus: item });
                            }
                          }}
                        >
                          {item}
                        </div>
                      );
                    })}
                  </div>
                </React.Fragment>
              </div>
            }
            noInput
            icon={<MdExpandMore size={24} />}
            reverseIcon
          />
          <div className="bg-white/80 h-1 w-full gap-x-2 self-center flex my-3" />
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
            <CustomInput
              keepOnSelect
              readOnly
              customStyle={"!text-primary font-semibold"}
              value={
                categoriesIsLoading || categoriesIsFetching
                  ? t("Loading")
                  : categoriesIsSuccess && categories.count !== 0
                  ? t("Category") +
                    ": " +
                    categories.entities[parentType]?.Category_Translation.find(
                      (x) => x.Language.Code.toLowerCase() == i18n.language
                    ).Name +
                    `${form.CategoryID.length !== 0 ? " / " : ""}` +
                    (categories.entities[
                      form.CategoryID
                    ]?.Category_Translation.find(
                      (x) => x.Language.Code.toLowerCase() == i18n.language
                    ).Name ?? "")
                  : "No categories yet"
              }
              select
              otherOptions={
                <div className="flex flex-col space-y-2">
                  {categoriesIsFetching || categoriesIsLoading ? (
                    <div className="text-center text-smaller font-bold">
                      {t("Loading")}
                    </div>
                  ) : categoriesIsSuccess && categories.count !== 0 ? (
                    <React.Fragment>
                      <div className="flex justify-center items-center border-[1px] rounded-md p-1 gap-x-2 backdrop-blur-[21px]">
                        {categories.ids.map((item, index) => {
                          if (categories.entities[item].ParentID == null)
                            return (
                              <React.Fragment key={index}>
                                <div
                                  className={`py-4 rounded-md text-tiny w-full flex justify-center items-center cursor-pointer transition-all duration-300 ${
                                    parentType == item
                                      ? "bg-secondary text-primary"
                                      : "bg-transparent text-white"
                                  }`}
                                  onClick={() => {
                                    setParentType(item);
                                    setForm({ ...form, CategoryID: "" });
                                  }}
                                >
                                  {
                                    categories.entities[
                                      item
                                    ].Category_Translation.find(
                                      (x) =>
                                        x.Language.Code.toLowerCase() ==
                                        i18n.language
                                    ).Name
                                  }
                                </div>
                                {index !==
                                  categories.parentCategories.length - 1 && (
                                  <div className="h-10 w-1 bg-white/50" />
                                )}
                              </React.Fragment>
                            );
                        })}
                      </div>

                      <div className="grid grid-cols-2 place-items-center gap-4">
                        {categories.ids.map((item, index) => {
                          if (categories.entities[item].ParentID == parentType)
                            return (
                              <div
                                key={index}
                                className={`h-10 w-full border-[1px] border-secondary ${
                                  form.CategoryID == item
                                    ? "text-primary bg-secondary"
                                    : "text-secondary bg-transparent"
                                } flex justify-center items-center text-smaller p-3 rounded-md cursor-pointer transition-all duration-300`}
                                onClick={() =>
                                  setForm({ ...form, CategoryID: item })
                                }
                              >
                                {
                                  categories.entities[
                                    item
                                  ].Category_Translation.find(
                                    (x) =>
                                      x.Language.Code.toLowerCase() ==
                                      i18n.language
                                  ).Name
                                }
                              </div>
                            );
                        })}
                      </div>
                    </React.Fragment>
                  ) : (
                    "No Categories Yet"
                  )}
                </div>
              }
              icon={<MdExpandMore size={24} />}
              reverseIcon
            />
            <CustomInput
              keepOnSelect
              readOnly
              customStyle={"!text-primary font-semibold"}
              value={
                t("Bedrooms") +
                ": " +
                (form.Bedrooms.length !== 0
                  ? form.Bedrooms.map((item) => {
                      return item;
                    })
                  : t("All"))
              }
              select
              otherOptions={
                <div className="flex flex-col space-y-2">
                  <p className="font-semibold text-smaller">{t("Bedrooms")}:</p>
                  <div className="grid grid-cols-4 xl:grid-cols-5 gap-4">
                    <div
                      className={`h-10 w-10 border-[1px] border-secondary ${
                        form.Bedrooms.length == 0
                          ? "text-primary bg-secondary"
                          : "text-secondary bg-transparent"
                      } flex justify-center items-center text-smaller p-3 rounded-md cursor-pointer font-bold transition-all duration-300`}
                      onClick={() => {
                        setForm({ ...form, Bedrooms: [] });
                      }}
                    >
                      {t("All")}
                    </div>
                    {rooms.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className={`h-10 w-10 border-[1px] border-secondary ${
                            form.Bedrooms.includes(item)
                              ? "text-primary bg-secondary"
                              : "text-secondary bg-transparent"
                          } flex justify-center items-center text-smaller p-3 rounded-md cursor-pointer font-bold transition-all duration-300`}
                          onClick={() => {
                            let brooms = form.Bedrooms;
                            if (form.Bedrooms.includes(item)) {
                              brooms = brooms.filter((x) => x !== item);
                            } else {
                              brooms = [...brooms, item];
                            }
                            setForm({ ...form, Bedrooms: brooms });
                          }}
                        >
                          {item == 0 ? "All" : item == 6 ? item + "+" : item}
                        </div>
                      );
                    })}
                  </div>
                </div>
              }
              icon={<MdExpandMore size={24} />}
              reverseIcon
            />
            <CustomInput
              keepOnSelect
              readOnly
              customStyle={"!text-primary font-semibold"}
              value={
                t("Bathrooms") +
                ": " +
                (form.Bathrooms.length !== 0
                  ? form.Bathrooms.map((item, index) => {
                      return item;
                    })
                  : t("All"))
              }
              select
              otherOptions={
                <div className="flex flex-col space-y-2">
                  <p className="font-semibold text-smaller">
                    {t("Bathrooms")}:
                  </p>
                  <div className="grid grid-cols-4 xl:grid-cols-5 gap-4">
                    <div
                      className={`h-10 w-10 border-[1px] border-secondary ${
                        form.Bathrooms.length == 0
                          ? "text-primary bg-secondary"
                          : "text-secondary bg-transparent"
                      } flex justify-center items-center text-smaller p-3 rounded-md cursor-pointer font-bold transition-all duration-300`}
                      onClick={() => {
                        setForm({ ...form, Bathrooms: [] });
                      }}
                    >
                      {t("All")}
                    </div>
                    {rooms.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className={`h-10 w-10 border-[1px] border-secondary ${
                            form.Bathrooms.includes(item)
                              ? "text-primary bg-secondary"
                              : "text-secondary bg-transparent"
                          } flex justify-center items-center text-smaller p-3 rounded-md cursor-pointer font-bold transition-all duration-300`}
                          onClick={() => {
                            let brooms = form.Bathrooms;
                            if (form.Bathrooms.includes(item)) {
                              brooms = brooms.filter((x) => x !== item);
                            } else {
                              brooms = [...brooms, item];
                            }
                            setForm({ ...form, Bathrooms: brooms });
                          }}
                        >
                          {item == 0 ? "All" : item == 6 ? item + "+" : item}
                        </div>
                      );
                    })}
                  </div>
                </div>
              }
              icon={<MdExpandMore size={24} />}
              reverseIcon
            />
            <CustomInput
              keepOnSelect
              readOnly
              customStyle={"!text-primary font-semibold"}
              placeholder={t("BathroomsNumber")}
              value={
                t("Price") +
                ": " +
                numberWithComma(priceMin * currentCurrency.conversionRate) +
                " - " +
                numberWithComma(priceMax * currentCurrency.conversionRate)
              }
              select
              otherOptions={
                <div className="flex flex-col space-y-2 p-2 pb-12">
                  <p className="font-semibold text-smaller">{t("Price")}:</p>
                  <MultiRangeSlider
                    textColor={"text-white"}
                    max={1000000}
                    min={20000}
                    maxVal={priceMax}
                    minVal={priceMin}
                    setMaxVal={setPriceMax}
                    setMinVal={setPriceMin}
                    price
                  />
                </div>
              }
              icon={<MdExpandMore size={24} />}
              reverseIcon
            />
            <CustomInput
              keepOnSelect
              readOnly
              customStyle={"!text-primary font-semibold"}
              placeholder={t("Size")}
              value={
                t("Size") +
                ": " +
                numberWithComma(areaMin * currentUnit.conversionRate) +
                " - " +
                numberWithComma(areaMax * currentUnit.conversionRate)
              }
              select
              otherOptions={
                <div className="flex flex-col space-y-2 p-2 pb-12">
                  <p className="font-semibold text-smaller">{t("Size")}:</p>
                  <MultiRangeSlider
                    textColor={"text-white"}
                    max={2000}
                    min={100}
                    maxVal={areaMax}
                    minVal={areaMin}
                    setMaxVal={setAreaMax}
                    setMinVal={setAreaMin}
                    unit
                  />
                </div>
              }
              icon={<MdExpandMore size={24} />}
              reverseIcon
            />
            <button
              onClick={() => {
                setForm({
                  ...form,
                  PriceMax: priceMax,
                  PriceMin: priceMin,
                  AreaMin: areaMin,
                  AreaMax: areaMax,
                });
                const filterUrl = `${priceMin}/${priceMax}/${areaMin}/${areaMax}/${
                  form.purpose
                }/${
                  form.rentFrequency.length == 0 ? "all" : form.rentFrequency
                }/${
                  form.completionStatus.length == 0
                    ? "all"
                    : form.completionStatus
                }/${
                  form.Bedrooms.length == 0 ? "all" : form.Bedrooms
                }/${parentType}/${
                  form.CategoryID.length == 0 ? "all" : form.CategoryID
                }/${form.Bathrooms.length == 0 ? "all" : form.Bathrooms}/${
                  form.Addresses.length == 0 ? "all" : form.Addresses
                }`;
                sessionStorage.setItem("filter", filterUrl);
                navigate(`/properties/${filterUrl}`);
              }}
              className=" w-full max-sm:py-2 bg-buttonGrad rounded-md text-primary font-bold text-smaller tracking-wider"
            >
              {t("Find")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeFilter;

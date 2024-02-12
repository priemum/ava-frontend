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
import { useGetGeneralDataQuery } from "../../../../redux/generalData/generalDataSlice";
import { useGetActiveAddressQuery } from "../../../../redux/addresses/addressesSlice";
const defaultFormState = {
  Addresses: "",
  CategoryID: "",
  purpose: "all",
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
  const [priceMin, setPriceMin] = useState();
  const [areaMin, setAreaMin] = useState();
  const [priceMax, setPriceMax] = useState();
  const [areaMax, setAreaMax] = useState();
  const [addressSearchTerm, setAddressSearchTerm] = useState("");

  const rooms = [1, 2, 3, 4, 5, 6];
  const [form, setForm] = useState(defaultFormState);
  const {
    data: categories,
    isLoading: categoriesIsLoading,
    isFetching: categoriesIsFetching,
    isSuccess: categoriesIsSuccess,
  } = useGetActiveCategoryQuery();
  const {
    data: generalData,
    isLoading: generalDataIsLoading,
    isFetching: generalDataIsFetching,
    isSuccess: generalDataIsSuccess,
    isError: generalDataIsError,
  } = useGetGeneralDataQuery();
  const {
    data: addresses,
    isLoading: addressesIsLoading,
    isFetching: addressesIsFetching,
    isSuccess: addressesIsSuccess,
  } = useGetActiveAddressQuery();
  useEffect(() => {
    if (categoriesIsSuccess && categories.count !== 0) {
      setParentType("all");
    }
  }, [categoriesIsSuccess]);
  const [rent_buy, setRent_buy] = useState(RentFrequency);
  useEffect(() => {
    if (form.purpose == "Rent") {
      setRent_buy(RentFrequency);
    } else if (form.purpose == "Buy") {
      setRent_buy(CompletionStatus);
    } else {
      setRent_buy([]);
    }
  }, [form.purpose]);
  useEffect(() => {
    if (generalDataIsSuccess) {
      setAreaMin(generalData.MinSize);
      setAreaMax(generalData.MaxSize);
      setPriceMin(generalData.MinPrice);
      setPriceMax(generalData.MaxPrice);
    }
  }, [generalDataIsSuccess]);
  return (
    <div className="h-[600px] sm:h-[270px] xl:h-[210px] -mt-[200px] sm:-mt-[200px] xl:-mt-[208px] w-full relative ">
      <div className="flex justify-center items-center text-white z-30  absolute w-screen max-w-[1920px] left-0 bottom-0 h-full bg-gradient-to-t from-[#fff] to-transparent">
        <div className="bg-primary/40 backdrop-blur-sm w-[95%] md:w-[85%] xl:w-3/4 rounded-md shadow-lg drop-shadow-lg flex flex-col p-4 max-w-[1920px] h-full">
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            <div className="flex items-center justify-between max-sm:flex-col col-span-full">
              <CustomInput
                keepOnSelect
                containerStyle={"!w-[300px] "}
                customStyle={"capitalize"}
                readOnly
                value={
                  form.purpose == "all"
                    ? t("Purpose") + ":  " + t("all")
                    : t("Purpose") +
                      ":  " +
                      Purpose.find((x) => x.value == form.purpose)?.lng[
                        i18n.language
                      ] +
                      `${
                        form.rentFrequency.length !== 0 ||
                        form.completionStatus.length !== 0
                          ? " / "
                          : ""
                      }` +
                      (form.purpose == "Rent"
                        ? RentFrequency.find(
                            (x) => x.value == form.rentFrequency
                          )?.lng[i18n.language] ?? ""
                        : CompletionStatus.find(
                            (x) => x.value == form.completionStatus
                          )?.lng[i18n.language] ?? "")
                }
                select
                otherOptions={
                  <div className="flex flex-col space-y-2">
                    <React.Fragment>
                      <div className="flex justify-center items-center border-[1px] rounded-md p-1 gap-x-2 backdrop-blur-sm">
                        <div
                          className={`py-4 rounded-md text-tiny w-full flex justify-center items-center cursor-pointer transition-all duration-300 capitalize ${
                            form.purpose == "all"
                              ? "bg-secondary text-primary"
                              : "bg-transparent text-white"
                          }`}
                          onClick={() =>
                            setForm({
                              ...form,
                              purpose: "all",
                              rentFrequency: "",
                              completionStatus: "",
                            })
                          }
                        >
                          {t("all")}
                        </div>
                        <div className="h-10 w-1 bg-white/50" />
                        {Purpose.map((item, index) => {
                          return (
                            <React.Fragment key={index}>
                              <div
                                className={`py-4 rounded-md text-tiny w-full flex justify-center items-center cursor-pointer transition-all duration-300 ${
                                  form.purpose == item.value
                                    ? "bg-secondary text-primary"
                                    : "bg-transparent text-white"
                                }`}
                                onClick={() =>
                                  setForm({
                                    ...form,
                                    purpose: item.value,
                                    rentFrequency: "",
                                    completionStatus: "",
                                  })
                                }
                              >
                                {item?.lng[i18n.language]}
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
                                form.rentFrequency == item.value ||
                                form.completionStatus == item.value
                                  ? "text-primary bg-secondary"
                                  : "text-secondary bg-transparent"
                              } flex justify-center items-center text-smaller p-3 rounded-md cursor-pointer transition-all duration-300`}
                              onClick={() => {
                                if (form.purpose == "Rent") {
                                  setForm({
                                    ...form,
                                    rentFrequency: item.value,
                                  });
                                } else if (form.purpose == "Buy") {
                                  setForm({
                                    ...form,
                                    completionStatus: item.value,
                                  });
                                }
                              }}
                            >
                              {item?.lng[i18n.language]}
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
                  }/0/100/0/100/false/false`;
                  navigate(`/properties/${filterUrl}`);
                }}
                className=" w-[270px] h-[50px] max-sm:py-2 bg-buttonGrad rounded-md text-primary font-bold text-smaller tracking-wider max-sm:hidden"
              >
                {t("Find")}
              </button>
            </div>
            <CustomInput
              keepOnSelect
              readOnly
              customStyle={"!text-white font-semibold capitalize"}
              value={
                categoriesIsLoading || categoriesIsFetching
                  ? t("Loading")
                  : categoriesIsSuccess && categories.count !== 0
                  ? parentType == "all"
                    ? t("Category") + ": " + t("all")
                    : t("Category") +
                      ": " +
                      categories.entities[
                        parentType
                      ]?.Category_Translation.find(
                        (x) => x.Language.Code.toLowerCase() == i18n.language
                      ).Name +
                      `${form.CategoryID.length !== 0 ? " / " : ""}` +
                      (categories.entities[
                        form.CategoryID
                      ]?.Category_Translation.find(
                        (x) => x.Language.Code.toLowerCase() == i18n.language
                      ).Name ?? "")
                  : t("NoCategories")
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
                      <div className="flex justify-center items-center border-[1px] rounded-md p-1 gap-x-2 backdrop-blur-sm">
                        <div
                          className={`py-4 rounded-md text-tiny w-full flex justify-center items-center cursor-pointer transition-all duration-300 capitalize ${
                            parentType == "all"
                              ? "bg-secondary text-primary"
                              : "bg-transparent text-white"
                          }`}
                          onClick={() => {
                            setParentType("all");
                            setForm({ ...form, CategoryID: "" });
                          }}
                        >
                          {t("all")}
                        </div>
                        <div className="h-10 w-1 bg-white/50" />

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
                    t("NoCategories")
                  )}
                </div>
              }
              icon={<MdExpandMore size={24} />}
              reverseIcon
            />
            <CustomInput
              keepOnSelect
              readOnly
              customStyle={"!text-white font-semibold capitalize"}
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
                          {item == 0 ? t("All") : item == 6 ? item + "+" : item}
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
              customStyle={"!text-white font-semibold capitalize"}
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
                          {item == 0 ? t("All") : item == 6 ? item + "+" : item}
                        </div>
                      );
                    })}
                  </div>
                </div>
              }
              icon={<MdExpandMore size={24} />}
              reverseIcon
            />
            {generalDataIsSuccess &&
              !generalDataIsLoading &&
              !generalDataIsFetching && (
                <CustomInput
                  keepOnSelect
                  readOnly
                  customStyle={"!text-white font-semibold capitalize"}
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
                      <p className="font-semibold text-smaller">
                        {t("Price")}:
                      </p>
                      <MultiRangeSlider
                        textColor={"text-white"}
                        max={generalData.MaxPrice}
                        min={generalData.MinPrice}
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
              )}
            {generalDataIsSuccess &&
              !generalDataIsLoading &&
              !generalDataIsFetching && (
                <CustomInput
                  keepOnSelect
                  readOnly
                  customStyle={"!text-white font-semibold capitalize"}
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
                        max={generalData.MaxSize}
                        min={generalData.MinSize}
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
              )}
            {addressesIsSuccess && (
              <CustomInput
                readOnly
                state={form}
                customStyle={"!text-white placeholder:text-white font-semibold"}
                placeholder={t("SelectAddress")}
                icon={<MdExpandMore size={24} />}
                value={
                  form.Addresses.length !== 0
                    ? t("Location") +
                      ": " +
                      addresses.entities[
                        form.Addresses
                      ]?.Address_Translation.find(
                        (x) => x.Language.Code.toLowerCase() == i18n.language
                      ).Name
                    : ""
                }
                otherOptions={
                  <div>
                    <input
                      type="text"
                      placeholder={t("AddressSearch")}
                      className="bg-transparent text-white w-full border-2 border-white rounded-md py-1 px-2 placeholder:text-white outline-none"
                      value={addressSearchTerm}
                      onChange={(e) => setAddressSearchTerm(e.target.value)}
                    />
                    {addresses.ids.map((item, index) => {
                      if (addresses.entities[item]._count.Property !== 0)
                        if (
                          addresses?.entities[item]?.Address_Translation.find(
                            (x) => x.Language.Code == "En"
                          )
                            ?.Name.toLowerCase()
                            .includes(addressSearchTerm.toLowerCase()) ||
                          addresses?.entities[item]?.Address_Translation.find(
                            (x) => x.Language.Code == "Ar"
                          )
                            ?.Name.toLowerCase()
                            .includes(addressSearchTerm.toLowerCase())
                        )
                          return (
                            <p
                              key={index}
                              onClick={() => {
                                setForm({ ...form, Addresses: item });
                              }}
                              className="text-tiny hover:bg-secondary/50 rounded-md p-2 transition-all duration-300"
                            >
                              {
                                addresses.entities[
                                  item
                                ].Address_Translation.find(
                                  (x) =>
                                    x.Language.Code.toLowerCase() ==
                                    i18n.language
                                ).Name
                              }
                            </p>
                          );
                    })}
                  </div>
                }
                select
                reverseIcon
              />
            )}
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
                }/0/100/0/100/false/false`;
                navigate(`/properties/${filterUrl}`);
              }}
              className="w-full max-sm:py-2 bg-buttonGrad rounded-md text-primary font-bold text-smaller tracking-wider sm:hidden"
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

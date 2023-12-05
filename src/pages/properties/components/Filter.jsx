import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import MultiRangeSlider from "../../../components/Forms/MultiRangeSlider";
import { useGetActiveCategoryQuery } from "../../../redux/categories/categoriesSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Purpose, RentFrequency, CompletionStatus } from "../../../constants";
import { MdSearch } from "react-icons/md";
import CustomInput from "../../../components/Forms/CustomInput";

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
const Filter = () => {
  const {
    search,
    PriceMin,
    PriceMax,
    AreaMin,
    AreaMax,
    purpose,
    rentFrequency,
    completionStatus,
    Bedrooms,
    parentCategory,
    CategoryID,
    Bathrooms,
    Addresses,
  } = useParams();
  const location = useLocation();
  const rooms = [1, 2, 3, 4, 5, 6];
  const [searchTerm, setSearchTerm] = useState(search ?? "");
  const [priceMin, setPriceMin] = useState(PriceMin ?? 20000);
  const [areaMin, setAreaMin] = useState(AreaMin ?? 100);
  const [priceMax, setPriceMax] = useState(PriceMax ?? 1000000);
  const [areaMax, setAreaMax] = useState(AreaMax ?? 2000);
  const [parentType, setParentType] = useState();
  const [form, setForm] = useState({
    Addresses:
      Addresses == "all" || Array.isArray(Addresses) == false ? [] : Addresses,
    CategoryID:
      CategoryID == "all" || typeof CategoryID !== String ? "" : CategoryID,
    purpose: purpose == "all" || typeof purpose !== String ? "Rent" : purpose,
    rentFrequency:
      rentFrequency == "all" || typeof rentFrequency !== String
        ? ""
        : rentFrequency,
    completionStatus:
      completionStatus == "all" || typeof completionStatus !== String
        ? ""
        : completionStatus,
    Bedrooms:
      Bedrooms == "all" || Array.isArray(Bedrooms) == false
        ? []
        : Bedrooms.split(",").map(function (x) {
            return parseInt(x, 10);
          }),
    Bathrooms:
      Bathrooms == "all" || Array.isArray(Bathrooms) == false
        ? []
        : Bathrooms.split(",").map(function (x) {
            return parseInt(x, 10);
          }),
    PriceMin: priceMin,
    PriceMax: priceMax,
    AreaMin: areaMin,
    AreaMax: areaMax,
  });

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const {
    data: categories,
    isLoading: categoriesIsLoading,
    isFetching: categoriesIsFetching,
    isSuccess: categoriesIsSuccess,
  } = useGetActiveCategoryQuery();
  useEffect(() => {
    console.log(form);
    if (categoriesIsSuccess) {
      if (parentCategory) {
        setParentType(parentCategory);
      } else {
        setParentType(categories.parentCategories[0].id);
      }
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
    <div className="m-8 rounded-lg shadow-md bg-white h-[88vh] w-full overflow-y-auto relative">
      <div className="flex flex-col space-y-2 p-8">
        <CustomInput
          containerStyle={"!bg-[#F6F6F6]"}
          customStyle={"placeholder:!text-primary"}
          placeholder={"Search For Property"}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={<MdSearch className="text-small text-primary" />}
        />
        <button
          disabled={searchTerm.replace(/ /g, "") == ""}
          className="bg-secondary w-full text-primary font-semibold rounded-md px-8 py-2 disabled:bg-gray-500"
          onClick={() => {
            navigate(`/properties/${searchTerm}`);
          }}
        >
          {t("Search")}
        </button>
      </div>
      <div className="h-px w-full bg-primary/20" />
      <div className="flex flex-col p-8 space-y-2">
        <p className="font-semibold text-smaller">{t("Price")}:</p>
        <MultiRangeSlider
          max={1000000}
          min={20000}
          maxVal={priceMax}
          minVal={priceMin}
          setMaxVal={setPriceMax}
          setMinVal={setPriceMin}
        />
        <p className="font-semibold text-smaller pt-8">{t("Size")}:</p>
        <MultiRangeSlider
          max={2000}
          min={100}
          maxVal={areaMax}
          minVal={areaMin}
          setMaxVal={setAreaMax}
          setMinVal={setAreaMin}
        />
      </div>
      <div className="h-px w-full bg-primary/20 mt-8" />
      <div className="flex flex-col p-8 space-y-2">
        <React.Fragment>
          <div className="flex justify-center items-center border-[1px] rounded-md p-1 gap-x-2 bg-[#F6F6F6]">
            {Purpose.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <div
                    className={`py-4 rounded-md text-tiny w-full flex justify-center items-center cursor-pointer transition-all duration-300 ${
                      form.purpose == item
                        ? "bg-secondary text-primary"
                        : "bg-transparent text-primary"
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
                  <div className="h-10 w-1 bg-white/50" />
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
                    form.rentFrequency == item || form.completionStatus == item
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
      <div className="h-px w-full bg-primary/20" />
      <div className="flex flex-col p-8 space-y-2">
        <p className="font-semibold text-smaller">{t("Bedrooms")}:</p>
        <div className="grid grid-cols-5 gap-4">
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
      <div className="h-px w-full bg-primary/20" />
      <div className="flex flex-col p-8 space-y-2">
        {categoriesIsFetching || categoriesIsLoading ? (
          <div className="text-center text-smaller font-bold">
            {t("Loading")}
          </div>
        ) : (
          categoriesIsSuccess && (
            <React.Fragment>
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

              <div className="grid grid-cols-2 place-items-center gap-4">
                {categories.ids.map((item, index) => {
                  if (categories.entities[item].ParentID == parentType)
                    return (
                      <div
                        key={index}
                        className={`h-10 w-32 border-[1px] border-secondary ${
                          form.CategoryID == item
                            ? "text-primary bg-secondary"
                            : "text-secondary bg-transparent"
                        } flex justify-center items-center text-smaller p-3 rounded-md cursor-pointer transition-all duration-300`}
                        onClick={() => setForm({ ...form, CategoryID: item })}
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
            </React.Fragment>
          )
        )}
      </div>
      <div className="h-px w-full bg-primary/20" />
      <div className="flex flex-col p-8 space-y-2">
        <p className="font-semibold text-smaller">{t("Bathrooms")}:</p>
        <div className="grid grid-cols-5 gap-4">
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
      <div className="w-[calc(100%)] sticky bottom-0 bg-white p-4 shadow-top-shadow flex gap-x-2">
        <button
          className="w-full p-2 rounded-md shadow-sm bg-secondary font-semibold disabled:bg-gray-500"
          onClick={() => {
            setForm(defaultFormState);
            navigate("/properties");
          }}
          disabled={
            form.Addresses.length == 0 &&
            form.CategoryID == "" &&
            form.purpose == "Rent" &&
            form.rentFrequency == "" &&
            form.completionStatus == "" &&
            form.Bedrooms.length == 0 &&
            form.Bathrooms.length == 0 &&
            form.PriceMin == 20000 &&
            form.PriceMax == 1000000 &&
            form.AreaMin == 100 &&
            form.AreaMax == 2000 &&
            !PriceMax
          }
        >
          {t("Clear")}
        </button>
        <button
          className="w-full p-2 rounded-md shadow-sm bg-secondary font-semibold"
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
            }/${form.rentFrequency.length == 0 ? "all" : form.rentFrequency}/${
              form.completionStatus.length == 0 ? "all" : form.completionStatus
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
        >
          {t("Filter")}
        </button>
      </div>
    </div>
  );
};

export default Filter;

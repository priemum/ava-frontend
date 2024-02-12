import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import MultiRangeSlider from "../../../components/Forms/MultiRangeSlider";
import { useGetActiveCategoryQuery } from "../../../redux/categories/categoriesSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Purpose, RentFrequency, CompletionStatus } from "../../../constants";
import { MdExpandLess, MdSearch } from "react-icons/md";
import CustomInput from "../../../components/Forms/CustomInput";
import { useGetGeneralDataQuery } from "../../../redux/generalData/generalDataSlice";
import { useGetActiveAddressQuery } from "../../../redux/addresses/addressesSlice";
import { MdExpandMore } from "react-icons/md";
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
  DownPayemntMin: 0,
  DownPayemntMax: 100,
  InstallmentMin: 0,
  InstallmentMax: 100,
  Posthandover: false,
};
const Filter = ({ containerStyle }) => {
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
    DownPayemntMin,
    DownPayemntMax,
    InstallmentMin,
    InstallmentMax,
    Posthandover,
  } = useParams();
  const rooms = [1, 2, 3, 4, 5, 6];
  const [searchTerm, setSearchTerm] = useState(search ?? "");
  const [priceMin, setPriceMin] = useState();
  const [areaMin, setAreaMin] = useState();
  const [priceMax, setPriceMax] = useState();
  const [areaMax, setAreaMax] = useState();
  const [parentType, setParentType] = useState();
  const [DPMIN, setDPMIN] = useState(0);
  const [DPMAX, setDPMAX] = useState(100);
  const [ISMIN, setISMIN] = useState(0);
  const [ISMAX, setISMAX] = useState(100);
  const [addressSearchTerm, setAddressSearchTerm] = useState("");
  const [paymentPlanStatus, setPaymentPlanStatus] = useState(false);
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
  const location = useLocation();
  const [form, setForm] = useState({
    Addresses:
      Addresses == "all" || Array.isArray(Addresses) == false ? [] : Addresses,
    CategoryID:
      CategoryID == "all" || typeof CategoryID !== "string" ? "" : CategoryID,
    purpose: purpose == "all" || typeof purpose !== "string" ? "all" : purpose,
    rentFrequency:
      rentFrequency == "all" || typeof rentFrequency !== "string"
        ? ""
        : rentFrequency,
    completionStatus:
      completionStatus == "all" || typeof completionStatus !== "string"
        ? ""
        : completionStatus,
    Bedrooms:
      Bedrooms == "all" ||
      Array.isArray(
        Bedrooms?.split(",").map(function (x) {
          return parseInt(x, 10);
        })
      ) == false
        ? []
        : Bedrooms.split(",").map(function (x) {
            return parseInt(x, 10);
          }),
    Bathrooms:
      Bathrooms == "all" ||
      Array.isArray(
        Bathrooms?.split(",").map(function (x) {
          return parseInt(x, 10);
        })
      ) == false
        ? []
        : Bathrooms.split(",").map(function (x) {
            return parseInt(x, 10);
          }),
    PriceMin: priceMin,
    PriceMax: priceMax,
    AreaMin: areaMin,
    AreaMax: areaMax,
    DownPayemntMin: DownPayemntMin ?? 0,
    DownPayemntMax: DownPayemntMax ?? 100,
    InstallmentMin: InstallmentMin ?? 0,
    InstallmentMax: InstallmentMax ?? 100,
    Posthandover: Posthandover ? Posthandover === "true" : false,
  });
  useEffect(() => {
    if (generalDataIsSuccess) {
      setAreaMin(AreaMin ?? generalData.MinSize);
      setAreaMax(AreaMax ?? generalData.MaxSize);
      setPriceMin(PriceMin ?? generalData.MinPrice);
      setPriceMax(PriceMax ?? generalData.MaxPrice);
      setForm({
        ...form,
        AreaMin: AreaMin ?? generalData.MinSize,
        AreaMax: AreaMax ?? generalData.MaxSize,
        PriceMin: PriceMin ?? generalData.MinPrice,
        PriceMax: PriceMax ?? generalData.MaxPrice,
      });
    }
  }, [generalDataIsSuccess]);

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const {
    data: categories,
    isLoading: categoriesIsLoading,
    isFetching: categoriesIsFetching,
    isSuccess: categoriesIsSuccess,
  } = useGetActiveCategoryQuery();
  useEffect(() => {
    if (categoriesIsSuccess && categories.count !== 0) {
      if (parentCategory) {
        setParentType(parentCategory);
      } else {
        setParentType("all");
      }
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

  return (
    <div
      className={`m-8 rounded-lg shadow-md ${containerStyle} bg-white h-[88vh] w-[calc(100%-4rem)] overflow-y-auto relative`}
    >
      <div className="flex flex-col space-y-2 p-8">
        <CustomInput
          containerStyle={"!bg-[#F6F6F6]"}
          customStyle={"placeholder:!text-primary"}
          placeholder={t("SearchForProperty")}
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
      <div className="flex flex-col space-y-2 p-8">
        {addressesIsSuccess && (
          <CustomInput
            readOnly
            state={form}
            containerStyle={"!z-50 !bg-primary/50"}
            customStyle={"!text-white placeholder:text-white font-semibold"}
            placeholder={t("SelectAddress")}
            icon={<MdExpandMore size={24} className="text-white" />}
            value={
              form.Addresses.length !== 0
                ? t("Location") +
                  ": " +
                  addresses.entities[form.Addresses]?.Address_Translation.find(
                    (x) => x.Language.Code.toLowerCase() == i18n.language
                  ).Name
                : ""
            }
            otherOptions={
              <div>
                <input
                  type="text"
                  placeholder={t("AddressSearch")}
                  className="bg-transparent text-white w-full border-2 border-white rounded-md py-1 px-2 my-1 placeholder:text-white outline-none"
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
                            addresses.entities[item].Address_Translation.find(
                              (x) =>
                                x.Language.Code.toLowerCase() == i18n.language
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
      </div>

      <div className="h-px w-full bg-primary/20" />
      {generalDataIsLoading || generalDataIsFetching ? (
        <div className="text-center text-smaller font-bold p-8 flex flex-col">
          {t("Loading")}
        </div>
      ) : (
        generalDataIsSuccess && (
          <div className="flex flex-col p-8 space-y-2">
            <p className="font-semibold text-tiny 2xl:text-smaller">
              {t("Price")}:
            </p>
            <MultiRangeSlider
              max={generalData.MaxPrice}
              min={generalData.MinPrice}
              maxVal={priceMax}
              minVal={priceMin}
              setMaxVal={setPriceMax}
              setMinVal={setPriceMin}
              price
            />
            <p className="font-semibold text-tiny 2xl:text-smaller pt-12">
              {t("Size")}:
            </p>
            <MultiRangeSlider
              max={generalData.MaxSize}
              min={generalData.MinSize}
              maxVal={areaMax}
              minVal={areaMin}
              setMaxVal={setAreaMax}
              setMinVal={setAreaMin}
              unit
            />
          </div>
        )
      )}
      <div className="h-px w-full bg-primary/20 mt-8" />
      <div className="flex flex-col p-8 space-y-2">
        <React.Fragment>
          <div className="flex justify-center items-center border-[1px] rounded-md p-1 gap-x-2 bg-[#F6F6F6]">
            <div
              className={`w-full h-14 rounded-md text-tiny flex justify-center items-center cursor-pointer transition-all duration-300 capitalize ${
                form.purpose == "all"
                  ? "bg-secondary text-primary"
                  : "bg-transparent text-primary"
              }`}
              onClick={() => {
                let tempForm = {
                  ...form,
                  purpose: "all",
                  rentFrequency: "",
                  completionStatus: "",
                };
                setRent_buy([]);
                setForm(tempForm);
              }}
            >
              {t("all")}
            </div>
            <div className="h-10 w-1 bg-secondary" />

            {Purpose.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <div
                    className={`w-full h-14 rounded-md text-tiny flex justify-center items-center cursor-pointer transition-all duration-300 ${
                      form.purpose == item.value
                        ? "bg-secondary text-primary"
                        : "bg-transparent text-primary"
                    }`}
                    onClick={() => {
                      let tempForm = {
                        ...form,
                        purpose: item.value,
                        rentFrequency: "",
                        completionStatus: "",
                      };
                      setForm(tempForm);
                    }}
                  >
                    {item?.lng[i18n.language]}
                  </div>
                  {Purpose.length - 1 !== index && (
                    <div className="h-10 w-1 bg-secondary" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
          {rent_buy.length !== 0 && (
            <div className="grid grid-cols-2 place-items-center gap-4">
              {rent_buy.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`h-14 w-full border-[1px] border-secondary ${
                      form.rentFrequency == item.value ||
                      form.completionStatus == item.value
                        ? "text-primary bg-secondary"
                        : "text-secondary bg-transparent"
                    } flex justify-center items-center text-tiny 2xl:text-smaller p-3 rounded-md cursor-pointer transition-all duration-300`}
                    onClick={() => {
                      if (form.purpose == "Rent") {
                        setForm({ ...form, rentFrequency: item.value });
                      } else if (form.purpose == "Buy") {
                        setForm({ ...form, completionStatus: item.value });
                      }
                    }}
                  >
                    {item?.lng[i18n.language]}
                  </div>
                );
              })}
            </div>
          )}
        </React.Fragment>
      </div>
      <div className="h-px w-full bg-primary/20" />
      <div className="flex flex-col p-8 space-y-2">
        <p className="font-semibold text-smaller">{t("Bedrooms")}:</p>
        <div className="grid grid-cols-4 2xl:grid-cols-5 gap-4">
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
      <div className="h-px w-full bg-primary/20" />
      <div className="flex flex-col p-8 space-y-2">
        {categoriesIsFetching || categoriesIsLoading ? (
          <div className="text-center text-smaller font-bold">
            {t("Loading")}
          </div>
        ) : (
          categoriesIsSuccess &&
          categories.count !== 0 && (
            <React.Fragment>
              <div className="flex justify-center items-center border-[1px] rounded-md p-1 gap-x-2 bg-[#F6F6F6]">
                <div
                  className={`w-full h-14 rounded-md text-tiny flex justify-center capitalize items-center text-center cursor-pointer transition-all duration-300 ${
                    parentType == "all"
                      ? "bg-secondary text-primary"
                      : "bg-transparent text-primary"
                  }`}
                  onClick={() => {
                    setParentType("all");
                    setForm({ ...form, CategoryID: "" });
                  }}
                >
                  {t("all")}
                </div>
                <div className="h-10 w-1 bg-secondary" />
                {categories.ids.map((item, index) => {
                  if (categories.entities[item].ParentID == null)
                    return (
                      <React.Fragment key={index}>
                        <div
                          className={`w-full h-14 rounded-md text-tiny flex justify-center items-center text-center cursor-pointer transition-all duration-300 ${
                            parentType == item
                              ? "bg-secondary text-primary"
                              : "bg-transparent text-primary"
                          }`}
                          onClick={() => {
                            setParentType(item);
                            setForm({ ...form, CategoryID: "" });
                          }}
                        >
                          {
                            categories.entities[item].Category_Translation.find(
                              (x) =>
                                x.Language.Code.toLowerCase() == i18n.language
                            ).Name
                          }
                        </div>
                        {index !== categories.parentCategories.length - 1 && (
                          <div className="h-10 w-1 bg-secondary" />
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
                        className={`h-16 w-full border-[1px] border-secondary ${
                          form.CategoryID == item
                            ? "text-primary bg-secondary"
                            : "text-secondary bg-transparent"
                        } flex justify-center items-center text-center text-tiny 2xl:text-smaller p-3 rounded-md cursor-pointer transition-all duration-300`}
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
        <div className="grid grid-cols-4 2xl:grid-cols-5 gap-4">
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

      <div className="h-px w-full bg-primary/20" />

      <div
        onClick={() => {
          setPaymentPlanStatus(!paymentPlanStatus);
        }}
        className="cursor-pointer flex justify-center items-center gap-x-3 p-8"
      >
        <p className="font-semibold text-tiny 2xl:text-smaller">
          {t("SearchByPaymentPlan")}
        </p>
        {paymentPlanStatus ? (
          <MdExpandLess className="text-small" />
        ) : (
          <MdExpandMore className="text-small" />
        )}
      </div>
      {!paymentPlanStatus && <div className="h-px w-full bg-primary/20" />}
      <div
        className={`max-w-[calc(100vw-4.5rem)] overflow-auto transition-all duration-100 h-full ${
          paymentPlanStatus ? "max-h-[400px]" : "max-h-[0px]"
        } `}
      >
        <div className="flex flex-col p-8 space-y-2">
          <p className="font-semibold text-tiny 2xl:text-smaller">
            {t("Posthandover")}:
          </p>
          <div className="flex justify-center items-center border-[1px] rounded-md p-1 gap-x-2 bg-[#F6F6F6]">
            {[
              {
                value: false,
                lng: {
                  ar: "لا",
                  en: "No",
                },
              },
              {
                value: true,
                lng: {
                  ar: "نعم",
                  en: "Yes",
                },
              },
            ].map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <div
                    className={`w-full h-14 rounded-md text-tiny flex justify-center items-center cursor-pointer transition-all duration-300 ${
                      form.Posthandover == item.value
                        ? "bg-secondary text-primary"
                        : "bg-transparent text-primary"
                    }`}
                    onClick={() => {
                      let tempForm = {
                        ...form,
                        Posthandover: item.value,
                      };
                      setForm(tempForm);
                    }}
                  >
                    {item?.lng[i18n.language]}
                  </div>
                  {1 !== index && <div className="h-10 w-1 bg-secondary" />}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* <div className="h-px w-full bg-primary/20" /> */}

        <div className="flex flex-col p-8 space-y-2">
          <p className="font-semibold text-tiny 2xl:text-smaller">
            {t("Installments")}: %
          </p>
          <MultiRangeSlider
            max={100}
            min={0}
            maxVal={ISMAX}
            minVal={ISMIN}
            setMaxVal={setISMAX}
            setMinVal={setISMIN}
          />
          <p className="font-semibold text-tiny 2xl:text-smaller pt-12">
            {t("DownPayment")}:
          </p>
          <MultiRangeSlider
            max={100}
            min={0}
            maxVal={DPMAX}
            minVal={DPMIN}
            setMaxVal={setDPMAX}
            setMinVal={setDPMIN}
          />
        </div>
      </div>
      <div className="h-12 w-full bg-transparent" />
      <div className="w-[calc(100%)] sticky bottom-0 bg-white p-4 shadow-top-shadow flex gap-x-2 z-40">
        <button
          className="w-full p-2 rounded-md shadow-sm bg-secondary font-semibold disabled:bg-gray-500"
          onClick={() => {
            setPaymentPlanStatus(false);
            setDPMAX(100);
            setDPMIN(0);
            setISMAX(100);
            setISMIN(0);
            setAreaMin(generalData?.MinSize);
            setAreaMax(generalData?.MaxSize);
            setPriceMax(generalData?.MaxPrice);
            setPriceMin(generalData?.MinPrice);
            setForm(defaultFormState);
            navigate("/properties");
          }}
          disabled={
            form.Addresses.length == 0 &&
            form.CategoryID == "" &&
            form.purpose == "all" &&
            form.rentFrequency == "" &&
            form.completionStatus == "" &&
            form.Bedrooms.length == 0 &&
            form.Bathrooms.length == 0 &&
            form.PriceMin == generalData?.MinPrice &&
            form.PriceMax == generalData?.MaxPrice &&
            form.AreaMin == generalData?.MinSize &&
            form.AreaMax == generalData?.MaxSize &&
            form.Posthandover == false &&
            form.InstallmentMin == 0 &&
            form.InstallmentMax == 100 &&
            form.DownPayemntMin == 0 &&
            form.DownPayemntMax == 100 &&
            paymentPlanStatus == false
          }
        >
          {t("Clear")}
        </button>
        <button
          className="w-full p-2 rounded-md shadow-sm bg-buttonGrad font-semibold"
          onClick={() => {
            setForm({
              ...form,
              PriceMax: priceMax,
              PriceMin: priceMin,
              AreaMin: areaMin,
              AreaMax: areaMax,
              InstallmentMin: ISMIN,
              InstallmentMax: ISMAX,
              DownPayemntMin: DPMIN,
              DownPayemntMax: DPMAX,
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
            }/${DPMIN}/${DPMAX}/${ISMIN}/${ISMAX}/${form.Posthandover}`;
            navigate(`/properties/${filterUrl}/${paymentPlanStatus}`);
          }}
        >
          {t("Filter")}
        </button>
      </div>
    </div>
  );
};

export default Filter;

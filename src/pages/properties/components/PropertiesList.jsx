import React, { useEffect, useState } from "react";
import {
  useGetActiveFilteredPropertiesMutation,
  useLazyGetActivePropertiesQuery,
} from "../../../redux/properties/propertiesSlice";
import Loader from "../../../components/UI/Loader";
import PropertyCard from "../../../components/UI/PropertyCard";
import { useParams } from "react-router-dom";
import Pagination from "../../../components/Forms/Pagination";
import { useTranslation } from "react-i18next";
const PropertiesList = () => {
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
  console.log(Addresses);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [
    getActiveProperties,
    { data, isLoading, isFetching, isSuccess, isError },
  ] = useLazyGetActivePropertiesQuery();
  const [
    getActiveFilteredProperties,
    {
      data: filteredData,
      isLoading: filteredIsLoading,
      isSuccess: filteredIsSuccess,
      isError: filteredIsError,
    },
  ] = useGetActiveFilteredPropertiesMutation();
  const [properties, setProperties] = useState({
    ids: [],
    entities: [],
  });
  const { t } = useTranslation();
  useEffect(() => {
    if (search) {
      getActiveProperties({
        page: currentPage,
        limit: itemsPerPage,
        searchTerm: search,
      });
    } else if (
      PriceMin ||
      PriceMax ||
      AreaMin ||
      AreaMax ||
      purpose ||
      rentFrequency ||
      completionStatus ||
      Bedrooms ||
      parentCategory ||
      CategoryID ||
      Bathrooms ||
      Addresses
    ) {
      getActiveFilteredProperties({
        page: currentPage,
        limit: itemsPerPage,
        form: {
          Addresses:
            Addresses == "all"
              ? []
              : Addresses.split(",").map(function (x) {
                  return x;
                }),
          CategoryID:
            CategoryID == "all" || typeof CategoryID !== "string"
              ? ""
              : CategoryID,
          purpose:
            purpose == "all" || typeof purpose !== "string" ? "" : purpose,
          rentFrequency:
            rentFrequency == "all" || typeof rentFrequency !== "string"
              ? ""
              : rentFrequency,
          completionStatus:
            completionStatus == "all" || typeof completionStatus !== "string"
              ? ""
              : completionStatus,
          Bedrooms:
            Bedrooms == "all"
              ? [1, 2, 3, 4, 5, 6]
              : Bedrooms.split(",").map(function (x) {
                  return parseInt(x, 10);
                }),

          Bathrooms:
            Bathrooms == "all"
              ? [1, 2, 3, 4, 5, 6]
              : Bathrooms.split(",").map(function (x) {
                  return parseInt(x, 10);
                }),
          PriceMin: PriceMin ? parseInt(PriceMin) : 20000,
          PriceMax: PriceMax ? parseInt(PriceMax) : 1000000,
          AreaMin: AreaMin ? parseInt(AreaMin) : 100,
          AreaMax: AreaMax ? parseInt(AreaMax) : 2000,
          // BalconySizeMax: 1000000,
          // BalconySizeMin: 0,
          EstimatedRent: 0,
        },
        filter: true,
      });
    } else {
      getActiveProperties({
        page: currentPage,
        limit: itemsPerPage,
      });
    }
  }, [
    search,
    itemsPerPage,
    currentPage,
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
  ]);
  useEffect(() => {
    if (search) {
      isSuccess && setProperties(data);
    }
    if (
      PriceMin ||
      PriceMax ||
      AreaMin ||
      AreaMax ||
      purpose ||
      rentFrequency ||
      completionStatus ||
      Bedrooms ||
      parentCategory ||
      CategoryID ||
      Bathrooms ||
      Addresses
    ) {
      filteredIsSuccess && setProperties(filteredData);
    } else {
      isSuccess && setProperties(data);
    }
  }, [
    isSuccess,
    filteredIsSuccess,
    search,
    itemsPerPage,
    currentPage,
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
  ]);
  return isLoading || isFetching || filteredIsLoading ? (
    <div className="relative h-screen">
      <Loader />
    </div>
  ) : isError || filteredIsError ? (
    <div className="h-screen flex justify-center items-center">
      <p className="font-bold text-med">{t("ErrorPleaseReload")}</p>
    </div>
  ) : (isSuccess || filteredIsSuccess) && properties.ids.length == 0 ? (
    <div className="h-screen flex justify-center items-center">
      <p className="font-bold text-med">{t("NoProperties")} </p>
    </div>
  ) : (
    (isSuccess || filteredIsSuccess) &&
    properties.ids.length !== 0 && (
      <>
        <div className="p-4 lg:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 min-h-screen w-full">
          {properties.ids.map((item, index) => {
            return (
              <PropertyCard data={properties.entities[item]} key={index} />
            );
          })}
        </div>
        <div className="flex justify-center items-center">
          <Pagination
            currentPage={currentPage}
            totalCount={properties.ids.length}
            pageSize={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </>
    )
  );
};

export default PropertiesList;

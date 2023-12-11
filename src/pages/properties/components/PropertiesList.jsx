import React, { useEffect, useState } from "react";
import { useGetActivePropertiesMutation } from "../../../redux/properties/propertiesSlice";
import Loader from "../../../components/UI/Loader";
import PropertyCard from "../../../components/UI/PropertyCard";
import { useParams } from "react-router-dom";
import Pagination from "../../../components/Forms/Pagination";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [
    getActiveProperties,
    { data, isLoading, isFetching, isSuccess, isError },
  ] = useGetActivePropertiesMutation();

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
      getActiveProperties({
        page: currentPage,
        limit: itemsPerPage,
        form: {
          Addresses:
            Addresses == "all" || Array.isArray(Addresses) == false
              ? []
              : Addresses,
          CategoryID:
            CategoryID == "all" || typeof CategoryID !== String
              ? ""
              : CategoryID,
          purpose:
            purpose == "all" || typeof purpose !== String ? "Rent" : purpose,
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
              ? [1, 2, 3, 4, 5, 6]
              : Bedrooms.split(",").map(function (x) {
                  return parseInt(x, 10);
                }),
          Bathrooms:
            Bathrooms == "all" || Array.isArray(Bathrooms) == false
              ? [1, 2, 3, 4, 5, 6]
              : Bathrooms.split(",").map(function (x) {
                  return parseInt(x, 10);
                }),
          PriceMin: PriceMin ? parseInt(PriceMin) : 20000,
          PriceMax: PriceMax ? parseInt(PriceMax) : 1000000,
          AreaMin: AreaMin ? parseInt(AreaMin) : 100,
          AreaMax: AreaMax ? parseInt(AreaMax) : 2000,
          BalconySizeMax: 1000000,
          BalconySizeMin: 0,
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
  return isLoading || isFetching ? (
    <div className="relative h-screen">
      <Loader />
    </div>
  ) : isError ? (
    <div className="h-screen flex justify-center items-center">
      <p className="font-bold text-med">
        Somthing Went Wrong, Please Refresh The Page
      </p>
    </div>
  ) : isSuccess && data.count == 0 ? (
    <div className="h-screen flex justify-center items-center">
      <p className="font-bold text-med">There Are No Properties Yet</p>
    </div>
  ) : (
    isSuccess &&
    data.count !== 0 && (
      <>
        <div className="p-4 lg:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 min-h-screen w-full">
          {data.ids.map((item, index) => {
            return <PropertyCard data={data.entities[item]} key={index} />;
          })}
        </div>
        <div className="flex justify-center items-center">
          <Pagination
            currentPage={currentPage}
            totalCount={data.count}
            pageSize={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </>
    )
  );
};

export default PropertiesList;

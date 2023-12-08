import React, { useState, useEffect } from "react";
import { useLazyGetActiveJobsQuery } from "../../../redux/jobs/jobsSlice";
import JobCard from "./JobCard";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Loader from "../../../components/UI/Loader";
const JobsList = () => {
  const { search } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [getActiveJobs, { data, isLoading, isFetching, isSuccess, isError }] =
    useLazyGetActiveJobsQuery();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (search) {
      getActiveJobs({
        page: currentPage,
        limit: itemsPerPage,
        searchTerm: search,
      });
    } else {
      getActiveJobs({ page: currentPage, limit: itemsPerPage });
    }
  }, [search, itemsPerPage, currentPage]);

  return isLoading || isFetching ? (
    <div className="my-44 flex flex-col justify-center items-center relative">
      <Loader />
    </div>
  ) : isError ? (
    <div className="my-44 flex flex-col justify-center items-center relative">
      <p className="text-med font-bold">
        Somthing went wrong, Please reload the page!
      </p>
    </div>
  ) : isSuccess && data.count == 0 ? (
    <div className="my-44 flex flex-col justify-center items-center relative">
      <p className="text-med font-bold">There Are No Jobs Yet!</p>
    </div>
  ) : (
    isSuccess &&
    data.count !== 0 && (
      <div className="px-[5%] my-16 space-y-4 flex flex-col items-center">
        {data.ids.map((item, index) => {
          return (
            <JobCard
              id={item}
              key={index}
              Author={data.entities[item].Author}
              Location={data.entities[item].Location}
              Title={
                data.entities[item].Jobs_Translation.find(
                  (x) =>
                    x.Language.Code.toLowerCase() == i18n.language.toLowerCase()
                ).Title
              }
              Description={
                data.entities[item].Jobs_Translation.find(
                  (x) =>
                    x.Language.Code.toLowerCase() == i18n.language.toLowerCase()
                ).Description
              }
              Type={data.entities[item].Type}
              WeekHours={data.entities[item].WeekHours}
              Expired={data.entities[item].Expired}
            />
          );
        })}
      </div>
    )
  );
};

export default JobsList;

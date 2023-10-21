import React from "react";
import { useGetActiveJobsQuery } from "../../../redux/jobs/jobsSlice";
import JobCard from "./JobCard";
import { useTranslation } from "react-i18next";
const JobsList = () => {
  const { data, isLoading, isFetching, isSuccess, isError, error } =
    useGetActiveJobsQuery();
  const { i18n } = useTranslation();
  return (
    isSuccess && (
      <div className="px-[5%] my-16 space-y-4 flex flex-col items-center">
        {data.ids.map((item, index) => {
          return (
            <JobCard
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

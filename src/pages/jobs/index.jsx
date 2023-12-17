import React from "react";
import Head from "../../components/Layout/PageContainer/Head";
import PageHeader from "../../components/UI/PageHeader";
import JobsList from "./components/JobsList";
import SearchJob from "./components/SearchJob";
import { useTranslation } from "react-i18next";
const JobApplicationPage = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col justify-center items-center">
      <Head
        title={"Join us"}
        desc={"Join our team."}
        keywords={
          "Jobs at Ava Real Esatate, Jobs in Dubai, Real Estate Jobs, Agents, Real Estate Consultant"
        }
        canonicalLink={"/jobs"}
      />
      <PageHeader text={t("JoinOurTeam")} />
      <SearchJob />
      <JobsList />
    </div>
  );
};

export default JobApplicationPage;

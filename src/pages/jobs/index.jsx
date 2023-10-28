import React from "react";
import Head from "../../components/Layout/PageContainer/Head";
import PageHeader from "../../components/UI/PageHeader";
import JobsList from "./components/JobsList";
const JobApplicationPage = () => {
  return (
    <div className="">
      <Head
        title={"Join us"}
        desc={"Join our team."}
        keywords={
          "Jobs at Ava Real Esatate, Jobs in Dubai, Real Estate Jobs, Agents, Real Estate Consultant"
        }
        canonicalLink={"/jobs"}
      />
      <PageHeader text={"Join Our Team"} />
      <JobsList />
    </div>
  );
};

export default JobApplicationPage;

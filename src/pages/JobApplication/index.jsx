import React, { useEffect } from "react";
import GradientText from "../../components/UI/GradientText";
import JobForm from "./components/Job/JobForm";
import JobInfo from "./components/Job/JobInfo";
import Head from "../../components/Layout/PageContainer/Head";
import PageHeader from "../../components/UI/PageHeader";
const JobApplicationPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex flex-col items-stretch">
      <Head
        title={"Join us"}
        desc={"Join our team."}
        keywords={
          "Jobs at Ava Real Esatate, Jobs in Dubai, Real Estate Jobs, Agents, Real Estate Consultant"
        }
        canonicalLink={"/jobs"}
      />
      {/* <Header /> */}
      <PageHeader text={"Join Our Team"} />
    </div>
  );
};

export default JobApplicationPage;

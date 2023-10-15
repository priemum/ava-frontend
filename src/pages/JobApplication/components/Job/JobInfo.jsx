import React from "react";
import GradientText from "../../../../components/UI/GradientText";
import jobIcon from "../../../../assets/icons/job-icon.svg";
import locationIcon from "../../../../assets/icons/location-icon.svg";
import fulltimeIcon from "../../../../assets/icons/fulltime-icon.svg";
import medalIcon from "../../../../assets/icons/yellowMedal.svg";
const JobInfo = () => {
  return (
    <div className="flex justify-start items-start gap-x-5 bg-third w-full rounded-md p-8 shadow-md">
      <div className="bg-white/60 p-3 rounded-full max-md:hidden ">
        <img src={jobIcon} className="rounded-full p-2 bg-white" alt="" />
      </div>

      <div>
        <GradientText
          customStyle={"font-bold text-big"}
          text={"Real Estate Consultant"}
        />
        <div className="flex max-md:flex-col justify-start md:items-center gap-3 md:gap-5 font-semibold">
          <div className="flex items-center gap-2">
            <img src={locationIcon} alt="" />
            <p>Dubai, United Arab Emirates</p>
          </div>
          <div className="flex items-center gap-2">
            <img src={fulltimeIcon} alt="" />
            <p>Full Time</p>
          </div>
          <div className="flex items-center gap-2">
            <img src={medalIcon} alt="" />
            <p>1-10 Total Hire</p>
          </div>
        </div>
        <div className="text-tiny text-[#414141] mt-8">
          <p>WE OFFER:</p>
          <ul className="list-disc ml-7">
            <li>
              Full in-house marketing team support, & professional in-house
              photographer and videographers for video marketing campaigns
            </li>
            <li>Advanced lead generation tools </li>
            <li>
              Consistent & effective marketing strategies for digital & offline
              space
            </li>
            <li> Efficient Admin staff for reliable support to your success</li>
            <li>
              An outstanding company culture with training and regular team
              meetings
            </li>
            <li>
              First-rate technology and tools (CRM, marketing, design) to
              support your work
            </li>
            <li>Complete backing & support on any transaction issues</li>
            <li>
              Basic Salary & Competitive commission scheme with immediate
              payment
            </li>
            <li>Company Visa</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JobInfo;

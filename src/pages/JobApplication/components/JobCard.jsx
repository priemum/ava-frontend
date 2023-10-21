import React, { useState } from "react";
import GradientText from "../../../components/UI/GradientText";
import jobIcon from "../../../assets/icons/job-icon.svg";
import locationIcon from "../../../assets/icons/location-icon.svg";
import fulltimeIcon from "../../../assets/icons/fulltime-icon.svg";
import medalIcon from "../../../assets/icons/yellowMedal.svg";
import Button from "../../../components/UI/Button";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useTranslation } from "react-i18next";
import { showModal, hideModal } from "../../../redux/modal.slice";
import { useDispatch } from "react-redux";
import Modal from "../../../components/UI/Modal/Modal";
const JobCard = ({
  Author,
  Location,
  Title,
  Description,
  Type,
  WeekHours,
  Expired,
}) => {
  const [expandJob, setExpandJob] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className="bg-primary/10 p-8 rounded-md shadow-md flex justify-start items-start gap-x-4 w-10/12">
      <div className="w-24 h-24">
        <img
          src={jobIcon}
          className="w-full h-full object-contain"
          alt="Element"
        />
      </div>
      <div className="w-full">
        <div className="flex justify-between items-center relative">
          <div className="flex flex-col justify-center items-start">
            <GradientText customStyle={"font-bold text-big"} text={Title} />
            <div className="flex max-md:flex-col justify-start md:items-center gap-3 md:gap-5 font-semibold">
              <div className="flex items-center gap-2">
                <img src={locationIcon} alt="location icon" />
                <p>{Location}</p>
              </div>
              <div className="flex items-center gap-2">
                <img src={fulltimeIcon} alt="job icon" />
                <p>{Type}</p>
              </div>
              <div className="flex items-center gap-2">
                <img src={medalIcon} alt="hours icon" />
                <p>{WeekHours} Weak Hours</p>
              </div>
            </div>
          </div>
          {/* {Expired && (
            <div className="absolute -rotate-45 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <p className="text-red-500 font-bold text-med">EXPIRED</p>
            </div>
          )} */}
          <div className="flex justify-center items-center gap-x-4">
            <Button
              borderColor={"border-primary"}
              text={"More Details"}
              textColor={"text-primary"}
              borderRadius={4}
              customStyle={"!p-2"}
              w={"200px"}
              icon={
                expandJob ? (
                  <MdExpandLess size={26} />
                ) : (
                  <MdExpandMore size={26} />
                )
              }
              onClick={() => {
                setExpandJob(!expandJob);
              }}
            />
            <Button
              bgColor={"bg-primary disabled:bg-transparent"}
              borderColor={Expired && "border-primary"}
              text={Expired ? "EXPIRED" : "Apply"}
              textColor={Expired ? "text-red-800 !font-bold" : "text-third"}
              borderRadius={4}
              customStyle={"!p-2"}
              w={"200px"}
              onClick={() => {
                dispatch(showModal());
              }}
              disabled={Expired}
            />
          </div>
        </div>
        <div
          className={`text-tiny origin-top h-[400px] ${
            expandJob ? "h-[400px] max-h-[400px] mt-8" : "h-0 mt-0"
          } overflow-y-auto transition-all duration-500`}
        >
          <ReactQuill value={Description} readOnly={true} theme={"bubble"} />
        </div>
      </div>
      <Modal>
        <div>
          <p>Hiiiiii</p>
        </div>
      </Modal>
    </div>
  );
};

export default JobCard;

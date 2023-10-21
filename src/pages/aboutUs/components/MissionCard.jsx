import React from "react";

const MissionCard = ({ title, text, icon }) => {
  return (
    <div className="w-[90%] space-y-4">
      <div className="flex justify-start items-center gap-x-2">
        <div
          style={{
            background:
              "linear-gradient(120.27deg, rgba(111, 111, 111, 0.24), 60%, rgba(22, 21, 53, 1) 100%)",
          }}
          className="p-3 rounded-xl shadow-md"
        >
          <img src={icon} alt="icon" />
        </div>
        <p className="font-semibold text-small">{title}</p>
      </div>
      <p className="text-tiny">{text}</p>
    </div>
  );
};

export default MissionCard;

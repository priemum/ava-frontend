import React from "react";
import colors from "../../../settings";
import memberPattern from "../../../assets/images/memberCardPattern.svg";

const MemberCard = ({ name, image, description, title, flip }) => {
  return (
    <div
      style={{
        background: `linear-gradient(279deg, ${colors.secondary} -32.79%, ${colors.primary} 54.12%)`,
      }}
      className="rounded-md"
    >
      <div
        className="grid grid-cols-1 place-items-center rounded-md bg-no-repeat bg-center bg-cover"
        style={{
          backgroundImage: `url(${memberPattern})`,
          backgroundPosition: "70% 50%",
          backgroundSize: "140%",
        }}
      >
        {/* <img
					src={image}
					alt='Member'
					className={`drop-shadow-2xl max-md:col-span-2 h-[500px] lg:h-[650px] rounded-md bg-white p-1 max-md:-mt-20 md:-translate-y-20  ${
						flip ? "order-2" : "order-1"
					}`}
				/> */}

        <div
          className={`p-6 sm:p-12 text-white max-md:col-span-2 ${
            flip ? "order-1" : "order-2"
          } `}
        >
          <p className="text-secondary font-semibold text-med md:text-big">
            {name}{" "}
          </p>
          <p className="text-smaller sm:text-small">{title} </p>
          <p className="py-2 text-[14px] md:text-tiny font-light text-justify">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;

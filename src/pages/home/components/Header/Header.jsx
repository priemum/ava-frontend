import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
// import { data } from "../../../../data/projectsData";
import wallet from "../../../../assets/icons/wallet.svg";
import coin from "../../../../assets/icons/coin.svg";
import Button from "../../../../components/UI/Button";
import dubai from "../../../../assets/images/home/dubaiHeader.png";
import dubaiClean from "../../../../assets/images/home/dubaiHeaderClean.png";

const Header = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  return (
    <div
      style={{
        backgroundImage: `url(${dubai})`,
      }}
      className="overflow-hidden bg-no-repeat bg-center bg-cover h-[110vh] w-full relative flex justify-center items-center bg-fixed -z-20"
    >
      <div
        className={`text-white/70 text-[200px] font-bold fixed top-1/3 left-1/3 leading-none transition-all duration-500 -z-10 !ease-out`}
        style={{
          transform: "translate(35%, " + scrollY + "px)",
        }}
      >
        <p>DUBAI</p>
      </div>
    </div>
  );
};

export default Header;

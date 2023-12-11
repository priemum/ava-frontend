import React, { useState, useEffect } from "react";
import dubai from "../../../../assets/images/home/dubaiHeader.png";

const Header = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      let tempScroll = window.scrollY < 1000 ? window.scrollY : 0;
      setScrollY(tempScroll);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  return (
    <div className="w-full h-[110vh]">
      <div
        style={{
          backgroundImage: `url(${dubai})`,
        }}
        className="overflow-hidden bg-no-repeat bg-center bg-cover h-[110vh] flex justify-center items-center bg-fixed -z-20 absolute top-0 left-0 w-screen"
      >
        <div
          className={`text-white/80 text-[75px] sm:text-[140px] md:text-[170px] lg:text-[200px] font-bold fixed top-1/3 left-1/3 leading-none transition-all duration-500 -z-10 !ease-out`}
          style={{
            transform: "translate(0%, " + scrollY + "px)",
          }}
        >
          <p>DUBAI</p>
        </div>
      </div>
    </div>
  );
};

export default Header;

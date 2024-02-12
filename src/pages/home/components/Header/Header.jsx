import React, { useState, useEffect } from "react";
import dubai from "../../../../assets/images/home/dubaiHeader.webp";

const Header = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      let tempScroll = window.scrollY > 50 ? 300 : -50;
      setScrollY(tempScroll);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  return (
    <div className="w-screen max-w-[1920px] h-[90vh] scroll-smooth">
      <div
        style={{
          backgroundImage: `url(${dubai})`,
        }}
        className="overflow-hidden bg-no-repeat bg-bottom bg-cover h-[90vh] flex justify-center items-center bg-fixed -z-20 absolute top-0 left-0 w-screen max-w-[1920px]"
      >
        <div
          className={`text-white/80 text-[75px] sm:text-[140px] font-bold fixed top-1/3 left-1/2 leading-none -z-10 !ease-linear transition-all duration-300`}
          style={{
            transform: "translate(-50%, " + scrollY + "%)",
          }}
        >
          <p>DUBAI</p>
        </div>
      </div>
    </div>
  );
};

export default Header;

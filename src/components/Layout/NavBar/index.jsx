import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Drawer from "./Drawer";
import LinkElement from "./LinkElement";
import { MdDehaze, MdExpandLess, MdExpandMore } from "react-icons/md";
import { handleScroll } from "../../../helpers/scroll";
import { NavElement } from "../../../data/navData";
import Logo from "../../../assets/logos/AVA-Logo.svg";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Language from "./Language";
import colors from "../../../settings";
import WebsiteSettings from "./WebsiteSettings";
const NavBar = () => {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [header, setHeader] = useState("transparent");
  const [selectedLink, setSelectedLink] = useState("home");
  const [dropDownSelect, setDropDownSelect] = useState({
    open: false,
    id: "",
  });
  const location = useLocation();
  const navigate = useNavigate();
  const listenScrollEvent = (event) => {
    if (document.documentElement.scrollTop < 300) {
      return setHeader("transparent");
    } else if (document.documentElement.scrollTop > 300) {
      return setHeader("white");
    }
  };
  useEffect(() => {
    setHeader(false);
    document.addEventListener("scroll", listenScrollEvent);
    return () => {
      document.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);
  const dropDownRef = useRef(null);
  const handleClickOutside = (event) => {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
      setDropDownSelect({ open: false, id: "" });
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  return (
    <>
      <div
        className={`flex flex-col justify-center items-center top-0 !w-screen fixed backdrop-blur-sm z-40 h-[70px] ${
          header == "white" ? "shadow-2xl" : "shadow-0"
        }`}
        style={{
          background:
            header !== "white" &&
            (location.pathname == "/" ||
              location.pathname == "/about-us" ||
              location.pathname == "/articles" ||
              location.pathname == "/jobs" ||
              location.pathname == "/list-with-us" ||
              location.pathname == "/contact" ||
              location.pathname == "/enquiry")
              ? "transparent"
              : colors.primary,
        }}
      >
        <div
          className={`transition-all duration-500 w-full px-2 xl:px-12 py-1 max-w-[1920px] flex justify-between items-center relative`}
        >
          <div className={`flex justify-between items-center`}>
            <div
              onClick={() => setMobileOpen(true)}
              className="cursor-pointer text-white flex justify-center items-center gap-x-2"
            >
              <MdDehaze size={30} />
              {/* <p className="text-white">{t("menu")}</p> */}
            </div>
          </div>
          <div className="flex justify-center items-center absolute -top-3 left-1/2 -translate-x-1/2">
            <img
              src={Logo}
              className="h-[70px] cursor-pointer"
              alt="LOGO"
              onClick={() => navigate("/")}
            />
          </div>
          {/* <div className="flex flex-col justify-center items-center absolute left-1/2 translate-x-3 -top-5 -rotate-12 z-50">
            <div className="p-2 text-secondary rounded-full text-med">BETA</div>
          </div> */}
          <div className="flex justify-center items-center gap-x-4">
            <Language />
            <WebsiteSettings />
          </div>
        </div>
      </div>
      <Drawer isOpen={mobileOpen} setIsOpen={setMobileOpen}>
        {NavElement.map((e, i) =>
          e.link ? (
            <LinkElement
              key={i}
              name={t(e.name)}
              link={e.link}
              selectedLink={selectedLink}
              header={header}
              onClick={() => setMobileOpen(false)}
            />
          ) : (
            <React.Fragment key={i}>
              <button
                key={e.link}
                className="flex gap-x-1 items-center px-1 cursor-pointer font-bold text-white text-med 2xl:text-big hover:text-secondary transition-all duration-300 "
                onClick={() =>
                  setDropDownSelect({ open: !dropDownSelect.open, id: e.id })
                }
              >
                {t(e.name)}
                {dropDownSelect.open ? (
                  <MdExpandLess className="text-med 2xl:text-big translate-y-2" />
                ) : (
                  <MdExpandMore className="text-med 2xl:text-big translate-y-2" />
                )}
              </button>

              {e.dropData.map((item, index) => {
                return (
                  <LinkElement
                    key={index}
                    name={t(item.name)}
                    link={item.link}
                    selectedLink={selectedLink}
                    header={header}
                    drop
                    styled={` transition-all duration-300 ${
                      dropDownSelect.open && dropDownSelect.id == e.id
                        ? "opacity-100 block"
                        : "opacity-0 hidden"
                    }`}
                    onClick={() => {
                      setMobileOpen(false);
                      setDropDownSelect(!false);
                    }}
                  />
                );
              })}
            </React.Fragment>
          )
        )}
      </Drawer>
    </>
  );
};

export default NavBar;

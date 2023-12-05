import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Drawer from "./Drawer";
import LinkElement from "./LinkElement";
import { MdDehaze } from "react-icons/md";
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
        className={`flex flex-col justify-center items-center top-0 !w-screen fixed backdrop-blur-[21px] z-40 h-[7vh] ${
          header == "white" ? "shadow-2xl" : "shadow-0"
        }`}
        style={{
          background:
            header === "white" ||
            location.pathname == "/properties" ||
            location.pathname ==
              `/properties/${sessionStorage.getItem("propertyId")}` ||
            location.pathname ==
              `/properties/${sessionStorage.getItem("filter")}`
              ? colors.primary
              : "transparent",
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
              className="h-[7vh] cursor-pointer"
              alt=""
              onClick={() => navigate("/")}
            />
          </div>
          <div className="flex justify-center items-center gap-x-4">
            <Language />
            <WebsiteSettings />
          </div>
        </div>
      </div>
      <Drawer isOpen={mobileOpen} setIsOpen={setMobileOpen}>
        {NavElement.map((e) =>
          e.link ? (
            <LinkElement
              key={e.link}
              name={t(e.name)}
              link={e.link}
              selectedLink={selectedLink}
              header={header}
              styled={"max-md:hidden"}
              onClick={() => setMobileOpen(false)}
            />
          ) : (
            <div key={e.name} className="relative">
              <button
                className="max-md:hidden px-1 cursor-pointer font-bold text-white text-med 2xl:text-big hover:scale-150 transition-all duration-300"
                onClick={() =>
                  setDropDownSelect({ open: !dropDownSelect.open, id: e.id })
                }
              >
                {e.name}
              </button>
              <div
                ref={dropDownRef}
                className={`${
                  dropDownSelect.open && dropDownSelect.id == e.id
                    ? "scale-100"
                    : "scale-0"
                } transition-all duration-300 origin-top-left z-10 absolute top-10 bg-fourth/50 backdrop-blur-[21px] rounded-lg shadow-2xl w-60 text-med text-white`}
              >
                <ul className="p-1">
                  {e.dropData.map((item, index) => {
                    return (
                      <li
                        key={index}
                        onClick={() => {
                          setDropDownSelect({
                            open: !dropDownSelect.open,
                            id: "",
                          });
                          setMobileOpen(false);
                        }}
                      >
                        <a
                          href={item.link}
                          className="block px-4 py-2 hover:bg-secondary/20 duration-500 transition-all rounded-lg "
                        >
                          {item.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )
        )}
      </Drawer>
    </>
  );
};

export default NavBar;

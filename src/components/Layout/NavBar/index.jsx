import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Drawer from "./Drawer";
import LinkElement from "./LinkElement";
import { MdDehaze } from "react-icons/md";
import { handleScroll } from "../../../helpers/scroll";
import { NavElement } from "../../../data/navData";
import Logo from "../../../assets/logos/AVA-Logo.svg";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import colors from "../../../settings";
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
        className={`flex flex-col justify-center items-center top-0 !w-screen fixed backdrop-blur-[21px] z-40 ${
          header == "white" ? "shadow-2xl" : "shadow-0"
        }`}
        style={{
          background:
            header === "white" ||
            location.pathname == "/properties" ||
            location.pathname ==
              `/properties/${sessionStorage.getItem("propertyId")}`
              ? colors.primary
              : "transparent",
        }}
      >
        <div
          className={`transition-all duration-500 w-full px-2 xl:px-12 py-1 max-w-[1920px] flex justify-between md:justify-start items-center md:gap-x-24`}
        >
          <img
            src={Logo}
            className="h-[7vh] scale-125 translate-y-1"
            alt=""
            onClick={() => navigate("/")}
          />
          {NavElement.map((e) =>
            e.link ? (
              <LinkElement
                key={e.link}
                name={t(e.name)}
                link={e.link}
                selectedLink={selectedLink}
                header={header}
                styled={"max-md:hidden"}
              />
            ) : (
              <div key={e.name} className="relative">
                <button
                  className="max-md:hidden px-1 cursor-pointer font-bold text-tiny 2xl:text-smaller text-white"
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
                  } transition-all duration-500 origin-top-left z-10 absolute top-10 bg-fourth/50 backdrop-blur-[21px] rounded-lg shadow-2xl w-44 text-tiny text-white`}
                >
                  <ul className="p-1">
                    {e.dropData.map((item, index) => {
                      return (
                        <li
                          key={index}
                          onClick={() =>
                            setDropDownSelect({
                              open: !dropDownSelect.open,
                              id: "",
                            })
                          }
                        >
                          <a
                            href={item.link}
                            className="block px-4 py-2 hover:bg-secondary/20 duration-500 transition-all rounded-lg"
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
          <div className={`flex justify-between items-center md:hidden`}>
            <div
              onClick={() => setMobileOpen(true)}
              className=" cursor-pointer text-white flex justify-center items-center gap-x-2"
            >
              <MdDehaze size={24} />
              <p className="text-white">{t("menu")}</p>
            </div>
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
              onClick={() => {
                setMobileOpen(false);
                handleScroll(e.link);
                setSelectedLink(e.link);
              }}
            />
          ) : (
            <p key={e.name}>{e.name}</p>
          )
        )}
      </Drawer>
    </>
  );
};

export default NavBar;

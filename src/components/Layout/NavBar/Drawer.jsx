import React from "react";
import { MdClose } from "react-icons/md";
import Logo from "../../../assets/logos/AVA-Logo.svg";
import { useTranslation } from "react-i18next";
export default function Drawer({ children, isOpen, setIsOpen }) {
  const { i18n } = useTranslation();
  return (
    <main
      className={
        ` fixed overflow-hidden z-50 bg-black/50 bg-opacity-50 inset-0 transform ease-out ` +
        (isOpen
          ? ` transition-opacity opacity-100 duration-300 ${
              i18n.language == "en" ? "translate-x-0" : "-translate-x-0"
            } `
          : ` ${
              i18n.language == "en" ? "translate-x-full" : "-translate-x-full"
            } transition-all opacity-0 `)
      }
    >
      <section
        className={
          ` w-screen ${
            i18n.language == "ar" ? "right-0" : "left-0"
          } absolute h-full shadow-xl duration-300 ease-out transition-all transform  ` +
          (isOpen
            ? ` ${i18n.language == "ar" ? "translate-x-0" : "-translate-x-0"}  `
            : ` ${
                i18n.language == "ar" ? "translate-x-full" : "-translate-x-full"
              }  `)
        }
      >
        <article className="relative w-full pb-10 flex flex-col justify-start items-center space-y-6 overflow-y-scroll h-full bg-primary/50 backdrop-blur-[21px]">
          <header
            dir={i18n.language == "ar" ? "ltr" : "rtl"}
            className="p-4 font-bold w-full flex justify-between items-center"
          >
            <MdClose
              onClick={() => {
                setIsOpen(false);
              }}
              className="cursor-pointer text-[#B28A5D] hover:rotate-180 transition-all duration-300 ease-out text-big"
            />
            <img
              className="h-[100px] sm:h-[100px] cursor-pointer translate-y-4"
              src={Logo}
              alt="LOGO"
            />
          </header>
          {children}
        </article>
      </section>
      <section
        className="w-screen h-full cursor-pointer"
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </main>
  );
}

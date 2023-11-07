import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaYoutube,
  FaLocationArrow,
} from "react-icons/fa";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";
import colors from "../../../settings";
const Footer = () => {
  return (
    <div
      style={{
        // background: `linear-gradient(132deg, ${colors.primary} 40%, ${colors.third} 200%)`,
        background: colors.primary,
      }}
      className="w-full flex justify-center items-center"
    >
      <div className="max-w-[1920px] w-full">
        <div className="grid md:grid-cols-2 w-full px-[3%] py-[3%] justify-items-center  ">
          <div className="max-md:w-[80%] text-base md:text-lg text-white space-y-3 flex flex-col">
            <div className="flex-1 space-y-3">
              <p className="text-start text-smaller font-semibold py-3">
                Contact Us
              </p>
              <div className="flex gap-x-3 items-center">
                <MdLocationOn size={24} />
                <p className="text-tiny flex-1">
                  609, Clover Bay, Business Bay, Ava real estate, Dubai,
                  United Arab Emirates
                </p>
              </div>
              <div className="flex gap-x-3 items-center">
                <MdEmail size={24} />
                <p className="text-tiny flex-1">info@avarealestate.ae</p>
              </div>
              <div className="flex gap-x-3 items-center">
                <MdPhone size={24} />
                <p className="text-tiny flex-1">+971501108606</p>
              </div>
            </div>

            <p className=" pt-5 text-start text-tiny text-white font-semibold max-md:hidden">
              @2023 AVA REAL ESTATE, LLC. All rights reserved
            </p>
          </div>
          <div className="text-base w-[80%] lg:w-[50%] text-white max-md:py-4 space-y-3 flex flex-col">
            <div className="flex-1 space-y-3">
              <p className="text-start text-smaller font-semibold py-3">
                Social Media
              </p>
              <div className="flex justify-between px-4 text-2xl">
                <a
                  href="https://www.facebook.com/avarealestate.ae"
                  aria-label="Visit Our Facebook Page"
                  target="_blank"
                >
                  <FaFacebook cursor={"pointer"} />
                </a>
                <a
                  href="https://www.instagram.com/ava.realestate/"
                  aria-label="Visit Our Instegram Page"
                  target="_blank"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.linkedin.com/company/ava-realestate/"
                  aria-label="Visit Our Linkedin Page"
                  target="_blank"
                >
                  <FaLinkedinIn />
                </a>
                <a
                  href="https://www.tiktok.com/@avarealestate"
                  aria-label="Visit Our tiktok Page"
                  target="_blank"
                >
                  <FaTiktok />
                </a>
                <a
                  href="https://www.youtube.com/@avarealestate"
                  aria-label="Visit Our Youtube Channel"
                  target="_blank"
                >
                  <FaYoutube />
                </a>
              </div>
            </div>

            <div className="flex gap-x-4 font-semibold pt-5">
              <a
                className="text-white max-lg:py-4 text-center md:text-start"
                href="/privacy-policy"
              >
                Privacy Policy
              </a>
              <a
                className="text-white max-lg:py-4 text-center md:text-start"
                href="/privacy-policy"
              >
                Terms & Conditions
              </a>
              <a
                className="text-white max-lg:py-4 text-center md:text-start"
                href="/about-us"
              >
                About Us
              </a>
              <a
                className="text-white max-lg:py-4 text-center md:text-start"
                href="/privacy-policy"
              >
                Site Map
              </a>
            </div>
          </div>
        </div>
        <p className=" pt-5 text-center text-tiny text-white font-semibold pb-3 md:hidden">
          @2023 AVA REAL ESTATE, LLC. All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;

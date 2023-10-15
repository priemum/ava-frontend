import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
const NotFound404 = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  return (
    <main className="flex flex-row justify-center items-center h-screen text-white">
      <div className="mt-[5%] font-fbold bg-secondary px-44 py-24 rounded-md bg-headerBg bg-cover bg-no-repeat h-[70%] w-[70%] flex flex-col justify-center items-center">
        <div
          onClick={() => navigate(-1)}
          className="underline hover:text-primary cursor-pointer text-2xl flex items-center self-start "
        >
          <MdArrowBackIos />
          <p className="">Go Back</p>
        </div>
        <div className="h-full flex justify-center items-center text-primary/70">
          <p className="text-7xl font-extrabold">404 Page Not Found!</p>
        </div>
      </div>
    </main>
  );
};

export default NotFound404;

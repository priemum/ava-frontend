import React from "react";
import { API_BASE_URL } from "../../../constants";
import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ArticleCard = ({
  id,
  Image,
  Title,
  MinRead,
  AuthorName,
  AuthorImage,
  Caption,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div
      className="w-[90%] rounded-md group bg-primary/10 backdrop-blur-sm shadow-md"
      onClick={() => {
        navigate(`/article/${id}`);
        localStorage.setItem("slug", id);
      }}
    >
      <div className="relative h-[400px] w-full overflow-hidden">
        <img
          src={API_BASE_URL + Image}
          alt="Article Image"
          className="w-full h-full rounded-md object-cover object-center"
        />
        <div className="bg-primary/20 w-full absolute bottom-0 left-0 transition-all duration-500 backdrop-blur-sm p-3">
          <div className="flex justify-start items-center gap-x-3 h-[60px]">
            <div className="flex items-center gap-x-3 flex-1">
              <img
                src={API_BASE_URL + AuthorImage}
                className="w-16 h-16 object-cover object-top rounded-md"
                alt="Article Card"
              />
              <p className="text-white text-smaller ">{AuthorName}</p>
            </div>
            <p className="font-normal text-smaller drop-shadow-xl text-third h-[30px]">
              {MinRead + " " + t("MinRead")}
            </p>
          </div>
        </div>
      </div>
      <div className="p-5 lg:p-8 space-y-1 h-[250px] flex flex-col">
        <p className="font-bold text-small">{Title}</p>
        <div className="flex-1">
          <p className="line-clamp-2 text-tiny ">{Caption}</p>
        </div>
        <div className="flex items-center text-smaller !mt-4 gap-x-1">
          <p>{t("ReadMore")}</p>
          <MdArrowOutward size={24} />
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;

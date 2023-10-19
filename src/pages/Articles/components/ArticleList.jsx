import React from "react";
// import { data } from "../../../data/articlesData";
import { useNavigate } from "react-router-dom";
import { useGetActiveArticlesQuery } from "../../../redux/articles/articlesSlice";
import { API_BASE_URL } from "../../../constants";
import { useTranslation } from "react-i18next";
const ArticleList = () => {
  const navigate = useNavigate();
  const { data, isLoading, isFetching, isSuccess, isError, error } =
    useGetActiveArticlesQuery();
  const { i18n } = useTranslation();
  return (
    isSuccess && (
      // <div className="md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-7 place-items-center my-20">
      <div className="grid lg:grid-cols-2 gap-7 place-items-center my-20 cursor-pointer">
        {data.ids.map((item, index) => {
          return (
            <div
              key={index}
              // className="h-[400px] w-[300px] rounded-sm relative overflow-hidden group"
              className="h-[400px] w-[90%]  rounded-sm relative overflow-hidden group"
              onClick={() => {
                navigate(`/articles/${data.entities[item].id}`);
                localStorage.setItem("slug", data.entities[item].id);
              }}
            >
              <img
                src={API_BASE_URL + data.entities[item].Image?.URL}
                alt=""
                className="w-full h-full rounded-sm"
              />
              <div className="max-h- bg-secondary/20 w-full absolute -bottom-[116px] group-hover:bottom-0 left-0 transition-all duration-500 backdrop-blur-[20px] p-3 space-y-2">
                <p className="font-semibold text-smaller drop-shadow-xl text-third">
                  {
                    data.entities[item].Articles_Translation.find(
                      (x) =>
                        x.Language.Code.toLowerCase() ==
                        i18n.language.toLowerCase()
                    ).Title
                  }
                </p>
                <p className="font-normal text-smaller drop-shadow-xl text-third h-[30px]">
                  {data.entities[item].MinRead} Min Read
                </p>
                <div className="flex justify-start items-center gap-x-3 h-[70px]">
                  <img
                    src={API_BASE_URL + data.entities[item].User.Image?.URL}
                    className="w-16 h-16 object-cover object-top rounded-md"
                    alt=""
                  />
                  <p className="text-white text-smaller ">
                    {data.entities[item].Name}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    )
  );
};

export default ArticleList;

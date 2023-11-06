import React from "react";
// import { data } from "../../../data/articlesData";
import { useNavigate } from "react-router-dom";
import { useGetActiveArticlesQuery } from "../../../redux/articles/articlesSlice";
import Loader from "../../../components/UI/Loader";
import { useTranslation } from "react-i18next";
import ArticleCard from "./ArticleCard";
const ArticleList = () => {
  const navigate = useNavigate();
  const { data, isLoading, isFetching, isSuccess, isError, error } =
    useGetActiveArticlesQuery();
  const { i18n } = useTranslation();
  return isLoading || isFetching ? (
    <div className="my-44 flex flex-col justify-center items-center relative">
      <Loader />
    </div>
  ) : isError ? (
    <div className="my-44 flex flex-col justify-center items-center relative">
      <p className="text-med font-bold">
        Somthing went wrong, Please reload the page!
      </p>
    </div>
  ) : isSuccess && data.count == 0 ? (
    <div className="my-44 flex flex-col justify-center items-center relative">
      <p className="text-med font-bold">There Are No Articles Yet!</p>
    </div>
  ) : (
    isSuccess &&
    data.count !== 0 && (
      <div className="grid lg:grid-cols-3 gap-7 place-items-center my-20 cursor-pointer">
        {data.ids.map((item, index) => {
          return (
            <ArticleCard
              key={index}
              id={data.entities[item].id}
              Image={data.entities[item].Image?.URL}
              Title={
                data.entities[item].Articles_Translation.find(
                  (x) =>
                    x.Language.Code.toLowerCase() == i18n.language.toLowerCase()
                ).Title
              }
              Caption={
                data.entities[item].Articles_Translation.find(
                  (x) =>
                    x.Language.Code.toLowerCase() == i18n.language.toLowerCase()
                ).Caption
              }
              MinRead={data.entities[item].MinRead}
              AuthorImage={data.entities[item].User.Image?.URL}
              AuthorName={data.entities[item].User.Name}
            />
          );
        })}
      </div>
    )
  );
};

export default ArticleList;

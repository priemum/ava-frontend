import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLazyGetActiveArticlesQuery } from "../../../redux/articles/articlesSlice";
import Loader from "../../../components/UI/Loader";
import { useTranslation } from "react-i18next";
import ArticleCard from "./ArticleCard";
import Pagination from "../../../components/Forms/Pagination";
const ArticleList = () => {
  const { search } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [
    getActiveArticles,
    { data, isLoading, isFetching, isSuccess, isError },
  ] = useLazyGetActiveArticlesQuery();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (search) {
      getActiveArticles({
        page: currentPage,
        limit: itemsPerPage,
        searchTerm: search,
      });
    } else {
      getActiveArticles({ page: currentPage, limit: itemsPerPage });
    }
  }, [search, itemsPerPage, currentPage]);
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
      <>
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
                      x.Language.Code.toLowerCase() ==
                      i18n.language.toLowerCase()
                  ).Title
                }
                Caption={
                  data.entities[item].Articles_Translation.find(
                    (x) =>
                      x.Language.Code.toLowerCase() ==
                      i18n.language.toLowerCase()
                  ).Caption
                }
                MinRead={data.entities[item].MinRead}
                AuthorImage={data.entities[item].User.Image?.URL}
                AuthorName={data.entities[item].User.Name}
              />
            );
          })}
        </div>
        <div className="flex justify-center items-center">
          <Pagination
            currentPage={currentPage}
            totalCount={data.count}
            pageSize={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </>
    )
  );
};

export default ArticleList;

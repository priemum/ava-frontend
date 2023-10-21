import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { data } from "../../data/articlesData";
import { Helmet } from "react-helmet";
import Head from "../../components/Layout/PageContainer/Head";
import { useGetArticleByIdQuery } from "../../redux/articles/articlesSlice";
import { useTranslation } from "react-i18next";
import { API_BASE_URL } from "../../constants";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
const ArticlePage = () => {
  const { slug } = useParams();
  const { i18n } = useTranslation();
  const {
    data: article,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetArticleByIdQuery({ id: slug });
  return (
    isSuccess && (
      <div className="flex flex-col justify-center items-center">
        {/* <Head
          title={
            article?.Articles_Translation.find(
              (x) =>
                x.Language.Code.toLowerCase() == i18n.language.toLowerCase()
            ).Title
          }
          desc={article?.title}
          additionMeta={
            <meta name="author" content={article?.author?.name}></meta>
          }
          keywords={article?.keywords}
          canonicalLink={article?.slug}
        /> */}
        <div className="h-[500px] relative w-full ">
          <img
            src={API_BASE_URL + article?.Image.URL}
            className="h-full w-full object-cover object-bottom"
            alt=""
          />
          <div className="absolute h-full w-full bg-primary/50 top-0 left-0" />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center z-30 text-white">
            <p className="font-semibold text-med md:text-big text-center w-[70%] 2xl:w-[50%] drop-shadow-2xl">
              {
                article?.Articles_Translation.find(
                  (x) =>
                    x.Language.Code.toLowerCase() == i18n.language.toLowerCase()
                ).Title
              }
            </p>
          </div>
        </div>

        <div className="max-w-[1280px]">
          <div className="p-4 md:p-8 space-y-12">
            <div className="flex items-center gap-x-4">
              <img
                src={API_BASE_URL + article?.User?.Image.URL}
                className="h-[150px] w-[100px] lg:h-[100px] lg:w-[100px] rounded-md object-cover object-top"
                alt="Article Image"
              />
              <div>
                <p className="font-semibold text-smaller md:text-med">
                  {
                    article?.Articles_Translation.find(
                      (x) =>
                        x.Language.Code.toLowerCase() ==
                        i18n.language.toLowerCase()
                    ).Title
                  }
                </p>
                <p className="text-tiny md:text-smaller font-medium">
                  {article?.User?.Name}
                </p>
                <div className="flex items-center gap-x-4">
                  <p className="text-tiny md:text-smaller font-medium">
                    {article?.MinRead} Min Read
                  </p>
                  <p className="text-tiny font-medium">
                    {article?.CreatedAt?.split("T")[0]}
                  </p>
                </div>
              </div>
            </div>
            <ReactQuill
              value={
                article?.Articles_Translation.find(
                  (x) =>
                    x.Language.Code.toLowerCase() == i18n.language.toLowerCase()
                ).Description
              }
              readOnly={true}
              theme={"bubble"}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default ArticlePage;

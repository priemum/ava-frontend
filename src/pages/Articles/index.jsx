import React from "react";
import ArticleList from "./components/ArticleList";
import Head from "../../components/Layout/PageContainer/Head";
import PageHeader from "../../components/UI/PageHeader";
import { data } from "../../data/articlesData";
import SearchArticle from "./components/SearchArticle";
const ArticlesPage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Head
        title={"Articles"}
        desc={"Find the latest articles about Real Estate in Dubai."}
        keywords={
          "Implications of Evergrande's Bankruptcy on Dubai's Real Estate Market, Palm Jebel ALI"
        }
        canonicalLink={"/articles"}
      />
      <PageHeader text={data.headerTitle} />
      <SearchArticle />
      <ArticleList />
    </div>
  );
};

export default ArticlesPage;

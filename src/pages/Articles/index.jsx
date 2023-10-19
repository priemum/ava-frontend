import React from "react";
import ArticleList from "./components/ArticleList";
import Head from "../../components/Layout/PageContainer/Head";
import PageHeader from "../../components/UI/PageHeader";
import { data } from "../../data/articlesData";

const ArticlesPage = () => {
  return (
    <div>
      <Head
        title={"Articles"}
        desc={"Find the latest articles about Real Estate in Dubai."}
        keywords={
          "Implications of Evergrande's Bankruptcy on Dubai's Real Estate Market, Palm Jebel ALI"
        }
        canonicalLink={"/articles"}
      />
      <PageHeader text={data.headerTitle} />
      <ArticleList />
    </div>
  );
};

export default ArticlesPage;

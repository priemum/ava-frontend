import React from "react";
import Header from "./components/Header";
import ArticleList from "./components/ArticleList";
import Head from "../../components/Layout/PageContainer/Head";

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
			<Header />
			<ArticleList />
		</div>
	);
};

export default ArticlesPage;

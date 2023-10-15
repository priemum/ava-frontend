import React from "react";
import { Helmet } from "react-helmet-async";

const Head = ({ title, desc, keywords, additionMeta, canonicalLink }) => {
	return (
		<Helmet>
			<title>{`AVA Real Estate - ${title}`}</title>
			<meta
				name='title'
				content={`AVA Real Estate - ${title}`}
				data-rh='true'
			/>
			<meta name='description' content={desc} data-rh='true' />
			<meta name='keywords' content={keywords} data-rh='true' />
			<link rel='canonical' href={canonicalLink} data-rh='true' />
			{additionMeta}
		</Helmet>
	);
};

export default Head;

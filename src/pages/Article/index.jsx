import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { data } from "../../data/articlesData";
import { Helmet } from "react-helmet";
import Head from "../../components/Layout/PageContainer/Head";
const ArticlePage = () => {
	const { slug } = useParams();
	const [article, setArticle] = useState();
	useEffect(() => {
		let tempData = data.articles.find((a) => a.slug == slug);
		setArticle(tempData);
	}, [slug]);
	return (
		<div className='flex flex-col justify-center items-center'>
			{/* <Helmet htmlAttributes>
				<html lang='en' />
				<meta charset='UTF-8' />
				<title>{article?.pageTitle}</title>
				<meta name='author' content={article?.author?.name}></meta>
				<meta
					name='title'
					content={`Ava Real Estate - ${article?.pageTitle} `}
				/>
				<meta name='description' content={article?.title} />
				<meta name='keywords' content={article?.keywords} />
				data-rh="true"
			</Helmet> */}
			<Head
				title={article?.pageTitle}
				desc={article?.title}
				additionMeta={
					<meta name='author' content={article?.author?.name}></meta>
				}
				keywords={article?.keywords}
				canonicalLink={article?.slug}
			/>
			<div className='h-[500px] relative w-full '>
				<img
					src={article?.mainImage}
					className='h-full w-full object-cover object-bottom'
					alt=''
				/>
				<div className='absolute h-full w-full bg-secondary/50 top-0 left-0' />
				<div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center z-30 text-white'>
					<p className='font-semibold text-med md:text-big text-center w-[70%] 2xl:w-[50%] drop-shadow-2xl'>
						{article?.title}
					</p>
				</div>
			</div>

			<div className='max-w-[1280px]'>
				<div className='p-4 md:p-8 space-y-12'>
					<div className='flex items-center gap-x-4'>
						<img
							src={article?.author?.image}
							className='h-[150px] w-[100px] lg:h-[100px] lg:w-[100px] rounded-md object-cover object-top'
							alt=''
						/>
						<div>
							<p className='font-semibold text-smaller md:text-med'>
								{article?.title}
							</p>
							<p className='text-tiny md:text-smaller font-medium'>
								{article?.author?.name}
							</p>
							<div className='flex items-center gap-x-4'>
								<p className='text-tiny md:text-smaller font-medium'>
									{article?.minRead} Min Read
								</p>
								<p className='text-tiny font-medium'>{article?.createDate}</p>
							</div>
						</div>
					</div>
					{article?.sections.map((item, index) => {
						return (
							<div
								key={index}
								className='col-span-8 flex flex-col justify-center items-center'
							>
								<p className='font-bold text-small self-start'>
									{item.heading}
								</p>
								{item?.images?.length > 0 && (
									<img
										src={item.images[0]}
										className='col-span-4 lg:w-[70%] self-center h-[500px] rounded-md pt-12 pb-12'
										alt=''
									/>
								)}
								<div className='space-y-6'>
									{item?.text.map((item, index) => {
										return (
											<p
												key={index}
												className='font-nornal text-smaller text-justify'
											>
												{item}
											</p>
										);
									})}
								</div>
							</div>
						);
					})}
					<div className='space-y-4'>
						<p className='font-bold text-small self-start'>References</p>
						{article?.references?.map((item) => {
							return (
								<div>
									<a
										className='text-small self-start underline text-blue-600'
										href={item}
										target='_blank'
									>
										{item}
									</a>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ArticlePage;

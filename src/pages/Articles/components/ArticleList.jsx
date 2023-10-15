import React from "react";
import { data } from "../../../data/articlesData";
import { useNavigate } from "react-router-dom";
const ArticleList = () => {
  const navigate = useNavigate();
  return (
    // <div className="md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-7 place-items-center my-20">
    <div className="grid lg:grid-cols-2 gap-7 place-items-center my-20 cursor-pointer">
      {data.articles.map((item, index) => {
        return (
          <div
            key={index}
            // className="h-[400px] w-[300px] rounded-sm relative overflow-hidden group"
            className="h-[400px] w-[90%]  rounded-sm relative overflow-hidden group"
            onClick={() => {
              navigate(`/articles/${item.slug}`);
              localStorage.setItem("slug", item.slug);
            }}
          >
            <img
              src={item.mainImage}
              alt=""
              className="w-full h-full rounded-sm"
            />
            <div className="max-h- bg-secondary/20 w-full absolute -bottom-[116px] group-hover:bottom-0 left-0 transition-all duration-500 backdrop-blur-[20px] p-3 space-y-2">
              <p className="font-semibold text-smaller drop-shadow-xl text-third">
                {item.title}
              </p>
              <p className="font-normal text-smaller drop-shadow-xl text-third h-[30px]">
                {item.minRead} Min Read
              </p>
              <div className="flex justify-start items-center gap-x-3 h-[70px]">
                <img
                  src={item.author.image}
                  className="w-16 h-16 object-cover object-top rounded-md"
                  alt=""
                />
                <p className="text-white text-smaller ">{item.author.name}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ArticleList;

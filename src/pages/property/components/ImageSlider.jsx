import React, { useRef, useState } from "react";
import LazyImage from "../../../components/ui/LazyImage";
import { API_BASE_URL } from "../../../constants";
import Slider from "react-slick";
import { useDispatch } from "react-redux";
import { showGalleryModal } from "../../../redux/modal.slice";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
function SampleNextArrow({ onClick }) {
  return (
    <div
      className="absolute cursor-pointer z-10 right-3 top-1/2 rounded-full bg-primary/20 backdrop-blur-[21px]"
      onClick={onClick}
    >
      <FaAngleRight className="text-white" size={35} />
    </div>
  );
}
function SamplePrevArrow({ onClick }) {
  return (
    <div
      className="absolute cursor-pointer z-10 left-3 top-1/2 rounded-full bg-primary/20 backdrop-blur-[21px]"
      onClick={onClick}
    >
      <FaAngleLeft className="text-white" size={35} />
    </div>
  );
}

const ImageSlider = ({ data }) => {
  const dispatch = useDispatch();

  const showGallery = (initialSlide) => {
    dispatch(
      showGalleryModal({
        data: (
          <Slider
            slidesToScroll={1}
            slidesToShow={1}
            dots={false}
            arrows={true}
            infinite={true}
            initialSlide={initialSlide}
            className="h-[80vh] w-[90vw] overflow-hidden"
            nextArrow={<SampleNextArrow />}
            prevArrow={<SamplePrevArrow />}
          >
            {data.map((item, index) => {
              return (
                <LazyImage
                  key={index}
                  src={API_BASE_URL + item.URL}
                  divStyle={"h-[80vh] w-[90vw] cursor-pointer"}
                  imgStyle={
                    "xl h-[80vh] w-[90vw]  object-center !object-contain"
                  }
                  skelatonStyle={"h-[80vh] w-[90vw]"}
                />
              );
            })}
          </Slider>
        ),
      })
    );
  };
  return (
    <div className="grid grid-cols-2 gap-4">
      <LazyImage
        src={API_BASE_URL + data[0].URL}
        divStyle={"h-[516px] cursor-pointer"}
        imgStyle={"rounded-xl w-full object-center object-cover h-[516px]"}
        skelatonStyle={"rounded-xl w-full h-[516px]"}
        onClick={() => {
          showGallery(0);
        }}
      />
      <div className="grid grid-cols-2 gap-4">
        {data.map((item, index) => {
          if (index > 0 && index < 4)
            return (
              <LazyImage
                key={index}
                src={API_BASE_URL + item.URL}
                divStyle={"h-[250px] cursor-pointer"}
                imgStyle={
                  "rounded-xl w-full h-full object-center object-cover h-[250px]"
                }
                skelatonStyle={"rounded-xl w-full h-full h-[250px]"}
                onClick={() => {
                  showGallery(index);
                }}
              />
            );
          if (index == 4)
            return (
              <div
                className="relative cursor-pointer"
                key={index}
                onClick={() => {
                  showGallery(index);
                }}
              >
                <LazyImage
                  src={API_BASE_URL + item.URL}
                  divStyle={"h-[250px]"}
                  imgStyle={
                    "rounded-xl w-full h-full object-center object-cover h-[250px]"
                  }
                  skelatonStyle={"rounded-xl w-full h-full h-[250px]"}
                />
                <div className="flex justify-center items-center text-center absolute top-0 left-0 rounded-xl bg-primary/60 h-full w-full z-20">
                  <p className="text-big font-bold text-third">
                    {"+ " + (data.length - 4)}
                  </p>
                </div>
              </div>
            );
        })}
      </div>
    </div>
  );
};

export default ImageSlider;

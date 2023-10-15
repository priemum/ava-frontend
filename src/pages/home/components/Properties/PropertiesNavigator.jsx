import React from "react";
import { data } from "../../../../data/projectsData";
import Button from "../../../../components/UI/Button";
import { MdArrowForward } from "react-icons/md";
import Slider from "react-slick";
const PropertiesNavigator = ({ selected, setSelected, sliderRef }) => {
  return (
    <div className="md:grid md:grid-cols-12 py-6">
      {/* <div className="col-span-7 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-10 justify-start gap-x-2 sm:gap-x-6 md:gap-x-4 lg:gap-x-12 items-center"> */}
      <div className="col-span-9 max-md:pb-6">
        <Slider
          slidesToScroll={1}
          slidesToShow={6}
          arrows={false}
          dots={true}
          infinite={false}
          className="w-full"
          responsive={[
            {
              breakpoint: 3000,
              settings: {
                slidesToShow: 6,
              },
            },
            {
              breakpoint: 1450,
              settings: {
                slidesToShow: 5,
              },
            },
            {
              breakpoint: 1250,
              settings: {
                slidesToShow: 4,
              },
            },
            {
              breakpoint: 900,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 500,
              settings: {
                slidesToShow: 2,
              },
            },
          ]}
        >
          {data.map((item, index) => {
            return (
              <Button
                text={item.name}
                bgColor={index == selected ? "bg-secondary" : "bg-primary"}
                borderRadius={6}
                key={index}
                customStyle={"text-white text-tiny md:text-smaller"}
                w={"140px"}
                h={"60px"}
                onClick={() => {
                  setSelected(index);
                  sliderRef.current.slickGoTo(index);
                }}
              />
            );
          })}
        </Slider>
      </div>
      <div className="col-span-3 flex max-md:justify-center md:justify-end items-center">
        <Button
          text={data[selected].name}
          borderRadius={6}
          icon={<MdArrowForward className="text-med text-secondary" />}
          customStyle={"text-tiny md:text-smaller !border-2"}
          textColor={"text-secondary"}
          borderColor={"rgb(170 138 58)"}
          w={"280px"}
          h={"60px"}
          onClick={() => {
            window.open(data[selected].url, "_blank", "noopener,noreferrer");
          }}
        />
      </div>
    </div>
  );
};

export default PropertiesNavigator;

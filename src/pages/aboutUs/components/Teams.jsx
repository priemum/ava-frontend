import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { useGetActiveTeamsQuery } from "../../../redux/teams/teamsSlice";
import {
  SampleNextArrow,
  SamplePrevArrow,
} from "../../../components/UI/SliderArrows";
const Teams = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef();
  const {
    data: teams,
    isLoading: teamsIsLoading,
    isFetching: teamsIsFetching,
    isSuccess: teamsIsSuccess,
    isError: teamsIsError,
    error: teamsError,
  } = useGetActiveTeamsQuery();
  //   const [,{}]=
  return (
    teamsIsSuccess && (
      <div className="overflow-x-hidden grid grid-cols-3 px-[5%]">
        <div className="col-span-1 flex flex-col justify-center items-start">
          <p className="text-big font-bold md:w-[85%]">
            Find out who is behind AVA realestate
          </p>
          <p className="text-small md:w-[90%]">
            Lorem ipsum dolor sit amet . The graphic and typographic operators
            know this well, in reality all the professions dealing with the
            universe of communication have a stable relationship Lorem ipsum
            dolor sit amet .
          </p>
        </div>
        <div className="col-span-2 space-y-4">
          <div>
            <Slider
              ref={sliderRef}
              dots={false}
              arrows={true}
              infinite={false}
              touchMove={false}
              slidesToShow={teams.ids.length < 4 ? teams.ids.length : 4}
              slidesToScroll={1}
              className="overflow-hidden h-full w-full"
              initialSlide={currentSlide}
              nextArrow={<SampleNextArrow />}
              prevArrow={<SamplePrevArrow />}
            >
              {teams.ids.map((item, index) => {
                return (
                  <div className="w-full !flex justify-center items-center">
                    <div
                      key={index}
                      className={`w-full max-w-[90%] py-3 px-2 text-center font-semibold ${
                        currentSlide == index
                          ? "bg-buttonGrad !text-primary"
                          : "bg-primary/50 text-white"
                      } cursor-pointer transition-all bg-primary/50 text-white duration-500 rounded-md`}
                      onClick={() => {
                        sliderRef.current.slickGoTo(index);
                        setCurrentSlide(index);
                      }}
                    >
                      {teams.entities[item]?.Title}
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
          <div>
            <Slider
              dots={false}
              arrows={true}
              infinite={false}
              touchMove={false}
              slidesToShow={teams.ids.length < 4 ? teams.ids.length : 4}
              slidesToScroll={1}
              className="overflow-hidden h-full w-full"
              initialSlide={currentSlide}
              nextArrow={<SampleNextArrow />}
              prevArrow={<SamplePrevArrow />}
            ></Slider>
          </div>
        </div>
      </div>
    )
  );
};

export default Teams;

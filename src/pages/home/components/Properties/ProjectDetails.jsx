import React from "react";
import { MdLocationPin, MdPayment } from "react-icons/md";
import medal from "../../../../assets/icons/medal.svg";
import GradientText from "../../../../components/UI/GradientText";
import Slider from "react-slick";
const ProjectDetails = ({
  title,
  description,
  plans,
  location,
  startingPrice,
}) => {
  return (
    <div className="py-1 text-tiny 2xl:text-smaller w-full">
      <GradientText text={title} customStyle={"font-semibold text-big"} />
      <div className="place-items-center">
        <div className="max-md:py-2 ">
          <p>{description}</p>
        </div>
        <br />
        <div className="flex gap-x-8 2xl:gap-x-16 px-2">
          <div className="flex text-tiny sm:text-smaller items-center gap-x-2 sm:gap-x-3">
            <MdPayment className="text-med" />
            <div>
              <p className="font-semibold">{startingPrice}</p>
              <p className="text-[14px] sm:text-tiny font-extralight">
                Starting Price
              </p>
            </div>
          </div>
          <div className="flex text-tiny sm:text-smaller items-center gap-x-2 sm:gap-x-3">
            <MdLocationPin className="text-med" />
            <div>
              <p className="font-semibold">{location}</p>
              <p className="text-[14px] sm:text-tiny font-extralight">
                Location
              </p>
            </div>
          </div>
        </div>
        <br />
        {/* <div className="max-lg:md:grid max-lg:md:grid-cols-2 xl:grid xl:grid-cols-2 gap-7 max-md:space-y-5"> */}
        <div className="py-4">
          <Slider
            touchMove={true}
            slidesToShow={2}
            slidesToScroll={2}
            // rows={2}
            dots={true}
            arrows={false}
            infinite={false}
            autoplay={false}
            responsive={[
              {
                breakpoint: 3000,
                settings: {
                  slidesToShow: 2,
                  rows: 2,
                },
              },
              {
                breakpoint: 1100,
                settings: {
                  slidesToShow: 2,
                },
              },
              {
                breakpoint: 590,
                settings: {
                  slidesToShow: 1,
                  centerMode: true,
                  centerPadding: "60px",
                },
              },
              {
                breakpoint: 400,
                settings: {
                  slidesToShow: 1,
                  centerMode: true,
                  centerPadding: "20px",
                },
              },
            ]}
            className="w-full h-full py-1"
          >
            {plans?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="bg-gray-200 max-w-[90%] mb-5 rounded-md px-6 py-8 text-smaller space-y-6"
                >
                  <div className="flex items-center gap-4">
                    <img src={medal} className="h-6 w-6" alt="" />
                    <p className="font-semibold text-secondary"> {item.name}</p>
                  </div>
                  <ul className="list-disc ml-7 marker:text-primary marker:text-small">
                    {item.postHandover && (
                      <li>{item.postHandover} Post Handover</li>
                    )}
                    {item.onBooking && <li>{item.onBooking} On Booking</li>}
                    {item.duringConstruction && (
                      <li>{item.duringConstruction} During Construction</li>
                    )}
                    {item.onHandover && <li>{item.onHandover} On Handover</li>}
                  </ul>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;

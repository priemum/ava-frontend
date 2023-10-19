import React, { useState, useEffect } from "react";
import colors from "../../../../settings";
import Button from "../../../../components/UI/Button";
import testIMG from "../../../../assets/images/home/amber.webp";
import Slider from "react-slick";
import { useGetActiveAnnouncementsQuery } from "../../../../redux/announcements/announcementsSlice";
const Announcements = () => {
  const { data, isLoading, isFetching, isSuccess, isError, error } =
    useGetActiveAnnouncementsQuery();
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      let tempScroll =
        window.scrollY > 2000 && window.scrollY < 3000 ? window.scrollY : 0;

      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  return (
    // isSuccess && (
    <div className="mt-24 px-[5%] overflow-hidden">
      <div
        style={{
          background: `linear-gradient(279deg, ${colors.secondary} -33.22%, ${colors.primary} 41.05%)`,
        }}
        className="rounded-md"
      >
        <Slider
          slidesToScroll={1}
          slidesToShow={1}
          arrows={false}
          className="!w-full !h-[400px]"
        >
          {/* {data.ids.map((item, index) => {
              return ( */}
          <div
            //   key={index}
            className="w-full h-[400px] !grid !grid-cols-2 place-items-center"
          >
            <div className="flex-1 p-8 xl:px-12 2xl:px-16 space-y-7">
              <p className="text-white font-bold text-big xl:w-[80%]">
                Find the best place for you and your family
              </p>
              <Button
                bgColor={"bg-buttonGrad"}
                text={"More Details"}
                textColor={"text-primary text-tiny"}
                customStyle={"p-4"}
                w={"200px"}
                h={"45px"}
                borderRadius={4}
              />
            </div>
            <div className="h-[350px] w-[500px] flex-1 justify-center items-center relative ">
              <div
                className={`h-[350px] w-[500px] absolute top-0 left-1/2 -translate-x-1/2 p-1 bg-white origin-bottom-left rounded-md ease-out`}
                style={{
                  rotate: (scrollY - 1500) / 100 + "deg",
                  transform: "translate(" + -(scrollY - 500) / 10 + "px, 0px)",
                }}
              >
                <img
                  // src={data.entities[item].Image.URL}
                  src={testIMG}
                  alt="Announcement Image"
                  className="h-full w-full bg-cover bg-center rounded-md"
                />
              </div>
            </div>
          </div>
          {/* );
            })} */}
        </Slider>
      </div>
    </div>
    // )
  );
};

export default Announcements;

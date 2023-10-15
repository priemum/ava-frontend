import React, { useRef, useState } from "react";
import { data } from "../../../../data/projectsData";
import useWindowDimensions from "../../../../hooks/screenDimentions";
import Slider from "react-slick";
import PropertiesNavigator from "./PropertiesNavigator";
import ProjectDetails from "./ProjectDetails";
import PropertyCard from "./PropertyCard";
const Properties = () => {
  const { width } = useWindowDimensions();
  const [selected, setSelected] = useState(0);
  const sliderRef = useRef();
  return (
    <div className="rounded-md mx-[2%] lg:mx-[5%] px-[2%] -mt-10 lg:-mt-24 relative bg-white">
      <PropertiesNavigator
        selected={selected}
        setSelected={setSelected}
        sliderRef={sliderRef}
      />
      <div
        style={{
          width: width - (width * 11) / 100,
          maxWidth: "1920px",
        }}
      >
        <Slider
          ref={sliderRef}
          touchMove={false}
          slidesToShow={1}
          slidesToScroll={1}
          dots={false}
          arrows={false}
          infinite={false}
          autoplay={false}
        >
          {data.map((item, index) => {
            return (
              <div key={index}>
                <div className="lg:grid lg:grid-cols-12 gap-x-5 lg:mt-12">
                  <div className="col-span-5">
                    <ProjectDetails
                      title={item.title}
                      description={item.description}
                      // plan={item.plan}
                      plans={item.plans}
                      location={item.location}
                      startingPrice={item.startingPrice}
                    />
                  </div>

                  <div className="col-span-7 max-lg:mt-7">
                    <Slider
                      touchMove={true}
                      slidesToShow={2}
                      slidesToScroll={2}
                      rows={2}
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
                          breakpoint: 1200,
                          settings: {
                            slidesToShow: 2,
                            rows: 1,
                          },
                        },
                        {
                          breakpoint: 590,
                          settings: {
                            slidesToShow: 1,
                            rows: 1,
                            centerMode: true,
                            centerPadding: "30px",
                          },
                        },
                        {
                          breakpoint: 400,
                          settings: {
                            slidesToShow: 1,
                            row: 1,
                            centerMode: true,
                            centerPadding: "20px",
                          },
                        },
                      ]}
                      className="w-full h-full"
                    >
                      {item.propertes.map((i, idx) => {
                        return (
                          <div key={idx} className="mb-5">
                            <PropertyCard
                              image={i.image}
                              area={i.area}
                              bathsNumber={i.bathsNumber}
                              bedroomNumber={i.bedroomNumber}
                              startingPrice={i.startingPrice}
                              name={i.name}
                              smallDescription={i.smallDescription}
                            />
                          </div>
                        );
                      })}
                    </Slider>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};
export default Properties;

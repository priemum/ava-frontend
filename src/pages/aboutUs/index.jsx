import React, { useEffect } from "react";
import aboutIcon from "../../assets/icons/about.svg";
import Logo from "../../assets/logos/black-logo.svg";
import { data } from "../../data/aboutUsData";
import Header from "./components/Header";
import Head from "../../components/Layout/PageContainer/Head";

const AboutUsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const MissionCard = ({ title, text, icon }) => {
    return (
      <div className="w-[90%] space-y-4">
        <div className="flex justify-start items-center gap-x-2">
          <div
            style={{
              background:
                "linear-gradient(120.27deg, rgba(111, 111, 111, 0.24), 60%, rgba(22, 21, 53, 1) 100%)",
            }}
            className="p-3 rounded-xl shadow-md"
          >
            <img src={icon} alt="icon" />
          </div>
          <p className="font-semibold text-small">{title}</p>
        </div>
        <p className="text-tiny">{text}</p>
      </div>
    );
  };
  const MemberCard = ({ name, image, description, title, flip }) => {
    return (
      <div
        style={{
          background: "linear-gradient(290deg, #DDB26E -0%, #171534 50%)",
        }}
        className="rounded-md"
        dir={flip ? "rtl" : "ltr"}
      >
        <div className="grid grid-cols-2 place-items-center rounded-md bg-membersLinesBg bg-no-repeat bg-left bg-cover ">
          <img
            src={image}
            alt=""
            className={`drop-shadow-2xl max-md:col-span-2 h-[500px] lg:h-[650px] rounded-md bg-white p-1 max-md:-mt-20 md:-translate-y-20`}
          />

          <div dir="ltr" className="p-12 text-white max-md:col-span-2 ">
            <p className="text-primary font-semibold text-big">{name} </p>
            <p className="text-small">{title} </p>
            <p className="py-2 text-smaller font-light">{description} </p>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <Head
        title={"About us"}
        desc={
          "Best Offers for homes in Dubai. Secondary Market and off plan projects."
        }
        keywords={
          "About Ava Real Esatate, Best Real Estate Agency, Dubai Real Esate, Dubai Properties"
        }
        canonicalLink={"/about-us"}
      />
      <Header />
      <div className="max-md:flex max-md:flex-col max-md:justify-center max-md:items-center md:grid md:grid-cols-12 gap-7 mt-20 max-md:px-[5%] ">
        <div className="col-span-5 w-[85%] md:w-[90%] 2xl:w-[80%] relative place-self-center">
          <div
            style={{
              background: "rgba(111, 111, 111, 0.24)",
            }}
            className="h-[140px] w-[140px] rounded-md rounded-tr-full backdrop-blur-[15px] absolute -right-[10%] -top-[10%]"
          />
          <img
            src={data.mission.image}
            alt="Mission"
            className="h-[400px] md:h-[600px] rounded-md"
          />
          <div
            style={{
              background:
                "linear-gradient(225deg, rgba(98, 98, 98, 0.24) 0%, rgba(98, 98, 98, 0.03) 100%)",
            }}
            className=" h-[200px] w-[80%] backdrop-blur-[15px] absolute z-20 -bottom-[10%] left-[10%] flex justify-center items-center rounded-md"
          >
            <div className="text-small text-white font-semibold px-2">
              <p>Our goal is to provide</p>
              <p>best offers for homes in Dubai</p>
            </div>
            <div className="w-[60px] h-[60px] bg-primary rounded-md -mt-52 flex justify-center items-center absolute right-2 ">
              <img src={aboutIcon} alt="About Us" />
            </div>
          </div>
        </div>
        <div className="col-span-7 space-y-4 max-md:mt-7">
          <p className="text-bigger font-bold"> {data.mission.title} </p>
          <p>{data.mission.description}</p>
          <div className="md:grid md:grid-cols-2 md:gap-7 max-md:space-y-7">
            {data.mission.items.map((item, index) => {
              return (
                <MissionCard
                  key={index}
                  title={item.title}
                  icon={item.icon}
                  text={item.description}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="max-md:flex max-md:flex-col max-md:justify-center max-md:items-center md:grid md:grid-cols-12 gap-7 mt-20 max-md:px-[5%] ">
        <div className="col-span-6 md:w-[80%] relative place-self-center space-y-4">
          <p className="text-bigger font-bold"> {data.vision.title} </p>
          <p className="text-small">{data.vision.description}</p>
          <ul className="list-disc ml-7 space-y-14 marker:text-primary list-outside pt-12">
            {data.vision.items.map((item, index) => {
              return <li key={index}>{item.text}</li>;
            })}
          </ul>
        </div>
        <div className="col-span-6 md:w-[80%] place-items-center space-y-7 relative">
          <div
            className="h-[550px] lg:h-[630px] max-xl:w-[240px] xl:w-[300px] 2xl:w-[390px] flex-shrink-0 rounded-lg backdrop-blur-[15px] absolute max-xl:right-0 xl:right-2 2xl:right-8 top-[4%] lg:top-[7%] flex flex-col justify-between items-center px-10 py-16"
            style={{
              background:
                "linear-gradient(225deg, rgba(98, 98, 98, 0.24) 0%, rgba(98, 98, 98, 0.03) 100%)",
            }}
          >
            <p className="text-white text-small font-semibold">
              There is a new way to search for a house
            </p>

            <img src={Logo} alt="Logo" className="h-[135px] w-[185px]" />
          </div>
          <img
            src={data.vision.imageOne}
            className="h-[250px] lg:h-[320px] w-full rounded-md"
            alt="Vision 1"
          />
          <img
            src={data.vision.imageTwo}
            className="h-[250px] lg:h-[320px] w-[40%] rounded-md"
            alt="Vision 2"
          />
          <img
            src={data.vision.imageThree}
            className="h-[250px] lg:h-[320px] w-full rounded-md"
            alt="Vision 3"
          />
        </div>
      </div>
      <br />
      <br />
      <div className="px-[5%] xl:px-[10%] 2xl:px-[15%] py-16 space-y-28">
        {data.founnders.map((item, index) => {
          return (
            <MemberCard
              key={index}
              image={item.image}
              name={item.name}
              title={item.title}
              description={item.description}
              flip={index % 2 !== 0}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AboutUsPage;

import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
// import Properties from "./components/Properties";
import { Helmet } from "react-helmet";
import HomeFilter from "./components/Filter/Filter";
import HomeProperties from "./components/Properties";
import Announcements from "./components/Announcements";
import HomeAddresses from "./components/Addresses";
const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Helmet>
        <html lang="en" />
        <meta charset="UTF-8" />
        <meta name="title" content="Ava Real Estate" />
        <meta
          name="description"
          content="Explore premium properties in Dubai with AVA Real Estate, your trusted brokerage agency. Discover exquisite homes, apartments, and commercial spaces for buy or rent. Our expert agents ensure a seamless real estate experience, guiding you through the vibrant Dubai market."
        />
        <meta
          name="keywords"
          content="Dubai Real Estate, Brokerage Agency, Property Listings, Homes for Sale, Apartments for Rent, Commercial Spaces, Expert Agents, Dubai Property Market, AVA Real Estate Dubai, offplan, Dubai properties, properties for sale Dubai, apartements for sale duabi, best real estate agency, buy apartment in dubai, buy home in dubai, buy home with installment, home investment, invest in properties Dubai"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="./src/assets/logos/AVA-Logo.svg"
        />
        <title>AVA REAL ESTATE</title>
      </Helmet>
      <Header />
      <HomeFilter />
      <HomeProperties />
      <Announcements />
      <HomeAddresses />
      {/* <div className="w-full h-24" /> */}
    </div>
  );
};

export default HomePage;

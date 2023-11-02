import React from "react";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";

const ContactInfo = () => {
  return (
    <div className="text-white space-y-8 text-smaller font-semibold">
      <p className="text-bold text-big font-bold">Contact Information </p>
      <div className="flex items-center gap-x-4">
        <MdLocationOn size={24} />
        <p>
          Office 609, Clover Bay Tower - 6a Marasi Dr - Business Bay - Dubai
        </p>
      </div>
      <div className="flex items-center gap-x-4">
        <MdEmail size={24} />
        <p> info@avarealestate.ae</p>
      </div>
      <div className="flex items-center gap-x-4">
        <MdPhone size={24} />
        <p>+971501108606</p>
      </div>
    </div>
  );
};

export default ContactInfo;

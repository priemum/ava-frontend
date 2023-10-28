import React from "react";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";

const ContactInfo = () => {
  return (
    <div className="text-white space-y-8 text-smaller">
      <p className="text-bold text-big">Contact Information </p>
      <div className="flex items-center gap-x-4">
        <MdLocationOn size={24} />
        <p>Address - Street - District Building No</p>
      </div>
      <div className="flex items-center gap-x-4">
        <MdEmail size={24} />
        <p> name@mail.com</p>
      </div>
      <div className="flex items-center gap-x-4">
        <MdPhone size={24} />
        <p>065486264841 - 545631654653</p>
      </div>
    </div>
  );
};

export default ContactInfo;

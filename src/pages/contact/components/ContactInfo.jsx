import React from "react";
import { useTranslation } from "react-i18next";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";

const ContactInfo = () => {
  const { t } = useTranslation();
  return (
    <div className="text-white space-y-8 text-tiny 2xl:text-smaller font-semibold">
      <p className="text-bold text-med font-bold">{t("ContactInformation")}</p>
      <div className="flex items-center gap-x-4">
        <MdLocationOn size={24} />
        <p>{t("OfficeAddress")}</p>
      </div>
      <div className="flex items-center gap-x-4">
        <MdEmail size={24} />
        <p> {t("AvaEmail")} </p>
      </div>
      <div className="flex items-center gap-x-4">
        <MdPhone size={24} />
        <p>+971501108606</p>
      </div>
    </div>
  );
};

export default ContactInfo;

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Filter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { t, i18n } = useTranslation();
  return (
    <div className="h-full m-8 rounded-lg shadow-md bg-white">
      <div className="flex flex-col space-y-2 p-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t("Search")}
          className="bg-[#F6F6F6] w-full rounded-md p-2 shadow-sm"
        />
        <button className="w-full p-2 rounded-md shadow-sm bg-secondary font-semibold">
          {t("Search")}
        </button>
      </div>
      <div className="h-px w-full bg-primary/20" />
      <div className="flex flex-col p-8 space-y-2">
        <p className="font-semibold text-smaller">{t("Price")}:</p>
      </div>
    </div>
  );
};

export default Filter;

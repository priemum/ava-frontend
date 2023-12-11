import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomInput from "../../../components/Forms/CustomInput";
import { MdSearch } from "react-icons/md";
import { useTranslation } from "react-i18next";

const SearchJob = () => {
  const { search } = useParams();
  const [searchTerm, setSearchTerm] = useState(search ?? "");
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  return (
    <div className="w-[80%] lg:w-[50%] h-[25vh] bg-ServicesBackGround backdrop-blur-[21px] rounded-md shadow-lg -mt-[12.5vh] p-8 flex flex-col justify-evenly ">
      <p className="text-white font-bold text-smaller">{t("SearchForAJob")}</p>
      <CustomInput
        placeholder={t("SearchForAJob")}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        icon={<MdSearch className="text-small text-white" />}
        reverseIcon
      />
      <button
        disabled={searchTerm.replace(/ /g, "") == ""}
        className="bg-secondary w-full text-primary font-semibold rounded-md px-8 py-2 disabled:bg-gray-500"
        onClick={() => {
          navigate(`/jobs/${searchTerm}`);
        }}
      >
        {t("Search")}
      </button>
    </div>
  );
};

export default SearchJob;

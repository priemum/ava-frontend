import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomInput from "../../../components/Forms/CustomInput";
import { MdSearch } from "react-icons/md";

const SearchArticle = () => {
  const { search } = useParams();
  const [searchTerm, setSearchTerm] = useState(search ?? "");
  const navigate = useNavigate();
  return (
    <div className="w-[50vw] h-[25vh] bg-ServicesBackGround backdrop-blur-[21px] rounded-md shadow-lg -mt-[12.5vh] p-8 flex flex-col justify-evenly ">
      <p className="text-white font-bold text-smaller">Search For An Article</p>
      <CustomInput
        placeholder={"Search For Article"}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        icon={<MdSearch className="text-small text-white" />}
        reverseIcon
      />
      <button
        disabled={searchTerm.replace(/ /g, "") == ""}
        className="bg-secondary w-full text-primary font-semibold rounded-md px-8 py-2 disabled:bg-gray-500"
        onClick={() => {
          navigate(`/articles/${searchTerm}`);
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchArticle;

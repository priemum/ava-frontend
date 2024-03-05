import React from "react";
import Filter from "./components/Filter";
import PropertiesList from "./components/PropertiesList";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { showFilterModal, showModal } from "../../redux/modal.slice";

const PropertiesPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <div className="bg-[#F6F6F6] flex min-h-screen pt-20 pb-12">
      <div className="w-full max-w-[25vw] max-xl:hidden top-[5vh] left-0 h-full">
        <Filter />
      </div>
      <div className="w-full xl:w-[75vw] flex flex-col justify-center items-center">
        <div className="w-full flex justify-end items-end p-4 lg:p-8 xl:hidden">
          <button
            className="w-[200px] p-2 rounded-md shadow-sm bg-buttonGrad font-semibold"
            onClick={() => {
              dispatch(
                showFilterModal({
                  data: (
                    <Filter
                      containerStyle={
                        "!m-0 !w-full !h-full !-z-10 !rounded-none"
                      }
                    />
                  ),
                })
              );
            }}
          >
            {t("Filter")}
          </button>
        </div>
        <PropertiesList />
      </div>
    </div>
  );
};

export default PropertiesPage;

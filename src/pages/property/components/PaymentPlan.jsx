import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

const PaymentPlan = ({ data, unitPrice }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mb-12 rounded-xl bg-white p-4 lg:p-8 flex flex-col justify-start items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-start w-full text-smaller">
        <p className="col-span-full font-bold text-smaller">
          {t("PaymentPlan")}
        </p>

        <p className="text-tiny">
          <span className="text-[#6A6A6A]">{t("DownPayment")}:</span>
          {data.DownPayemnt}
        </p>
        <p className="text-tiny">
          <span className="text-[#6A6A6A]">{t("DuringConstructionM")}:</span>
          {data.DuringConstructionMonths}
        </p>
        <p className="text-tiny">
          <span className="text-[#6A6A6A]">
            {t("DuringConstructionPercentage")}:
          </span>
          {data.DuringConstructionPercentage}
        </p>
        <p className="text-tiny">
          <span className="text-[#6A6A6A]">{t("HandoverDate")}: </span>
          {data.HandoverDate.split("T")[0]}
        </p>
        <p className="text-tiny">
          <span className="text-[#6A6A6A]">{t("OnHandoverPercentage")}: </span>
          {data.OnHandoverPercentage}
        </p>
        <p className="text-tiny">
          <span className="text-[#6A6A6A]">{t("Posthandover")}: </span>
          {data.Posthandover ? "YES" : "NO"}
        </p>
        <p className="text-tiny">
          <span className="text-[#6A6A6A]">{t("NoOfPosthandoverMonths")}:</span>
          {data.Posthandover ? data.NoOfPosthandoverMonths : "-"}
        </p>
        <p className="text-tiny">
          <span className="text-[#6A6A6A]">{t("PosthandoverPercentage")}:</span>
          {data.Posthandover ? data.PosthandoverPercentage : "-"}
        </p>
        <p className="text-tiny">
          <span className="text-[#6A6A6A]">{t("TotalInstallments")}: </span>
          {data.TotalMonths}
        </p>
      </div>
      <div className="h-px bg-[#CFCFCF] w-[95%] my-8" />

      <div className="text-start w-full text-smaller space-y-6">
        <div
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="cursor-pointer flex justify-start items-center gap-x-3"
        >
          <p className="col-span-full font-bold">{t("Installments")}</p>
          {isOpen ? (
            <MdExpandLess className="text-small" />
          ) : (
            <MdExpandMore className="text-small" />
          )}
        </div>
        <div
          className={`max-w-[calc(100vw-4.5rem)] overflow-auto transition-all duration-300 h-full ${
            isOpen ? "max-h-[1000px]" : "max-h-[0px]"
          } `}
        >
          <table className="w-full">
            <tbody>
              <tr className="border-black/30 border-y-[2px] text-tiny text-center ">
                {/* <th className="p-4 border-black/30 border-y-2">Number</th> */}
                <th className="p-2 lg:p-4 border-black/30 border-y-[2px] sticky -top-1 backdrop-blur-sm">
                  {t("Description")}
                </th>
                <th className="p-2 lg:p-4 border-black/30 border-y-[2px] sticky -top-1 backdrop-blur-sm">
                  {t("Payment")} %
                </th>
                <th className="p-2 lg:p-4 border-black/30 border-y-[2px] sticky -top-1 backdrop-blur-sm">
                  {t("Amount")}
                </th>
                <th className="p-2 lg:p-4 border-black/30 border-y-[2px] sticky -top-1 backdrop-blur-sm">
                  {t("Date")}
                </th>
              </tr>
              {data?.Installments?.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="border-black/30 border-y-[2px] text-tiny text-center"
                  >
                    {/* <td className="p-4 border-black/30  font-bold">
                    {item.Number}
                  </td> */}
                    <td className={`p-4 border-black/30 border-y-[2px]`}>
                      {
                        item.Installments_Translation.find(
                          (x) => x.Language.Code == "En"
                        ).Description
                      }
                    </td>
                    <td
                      className={`p-4 border-black/30 border-y-[2px] whitespace-nowrap`}
                    >
                      {item.PercentageOfPayment + "%"}
                    </td>
                    <td
                      className={`p-4 border-black/30 border-y-[2px] whitespace-nowrap`}
                    >
                      {(unitPrice / 100) * item.PercentageOfPayment}
                    </td>
                    <td
                      className={`p-4 border-black/30 border-y-[2px] whitespace-nowrap`}
                    >
                      {item.Date.split("T")[0]}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentPlan;

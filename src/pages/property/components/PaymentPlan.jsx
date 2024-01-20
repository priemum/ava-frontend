import React from "react";
import { useTranslation } from "react-i18next";

const PaymentPlan = ({ data, unitPrice }) => {
  const { t } = useTranslation();
  return (
    <div className="mb-12 rounded-xl bg-white p-4 lg:p-8 flex flex-col justify-start items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-start w-full text-smaller">
        <p className="col-span-full font-bold">{t("PaymentPlan")}</p>

        <p>
          <span className="text-[#6A6A6A]">{t("DownPayment")}:</span>
          {data.DownPayemnt}
        </p>
        <p>
          <span className="text-[#6A6A6A]">{t("DuringConstructionM")}:</span>
          {data.DuringConstructionMonths}
        </p>
        <p>
          <span className="text-[#6A6A6A]">
            {t("DuringConstructionPercentage")}:
          </span>
          {data.DuringConstructionPercentage}
        </p>
        <p>
          <span className="text-[#6A6A6A]">{t("HandoverDate")}: </span>
          {data.HandoverDate.split("T")[0]}
        </p>
        <p>
          <span className="text-[#6A6A6A]">{t("OnHandoverPercentage")}: </span>
          {data.OnHandoverPercentage}
        </p>
        <p>
          <span className="text-[#6A6A6A]">{t("Posthandover")}: </span>
          {data.Posthandover ? "YES" : "NO"}
        </p>
        <p>
          <span className="text-[#6A6A6A]">{t("NoOfPosthandoverMonths")}:</span>
          {data.Posthandover ? data.NoOfPosthandoverMonths : "-"}
        </p>
        <p>
          <span className="text-[#6A6A6A]">{t("PosthandoverPercentage")}:</span>
          {data.Posthandover ? data.PosthandoverPercentage : "-"}
        </p>
        <p>
          <span className="text-[#6A6A6A]">{t("TotalInstallments")}: </span>
          {data.TotalMonths}
        </p>
      </div>
      <div className="h-px bg-[#CFCFCF] w-[95%] my-8" />

      <div className="text-start w-full text-smaller space-y-6">
        <p className="col-span-full font-bold">{t("Installments")} </p>
        <div className="max-w-[calc(100vw-4.5rem)] overflow-auto">
          <table className="w-full">
            <tbody>
              <tr className="border-black/30 border-y-[2px] text-tiny md:text-smaller text-center">
                {/* <th className="p-4 border-black/30 border-y-2">Number</th> */}
                <th className="p-2 lg:p-4 border-black/30 border-y-[2px]">
                  {t("Description")}
                </th>
                <th className="p-2 lg:p-4 border-black/30 border-y-[2px]">
                  {t("PercentageOfPayment")}
                </th>
                <th className="p-2 lg:p-4 border-black/30 border-y-[2px]">
                  {t("Amount")}
                </th>
                <th className="p-2 lg:p-4 border-black/30 border-y-[2px]">
                  {t("Date")}
                </th>
              </tr>
              {data?.Installments?.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="border-black/30 border-y-[2px] text-tiny md:text-smaller text-center"
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

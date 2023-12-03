import React from "react";

const PaymentPlan = ({ data, unitPrice }) => {
  return (
    <div className="my-12 rounded-xl bg-white p-8 flex flex-col justify-start items-center">
      <div className="grid grid-cols-3 gap-6 text-start w-full text-smaller">
        <p className="col-span-full font-bold">Payment Plan </p>

        <p>
          <span className="text-[#6A6A6A]">Down Payment: </span>
          {data.DownPayemnt}
        </p>
        <p>
          <span className="text-[#6A6A6A]">During Construction /M: </span>
          {data.DuringConstructionMonths}
        </p>
        <p>
          <span className="text-[#6A6A6A]">During Construction %: </span>
          {data.DuringConstructionPercentage}
        </p>
        <p>
          <span className="text-[#6A6A6A]">Hanover Date: </span>
          {data.HandoverDate.split("T")[0]}
        </p>
        <p>
          <span className="text-[#6A6A6A]">On Handover %: </span>
          {data.OnHandoverPercentage}
        </p>
        <p>
          <span className="text-[#6A6A6A]">Post Handover: </span>
          {data.Posthandover ? "YES" : "NO"}
        </p>
        <p>
          <span className="text-[#6A6A6A]">Post Handover No /M: </span>
          {data.Posthandover ? data.NoOfPosthandoverMonths : "-"}
        </p>
        <p>
          <span className="text-[#6A6A6A]">Post Handover %: </span>
          {data.Posthandover ? data.PosthandoverPercentage : "-"}
        </p>
        <p>
          <span className="text-[#6A6A6A]">Total Installments: </span>
          {data.TotalMonths}
        </p>
      </div>
      <div className="h-px bg-[#CFCFCF] w-[95%] my-8" />

      <div className="text-start w-full text-smaller space-y-6">
        <p className="col-span-full font-bold">Installments </p>
        <table className="w-full">
          <tbody>
            <tr className="border-black/30 border-y-[2px] text-tiny md:text-smaller text-center">
              {/* <th className="p-4 border-black/30 border-y-2">Number</th> */}
              <th className="p-4 border-black/30 border-y-[2px]">
                Description
              </th>
              <th className="p-4 border-black/30 border-y-[2px]">
                Percentage Of Payment
              </th>
              <th className="p-4 border-black/30 border-y-[2px]">Amount</th>
              <th className="p-4 border-black/30 border-y-[2px]">Date</th>
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
                  <td className={`p-4 border-black/30 border-y-[2px]`}>
                    {item.PercentageOfPayment}
                  </td>
                  <td className={`p-4 border-black/30 border-y-[2px]`}>
                    {(unitPrice / 100) * item.PercentageOfPayment}
                  </td>
                  <td className={`p-4 border-black/30 border-y-[2px]`}>
                    {item.Date.split("T")[0]}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentPlan;

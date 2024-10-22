"use client";
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import DefaultSelectOption from "./DefaultSelectOption";

const BarCharts = () => {
  const [totalSalesData, setTotalSalesData] = useState(Array(12).fill(0));
  const [totalDueAmount, setTotalDueAmount] = useState(0);
  const [timePeriod, setTimePeriod] = useState("Monthly"); // State for time period
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/payments`);
        const data = await response.json();

        const monthlySales = Array(12).fill(0);
        const yearlySales = Array(5).fill(0); // Assuming you want data for the last 5 years
        let dueAmount = 0;

        data.forEach(payment => {
          const date = new Date(payment.date);
          const month = date.getMonth();
          const year = date.getFullYear();

          if (payment.transactionId === "Cash on Delivery") {
            dueAmount += payment.totalAmount;
          } else {
            if (timePeriod === "Monthly") {
              monthlySales[month] += payment.totalAmount;
            } else if (timePeriod === "Yearly") {
              const currentYear = new Date().getFullYear();
              const yearIndex = currentYear - year; // Calculate the index for the last 5 years
              if (yearIndex >= 0 && yearIndex < yearlySales.length) {
                yearlySales[yearIndex] += payment.totalAmount;
              }
            }
          }
        });

        if (timePeriod === "Monthly") {
          setTotalSalesData(monthlySales);
        } else {
          setTotalSalesData(yearlySales);
        }
        setTotalDueAmount(dueAmount);
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
    };

    fetchPayments();
  }, [baseUrl, timePeriod]); // Add timePeriod to the dependency array

  const handlePeriodChange = (selectedPeriod) => {
    setTimePeriod(selectedPeriod);
  };

  const series = [
    {
      name: "Received Amount",
      data: totalSalesData,
    },
    {
      name: "Due Amount",
      data: Array(totalSalesData.length).fill(totalDueAmount),
    },
  ];

  const options = {
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#5750F1", "#0ABEF9"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      height: 310,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    fill: {
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: timePeriod === "Monthly"
        ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        : ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"], // Adjust as needed for yearly
    },
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
    },
  };

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-7 p-5">
      <div className="mb-3.5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">Payments Overview</h4>
        <div className="flex items-center gap-2.5">
          <p className="font-medium uppercase text-dark dark:text-dark-6">Short by:</p>
          <DefaultSelectOption options={["Monthly", "Yearly"]} onChange={handlePeriodChange} />
        </div>
      </div>
      <div>
        <div className="-ml-4 -mr-5">
          <ReactApexChart options={options} series={series} type="area" height={310} />
        </div>
      </div>

      <div className="flex flex-col gap-2 text-center xsm:flex-row xsm:gap-0">
        <div className="border-stroke dark:border-dark-3 xsm:w-1/2 xsm:border-r">
          <p className="font-medium">Received Amount</p>
          <h4 className="mt-1 text-xl font-bold text-dark dark:text-white">
            ${totalSalesData.reduce((acc, val) => acc + val, 0).toLocaleString() || "0.00"}
          </h4>
        </div>
        <div className="xsm:w-1/2">
          <p className="font-medium">Due Amount</p>
          <h4 className="mt-1 text-xl font-bold text-dark dark:text-white">
            ${totalDueAmount.toLocaleString() || "0.00"}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default BarCharts;









// "use client";
// import React from "react";
// import ReactApexChart from "react-apexcharts";
// import DefaultSelectOption from "./DefaultSelectOption";

// const BarCharts = ({ totalPrice }) => {
//   const series = [
//     {
//       name: "Received Amount",
//       data: [0, 20, 35, 45, 35, 55, 65, 50, 65, 75, 60, 75],
//     },
//     {
//       name: "Due Amount",
//       data: [15, 9, 17, 32, 25, 68, 80, 68, 84, 94, 74, 62],
//     },
//   ];

//   const options = {
//     legend: {
//       show: false,
//       position: "top",
//       horizontalAlign: "left",
//     },
//     colors: ["#5750F1", "#0ABEF9"],
//     chart: {
//       fontFamily: "Satoshi, sans-serif",
//       height: 310,
//       type: "area",
//       toolbar: {
//         show: false,
//       },
//     },
//     fill: {
//       gradient: {
//         opacityFrom: 0.55,
//         opacityTo: 0,
//       },
//     },
//     responsive: [
//       {
//         breakpoint: 1024,
//         options: {
//           chart: {
//             height: 300,
//           },
//         },
//       },
//       {
//         breakpoint: 1366,
//         options: {
//           chart: {
//             height: 320,
//           },
//         },
//       },
//     ],
//     stroke: {
//       curve: "smooth",
//     },
//     markers: {
//       size: 0,
//     },
//     grid: {
//       strokeDashArray: 5,
//       xaxis: {
//         lines: {
//           show: false,
//         },
//       },
//       yaxis: {
//         lines: {
//           show: true,
//         },
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     tooltip: {
//       fixed: {
//         enabled: false,
//       },
//       x: {
//         show: false,
//       },
//       y: {
//         title: {
//           formatter: function () {
//             return "";
//           },
//         },
//       },
//       marker: {
//         show: false,
//       },
//     },
//     xaxis: {
//       type: "category",
//       categories: [
//         "Sep",
//         "Oct",
//         "Nov",
//         "Dec",
//         "Jan",
//         "Feb",
//         "Mar",
//         "Apr",
//         "May",
//         "Jun",
//         "Jul",
//         "Aug",
//       ],
//       axisBorder: {
//         show: false,
//       },
//       axisTicks: {
//         show: false,
//       },
//     },
//     yaxis: {
//       title: {
//         style: {
//           fontSize: "0px",
//         },
//       },
//     },
//   };

//   return (
//     <div className="col-span-12 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-7 p-5">
//       <div className="mb-3.5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
//             Payments Overview
//           </h4>
//         </div>
//         <div className="flex items-center gap-2.5">
//           <p className="font-medium uppercase text-dark dark:text-dark-6">
//             Short by:
//           </p>
//           <DefaultSelectOption options={["Monthly", "Yearly"]} />
//         </div>
//       </div>
//       <div>
//         <div className="-ml-4 -mr-5">
//           <ReactApexChart
//             options={options}
//             series={series}
//             type="area"
//             height={310}
//           />
//         </div>
//       </div>

//       <div className="flex flex-col gap-2 text-center xsm:flex-row xsm:gap-0">
//         <div className="border-stroke dark:border-dark-3 xsm:w-1/2 xsm:border-r">
//           <p className="font-medium">Received Amount</p>
//           <h4 className="mt-1 text-xl font-bold text-dark dark:text-white">
//             ${totalPrice ? totalPrice.toLocaleString() : "0.00"}{" "}
//             {/* Safe check */}
//           </h4>
//         </div>
//         <div className="xsm:w-1/2">
//           <p className="font-medium">Due Amount</p>
//           <h4 className="mt-1 text-xl font-bold text-dark dark:text-white">
//             $32,400.00 {/* Placeholder value for Due Amount */}
//           </h4>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BarCharts;

"use client";
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
// import DefaultSelectOption from "./DefaultSelectOption";

const BarCharts = () => {
  const [totalSalesData, setTotalSalesData] = useState(Array(12).fill(0));
  const [totalDueAmount, setTotalDueAmount] = useState(0);
  const [timePeriod, setTimePeriod] = useState("Monthly");
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/payments`);
        const data = await response.json();

        const monthlySales = Array(12).fill(0);
        const yearlySales = Array(5).fill(0);
        let dueAmount = 0;

        data.forEach((payment) => {
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
              const yearIndex = currentYear - year;
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
  }, [baseUrl, timePeriod]);

  const handlePeriodChange = (selectedPeriod) => {
    setTimePeriod(selectedPeriod);
  };

  const series = [
    {
      name: "Received Amount",
      data: totalSalesData.map((value) => Math.round(value)), // Rounded to eliminate decimal points
    },
    {
      name: "Due Amount",
      data: Array(totalSalesData.length).fill(Math.round(totalDueAmount)), // Rounded to eliminate decimal points
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
      categories:
        timePeriod === "Monthly"
          ? [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ]
          : ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"],
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
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
          Payments Overview
        </h4>
        <div className="flex items-center gap-2.5">
          {/* <p className="font-medium uppercase text-dark dark:text-dark-6">
            Short by:
          </p> */}
          {/* <DefaultSelectOption
            options={["Monthly", "Yearly"]}
            onChange={handlePeriodChange}
          /> */}
        </div>
      </div>
      <div>
        <div className="-ml-4 -mr-5">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={310}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 text-center xsm:flex-row xsm:gap-0 text-black">
        <div className="border-stroke dark:border-dark-3 xsm:w-1/2 xsm:border-r">
          <p className="font-medium">Received Amount</p>
          <h4 className="mt-1 text-xl font-bold text-dark text-black">
            $
            {Math.round(
              totalSalesData.reduce((acc, val) => acc + val, 0)
            ).toLocaleString()}
          </h4>
        </div>
        <div className="xsm:w-1/2">
          <p className="font-medium">Due Amount</p>
          <h4 className="mt-1 text-xl font-bold text-dark dark:text-white text-black">
            ${Math.round(totalDueAmount).toLocaleString()}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default BarCharts;




















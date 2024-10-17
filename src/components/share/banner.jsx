"use client";

import Link from "next/link";
import { GoArrowRight } from "react-icons/go";
const Banner = ({ title, linkName }) => {
  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between p-2 bg-[#F0F0F0] py-10 rounded-xl">
        <h2 className=" lg:py-10 lg:ml-10 font-extrabold text-5xl">{title}</h2>

        <h3 className=" lg:py-10 lg:mr-10 mt-3 flex justify-center items-center gap-2">
          <Link href="/">{linkName}</Link>

          <GoArrowRight className="" />
          <span className="text-orange-600">{title}</span>
        </h3>
      </div>
    </>
  );
};

export default Banner;

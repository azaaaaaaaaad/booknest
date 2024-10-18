/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import Image from "next/image";

export default function Reviews() {
  return (
    <>
      <div className="relative mb-32 md:mb-64 my-6 md:my-16">
        <Image
          className="w-full h-60 md:h-auto object-cover"
          src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/h1-bg2.jpg"
          alt=""
          width={1920}
          height={1080}
        />
        {/* review card */}
        <div className="absolute w-[90%] lg:w-1/3 rounded-lg -mt-44 lg:-mt-60 left-1/2 lg:left-1/3 transform -translate-x-1/2 bg-gray-50 border-2 md:p-4">
          <Swiper
            cssMode={true}
            navigation={true}
            pagination={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="mySwiper"
          >
            {/* slide-1 */}
            <SwiperSlide>
              <h1 className="md:text-3xl font-semibold mt-6 md:mt-10 text-center text-gray-600">
                What people are saying!
              </h1>
              <div className="flex justify-center items-center">
                <div className="divider divider-warning w-1/5"></div>
              </div>
              <p className="font-medium md:my-10 px-10 md:px-10 text-sm md:text-base mb-3">
                "BookNest is my go-to bookstore for all genres. The variety is
                fantastic, and the staff are incredibly helpful in recommending
                new reads."
              </p>
              <h1 className=" md:text-2xl font-medium text-center mb-10 md:mb-20">
                Alice Johnson
              </h1>
            </SwiperSlide>
            {/* slide-2 */}
            <SwiperSlide>
              <h1 className="md:text-3xl font-semibold mt-6 md:mt-10 text-center text-gray-600">
                What people are saying!
              </h1>
              <div className="flex justify-center items-center">
                <div className="divider divider-warning w-1/5"></div>
              </div>
              <p className="font-medium md:my-10 px-10 md:px-10 text-sm md:text-base mb-3">
                "The collection at BookNest is impressive, but I especially
                appreciate the discounts and promotional offers they frequently
                provide."
              </p>
              <h1 className="text-lg md:text-2xl font-medium text-center mb-10 md:mb-20">
                Sophia Martinez
              </h1>
            </SwiperSlide>
            {/* slide-3 */}
            <SwiperSlide>
              <h1 className="md:text-3xl font-semibold mt-6 md:mt-10 text-center text-gray-600">
                What people are saying!
              </h1>
              <div className="flex justify-center items-center">
                <div className="divider divider-warning w-1/5"></div>
              </div>
              <p className="font-medium mb-3 md:my-10 px-10 md:px-10 text-sm md:text-base">
                "I love the user-friendly website of BookNest. It makes finding
                books easy, and their delivery service is always on time.This site is highly
                recommended!"
              </p>
              <h1 className="text-lg md:text-2xl font-medium text-center mb-10 md:mb-20">
                Michael Roberts
              </h1>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
}

"use client";

import Marquee from "react-fast-marquee";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa"; // Import GitHub Icon
import { signIn, getSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Swal from "sweetalert2";
import Banner from "@/components/share/banner";

export default function Login() {
  const data = {
    title: 'Login',
    linkName: 'Home',
    
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const session = getSession();

  const onSubmit = async (e) => {
    const email = e.email;
    const password = e.password;
 
    const resp = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/",
    });

    // Sweet alert
    if (session?.status === 200) {
      reset();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "You are login successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  
  const handleSocialLogin = (provider) => {
    const resp = signIn(provider, {
      redirect: true,
      callbackUrl: "/",
    });

    if (session?.status === "authenticated") {
      reset();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "You are login successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  
  return (
    <main>
      {/* Login section */}


      <div className="flex items-center justify-center p-6">
        <div className="flex flex-col lg:flex-row h-full w-full overflow-hidden rounded-xl">
          {/* register design side  */}
          <div className="relative w-full h-[96] items-center justify-center bg-[#F65D4E] md:flex ">
            <div className="space-y-2 text-center">
              <h2 className="md:text-4xl font-medium text-white pt-4">Now</h2>
              <h2 className="animate-pulse text-3xl md:text-5xl lg:text-5xl font-semibold text-white">
                Find your Book Here
              </h2>
              <p className="animate-pulse text-xl md:text-3xl lg:text-4xl font-poppins font-semibold text-white pt-6">
                Easy and fast.
              </p>
              <Marquee>
                <Image
                  width={800}
                  height={500}
                  className="w-full lg:pt-48"
                  src="https://i.ibb.co.com/ySRSNtB/vector-bookshelf-made-wood-books-260nw-2223713083-removebg-preview.png"
                  alt=""
                />
              </Marquee>
            </div>
          </div>
          {/* input side  */}
          <div className="flex w-full flex-col justify-center shadow-2xl shadow-orange-50 space-y-6 my-4">
            <p className="-mb-4 text-center text-xl font-bold">
              START FOR FREE
            </p>
            <h2 className="text-center text-2xl md:text-3xl font-bold">
              Sign Up to BookNest
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-[90%] mx-auto space-y-2"
            >
              <input
                {...register("email", { required: true })}
                className="w-full rounded-lg border px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#F65D4E]/50"
                type="email"
                placeholder="Email"
                name="email"
              />
              {errors.email && (
                <span className="text-red-600">Email is required</span>
              )}
              <input
                {...register("password", { required: true })}
                className="w-full rounded-lg border px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#F65D4E]/50"
                type="password"
                placeholder="Password"
                name="password"
              />
              {errors.password && (
                <span className="text-red-600">Password is required</span>
              )}

              <p className="text-[14px] font-medium text-center">
                Do not have an account ?{" "}
                <Link
                  href="/register"
                  className="text-[#F65D4E] text-[16px] font-bold"
                >
                  Registration Now
                </Link>
              </p>
              <input
                className="w-full rounded-lg bg-[#F65D4E] px-6 py-2 font-bold text-white "
                type="submit"
                value="Sign In"
              />
            </form>
            {/* Divider */}
            <div className="my-8 flex items-center px-8">
              <hr className="flex-1" />
              <div className="mx-4 text-gray-400">OR</div>
              <hr className="flex-1" />
            </div>
            {/* sign with google */}
            <div className="flex items-center justify-center gap-10">
              <div
                onClick={() => handleSocialLogin("google")}
                className="flex h-[50px] gap-2 items-center overflow-hidden rounded-full shadow-md duration-300 hover:scale-95 hover:shadow hover:cursor-pointer"
              >
                <div className="flex h-full w-[50%] items-center bg-[#F65D4E] px-4 text-sm text-white font-medium">
                  Sign With
                </div>
                <span className="right-0 top-0 h-0 w-0 -rotate-90 border-b-[50px] border-r-[50px] border-b-transparent border-r-[#F65D4E]"></span>
                <span className="pr-4 text-4xl font-bold text-[#F65D4E]">
                  G+
                </span>
              </div>

              {/* Sign with GitHub */}
              <div
                onClick={() => handleSocialLogin("github")}
                className="flex h-[50px] gap-2 items-center overflow-hidden rounded-full shadow-md duration-300 hover:scale-95 hover:shadow hover:cursor-pointer"
              >
                <div className="flex h-full w-[50%] items-center bg-gray-900 px-4 text-sm text-white font-medium">
                  Sign With
                </div>
                <span className="right-0 top-0 h-0 w-0 -rotate-90 border-b-[50px] border-r-[50px] border-b-transparent border-r-gray-900"></span>
                <span className="pr-4 text-4xl font-bold text-gray-900">
                  <FaGithub />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

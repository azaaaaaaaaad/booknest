"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react";
import Head from "next/head";

export default function Register() {
  const data = {
    title: "Register",
    linkName: "Home",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (newUser) => {
    const { name, image, email, password } = newUser;
    // const res = await fetch("http://localhost:3000/register/api", {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register/api`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    const resp = await signIn("credentials", {
      name,
      image,
      email,
      password,
      redirect: false,
    });

    if (res?.status === 200 && resp?.status === 200) {
      reset();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "You are registered successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <Head>
        <title>BookNest | Register</title>
      </Head>
      <Navbar />
      <main>
        <div className="flex items-center justify-center p-6 container mx-auto">
          <div className="flex flex-col lg:flex-row h-full w-full overflow-hidden rounded-xl shadow-md  border">
            {/* Register design side */}
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

            {/* Input side */}
            <div className="flex w-full flex-col justify-center shadow-2xl shadow-orange-50 space-y-6 my-4">
              <p className="-mb-4 text-center text-xl font-bold">
                START FOR FREE
              </p>
              <h2 className="text-center text-2xl md:text-3xl font-bold">
                Sign Up to BookNest
              </h2>
              <form
                onSubmit={handleSubmit(onSubmit)} // Corrected here
                className="w-[90%] mx-auto space-y-2"
              >
                <input
                  {...register("name", { required: true })}
                  className="w-[100%] rounded-lg border px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#F65D4E]/50 "
                  type="text"
                  placeholder="Your Name"
                  name="name"
                />
                {errors.name && (
                  <span className="text-red-600">Name is required</span>
                )}
                <input
                  {...register("image", { required: false })}
                  className="w-[100%] rounded-lg border px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#F65D4E]/50"
                  type="text"
                  placeholder="Image URL"
                  name="image"
                />
                {errors.image && (
                  <span className="text-red-600">
                    Please provide your image URL
                  </span>
                )}
                <input
                  {...register("email", { required: true })}
                  className="w-[100%] rounded-lg border px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#F65D4E]/50"
                  type="email"
                  placeholder="Email"
                  name="email"
                />
                {errors.email && (
                  <span className="text-red-600">Email is required</span>
                )}
                <input
                  {...register("password", { required: true })}
                  className="w-[100%] rounded-lg border px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#F65D4E]/50"
                  type="password"
                  placeholder="Password"
                  name="password"
                />
                {errors.password && (
                  <span className="text-red-600">Password is required</span>
                )}
                <p className="text-[14px] font-medium text-center">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-[#F65D4E] text-[16px] font-bold"
                  >
                    Login Now
                  </Link>
                </p>
                <input
                  className="w-full rounded-lg bg-[#F65D4E] px-6 py-2 font-bold text-white hover:cursor-pointer"
                  type="submit"
                  value="Sign Up"
                />
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

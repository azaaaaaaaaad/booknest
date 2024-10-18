"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react"; // Import signIn and signOut for session management
import Swal from "sweetalert2";

export default function UserProfile() {
  const { data: session, status, update } = useSession(); // Include update method from useSession
  console.log(session);
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    if (session?.user?.email) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`/api/user/${session.user.email}`);
          const userData = response.data;
          setUser(userData);
          setName(userData.name || "");
          setEmail(userData.email || "");
          setImage(userData.image || "");
          setRole(userData.role || "");
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };

      fetchUser();
    }
  }, [session, status]);

  const handlePhotoUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      const imgbbResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_KEY}`,
        formData
      );
      setImage(imgbbResponse.data.data.url);
      setLoading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Update user on the server
      const response = await axios.put(`/api/user/${session.user.email}`, {
        name,
        image,
      });

      // If the update is successful, update the session
      if (response.status === 200) {
        // Manually update the session with the new data
        update({
          ...session,
          user: {
            ...session.user,
            name: name, // Update name
            image: image, // Update image
          },
        });

        Swal.fire({
          icon: "success",
          title: "User Updated",
          text: "The user has been successfully updated.",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (status === "loading") return <p>Loading session...</p>;
  if (!session) return <p>Please log in to view your profile.</p>;

  return (
    <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
      <div className="p-2 md:p-4">
        <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
          <div className="grid max-w-2xl mx-auto mt-8">
            <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
              <Image
                className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                src={image || "https://via.placeholder.com/150"}
                alt="Profile Avatar"
                width={150}
                height={150}
              />

              <div className="flex flex-col space-y-5 sm:ml-8">
                <div className="px-5 py-3.5 border border-solid">
                  <h1 className="text-2xl font-bold text-center mb-4 text-[#F65D4E]">
                    {role}
                  </h1>
                </div>
                <button
                  type="button"
                  className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                  onClick={() =>
                    document.getElementById("photo-upload").click()
                  }
                >
                  Change picture
                </button>
                <input
                  type="file"
                  id="photo-upload"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>
            </div>

            <form
              className="items-center mt-8 sm:mt-14 text-[#202142]"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                <div className="w-full">
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Your name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                    placeholder="Your first name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-2 sm:mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                  placeholder="your.email@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

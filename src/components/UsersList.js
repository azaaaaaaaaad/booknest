"use client"; // Make sure this is a client component
import { useEffect, useState } from "react";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import Swal from "sweetalert2";
import Loading from "../app/loading";
import Image from "next/image";
import axios from 'axios';


export default function UsersList() {
  const [users, setUsers] = useState([]); // State to hold users
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;


  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isUpdating, setIsUpdating] = useState(false); // Updating state
  const [selectedUser, setSelectedUser] = useState(null); // Selected user for update
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const [selectedImage, setSelectedImage] = useState(null); // Store the image file


useEffect(() => {
    
        const fetchData = async () => {
           
            try {

                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users-pagination?page=${page}&limit=${limit}`,{ cache: "no-store" });
                setUsers(response.data.data);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
            setIsLoading(false); 
        };

        
        fetchData();
    }, [page,limit]); 


   const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1); 
        }
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1); 
        }
    };




  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setSelectedImage(null); // Reset image selection on close
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]); // Store selected image
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (res.ok) {
      const data = await res.json();
      return data.data.url; // Return the uploaded image URL
    } else {
      throw new Error("Image upload failed");
    }
  };

  const updateUser = async (userData) => {
    setIsUpdating(true);
    let imageUrl = selectedUser.image || selectedUser.photo;

    // Upload the image if a new one is selected
    if (selectedImage) {
      try {
        imageUrl = await uploadImage(selectedImage);
      } catch (error) {
        console.error("Error uploading image:", error);
        Swal.fire({
          icon: "error",
          title: "Image Upload Failed",
          text: "There was an error uploading the image. Please try again.",
        });
        setIsUpdating(false);
        return; // Exit the function if the image upload fails
      }
    }

    const updatedUserData = {
      newName: selectedUser.name,
      newEmail: selectedUser.email,
      ...(selectedUser.image ? { newImage: imageUrl } : { newPhoto: imageUrl }),
      newRole: selectedUser.role,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userData._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData),
      }
    );

    setIsUpdating(false);

    if (res.ok) {
      // Update the user state only after a successful MongoDB update
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userData._id
            ? {
                ...user,
                image: updatedUserData.newImage || user.image,
                photo: updatedUserData.newPhoto || user.photo,
              }
            : user
        )
      );
      setIsModalOpen(false);
      setSelectedUser(null);

      // Show success alert after the user update is successful
      Swal.fire({
        icon: "success",
        title: "User Updated",
        text: "The user has been successfully updated.",
      });
    } else {
      const errorMessage = await res.text();
      console.error("Error updating user:", errorMessage);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "There was an error updating the user. Please try again.",
      });
    }
  };

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (users.length === 0) {
    return <div>No users found or failed to load users.</div>; // Show a message if no users
  }

  return (
    <div className="font-sans overflow-x-auto lg:max-h-screen overflow-y-auto">
      <div className="">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 whitespace-nowrap">
            <tr>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-4 py-4 text-sm text-gray-800">{user.name}</td>
                <td className="px-4 py-4 text-sm text-gray-800">
                  {user.email}
                </td>
                <td className="px-4 py-4 text-sm text-gray-800">
                  {user.role || "Not assigned"} {/* Use actual role */}
                </td>
                <td className="flex px-4 py-4 text-sm text-gray-800 space-x-4">
                  <HiPencilAlt
                    size={24}
                    onClick={() => handleEditClick(user)} // Trigger modal on click
                    className="cursor-pointer"
                  />
                  <RemoveBtn id={user._id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
                <button 
                     className="btn rounded-3xl bg-[#F65D4E] text-white px-8"
                    onClick={handlePreviousPage} 
                    disabled={page === 1}
                >
                    Previous
                </button>
                <span className="text-lg">
                    Page {page} of {totalPages}
                </span>
                <button 
                     className="btn rounded-3xl bg-[#F65D4E] text-white px-8"
                    onClick={handleNextPage} 
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>

      </div>

      {/* Update Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">Update User</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateUser(selectedUser);
              }}
            >
              <div className="flex">
                {/* Left side: Name and Email */}
                <div className="w-1/2 pr-4">
                  <div className="mb-4">
                    <label className="block text-sm">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={selectedUser.name}
                      onChange={handleInputChange}
                      className="border p-2 w-full"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={selectedUser.email}
                      onChange={handleInputChange}
                      className="border p-2 w-full"
                      required
                    />
                  </div>
                  {selectedUser.role === "admin" ? (
                    <button
                      className="bg-[#F65D4E] px-4 py-2 rounded text-white font-medium w-full"
                      onClick={() =>
                        setSelectedUser((prev) => ({ ...prev, role: "user" }))
                      }
                    >
                      Remove Admin
                    </button>
                  ) : (
                    <button
                      className="bg-orange-400 px-4 py-2 rounded text-white font-medium w-full"
                      onClick={() =>
                        setSelectedUser((prev) => ({ ...prev, role: "admin" }))
                      }
                    >
                      Make Admin
                    </button>
                  )}
                </div>

                {/* Right side: Image and File Input */}
                <div className="w-1/2 pl-4 flex flex-col items-center">
                  <label className="block text-sm mb-2">Current Image</label>
                  <Image
                    src={selectedUser.image || selectedUser.photo}
                    alt="User"
                    className="mb-4 w-32 h-32 object-cover"
                    width={128}
                    height={128}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="border p-2 w-full"
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-between">
                <button
                  type="submit"
                  className="bg-[#F65D4E] text-black px-4 py-2 rounded"
                >
                  {isUpdating ? "Updating..." : "Update User"}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded ml-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

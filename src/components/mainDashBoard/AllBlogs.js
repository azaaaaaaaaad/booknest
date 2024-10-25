"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { HiPencilAlt,HiOutlineTrash } from "react-icons/hi";
import Swal from "sweetalert2";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
 const [isUpdating, setIsUpdating] = useState(false);
  const [loading, setLoading] = useState(false);
  const limit = 10; // Number of rows per page


  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/blogs-pagination?page=${page}&limit=${limit}`,
          { cache: "no-store" }
        );

        setBlogs(response.data.data);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [page]);




  const updateBlog = async (blogData) => {
    setIsUpdating(true); // Set loading state immediately

    const previousBlog = blogs.find((blog) => blog._id === blogData._id);
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog._id === blogData._id ? { ...blog, ...blogData } : blog
      )
    );

    if (imageFile) {
      const uploadedImageUrl = await uploadImage(imageFile);
      if (uploadedImageUrl) {
        blogData.image = uploadedImageUrl; // Set the uploaded image URL
      }
    }
    console.log("-----------",blogData)
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${blogData._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      }
    );

    if (res.ok) {
      const updatedBlog = await res.json();

      await Swal.fire({
        title: "Updated!",
        text: "The Blog has been updated.",
        icon: "success",
      });

      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === updatedBlog._id ? updatedBook : blog
        )
      );
      setIsModalOpen(false);
      setSelectedBlog(null);
      setImageFile(null); // Reset the image file state
      setImageUrl(""); // Reset the image URL state
    } else {
      await Swal.fire({
        title: "Error!",
        text: "There was an error updating the Blog.",
        icon: "error",
      });
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === previousBlog._id ? previousBlog : blog
        )
      );
    }
    setIsUpdating(false);
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === "price" ? parseFloat(value) : value;

    setSelectedBlog((prev) => ({ ...prev, [name]: updatedValue }));
  };
  
const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file)); // Create a temporary URL for preview
    }
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
      return data.data.display_url; // Return the URL of the uploaded image
    } else {
      await Swal.fire({
        title: "Error!",
        text: "Image upload failed.",
        icon: "error",
      });
      return null;
    }
  };



  const handleEditClick = (blog) => {
    setSelectedBlog(blog);
    setImageUrl(blog.image || ""); // Set the current image URL
    setIsModalOpen(true);
  };

   const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
    setImageFile(null); // Reset the image file state
    setImageUrl(""); // Reset the image URL state
  };

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

  if (blogs.length === 0) {
    return <div>No blogs found or failed to load blogs.</div>;
  }

  return (
    <div className="font-sans ">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100 whitespace-nowrap">
          <tr>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Image
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              title
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              author
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              category
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
          {blogs.map((blog) => (
            <tr key={blog._id}>
              <td className="px-4 py-4 text-sm text-gray-800">
                <Image
                  src={blog?.image}
                  alt={blog?.title}
                  width={40}
                  height={60}
                />
              </td>
              <td className="px-4 py-4 text-sm text-gray-800">{blog?.title}</td>
              <td className="px-4 py-4 text-sm text-gray-800">
                {blog?.author}
              </td>
              <td className="px-4 py-4 text-sm text-gray-800">
                {blog?.category}
              </td>
              <td className="px-4 py-4 text-sm text-gray-800">{blog?.date}</td>

              <td className="flex px-4 py-4 text-sm text-gray-800">
                <button onClick={() => handleEditClick(blog)}>
                  <HiPencilAlt size={24} />
                </button>
               
               
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg max-w-2xl w-full">
            <h2 className="text-lg font-semibold">Update Book</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateBlog(selectedBlog);
              }}
              className="flex"
            >
              <div className="flex-1">
                <div className="mt-4">
                  <label className="block text-sm">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={selectedBlog?.title || ""}
                    onChange={handleInputChange}
                    className="border p-2 w-full"
                    required
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm">Author</label>
                  <input
                    type="text"
                    name="author"
                    value={selectedBlog?.author || ""}
                    onChange={handleInputChange}
                    className="border p-2 w-full"
                    required
                  />
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={selectedBlog?.category || ""}
                    onChange={handleInputChange}
                    className="border p-2 w-full"
                    required
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm">shortDescription</label>
                  <textarea
                    name="shortDescription"
                    value={selectedBlog?.shortDescription || ""}
                    onChange={handleInputChange}
                    className="border p-2 w-full h-32"
                    required
                  />
                </div>
                 <div className="mt-4">
                  <label className="block text-sm">Content</label>
                  <textarea
                    name="content"
                    value={selectedBlog?.content || ""}
                    onChange={handleInputChange}
                    className="border p-2 w-full h-32"
                    required
                  />
                </div>
              </div>
              
                  <div className="ml-4 w-1/3">
                <label className="block text-sm">Current Image</label>
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt="Book cover"
                    width={200}
                    height={300}
                    className="mt-2 mb-2"
                  />
                )}
                <label className="block text-sm mt-4">Change Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="border p-2 w-full"
                />
              </div>


            </form>
            <div className="mt-4 flex justify-between">
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  updateBlog(selectedBlog);
                }}
                className="bg-[#F65D4E] text-white px-4 py-2 rounded"
              >
                {isUpdating ? "Updating..." : "Update Book"}
              </button>
              <button
                type="button"
                onClick={handleCloseModal}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded ml-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}



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
  );
}

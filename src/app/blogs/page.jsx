"use client"
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { GoArrowRight } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import Link from "next/link";
import BlogsCard from "@/components/BlogsCard";
const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [recentPosts, setRecentPosts] = useState([]);

  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [seeMoreCategories, setSeeMoreCategories] = useState(false);

  console.log("cate-------------",categories);


  const itemsPerPage = 4;

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const bannerData = {
    title: 'Blogs',
    linkName: 'Home',
    
  };
  useEffect(() => {


    const data = {
      title: 'Blogs',
      linkName: 'Home',
      
    };
    
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/blogs`);
        const data = await response.json();

        if (Array.isArray(data)) {
          // Extract unique categories and authors
          const uniqueCategories = [
            ...new Set(data.map((blog) => blog.category)),
          ];
          setCategories(uniqueCategories);

          setBlogs(data);
          setFilteredBlogs(data);
          const rpost=data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setRecentPosts(rpost.slice(0, 5));


        } else {
          // If the response is not an array, log a warning and set blogs to an empty array
          console.warn("Expected an array of Blogs, but got:", data);
          setBlogs([]);
          setFilteredBlogs([]);
          
        }
      } catch (error) {
        console.error("Failed to fetch Blogs:", error);
      }


    };

    fetchData();
  }, []);




  useEffect(() => {
    let filtered = blogs;

    if (searchTerm) {
      filtered = filtered.filter((blog) =>
        blog.author?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((blog) =>
        selectedCategories.includes(blog.category)
      );
    }

    



    setFilteredBlogs(filtered);
  }, [searchTerm, blogs,selectedCategories]);


  console.log(blogs);
   // Pagination logic
   const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentBooks = filteredBlogs.slice(indexOfFirstItem, indexOfLastItem);
 
   // Handle page change
   const handlePageChange = (pageNumber) => {
     setCurrentPage(pageNumber);
   };

   const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between p-2 bg-[#F0F0F0] py-10">
        <h2 className=" lg:py-10 lg:ml-10 font-extrabold text-5xl">Blogs</h2>

        <h3 className=" lg:py-10 lg:mr-10 mt-3 flex justify-center items-center gap-2">
          <Link href="/">HOME</Link>

          <GoArrowRight className="" />
          <sapn className="text-orange-600">Blogs</sapn>
        </h3>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Blog Content Section (Spans 2 Columns on Large Screens) */}
          <div className="lg:col-span-2">
            
            {currentBooks.map((blog) => (
            <BlogsCard key={blog.id} blog={blog} />
          ))}


          

            {/* Add more blog posts here */}
          </div>


          {/* Pagination */}
      


          {/* Categories Section (1 Column on Large Screens) */}
          <div className="p-6 hidden lg:block">
            <div className="container mx-auto rounded-lg border-2">
              <h2 className="py-5 pl-10 text-xl font-bold">Search</h2>
              <hr className="border-t-1 border-gray-300" />
              <div className="relative w-full max-w-md mx-auto py-5 px-10">
               

<input
              type="text"
              placeholder="Search for a Author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
                <FaSearch className="absolute right-12 top-8 text-gray-400" />
              </div>
            </div>

            <div className="container mx-auto rounded-lg border-2 mt-10">
              <h2 className="py-5 pl-10 text-xl font-bold">Categories</h2>
              <hr className="border-t-1 border-gray-300" />
              <div className="relative w-full max-w-md mx-auto py-5 px-10">
                <ul>
                {categories
              .slice(0, seeMoreCategories ? categories.length : 5)
              .map((category) => (
                <label key={category} className="block mb-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="mr-2"
                  />
                  {category}
                </label>
              ))}
            {categories.length > 5 && (
              <button
                onClick={() => setSeeMoreCategories(!seeMoreCategories)}
                className="text-blue-500 mt-2"
              >
                {seeMoreCategories ? "See Less" : "See More"}
              </button>
            )}






                  <li className="flex gap-1">
                    <sapn className="mt-1">
                      <IoArrowForwardCircleOutline className="bg-slate-300 rounded-full hover:bg-red-800" />
                    </sapn>
                    <sapn>Arts & Literature</sapn>
                  </li>

                  <li className="flex gap-1 my-3">
                    <sapn className="mt-1">
                      <IoArrowForwardCircleOutline className="bg-slate-300 rounded-full hover:bg-red-800" />
                    </sapn>
                    <sapn>Cultural</sapn>
                  </li>

                  <li className="flex gap-1 my-3">
                    <sapn className="mt-1">
                      <IoArrowForwardCircleOutline className="bg-slate-300 rounded-full hover:bg-red-800" />
                    </sapn>
                    <sapn>European</sapn>
                  </li>

                  <li className="flex gap-1">
                    <sapn className="mt-1">
                      <IoArrowForwardCircleOutline className="bg-slate-300 rounded-full hover:bg-red-800" />
                    </sapn>
                    <sapn>Uncategorized</sapn>
                  </li>
                </ul>
              </div>
            </div>

            <div className="container mx-auto rounded-lg border-2 mt-10">
              <h2 className="py-5 pl-10 text-xl font-bold">Recent Posts</h2>
              <hr className="border-t-1 border-gray-300" />
              <div className="relative w-full max-w-md mx-auto py-5 px-10">
                <ul>

                {recentPosts.map(post => (
          <li key={post.id} className="flex gap-3 my-5">
            
            <div className="w-1/4">
                      <Image
                        height={80}
                        width={80}
                        src={post.image}
                        alt="Card Image 1"
                        className="w-[80px] h-auto object-cover border rounded-lg"
                      />
                    </div>

                    <div className="w-3/4">
                      <h3 className="font-thin uppercase text-[15px]">
                        {post.date} 
                      </h3>
                      <h2 className="font-semibold leading-5">
                        {post.title} BY {post.author}
                      </h2>
                    </div>
          </li>
        ))}

                

              
                </ul>
              </div>
            </div>

            <div className="container mx-auto rounded-lg border-2 mt-10">
              <h2 className="py-5 pl-10 text-xl font-bold">Tags</h2>
              <hr className="border-t-1 border-gray-300" />
              <div className="relative w-full max-w-md mx-auto py-5 pl-10">
                <sapn className="mr-5">Book</sapn>
                <sapn className="mr-5">Hardback</sapn>
                <sapn className="mr-5">Mixed media</sapn>
                <sapn className="mr-5">Paperback</sapn>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center my-10">
        <nav>
          <ul className="flex">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className="mx-2">
                <button
                  className={`px-4 py-2 rounded ${
                    index + 1 === currentPage
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      </div>
    </>
  );
};

export default BlogsPage;

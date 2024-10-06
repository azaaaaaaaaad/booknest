"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import BlogsCard from "@/components/BlogsCard";
import Banner from "@/components/share/banner";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [recentPosts, setRecentPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [seeMoreCategories, setSeeMoreCategories] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const itemsPerPage = 4;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/blogs`);
        const data = await response.json();

        if (Array.isArray(data)) {
          const uniqueCategories = [
            ...new Set(data.map((blog) => blog.category)),
          ];
          setCategories(uniqueCategories);

          setBlogs(data);
          setFilteredBlogs(data);

          const sortedPosts = data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setRecentPosts(sortedPosts.slice(0, 5));
        } else {
          console.warn("Expected an array of Blogs, but got:", data);
          setBlogs([]);
          setFilteredBlogs([]);
        }
      } catch (error) {
        console.error("Failed to fetch Blogs:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching data
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
  }, [searchTerm, blogs, selectedCategories]);

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBooks = filteredBlogs.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top smoothly
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
      <Banner title="Blogs" linkName="Home" />

      <div className="container mx-auto px-4 py-8">
        {/* Loader */}
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <div className="relative">
              <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
              <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Blog Content Section (Spans 2 Columns on Large Screens) */}
            <div className="lg:col-span-2">
              {currentBooks.map((blog) => (
                <BlogsCard key={blog.id} blog={blog} />
              ))}
            </div>

            {/* Categories, Search, and Recent Posts */}
            <div className="p-6 hidden lg:block">
              {/* Search */}
              <div className="container mx-auto rounded-lg border-2">
                <h2 className="py-5 pl-10 text-xl font-bold">Search</h2>
                <hr className="border-t-1 border-gray-300" />
                <div className="relative w-full max-w-md mx-auto py-5 px-10">
                  <input
                    type="text"
                    placeholder="Search for an Author..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <FaSearch className="absolute right-12 top-8 text-gray-400" />
                </div>
              </div>

              {/* Categories */}
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
                  </ul>
                </div>
              </div>

              {/* Recent Posts */}
              <div className="container mx-auto rounded-lg border-2 mt-10">
                <h2 className="py-5 pl-10 text-xl font-bold">Recent Posts</h2>
                <hr className="border-t-1 border-gray-300" />
                <div className="relative w-full max-w-md mx-auto py-5 px-10">
                  <ul>
                    {recentPosts.map((post) => (
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
            </div>
          </div>
        )}

        {/* Pagination */}
        {!isLoading && (
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
        )}
      </div>
    </>
  );
};

export default BlogsPage;

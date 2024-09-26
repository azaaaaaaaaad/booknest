"use client";
import React, { useEffect, useState } from "react";
import BooksCard from "@/components/BooksCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import axios from "axios";
import { GoChevronDown } from "react-icons/go";
import { HiX } from "react-icons/hi"; // for mobile drawer close button

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 20]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [seeMoreCategories, setSeeMoreCategories] = useState(false);
  const [seeMoreAuthors, setSeeMoreAuthors] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for the mobile drawer
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/popular-data.json");
      const data = await response.json();
      setBooks(data);
      setFilteredBooks(data);

      // Extract unique categories and authors
      const uniqueCategories = [...new Set(data.map((book) => book.category))];
      const uniqueAuthors = [...new Set(data.map((book) => book.author))];

      setCategories(uniqueCategories);
      setAuthors(uniqueAuthors);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = books;

    if (searchTerm) {
      filtered = filtered.filter((book) =>
        book.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((book) =>
        selectedCategories.includes(book.category)
      );
    }

    if (selectedAuthors.length > 0) {
      filtered = filtered.filter((book) =>
        selectedAuthors.includes(book.author)
      );
    }

    filtered = filtered.filter(
      (book) => book.price >= priceRange[0] && book.price <= priceRange[1]
    );

    setFilteredBooks(filtered);
  }, [searchTerm, selectedCategories, selectedAuthors, priceRange, books]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleAuthorChange = (author) => {
    setSelectedAuthors((prev) =>
      prev.includes(author)
        ? prev.filter((a) => a !== author)
        : [...prev, author]
    );
  };

  const sorting = (data) => {
    if (data === "LowToHigh") {
      const priceLowToHigh = [...books].sort((a, b) => a.price - b.price);
      setBooks(priceLowToHigh);
    }
    if (data === "HighToLow") {
      const priceHighToLow = [...books].sort((a, b) => b.price - a.price);
      setBooks(priceHighToLow);
    }
    if (data === "topRatings") {
      const TopRatings = [...books].sort((a, b) => b.ratings - a.ratings);
      setBooks(TopRatings);
    }
    if (data === "lowRatings") {
      const LowRatings = [...books].sort((a, b) => a.ratings - b.ratings);
      setBooks(LowRatings);
    }
  };

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Toggle Drawer
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div>
      <Navbar />

      {/* Filter button for mobile view */}
      <div className="lg:hidden flex w-11/12 mx-auto mt-6">
        <button className="btn btn-outline text-sm p-2" onClick={toggleDrawer}>
          Filter
        </button>
      </div>

      {/* Main Layout with Sidebar and Books Grid */}
      <div className="flex w-11/12 mx-auto mt-6">
        {/* Left Sidebar */}
        <div className="hidden lg:block w-1/4 bg-gray-100 p-4 rounded-lg">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search for a book..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Category Checkboxes */}
          <div className="mb-6">
            <h4 className="font-bold mb-2">Categories</h4>
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
          </div>

          {/* Author Checkboxes */}
          <div className="mb-6">
            <h4 className="font-bold mb-2">Authors</h4>
            {authors
              .slice(0, seeMoreAuthors ? authors.length : 5)
              .map((author) => (
                <label key={author} className="block mb-2">
                  <input
                    type="checkbox"
                    checked={selectedAuthors.includes(author)}
                    onChange={() => handleAuthorChange(author)}
                    className="mr-2"
                  />
                  {author}
                </label>
              ))}
            {authors.length > 5 && (
              <button
                onClick={() => setSeeMoreAuthors(!seeMoreAuthors)}
                className="text-blue-500 mt-2"
              >
                {seeMoreAuthors ? "See Less" : "See More"}
              </button>
            )}
          </div>

          {/* Price Range Slider */}
          <div>
            <h4 className="font-bold mb-2">Price Range</h4>
            <input
              type="range"
              min="0"
              max="20"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, e.target.value])}
              className="w-full"
            />
            <p>
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </p>
          </div>
        </div>

        {/* Drawer for mobile view */}
        {isDrawerOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40">
            <div className="mt-16 left-0 top-0 w-3/4 h-full bg-white shadow-lg z-50 p-5">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-bold">Filter Options</h2>
                <button
                  className="text-2xl text-gray-600"
                  onClick={toggleDrawer} // Close the drawer
                >
                  <HiX />
                </button>
              </div>

              {/* Mobile Filter Options */}
              {/* You can reuse the filter code here */}
            </div>
          </div>
        )}

        {/* Right Side: Books Grid */}
        <div className="col-span-3">
          <div className="flex justify-end pr-10">
            <div className="dropdown">
              <div tabIndex={0} className="m-1">
                <div className="flex justify-center items-center gap-4 border-2 p-2 rounded-lg">
                  Sort <GoChevronDown />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow"
              >
                <button onClick={() => sorting("LowToHigh")}>
                  <li>
                    <a>Sort by price: low to high</a>
                  </li>
                </button>

                <button onClick={() => sorting("HighToLow")}>
                  <li>
                    <a>Sort by price: high to low</a>
                  </li>
                </button>

                <button onClick={() => sorting("topRatings")}>
                  <li>
                    <a>Top rated</a>
                  </li>
                </button>

                <button onClick={() => sorting("lowRatings")}>
                  <li>
                    <a>Low rated</a>
                  </li>
                </button>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {currentBooks.map((book) => (
              <BooksCard key={book.id} book={book} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 px-3 py-1 border ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-white"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

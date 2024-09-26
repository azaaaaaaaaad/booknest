
'use client'

=======
"use client";
import React, { useEffect, useState } from "react";
import BooksCard from "@/components/BooksCard";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { GoChevronDown } from "react-icons/go";

export default function Books() {

  const [books, setBooks] = useState([])
  


  useEffect(()=>{
    fetch('/popular-data.json')
    .then((res)=> res.json())
    .then((data) => setBooks(data))
    
  },[])


  

  
  // let listOfBooks = [];

  

  const baseUrl = process.env.NEXT_PUBLIC_API_URL
  // https://booknest-server-one.vercel.app/api/books

  // try {
  //   const response = await axios.get(`/popular-data.json`);
  //   listOfBooks = response.data;

  //   // console.log(listOfBooks);
    
  // } catch (error) {
  //   console.error("Error fetching books:", error);
  // }


  const sorting = ( data) =>{

    if(data === 'LowToHigh'){
      const priceLowToHigh = [...books].sort((a, b) => a.price - b.price);
    setBooks(priceLowToHigh)
    }
   if(data === 'HighToLow'){
      const priceHighToLow = [...books].sort((a,b) => b.price - a.price)
      setBooks(priceHighToLow)
    }

    if(data === 'topRatings'){
      const TopRatings = [...books].sort((a, b) => b.ratings - a.ratings)
      setBooks(TopRatings)
     }

     if(data === 'lowRatings'){
      const LowRatings = [...books].sort((a, b) => a.ratings - b.ratings)
      setBooks(LowRatings)
     }
  }
import Footer from "@/components/Footer";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";

const BooksPage = () => {
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
    // Filter books based on search term, categories, price range, and authors
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

  // Handle category checkbox change
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };
  // Handle author checkbox change
  const handleAuthorChange = (author) => {
    setSelectedAuthors((prev) =>
      prev.includes(author)
        ? prev.filter((a) => a !== author)
        : [...prev, author]
    );
  };
  // Pagination logic
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstItem, indexOfLastItem);
  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  
  return (
    <div>
      <Navbar />
      {/* Books banner section */}
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between p-2 bg-[#F0F0F0] py-10">
        <h2 className=" lg:py-10 lg:ml-10 font-extrabold text-5xl">Books</h2>

        <h3 className=" lg:py-10 lg:mr-10 mt-3 flex justify-center items-center gap-2">
          <Link href="/">Home</Link>
          <GoArrowRight className="" />
          <span className="text-orange-600">Books</span>
        </h3>
      </div>

      <div className="flex justify-end pr-10"><div className="dropdown">
  <div tabIndex={0}  className="m-1"><div className="flex justify-center items-center gap-4 border-2  p-2 rounded-lg">Sort  <GoChevronDown /></div></div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow">
    <button onClick={() =>{ sorting('LowToHigh')}}   ><li><a>Sort by price: low to high</a></li></button>

    <button onClick={() =>{ sorting('HighToLow')}}   ><li><a>Sort by price: high to low</a></li></button>

    <button onClick={() =>{ sorting('topRatings')}}   ><li><a>Sort by popularity: high to low</a></li></button>


    <button onClick={() =>{ sorting('lowRatings')}}   ><li><a>Sort by popularity: low to high</a></li></button>

  </ul>
</div></div>

<hr></hr>





      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-2 mb-2 gap-6">
        {books?.map((book) => (
          <BooksCard key={book.id} book={book} />
        ))}
      {/* Main Layout with Sidebar and Books Grid */}
      <div className="grid grid-cols-4 mx-auto mt-6 gap-8">
        {/* Left Sidebar */}
        <div className=" bg-gray-100 p-4 rounded-lg">
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

        {/* Right Side: Books Grid */}
        <div className="col-span-3">
          <h2 className="text-2xl font-bold mb-4">Books Listing</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 ml-6 divide-x">
            {Array.isArray(currentBooks) &&
              currentBooks.map((book) => (
                <BooksCard key={book.id} book={book} />
              ))}
          </div>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`px-4 py-2 mx-1  text-white rounded ${
                currentPage === pageNumber
                  ? "bg-blue-500 text-white"
                  : "bg-red-400"
              }`}
            >
              {pageNumber}
            </button>
          )
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BooksPage;

"use client";

import { useEffect, useState } from "react";
import { HiPencilAlt, HiOutlineTrash } from "react-icons/hi";
import Loading from "../app/loading";
import Swal from "sweetalert2";
import Image from "next/image";

export default function BooksList() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/books?start=${
          (currentPage - 1) * itemsPerPage
        }&limit=${itemsPerPage}`,
        { cache: "no-store" }
      );

      if (res.ok) {
        const data = await res.json();
        setBooks(Array.isArray(data.books) ? data.books : []);
        setTotalBooks(data.total); // Total number of books available
      } else {
        console.error("Failed to fetch books: ", res.status);
        setBooks([]);
      }

      setIsLoading(false);
    };

    fetchBooks();
  }, [currentPage]);

  const totalPages = Math.ceil(totalBooks / itemsPerPage);

  const removeBook = async (id) => {
    const bookToDelete = books.find((book) => book._id === id);
    setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));

    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (isConfirmed) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/books/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        await Swal.fire({
          title: "Error!",
          text: "There was an error deleting the book.",
          icon: "error",
        });
        setBooks((prevBooks) => [...prevBooks, bookToDelete]);
      } else {
        await Swal.fire({
          title: "Deleted!",
          text: "The book has been deleted.",
          icon: "success",
        });
      }
    } else {
      setBooks((prevBooks) => [...prevBooks, bookToDelete]);
    }
  };

  const updateBook = async (bookData) => {
    setIsUpdating(true);
    const previousBook = books.find((book) => book._id === bookData._id);
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book._id === bookData._id ? { ...book, ...bookData } : book
      )
    );

    if (imageFile) {
      const uploadedImageUrl = await uploadImage(imageFile);
      if (uploadedImageUrl) {
        bookData.image = uploadedImageUrl;
      }
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/books/${bookData._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      }
    );

    if (res.ok) {
      const updatedBook = await res.json();
      await Swal.fire({
        title: "Updated!",
        text: "The book has been updated.",
        icon: "success",
      });

      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === updatedBook._id ? updatedBook : book
        )
      );
      setIsModalOpen(false);
      setSelectedBook(null);
      setImageFile(null);
      setImageUrl("");
    } else {
      await Swal.fire({
        title: "Error!",
        text: "There was an error updating the book.",
        icon: "error",
      });
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === previousBook._id ? previousBook : book
        )
      );
    }
    setIsUpdating(false);
  };

  const handleEditClick = (book) => {
    setSelectedBook(book);
    setImageUrl(book.image || "");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
    setImageFile(null);
    setImageUrl("");
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading && books.length === 0) {
    return <Loading />;
  }

  if (books.length === 0) {
    return <div>No books found or failed to load books.</div>;
  }

  return (
    <div className="font-sans lg:max-h-screen overflow-x-auto overflow-y-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100 whitespace-nowrap">
          <tr>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Book Image
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Book Name
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Author
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Ratings
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
          {books.map((book) => (
            <tr key={book._id}>
              <td className="px-4 py-4 text-sm text-gray-800">
                <Image
                  src={book.image}
                  alt={book.name}
                  width={40}
                  height={60}
                />
              </td>
              <td className="px-4 py-4 text-sm text-gray-800">{book?.name}</td>
              <td className="px-4 py-4 text-sm text-gray-800">
                {book?.category}
              </td>
              <td className="px-4 py-4 text-sm text-gray-800">{book.author}</td>
              <td className="px-4 py-4 text-sm text-gray-800">
                ${book.price.toFixed(2)}
              </td>
              <td className="px-4 py-4 text-sm text-gray-800">
                {book.ratings}
              </td>
              <td className="flex px-4 py-4 text-sm text-gray-800">
                <button onClick={() => handleEditClick(book)}>
                  <HiPencilAlt size={24} />
                </button>
                <button
                  onClick={() => removeBook(book._id)}
                  className="text-red-400 ml-2"
                >
                  <HiOutlineTrash size={24} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="mt-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-2 border ${
              currentPage === index + 1 ? "bg-gray-200" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

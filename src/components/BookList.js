"use client";

import { useEffect, useState } from "react";
import { HiPencilAlt, HiOutlineTrash } from "react-icons/hi";
import Loading from "../app/loading";
import Swal from "sweetalert2";
import Image from "next/image";
import axios from "axios";

export default function BooksList() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // Add Book State
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [cardCount, setCardCount] = useState(1);
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(""); // Add this line
  const [ratings, setRatings] = useState("");
  const [publishType, setPublishType] = useState("upcoming");
  const [error, setError] = useState("");
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);

  // Disable background scrolling when modal is open
  useEffect(() => {
    if (isAddBookModalOpen || isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isAddBookModalOpen, isModalOpen]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/books-pagination?page=${page}&limit=${limit}`,
          { cache: "no-store" }
        );
        setBooks(response.data.data);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [page]);

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
  const updateBook = async (bookData) => {
    setIsUpdating(true); // Set loading state immediately

    const previousBook = books.find((book) => book._id === bookData._id);
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book._id === bookData._id ? { ...book, ...bookData } : book
      )
    );

    if (imageFile) {
      const uploadedImageUrl = await uploadImage(imageFile);
      if (uploadedImageUrl) {
        bookData.image = uploadedImageUrl; // Set the uploaded image URL
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
      setImageFile(null); // Reset the image file state
      setImageUrl(""); // Reset the image URL state
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
    setImageUrl(book.image || ""); // Set the current image URL
    setIsModalOpen(true);
  };



  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
    setImageFile(null); // Reset the image file state
    setImageUrl(""); // Reset the image URL state
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === "price" ? parseFloat(value) : value;

    setSelectedBook((prev) => ({ ...prev, [name]: updatedValue }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file)); // Create a temporary URL for preview
    }
  };
  if (isLoading && books.length === 0) {
    return <Loading />; // Use your existing loading component
  }

  if (books.length === 0) {
    return <div>No books found or failed to load books.</div>;
  }

  const handleAddBookInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "author":
        setAuthor(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "cardCount":
        setCardCount(value);
        break;
      case "quantity": // Add this case
        setQuantity(value); // Update the quantity state
        break;
      case "category":
        setCategory(value);
        break;
      case "ratings":
        setRatings(value);
        break;
      case "publishType":
        setPublishType(value);
        break;
      default:
        break;
    }
  };

  const handleAddBookSubmit = async (e) => {
    e.preventDefault();
    setIsLoadingAdd(true);

    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgbbResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_KEY}`,
        formData
      );

      const imageUrl = imgbbResponse.data.data.url;

      const bookData = {
        name: title,
        author,
        description,
        category,
        image: imageUrl,
        price: parseFloat(price),
        ratings: parseFloat(ratings),
        cardCount: parseInt(cardCount, 10),
        publishType,
      };

      const response = await axios.post("/api/books", bookData);

      // Update the book list
      setBooks((prevBooks) => [...prevBooks, response.data]);

      // Show SweetAlert confirmation
      Swal.fire({
        icon: "success",
        title: "Book Added!",
        text: `${bookData.name} has been added successfully!`,
        showConfirmButton: true,
        confirmButtonText: "OK",
      });

      setIsAddBookModalOpen(false); // Close the modal
    } catch (error) {
      console.error("Error adding book:", error);
      setError("Failed to add the book. Please try again.");
    } finally {
      setIsLoadingAdd(false);
    }
  };

  if (isLoading && books.length === 0) {
    return <Loading />;
  }

  if (books.length === 0) {
    return <div>No books found or failed to load books.</div>;
  }

  return (
    <div className="font-sans ">
      <div className="mb-4">
        <button
          onClick={() => setIsAddBookModalOpen(true)} // Open Add Book modal
          className="bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700"
        >
          Add New Book
        </button>
      </div>

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
              <td className="px-4 py-4 text-sm text-gray-800">${book.price}</td>
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg max-w-2xl w-full">
            <h2 className="text-lg font-semibold">Update Book</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateBook(selectedBook);
              }}
              className="flex"
            >
              <div className="flex-1">
                <div className="mt-4">
                  <label className="block text-sm">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={selectedBook?.name || ""}
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
                    value={selectedBook?.author || ""}
                    onChange={handleInputChange}
                    className="border p-2 w-full"
                    required
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={selectedBook?.price || ""}
                    onChange={handleInputChange}
                    className="border p-2 w-full"
                    required
                    step="0.01"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={selectedBook?.category || ""}
                    onChange={handleInputChange}
                    className="border p-2 w-full"
                    required
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm">Description</label>
                  <textarea
                    name="description"
                    value={selectedBook?.description || ""}
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
                  updateBook(selectedBlog);
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

      {isAddBookModalOpen && (
        <div className="fixed inset-0 p-4 flex justify-center items-center z-[1000] bg-black bg-opacity-50">
          <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 relative">
            <div className="flex items-center justify-between">
              <h3 className="text-[#F65D4E] text-xl font-bold">Add New Book</h3>
              <button
                onClick={() => setIsAddBookModalOpen(false)}
                className="text-gray-400 hover:text-red-500"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleAddBookSubmit} className="space-y-4 mt-8">
              <div className="flex gap-4">
                <div>
                  <div>
                    <label className="text-gray-800 text-sm mb-2 block">
                      Name of the product
                    </label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Enter product name"
                      value={title}
                      onChange={handleAddBookInputChange}
                      className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-gray-800 text-sm mb-2 block">
                      Descriptions
                    </label>
                    <textarea
                      name="description"
                      placeholder="Write about the product"
                      value={description}
                      onChange={handleAddBookInputChange}
                      className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                      rows="3"
                      required
                    ></textarea>
                  </div>

                  <div className="flex gap-2">
                    <div>
                      <label className="text-gray-800 text-sm mb-2 block">
                        Quantity
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        placeholder="Enter quantity"
                        value={quantity}
                        onChange={handleAddBookInputChange}
                        className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-gray-800 text-sm mb-2 block">
                        Selling price
                      </label>
                      <input
                        type="number"
                        name="price"
                        placeholder="Enter price"
                        value={price}
                        onChange={handleAddBookInputChange}
                        className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                        required
                        step="0.01"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-800 text-sm mb-2 block">
                      Category
                    </label>
                    <input
                      type="text"
                      name="category"
                      placeholder="Enter product category"
                      value={category}
                      onChange={handleAddBookInputChange}
                      className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-gray-800 text-sm mb-2 block">
                      Ratings
                    </label>
                    <input
                      type="text"
                      name="ratings"
                      placeholder="Enter product Rating"
                      value={ratings}
                      onChange={handleAddBookInputChange}
                      className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                      required
                    />
                  </div>
                </div>

                <div className=" flex-wrap">
                  <div>
                    <label className="text-gray-800 text-sm mb-2 block">
                      Author
                    </label>
                    <input
                      type="text"
                      name="author"
                      placeholder="Enter Author name"
                      value={author}
                      onChange={handleAddBookInputChange}
                      className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                      required
                    />
                  </div>
                  <label className="block text-sm">Upload Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="border p-2 w-48"
                  />
                  {imageUrl && (
                    <div className="mt-2">
                      <Image
                        src={imageUrl}
                        alt="Book cover preview"
                        width={200}
                        height={300}
                        className="mt-2"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setIsAddBookModalOpen(false)} // Close modal
                  className="px-6 py-3 rounded-lg text-gray-800 text-sm border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-blue-600 hover:bg-blue-700"
                  disabled={isLoadingAdd}
                >
                  {isLoadingAdd ? "Adding..." : "Submit"}
                </button>
              </div>
            </form>
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

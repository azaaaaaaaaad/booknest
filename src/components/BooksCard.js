import Image from "next/image";
import { useState } from "react";
import { CiStar } from "react-icons/ci";
import Swal from "sweetalert2";

export default function BooksCard({ book }) {
  const { id, name, image, price, category, ratings } = book;
  const [cartData, setCartData] = useState(null);

  const addToBookmark = (book) => {
    const existingBookmarks = JSON.parse(localStorage.getItem('bookmark')) || [];

    const isBookInBookmarks = existingBookmarks.some(b => b.id === book.id);

    if (!isBookInBookmarks) {
      existingBookmarks.push(book);
      localStorage.setItem('bookmark', JSON.stringify(existingBookmarks));

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Book added to bookmarks!",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "info",
        title: "Already Bookmarked",
        text: "This book is already in your bookmarks.",
      });
    }
  };

  return (
    <div className="transition-shadow h-fit duration-300 w-full font-sans overflow-hidden mx-auto mt-4 pl-4 pt-4">
      {/* Full Height Image */}
      <div className="w-full h-40 md:h-60 lg:h-64 relative">
        <Image
          src={image}
          alt={name}
          layout="fill" // Ensure the image fills the container
          objectFit="cover" // Ensures the image covers the entire container while maintaining its aspect ratio
          className="rounded-2xl w-[90%] h-40 md:h-48 lg:h-64"
        />
      </div>

      {/* Book Details */}
      <div className="p-4 md:p-6">
        <p className="text-sm text-gray-600 mb-1">Category: {category}</p>

        <h3
          title={name}
          className="text-lg md:text-xl text-gray-800 font-bold line-clamp-2"
        >
          {name.slice(0, 10)}...
        </h3>

        <div className="flex items-center mt-2">
          <p className="text-gray-800 font-semibold flex items-center">
            Ratings: {ratings}{" "}
            <CiStar className="text-yellow-500 ml-1 text-lg md:text-xl" />
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h3 className="text-xl md:text-2xl text-gray-800 font-bold">
            ${price.toFixed(2)}
          </h3>

          <div className="bg-pink-100 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full cursor-pointer hover:bg-pink-200 transition duration-200">
            <button onClick={() => addToBookmark(book)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                className="fill-pink-600"
                viewBox="0 0 64 64"
              >
                <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

















//....................Main Code.............................


// import Image from "next/image";
// import { useState } from "react";
// import { CiStar } from "react-icons/ci";
// import Swal from "sweetalert2";

// export default function BooksCard({ book }) {
//   const { id, name, image, price, category, ratings } = book;
//   const [cartData, setCartData] = useState(null);

//   const addToBookmark = (book) => {
//     setCartData(book);
//     Swal.fire({
//       position: "top-end",
//       icon: "success",
//       title: "Book added to bookmarks!",
//       showConfirmButton: false,
//       timer: 1500,
//     });
//   };

//   return (
//     <div className=" transition-shadow h-fit duration-300 w-full font-sans overflow-hidden mx-auto mt-4 pl-4 pt-4">
//       {/* Full Height Image */}
//       <div className="w-full h-40 md:h-60 lg:h-64 relative ">
//         <Image
//           src={image}
//           alt={name}
//           layout="fill" // Ensure the image fills the container
//           objectFit="cover" // Ensures the image covers the entire container while maintaining its aspect ratio
//           className="rounded-2xl w-[90%] h-40 md:h-48 lg:h-64 "
//         />
//       </div>

//       {/* Book Details */}
//       <div className="p-4 md:p-6">
//         <p className="text-sm text-gray-600 mb-1">Category: {category}</p>

//         <h3
//           title={name}
//           className="text-lg md:text-xl text-gray-800 font-bold line-clamp-2"
//         >
//           {name.slice(0, 10)}...
//         </h3>

//         <div className="flex items-center mt-2">
//           <p className="text-gray-800 font-semibold flex items-center">
//             Ratings: {ratings}{" "}
//             <CiStar className="text-yellow-500 ml-1 text-lg md:text-xl" />
//           </p>
//         </div>

//         <div className="flex items-center justify-between">
//           <h3 className="text-xl md:text-2xl text-gray-800 font-bold">
//             ${price.toFixed(2)}
//           </h3>

//           <div className="bg-pink-100 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full cursor-pointer hover:bg-pink-200 transition duration-200">
//             <button onClick={() => addToBookmark()}>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="20px"
//                 className="fill-pink-600"
//                 viewBox="0 0 64 64"
//               >
//                 <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"></path>
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import Image from "next/image";

export default function BooksCard({ book }) {
  const { name, image, price, category } = book;

  return (
    <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-sm rounded-2xl font-[sans-serif] overflow-hidden mx-auto mt-4">
      <div className="min-h-[256px]">
        <Image
          height={200}
          width={200}
          src={image}
          alt={name}
          className="w-full rounded-2xl"
        />
      </div>

      <div className="p-6">
        <p>Category: {category}</p>       
         
         <h3 className="text-2xl text-gray-800 font-extrabold">{name}</h3>

        <div className="mt-6 flex items-center">
          <h3 className="text-xl text-gray-800 font-bold flex-1">
            ${price.toFixed(2)}
          </h3>
          <div className="bg-pink-100 w-12 h-12 flex items-center justify-center rounded-full cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              className="fill-pink-600"
              viewBox="0 0 64 64"
            >
              <path
                d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                data-original="#000000"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

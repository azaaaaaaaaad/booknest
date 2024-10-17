import Image from "next/image";

export default function BlogsCard() {
  return (
    <>
      <div className="rounded-lg  p-6 mb-6">
        <Image
          height={540}
          width={1125}
          src={image}
          alt={title}
          objectFit="cover"
          className="w-full h-auto object-cover border rounded-lg"
        />

        <h3 className="uppercase font-thin my-3">
          {date} By {author}
        </h3>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-gray-600">{shortDescription}</p>
        <hr className="mt-5 mb-1 border-t-1 border-gray-300" />
        <span className="flex justify-between">
          <span className="uppercase">
            In <span className="text-rose-600">{category}</span>
          </span>
          <span className="font-semibold">Read More</span>
        </span>
      </div>
    </>
  );
}

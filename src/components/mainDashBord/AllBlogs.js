

// import Link from "next/link";
// import RemoveBtn from "./RemoveBtn";
// import { HiPencilAlt } from "react-icons/hi";

const getBlogs = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`, {
      cache: "no-store",
    });

    console.log("Response Status:", res.status); // Log the response status

    if (!res.ok) {
      throw new Error("Failed to fetch blogs");
    }

    const data = await res.json();
    console.log("API Data:", JSON.stringify(data, null, 2)); // Log the entire data structure
    return Array.isArray(data) ? data : []; // Return blogs directly if it's an array
  } catch (error) {
    console.error("Error loading blogs:", error.message); // Log the error message
    return []; // Return an empty array in case of error
  }
};

export default async function BlogList() {
  const blogs = await getBlogs();
  console.log("blogs Array Length:", blogs.length); // Check if blogs array is populated
  console.log("blogs List:", blogs); // Check the blogs list

  if (blogs.length === 0) {
    return <div>No blogs found or failed to load blogs.</div>; // Show a message if no blogs
  }

  return (
    <div className="font-sans overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100 whitespace-nowrap">
          <tr>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Blog Posts
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Author
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
          {Array.isArray(blogs) &&
            blogs.map((blog) => {
              return (
                <tr key={blog._id}>
                  <td className="px-4 py-4 text-sm text-gray-800">
                    {blog?.title}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800">
                    {blog.author}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800">
                    {blog.category}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800">
                    {blog.date}
                  </td>

                  {/* <td className="flex px-4 py-4 text-sm text-gray-800">
                    <Link href={`/dashboard/editbooks/${book._id}`}>
                      <HiPencilAlt size={24} />
                    </Link>
                    <RemoveBtn id={book._id} />
                  </td> */}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

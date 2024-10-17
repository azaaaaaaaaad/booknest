// import Link from "next/link";
// import RemoveBtn from "./RemoveBtn";
// import { HiPencilAlt } from "react-icons/hi";

const getBlogs = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch blogs");
    }

    const data = await res.json();
    return Array.isArray(data) ? data : []; // Return blogs directly if it's an array
  } catch (error) {
    console.error("Error loading blogs:", error.message); // Log the error message
    return []; // Return an empty array in case of error
  }
};

export default async function BlogList() {
  const blogs = await getBlogs();
  if (blogs.length === 0) {
    return <div>No blogs found or failed to load blogs.</div>; // Show a message if no blogs
  }

  return (
    <div className="font-sans lg:max-h-screen overflow-x-auto overflow-y-auto">
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

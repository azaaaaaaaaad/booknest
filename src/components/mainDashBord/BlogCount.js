
"use client";
import { useState, useEffect } from "react";
import { FaBlog } from "react-icons/fa";

const BlogCount = () => {
  const [blogs, setBlogs] = useState([]); // Rename state to 'blogs' for clarity
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  // Fetch blogs from the backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/blogs`);
        const data = await response.json();
        
        setBlogs(data); // Assuming 'data' is an array of blog objects
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };
    fetchBlogs();
  }, [baseUrl]);

  return (
    <div className="blog-card p-4 border rounded shadow-md bg-white dark:bg-gray-800">
      <div className="flex items-center mb-3">
        <FaBlog className="text-5xl text-blue-500 mr-2" />
        <h4 className="text-heading-6 font-bold text-dark dark:text-white">
          Total Blogs: {blogs.length}
        </h4>
      </div>
      <div className="mt-2">
        <p className="text-body-sm font-medium text-dark dark:text-gray-300">
          {blogs.length > 0 ? "Click below to view the blogs!" : "No blogs available."}
        </p>
      </div>
    </div>
  );
};

export default BlogCount;




















//............................Main Code...............................


// "use client";
// import { useState, useEffect } from "react";
// import { FaBlog } from "react-icons/fa";

// const BlogCount = () => {
//   const [Blog, setBlog] = useState([]);

//   const baseUrl = process.env.NEXT_PUBLIC_API_URL;

//   // Fetch comments from the backend
//   useEffect(() => {
//     const fetchUser = async () => {
//       const response = await fetch(`${baseUrl}/api/blogs`);
//       const data = await response.json();

//       setBlog(data);
//     };
//     fetchUser();
//   }, [baseUrl]);

//   return (
//     <>
//       <div className="card bg-base-100 h-32 shadow-xl border-2 flex flex-col items-center justify-center">
//         <div className="flex items-center gap-8">
//           {/* <p className="font-bold text-[red]">User Information</p> */}
//           <div className="border border-solid rounded-full p-4 bg-slate-100">
//           <FaBlog className="text-5xl text-yellow-400"/>
//           </div>
//           <div className=" border-t-slate-700">
//             <div className="text-lg font-medium">Total Blogs</div>
//             <div className="text-3xl font-bold">{Blog.length}</div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default BlogCount;





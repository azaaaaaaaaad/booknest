import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const getUsers = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await res.json();
    return data.users || []; // Adjust according to your API response structure
  } catch (error) {
    console.log("Error loading users:", error);
    return []; // Return an empty array in case of error
  }
};

export default async function UsersList() {
  const users = await getUsers();
  console.log("Users:", users); // Check the structure here

  return (
    <>
      <div className="font-sans overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 whitespace-nowrap">
            <tr>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Joined At
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
            {Array.isArray(users) &&
              users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-4 text-sm text-gray-800">
                    {user?.name}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800">
                    {user.email}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800">
                    Yet to be done
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800">
                    2022-05-15
                  </td>
                  <td className="flex px-4 py-4 text-sm text-gray-800">
                    <Link href={`/dashboard/editUsers/${user._id}`}>
                      <HiPencilAlt size={24} />
                    </Link>
                    <RemoveBtn id={user._id} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

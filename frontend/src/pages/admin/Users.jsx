export default function Users() {
  const users = [
    { id: 1, name: "John Doe", role: "Buyer", status: "Active" },
    { id: 2, name: "Jane Smith", role: "Seller", status: "Suspended" },
    { id: 3, name: "Mike Johnson", role: "Driver", status: "Active" },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4 text-orange-600 dark:text-orange-400">
        User Management
      </h2>
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr
              key={u.id}
              className="hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors"
            >
              <td className="px-4 py-2">{u.name}</td>
              <td className="px-4 py-2">{u.role}</td>
              <td className="px-4 py-2 font-semibold">{u.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

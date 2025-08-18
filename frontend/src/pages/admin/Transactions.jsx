export default function Transactions() {
  const transactions = [
    { id: "#TX123", user: "John Doe", amount: "$120", status: "Completed" },
    { id: "#TX124", user: "Jane Smith", amount: "$75", status: "Pending" },
    { id: "#TX125", user: "Mike Johnson", amount: "$300", status: "Failed" },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4 text-orange-600 dark:text-orange-400">
        Transactions
      </h2>
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">User</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr
              key={t.id}
              className="hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors"
            >
              <td className="px-4 py-2">{t.id}</td>
              <td className="px-4 py-2">{t.user}</td>
              <td className="px-4 py-2">{t.amount}</td>
              <td className="px-4 py-2 font-semibold">{t.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

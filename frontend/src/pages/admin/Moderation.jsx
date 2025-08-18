export default function Moderation() {
  const reports = [
    { id: 1, content: "Spam message", status: "Pending" },
    { id: 2, content: "Abusive comment", status: "Reviewed" },
    { id: 3, content: "Fake listing", status: "Pending" },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4 text-orange-600 dark:text-orange-400">
        Content Moderation
      </h2>
      <ul className="space-y-3">
        {reports.map((r) => (
          <li
            key={r.id}
            className="p-3 bg-orange-50 dark:bg-gray-700 rounded flex justify-between items-center"
          >
            <span>{r.content}</span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                r.status === "Pending"
                  ? "bg-yellow-200 text-yellow-800"
                  : "bg-green-200 text-green-800"
              }`}
            >
              {r.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Settings() {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow max-w-xl">
      <h2 className="text-lg font-semibold mb-4 text-orange-600 dark:text-orange-400">
        System Settings
      </h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
            Platform Name
          </label>
          <input
            type="text"
            defaultValue="Alikin Marketplace"
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-orange-400"
          />
        </div>
        <div>
          <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
            Support Email
          </label>
          <input
            type="email"
            defaultValue="support@alikin.com"
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-orange-400"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
        >
          Save
        </button>
      </form>
    </div>
  );
}

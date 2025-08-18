import { Link, useLocation } from "react-router-dom";
import { HiX } from "react-icons/hi";

const navItems = [
  { path: "/admin", label: "Dashboard" },
  { path: "/admin/users", label: "Users" },
  { path: "/admin/transactions", label: "Transactions" },
  { path: "/admin/moderation", label: "Moderation" },
  { path: "/admin/settings", label: "Settings" },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();

  return (
    <>
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 transform z-50 transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:inset-auto`}
      >
        <div className="p-4 font-bold text-xl text-gray-800 dark:text-gray-200 flex justify-between items-center">
          Admin
          <button
            className="md:hidden text-gray-700 dark:text-gray-200"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <HiX className="w-6 h-6" />
          </button>
        </div>
        <nav className="mt-4">
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    location.pathname === item.path
                      ? "bg-gray-200 dark:bg-gray-700 font-semibold"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}

import { NavLink, Link } from "react-router";

function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800">
      <Link to={"/"} className="flex items-center space-x-2">
        <h1 className="text-3xl font-semibold text-white">Project Genesis</h1>
      </Link>
      <nav className="flex items-center space-x-4">
        <NavLink
          to="/signin"
          className={({ isActive }) =>
            isActive
              ? "bg-amber-600/100 px-5 py-2 rounded-md text-white underline "
              : "bg-amber-600/50 px-5 py-2 rounded-md hover:bg-amber-600 text-white transition-colors duration-300"
          }
        >
          Admin
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;

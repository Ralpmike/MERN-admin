import { NavLink } from "react-router";

function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800">
      <h1 className="text-3xl font-semibold text-white">Project Genesis</h1>
      <nav className="flex items-center space-x-4">
        <NavLink
          to="/signin"
          className={({ isActive }) =>
            isActive
              ? ""
              : "bg-amber-600 px-5 py-2 rounded-md hover:bg-accent hover:text-zinc-950"
          }
        >
          Admin
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;

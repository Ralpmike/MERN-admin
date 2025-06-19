import { NavLink } from "react-router";

function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-amber-200/40">
      <h1 className="text-3xl font-semibold">Form Genesis</h1>

      <nav className="flex items-center space-x-4">
        <NavLink
          to="/signin"
          className={({ isActive }) =>
            isActive
              ? ""
              : "bg-amber-600 px-5 py-2 rounded-md hover:bg-accent hover:text-zinc-950"
          }
        >
          Sign In
        </NavLink>

        <NavLink
          to="/signup"
          className={({ isActive }) =>
            isActive ? "active" : " bg-accent/50 px-5 py-2 rounded-md"
          }
        >
          Sign Up
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;

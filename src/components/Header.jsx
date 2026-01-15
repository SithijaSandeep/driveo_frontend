
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Car, Menu, X } from "lucide-react";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/vehicles", label: "Vehicles" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-100">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-extrabold text-4xl text-gray-900 pl-4">
          Driveo
        </Link>
      
 

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-lg font-bold transition-colors ${
                  isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {(() => {
            try {
              const raw = localStorage.getItem('user');
              if (raw) {
                const user = JSON.parse(raw);
                return (
                  <div className="flex items-center gap-3">
                    <Link to="/profile" className="inline-flex items-center gap-2 text-sm">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white text-lg font-semibold">{(user.name || 'U').charAt(0).toUpperCase()}</span>
                      <span className="text-lg text-gray-700 hover:text-blue-600">{user.name}</span>
                    </Link>
                    <button onClick={() => { localStorage.removeItem('user'); window.location.reload(); }} className="px-3 py-1 text-lg text-gray-600 hover:text-red-600">Logout</button>
                  </div>
                );
              }
            } catch (e) {}
            return (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-lg font-semibold text-blue-600 hover:text-blue-600/80"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-lg font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-600/90 shadow-sm"
                >
                  Register
                </Link>
                 <Link to="/admin/login" className="flex  font-extrabold  text-blue-900 pl-4">
          admin
        </Link>
        <Link to="/manager/login" className="flex  font-extrabold  text-blue-900 pl-4">
          manager
        </Link>
              </>
            );
          })()}
        </div>

        <button
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 hover:bg-blue-100"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur">
          <div className="container py-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-md font-bold ${isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-400"}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="flex gap-3 pt-2">
              {localStorage.getItem('user') ? (
                <>
                  <Link to="/profile" onClick={() => setOpen(false)} className="flex-1 px-4 py-2 text-sm font-semibold text-white bg-blue-600 text-center border border-gray-100 rounded-md">Profile</Link>
                  <button onClick={() => { localStorage.removeItem('user'); window.location.reload(); }} className="flex-1 px-4 py-2 text-sm font-semibold rounded-md bg-white text-gray-700 text-center border border-gray-200 hover:bg-red-600 hover:text-white">Logout</button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="flex-1 px-4 py-2 text-sm font-semibold text-blue-600 text-center border border-blue-600/20 rounded-md"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="flex-1 px-4 py-2 text-sm font-semibold rounded-md bg-blue-600 text-white text-center"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

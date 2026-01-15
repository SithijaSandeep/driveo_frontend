import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const SIDEBAR = [
  { to: "/manager", label: "Bookings" },
  { to: "/manager/vehicles", label: "Vehicles" },
  { to: "/manager/payments", label: "Payments" },
  // { to: "/manager/booking-history", label: "Booking History" },
];



  const handleLogout = () => {
    localStorage.removeItem('auth'); 
    // navigate('/manager/login'); 
    window.location.href = '/manager/login'; 
  };

export default function ManagerLayout(){
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside className={`h-screen transition-all bg-[#072233] text-white ${collapsed ? 'w-20' : 'w-64'}`}>
          <div className="flex h-16 items-center gap-3 px-4">
            <div className="h-10 w-10 rounded-md bg-blue-600 flex items-center justify-center">MG</div>
            {!collapsed && <div className="font-bold text-lg">Manager Panel</div>}
          </div>

          <nav className="mt-6 space-y-1 px-2">
            {SIDEBAR.map((s) => (
              <Link key={s.to} to={s.to} className="block rounded-md px-3 py-2 text-sm hover:bg-blue-600 hover:font-bold">{!collapsed ? s.label : s.label.charAt(0)}</Link>
            ))}
          </nav>

          <div className={`fixed bottom-20 ${collapsed ? 'w-20' : 'w-64'}`}>
            <button onClick={() => setCollapsed((c) => !c)} className="w-full rounded-md bg-gray-400 px-3 py-2 text-sm">{collapsed ? 'Expand' : 'Collapse'}</button>
          </div>
        </aside>

        <main className="flex-1 ">
          <header className="flex h-16 items-center justify-between border-b bg-[#072233] px-6">
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-200">Manager Dashboard</div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-200">Manager User</div>


              <button 
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-1.5 px-4 rounded transition-colors"
              >
                Logout
              </button>

            </div>
          </header>

          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

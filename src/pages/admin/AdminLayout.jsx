

import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import AdminUser from "../../components/AdminUser.jsx";

const SIDEBAR = [
  { to: "/admin", label: "Dashboard Overview" },
  { to: "/admin/manage-managers", label: "Manage Managers" },
  { to: "/admin/add-car", label: "Add Car" },
  { to: "/admin/manage-cars", label: "Manage Cars" },
  // { to: "/admin/booking-history", label: "Booking History" },
  // { to: "/admin/generate-reports", label: "Generate Reports" },
];

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  
  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (!admin) {
      
      navigate("/admin/login");
    }
  }, [navigate]);

  
  const handleLogout = () => {
    localStorage.removeItem("admin"); 
    navigate("/admin/login"); 
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* SIDEBAR */}
        <aside className={`min-h-screen transition-all bg-[#0f1724] text-white flex flex-col ${collapsed ? 'w-20' : 'w-64'}`}>
          <div className="flex h-16 items-center gap-3 px-4 border-b border-slate-800">
            <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center font-black shadow-lg">CR</div>
            {!collapsed && <div className="font-black text-lg tracking-tight">Admin Panel</div>}
          </div>

          <nav className="mt-6 flex-1 space-y-1 px-3">
            {SIDEBAR.map((s) => (
              <Link 
                key={s.to} 
                to={s.to}  
                className="block rounded-xl px-4 py-3 text-sm font-bold transition-all hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-900/20"
              >
                {!collapsed ? s.label : s.label.charAt(0)}
              </Link>
            ))}
          </nav>

          {/* Logout Button Section */}
          <div className="p-4 border-t border-slate-800 space-y-2">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-500/10 text-red-500 px-3 py-3 text-xs font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
            >
              {collapsed ? 'X' : 'Logout'}
            </button>
            
            <button 
              onClick={() => setCollapsed((c) => !c)} 
              className="w-full rounded-xl bg-slate-800 text-gray-400 px-3 py-2 text-[10px] font-bold uppercase tracking-widest hover:text-white"
            >
              {collapsed ? '→' : '← Collapse'}
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 bg-slate-100 min-h-screen overflow-y-auto">
          <header className="flex h-16 items-center justify-between border-b bg-white px-8 shadow-sm">
            <div className="flex items-center gap-4">
               <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">System Control</h2>
            </div>
            <div className="flex items-center gap-4">
               
               {/* <AdminUser /> */}
            </div>
          </header>

          <div className="p-8">
            
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
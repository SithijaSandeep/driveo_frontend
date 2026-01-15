import { useState } from "react";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminUser() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  function goProfile() {
    setOpen(false);
    navigate('/admin/profile-settings');
  }

  // function goSystem() {
  //   setOpen(false);
  //   // placeholder for system settings
  //   alert('System Settings (not implemented)');
  // }

  function logout() {
    setOpen(false);
    // clear auth tokens if any
    try { localStorage.removeItem('auth'); } catch (e) {}
    navigate('/login');
  }

  return (
    <div className="fixed left-4 bottom-4 z-50">
      <div className="relative">
        <button onClick={() => setOpen((o) => !o)} className="flex items-center gap-3 rounded-full bg-[#0b1220]/95 px-4 py-3 text-white shadow-lg">
          <div className="h-8 w-8 rounded-full bg-blue-600/80 flex items-center justify-center text-white font-semibold"><User className="h-4 w-4" /></div>
          <div className="hidden sm:block text-left">
            <div className="text-sm font-semibold">Admin User</div>
            <div className="text-xs text-white/80">admin@carrental.com</div>
          </div>
        </button>

        {open && (
          <div className="mt-2 w-56 rounded-md bg-white p-3 shadow-lg text-sm text-gray-800">
            <button onClick={goProfile} className="w-full text-left px-2 py-2 rounded hover:bg-gray-100">Profile Settings</button>
            {/* <button onClick={goSystem} className="w-full text-left px-2 py-2 rounded hover:bg-gray-100">System Settings</button> */}
            <div className="border-t my-2" />
            <button onClick={logout} className="w-full text-left px-2 py-2 rounded hover:bg-gray-100">Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}

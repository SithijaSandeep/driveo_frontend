import { useState, useEffect } from "react"; 
import axios from "axios"; 
import { Plus, Search, Mail, Phone, Edit, Trash2, Eye } from "lucide-react";

export default function ManageManagers() {

  const [managers, setManagers] = useState([]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });

  
  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    try {
      
      const response = await axios.get("http://127.0.0.1:8000/api/managers");
      setManagers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching managers:", error);
      setLoading(false);
    }
  };

  
  async function handleAdd(e) {
    e.preventDefault();
    
    
    if (!form.name || !form.email || !form.password) {
      alert("Please fill name, email and password!");
      return;
    }

    try {
      
      const response = await axios.post("http://127.0.0.1:8000/api/managers", form);

      if (response.status === 201 || response.status === 200) {
        alert("Manager added successfully!");
        
        setManagers((s) => [response.data.manager || response.data, ...s]);
        
        setForm({ name: "", email: "", phone: "", password: "" });
        setOpen(false);
      }
    } catch (error) {
      console.error("Error adding manager:", error.response?.data);
      alert(error.response?.data?.message || "Failed to add manager!");
    }
  }



async function handleDelete(id) {
  
  if (!window.confirm("Are you sure you want to delete this manager?")) return;

  try {
    
    await axios.delete(`http://127.0.0.1:8000/api/managers/${id}`);
    
    
    setManagers((s) => s.filter((m) => m.id !== id));
    
    alert("Manager deleted!");
  } catch (error) {
    console.error("Delete failed:", error);
    alert("Delete failed!");
  }
}




  const filtered = managers.filter((m) => {
    const q = query.trim().toLowerCase();
    if (q && !(`${m.name} ${m.email} ${m.phone}`.toLowerCase().includes(q))) return false;
    if (statusFilter !== "All Status" && m.status !== statusFilter) return false;
    return true;
  });

  function initials(name) {
    return name ? name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() : "M";
  }

  if (loading) return <div className="p-10 text-center">Loading Managers...</div>;

  return (
    <div className="py-5">
      <h2 className="text-2xl font-extrabold">Manage Managers</h2>
      <p className="text-sm text-gray-500 mt-1 pb-5">Add, edit, and manage system managers</p>
      
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between py-5">
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 border rounded-md bg-white px-3 py-2">
              <Search className="h-4 w-4 text-gray-400" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search managers..." className="w-64 text-sm outline-none" />
            </div>

            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="hidden sm:block rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>

            <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
              <Plus className="h-4 w-4" /> Add New Manager
            </button>
          </div>
        </div>

        <div className="mt-6">
          <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
            <div className="divide-y">
              {filtered.map((m) => (
                <div key={m.id} className="flex items-center justify-between py-4 px-2">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">{initials(m.name)}</div>
                    <div>
                      <div className="font-medium text-gray-900">{m.name}</div>
                      <div className="text-xs text-gray-500">{m.joined || m.created_at?.slice(0,10)}</div>
                    </div>
                  </div>

                  <div className="w-1/4 text-sm text-gray-700">
                    <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-gray-400" /> <span>{m.email}</span></div>
                    <div className="mt-1 flex items-center gap-2 text-gray-500"><Phone className="h-4 w-4" /> <span>{m.phone || 'N/A'}</span></div>
                  </div>

                  <div className="w-1/4 text-sm text-gray-700">{m.performance || 'New Manager'}</div>

                  <div className="w-32 text-sm">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${m.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{m.status || 'Active'}</span>
                  </div>

                  <div className="w-40 flex items-center justify-end gap-3 text-gray-500">
                    {/* <button className="hover:text-primary"><Eye className="h-4 w-4" /></button> */}
                    {/* <button className="hover:text-primary"><Edit className="h-4 w-4" /></button> */}
                    <button onClick={() => handleDelete(m.id)} className="hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="py-8 text-center text-sm text-gray-500">No managers found.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <form onSubmit={handleAdd} className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h3 className="text-lg font-semibold">Add New Manager</h3>

            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-xs text-gray-600">Full Name</label>
                <input required value={form.name} onChange={(e) => setForm((f) => ({...f, name: e.target.value}))} className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none" />
              </div>

              <div>
                <label className="block text-xs text-gray-600">Email</label>
                <input required type="email" value={form.email} onChange={(e) => setForm((f) => ({...f, email: e.target.value}))} className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none" />
              </div>

              <div>
                <label className="block text-xs text-gray-600">Phone</label>
                <input value={form.phone} onChange={(e) => setForm((f) => ({...f, phone: e.target.value}))} className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none" />
              </div>

              <div>
                <label className="block text-xs text-gray-600">Password</label>
                <input required type="password" value={form.password} onChange={(e) => setForm((f) => ({...f, password: e.target.value}))} className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none" />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button type="button" onClick={() => setOpen(false)} className="rounded-md border border-gray-200 px-4 py-2 text-sm">Cancel</button>
              <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Add Manager</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}


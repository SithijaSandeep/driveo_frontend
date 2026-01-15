

import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Car as CarIcon, Fuel, Users, Settings, Plus } from "lucide-react";

export default function ManagerVehicles() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('All');
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/cars");
      setCars(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cars:", error);
      setLoading(false);
    }
  };

  // Stats ගණනය කිරීම (Database එකේ දත්ත අනුව)
  const stats = useMemo(() => {
    const total = cars.length;
    const petrol = cars.filter(c => c.fuel?.toLowerCase() === 'petrol').length;
    const diesel = cars.filter(c => c.fuel?.toLowerCase() === 'diesel').length;
    const hybrid = cars.filter(c => c.fuel?.toLowerCase() === 'hybrid').length;
    return { total, petrol, diesel, hybrid };
  }, [cars]);

  // Filter Logic
  const filtered = useMemo(() => {
    return cars.filter(c => {
      const matchesTab = tab === 'All' || c.fuel === tab;
      const matchesSearch = (c.brand + " " + c.model).toLowerCase().includes(query.toLowerCase()) || 
                            c.reg.toLowerCase().includes(query.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [cars, tab, query]);

  if (loading) return <div className="p-10 font-bold text-center">Loading Vehicles...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-gray-900">Vehicle Fleet</h1>
          <p className="text-sm text-gray-500 font-medium">Manage and monitor your rental assets</p>
        </div>
        {/* <Link to="/manager/add-car" className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
          <Plus size={18} /> Add New Vehicle
        </Link> */}
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-4">
        <StatCard title="Total Fleet" value={stats.total} icon={<CarIcon className="text-blue-600" />} color="bg-blue-50" />
        <StatCard title="Petrol Cars" value={stats.petrol} icon={<Fuel className="text-orange-600" />} color="bg-orange-50" />
        <StatCard title="Diesel Cars" value={stats.diesel} icon={<Fuel className="text-gray-600" />} color="bg-gray-50" />
        <StatCard title="Hybrid" value={stats.hybrid} icon={<Settings className="text-green-600" />} color="bg-green-50" />
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {['All', 'Petrol', 'Diesel', 'Hybrid'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-xl px-5 py-2 text-xs font-black uppercase tracking-wider transition-all ${
                tab === t ? 'bg-gray-900 text-white shadow-lg' : 'bg-white text-gray-500 border border-gray-100 hover:bg-gray-50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search by Brand, Model or Reg..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-xs rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Vehicle Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <div key={c.id} className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300">
            {/* Image Section */}
            <div className="relative h-48 w-full overflow-hidden bg-gray-100">
              {c.images ? (
                <img 
                  src={`http://127.0.0.1:8000/storage/${JSON.parse(c.images)[0]}`} 
                  alt={c.model} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-300 font-bold italic text-sm">No Image</div>
              )}
              <div className="absolute top-4 right-4 rounded-lg bg-white/90 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-gray-900 backdrop-blur-sm">
                {c.reg}
              </div>
            </div>

            {/* Details Section */}
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-black uppercase tracking-tight text-gray-900">{c.brand} {c.model}</h3>
                <div className="mt-1 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  <span>{c.year}</span> • <span>{c.transmission}</span>
                </div>
              </div>

              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 rounded-xl bg-gray-50 p-3">
                  <Users size={16} className="text-blue-500" />
                  <span className="text-xs font-bold text-gray-600">{c.seats} Seats</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-gray-50 p-3">
                  <Fuel size={16} className="text-blue-500" />
                  <span className="text-xs font-bold text-gray-600">{c.fuel}</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-50 pt-5">
                <div>
                  <span className="block text-[10px] font-black uppercase text-gray-400 tracking-widest">Daily Rate</span>
                  <span className="text-xl font-black text-blue-600">Rs. {Number(c.price).toLocaleString()}</span>
                </div>
                <div className="flex gap-2">
                  <Link 
                    to={`/manager/edit-car/${c.id}`}
                    className="rounded-xl border border-gray-100 p-2 text-gray-400 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                  >
                    <Settings size={18} />
                  </Link>
                  <Link 
                    to={`/vehicles/${c.id}`} 
                    className="rounded-xl bg-gray-900 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white hover:bg-gray-800 transition-all"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-20 text-center">
          <p className="font-bold italic text-gray-400 uppercase tracking-widest">No vehicles found in this category.</p>
        </div>
      )}
    </div>
  );
}

// Reusable Stat Card Component
function StatCard({ title, value, icon, color }) {
  return (
    <div className={`flex items-center gap-4 rounded-3xl p-6 ${color} border border-white shadow-sm`}>
      <div className="rounded-2xl bg-white p-3 shadow-sm">{icon}</div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{title}</p>
        <p className="text-2xl font-black text-gray-900">{value}</p>
      </div>
    </div>
  );
}
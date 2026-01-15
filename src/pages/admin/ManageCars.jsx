import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Download, Plus, Edit, Trash2 } from "lucide-react";

export default function ManageCars() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [fuelFilter, setFuelFilter] = useState("All Fuel Types");
  
  // Database state
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data on component mount
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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/cars/${id}`);
        setCars(cars.filter(car => car.id !== id));
      } catch (error) {
        console.error("Error deleting car:", error);
      }
    }
  };

  // Filter Logic
  const filtered = cars.filter((c) => {
    const q = query.trim().toLowerCase();
    const modelName = c.model ? c.model.toLowerCase() : "";
    const brandName = c.brand ? c.brand.toLowerCase() : "";
    const regNum = c.reg ? c.reg.toLowerCase() : "";
    
    if (q && !(modelName.includes(q) || brandName.includes(q) || regNum.includes(q))) return false;
    if (statusFilter !== 'All Status' && c.status !== statusFilter) return false;
    if (fuelFilter !== 'All Fuel Types' && c.fuel !== fuelFilter) return false;
    return true;
  });

  if (loading) return <div className="p-10 text-center text-xl font-semibold">Loading Vehicles...</div>;

  return (
    <div>
      <div className="rounded-lg bg-white p-6 shadow-sm">
        {/* Header Section */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900">Manage Vehicles</h2>
            <p className="text-sm text-gray-500 mt-1">View, edit, and manage your vehicle fleet from the database</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Download className="h-4 w-4" /> Export Data
            </button>
            <Link to="/admin/add-car" className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
              <Plus className="h-4 w-4" /> Add Vehicle
            </Link>
          </div>
        </div>

        {/* Filters Section */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 w-full sm:w-2/3">
            <input 
              value={query} 
              onChange={(e) => setQuery(e.target.value)} 
              placeholder="Search by brand, model or registration..." 
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>

          <div className="flex items-center gap-3">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none">
              <option>All Status</option>
              <option>Available</option>
              <option>Booked</option>
              <option>Maintenance</option>
            </select>

            <select value={fuelFilter} onChange={(e) => setFuelFilter(e.target.value)} className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none">
              <option>All Fuel Types</option>
              <option>Petrol</option>
              <option>Diesel</option>
              <option>Electric</option>
              <option>Hybrid</option>
            </select>
          </div>
        </div>

        {/* Grid Section */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => {
            // Parse images safely
            let carImage = "https://via.placeholder.com/400x300?text=No+Image";
            try {
              const imagesArray = JSON.parse(c.images);
              if (imagesArray && imagesArray.length > 0) {
                carImage = `http://127.0.0.1:8000/storage/${imagesArray[0]}`;
              }
            } catch (e) {
              console.error("Image parsing error", e);
            }

            return (
              <div key={c.id} className="relative rounded-2xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                {/* Status Badge */}
                <div className={`absolute right-4 top-4 z-10 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                  c.status === 'Available' ? 'bg-green-100 text-green-800' : 
                  c.status === 'Booked' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {c.status || 'Available'}
                </div>

                <div className="flex flex-col gap-4">
                  {/* Image */}
                  <div 
                    className="w-full h-40 bg-cover bg-center rounded-lg shadow-sm overflow-hidden" 
                    style={{ backgroundImage: `url(${carImage})` }} 
                  />

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-bold text-lg text-gray-900">{c.brand} {c.model}</div>
                        <div className="text-sm text-gray-500 font-medium">Reg: {c.reg}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-extrabold text-blue-600">Rs.{c.price}<span className="text-xs font-medium text-gray-500">/day</span></div>
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-y-1 text-sm text-gray-600 border-t pt-3">
                      <div><span className="text-gray-400">Year:</span> {c.year}</div>
                      <div><span className="text-gray-400">Seats:</span> {c.seats}</div>
                      <div><span className="text-gray-400">Fuel:</span> {c.fuel}</div>
                      <div><span className="text-gray-400">Type:</span> {c.type}</div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t pt-4">
                      <div className="flex items-center gap-4">
                        <button className="text-gray-500 hover:text-blue-600 transition-colors">
                          <Link to={`/admin/edit-car/${c.id}`} className="hover:text-primary">
                             <Edit className="h-4 w-4" />
                          </Link>
                        </button>
                        <button 
                          onClick={() => handleDelete(c.id)}
                          className="text-gray-500 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <select 
                        defaultValue={c.status} 
                        className="rounded-md border border-gray-200 px-2 py-1 text-xs font-medium focus:ring-1 focus:ring-blue-500 outline-none"
                      >
                        <option>Available</option>
                        <option>Booked</option>
                        <option>Maintenance</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="mt-10 text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500">No vehicles found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}



























import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Filter, Phone, Mail } from "lucide-react";
import axios from "axios";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]); 
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [type, setType] = useState("All Types");
  const [seats, setSeats] = useState("Any");
  const [trans, setTrans] = useState("Any");
  const [fuel, setFuel] = useState("Any");
  const [sort, setSort] = useState("name");

  
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/cars");
        setVehicles(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  
  const filtered = useMemo(() => {
    let list = vehicles.slice();
    
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((v) => 
        (v.brand + " " + v.model).toLowerCase().includes(q)
      );
    }
    
    if (type !== "All Types") list = list.filter((v) => v.category === type);
    if (seats !== "Any") list = list.filter((v) => v.seats === Number(seats));
    if (trans !== "Any") list = list.filter((v) => v.transmission === trans);
    if (fuel !== "Any") list = list.filter((v) => v.fuel === fuel);

    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "name") list.sort((a, b) => a.brand.localeCompare(b.brand));

    return list;
  }, [vehicles, query, type, seats, trans, fuel, sort]);

  if (loading) return <div className="py-20 text-center">Loading Vehicles...</div>;

  return (
    <div className="bg-gray-100 text-foreground ">
      <Header />
      <div className="container py-12 mx-auto px-4">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center">Our Vehicle Fleet</h1>
        <p className="mt-2 text-gray-600 text-center">Choose from our extensive collection of well-maintained vehicles for every occasion and budget</p>

        <div className="mt-8 grid gap-6 md:grid-cols-4">
    
          <aside className="md:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-700">Filters</h3>
                <button onClick={() => { setQuery(""); setType("All Types"); setSeats("Any"); setTrans("Any"); setFuel("Any"); }} className="text-sm text-blue-600">Clear All</button>
              </div>

              <div className="pl-4 space-y-3 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <label className="block text-xs text-gray-600 mb-1">Search</label>
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search vehicles..." className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 text-black" />

                <label className="block text-xs text-gray-600 mt-3">Vehicle Type</label>
                <select value={type} onChange={(e) => setType(e.target.value)} className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none text-black">
                  <option>All Types</option>
                  <option>Sedan</option>
                  <option>SUV</option>
                  <option>Hatchback</option>
                </select>

                <label className="block text-xs text-gray-600 mt-3">Seats</label>
                <select value={seats} onChange={(e) => setSeats(e.target.value)} className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none text-black">
                  <option>Any</option>
                  <option value="2">2</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="7">7</option>
                </select>

                <label className="block text-xs text-gray-600 mt-3">Transmission</label>
                <select value={trans} onChange={(e) => setTrans(e.target.value)} className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none text-black">
                  <option>Any</option>
                  <option>Automatic</option>
                  <option>Manual</option>
                </select>

                <label className="block text-xs text-gray-600 mt-3">Fuel Type</label>
                <select value={fuel} onChange={(e) => setFuel(e.target.value)} className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none text-black">
                  <option>Any</option>
                  <option>Petrol</option>
                  <option>Hybrid</option>
                  <option>Electric</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Vehicle Grid - Original UI */}
          <div className="md:col-span-3">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">{filtered.length} Vehicles Available</div>
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1 text-sm text-black">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <span>Sort</span>
                  <select value={sort} onChange={(e) => setSort(e.target.value)} className="ml-2 bg-transparent text-sm outline-none text-black">
                    <option value="name">Sort by Name</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {filtered.map((v) => {
                
                const carImages = v.images ? JSON.parse(v.images) : [];
                const mainImage = carImages.length > 0 
                  ? `http://127.0.0.1:8000/storage/${carImages[0]}` 
                  : "https://via.placeholder.com/400x300";

                return (
                  <article key={v.id} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="h-48 w-full bg-cover bg-center" style={{ backgroundImage: `url(${mainImage})` }} />
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{v.brand} {v.model}</h3>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">{v.category || "Car"}</span>
                          </div>
                          <ul className="mt-3 flex flex-wrap gap-3 text-xs text-gray-600">
                            <li>{v.seats} Seats</li>
                            <li className="uppercase">{v.transmission}</li>
                            <li>{v.fuel}</li>
                          </ul>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-extrabold text-gray-900">Rs.{Number(v.price).toLocaleString()}<span className="text-sm font-medium text-gray-500">/day</span></p>
                          <div className={`mt-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800`}>
                            Available
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 flex gap-3">
                        <Link to={`/vehicles/${v.id}`} className="flex-1 rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 text-center">View Details</Link>
                        <Link to={`/book/${v.id}`} className="flex-1 rounded-md px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 text-center">
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Empty State */}
            {filtered.length === 0 && (
              <div className="py-20 text-center text-gray-500">No vehicles found.</div>
            )}

            {/* Footer Support - Original UI */}
            <div className="mt-10 rounded-lg bg-blue-600 px-6 py-8">
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-extrabold text-white">Can't Find What You're Looking For?</h3>
                  <p className="mt-1 text-white/90">Contact our team for special requests or custom vehicle requirements</p>
                </div>
                <div className="flex gap-3">
                  <a href="tel:+15551234567" className="inline-flex items-center text-white gap-2 rounded-md bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/20">
                    <Phone className="h-4 w-4" /> (011) 234-5678
                  </a>
                  <a href="mailto:info@carrental.com" className="inline-flex items-center text-white gap-2 rounded-md bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/20">
                    <Mail className="h-4 w-4" /> Email Support
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
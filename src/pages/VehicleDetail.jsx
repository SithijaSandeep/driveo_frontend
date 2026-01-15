
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export default function VehicleDetail() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/cars/${id}`);
        setVehicle(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching vehicle details:", error);
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [id]);

  if (loading) return <div className="py-24 text-center font-bold">Loading Details...</div>;

  if (!vehicle) {
    return (
      <div className="container py-24 text-center">
        <h2 className="text-2xl font-semibold">Vehicle not found</h2>
        <p className="mt-2">We couldn't find the requested vehicle.</p>
        <Link to="/vehicles" className="inline-flex mt-4 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Back to fleet</Link>
      </div>
    );
  }

  
  const carImages = vehicle.images ? JSON.parse(vehicle.images) : [];
  const mainImage = carImages.length > 0 
    ? `http://127.0.0.1:8000/storage/${carImages[0]}` 
    : "https://via.placeholder.com/800x420";

  return (
    <div className="bg-gray-100 text-foreground">
      <Header />
      <div className="container py-8 mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-4">
          <Link to="/" className="hover:underline">Home</Link> <span className="px-2">›</span>
          <Link to="/vehicles" className="hover:underline">Vehicles</Link> <span className="px-2">›</span>
          <span className="text-gray-700">{vehicle.brand} {vehicle.model}</span>
        </nav>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Main Image Section */}
          <div className="md:col-span-2">
            <div className="rounded-xl overflow-hidden border border-gray-200 bg-black">
              <img src={mainImage} alt={vehicle.model} className="w-full object-cover" style={{ height: 420 }} />
            </div>
            
            {/* Thumbnails (If multiple images exist) */}
            <div className="mt-4 grid grid-cols-4 gap-3">
              {carImages.map((img, index) => (
                <div key={index} className="rounded-md overflow-hidden border border-gray-200 h-24 bg-white">
                  <img src={`http://127.0.0.1:8000/storage/${img}`} alt="thumb" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Details */}
          <aside className="md:col-span-1">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-extrabold text-black">{vehicle.brand} {vehicle.model}</h1>
                  <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>4.8</span>
                    <span className="text-gray-400">(124 reviews)</span>
                  </div>
                </div>
                <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800`}>
                  Available
                </div>
              </div>

              <p className="mt-4 text-gray-600 text-sm">
                The {vehicle.brand} {vehicle.model} ({vehicle.year}) is a reliable and comfortable vehicle perfect for business trips, family outings, or daily commuting. 
                {vehicle.notes && <span className="block mt-2 font-medium italic">"{vehicle.notes}"</span>}
              </p>

              <div className="mt-6">
                <h4 className="text-sm text-gray-500 font-bold uppercase tracking-wider">Rental Pricing</h4>
                <div className="mt-2 flex items-end justify-between">
                  <div>
                    <div className="text-2xl font-extrabold text-black">Rs.{Number(vehicle.price).toLocaleString()}</div>
                    <div className="text-sm text-gray-500">per day</div>
                  </div>
                  <Link to={`/book/${vehicle.id}`} className="inline-flex items-center justify-center rounded-md px-6 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                    Book Now
                  </Link>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="text-sm font-semibold text-gray-700">Vehicle Specifications</h4>
                <ul className="mt-3 grid grid-cols-1 gap-3 text-sm text-gray-600">
                   <li className="flex justify-between border-b border-gray-50 pb-1"><strong>Category:</strong> <span>{vehicle.category || "General"}</span></li>
                   <li className="flex justify-between border-b border-gray-50 pb-1"><strong>Seats:</strong> <span>{vehicle.seats} Adults</span></li>
                   <li className="flex justify-between border-b border-gray-50 pb-1"><strong>Transmission:</strong> <span className="uppercase">{vehicle.transmission}</span></li>
                   <li className="flex justify-between border-b border-gray-50 pb-1"><strong>Fuel Type:</strong> <span>{vehicle.fuel}</span></li>
                   <li className="flex justify-between border-b border-gray-50 pb-1"><strong>Color:</strong> <span>{vehicle.color}</span></li>
                   <li className="flex justify-between border-b border-gray-50 pb-1"><strong>Year:</strong> <span>{vehicle.year}</span></li>
                </ul>
              </div>
            </div>
          </aside>
        </div>

        
        <div className="mt-10 bg-white p-8 rounded-xl border border-gray-200">
          <h3 className="text-lg font-bold text-black border-b pb-3">Features & Amenities</h3>
          <ul className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
            {vehicle.features && Object.entries(vehicle.features).map(([name, active]) => (
              active && (
                <li key={name} className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  {name}
                </li>
              )
            ))}
            {(!vehicle.features || Object.values(vehicle.features).every(v => !v)) && (
              <li className="text-gray-400">Standard features included.</li>
            )}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}
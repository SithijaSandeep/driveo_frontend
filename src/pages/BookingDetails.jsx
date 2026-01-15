
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { CheckCircle, ArrowLeft, Users, Fuel, Gauge } from "lucide-react";

export default function BookingDetails() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [mainImg, setMainImg] = useState("");

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/cars/${id}`);
        setVehicle(response.data);
        
        
        if (response.data.images) {
          const imgs = JSON.parse(response.data.images);
          if (imgs.length > 0) {
            setMainImg(`http://127.0.0.1:8000/storage/${imgs[0]}`);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching vehicle details:", error);
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [id]);

  if (loading) return <div className="py-20 text-center font-bold">Loading...</div>;

  if (!vehicle) {
    return (
      <div className="container py-24 text-center">
        <h2 className="text-2xl font-semibold">Vehicle not found</h2>
        <Link to="/vehicles" className="inline-flex mt-4 items-center gap-2 text-blue-600">
          <ArrowLeft size={18} /> Back to fleet
        </Link>
      </div>
    );
  }

  
  const features = vehicle.features ? (typeof vehicle.features === 'string' ? JSON.parse(vehicle.features) : vehicle.features) : {};
  const activeFeatures = Object.keys(features).filter(key => features[key]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link to="/vehicles" className="hover:text-blue-600">Vehicles</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{vehicle.brand} {vehicle.model}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column: Images & Info */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Main Image Card */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="aspect-video bg-gray-100 flex items-center justify-center relative">
                {mainImg ? (
                  <img src={mainImg} alt={vehicle.model} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-gray-400">No Image Available</div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                  {vehicle.year} Model
                </div>
              </div>
            </div>

            {/* Vehicle Title & Description */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-black text-gray-900">{vehicle.brand} {vehicle.model}</h1>
                  <p className="text-gray-500 mt-1">Registration: {vehicle.reg}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400 uppercase font-bold tracking-wider">Daily Rate</div>
                  <div className="text-2xl font-black text-blue-600">Rs.{vehicle.price}</div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl flex flex-col items-center">
                  <Users className="text-blue-500 mb-2" />
                  <span className="text-xs text-gray-500">Seats</span>
                  <span className="font-bold">{vehicle.seats} Adults</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl flex flex-col items-center">
                  <Fuel className="text-blue-500 mb-2" />
                  <span className="text-xs text-gray-500">Fuel</span>
                  <span className="font-bold">{vehicle.fuel}</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl flex flex-col items-center">
                  <Gauge className="text-blue-500 mb-2" />
                  <span className="text-xs text-gray-500">Transmission</span>
                  <span className="font-bold">{vehicle.transmission}</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl flex flex-col items-center">
                  <CheckCircle className="text-blue-500 mb-2" />
                  <span className="text-xs text-gray-500">Mileage</span>
                  <span className="font-bold">{vehicle.mileage} km</span>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold mb-4">Features & Amenities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {activeFeatures.length > 0 ? (
                  activeFeatures.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      {f}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">Standard features included</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Summary & CTA */}
          <aside className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-blue-50 sticky top-6">
              <h3 className="text-lg font-bold border-b pb-4 mb-4">Booking Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Vehicle</span>
                  <span className="font-semibold text-gray-900">{vehicle.brand}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Rental Days</span>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-6 h-6 border rounded flex items-center justify-center">-</button>
                    <span className="font-bold">{qty}</span>
                    <button onClick={() => setQty(q => q + 1)} className="w-6 h-6 border rounded flex items-center justify-center">+</button>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900">Total Price</span>
                    <span className="text-2xl font-black text-blue-600">Rs.{vehicle.price * qty}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">* Prices may vary based on pickup location and additional services.</p>
                </div>

                <Link 
                  to={`/book/${vehicle.id}`} 
                  className="block w-full bg-blue-600 text-white text-center py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 mt-6"
                >
                  Continue to Booking
                </Link>
                
                <p className="text-center text-xs text-gray-400">Free cancellation up to 24 hours</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
}
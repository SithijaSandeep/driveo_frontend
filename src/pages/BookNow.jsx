

import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Star, Users, Fuel, Gauge, ArrowLeft, Calendar, MapPin } from "lucide-react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export default function BookNow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    driving_license: "",
    pickup_date: "",
    return_date: ""
  });

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/cars/${id}`);
        setVehicle(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching vehicle:", error);
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [id]);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Duration and Total calculation
  const getDuration = () => {
    if (!formData.pickup_date || !formData.return_date) return 1;
    const d1 = new Date(formData.pickup_date);
    const d2 = new Date(formData.return_date);
    const diff = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    const duration = getDuration();
    const total_price = vehicle.price * duration;

    const finalData = {
      car_id: parseInt(id),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      driving_license: formData.driving_license,
      pickup_date: formData.pickup_date,
      return_date: formData.return_date,
      total_price: total_price
    };

    try {
      await axios.post("http://127.0.0.1:8000/api/bookings", finalData);
      alert("Booking Request Sent Successfully!");
      navigate("/profile");
    } catch (err) {
      alert("Error processing booking. Make sure your backend is running.");
    }
  };

  if (loading) return <div className="py-20 text-center">Loading...</div>;

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-black mb-6 uppercase tracking-tight text-gray-900">Personal Details</h2>
            <form onSubmit={handleBooking} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-500">Full Name</label>
                <input required name="name" onChange={handleInput} type="text" className="w-full p-4 border rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-500">Email Address</label>
                <input required name="email" onChange={handleInput} type="email" className="w-full p-4 border rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500" placeholder="email@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-500">Phone Number</label>
                <input required name="phone" onChange={handleInput} type="text" className="w-full p-4 border rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500" placeholder="+94 7X XXX XXXX" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-500">Driving License No</label>
                <input required name="driving_license" onChange={handleInput} type="text" className="w-full p-4 border rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ex: B1234567" />
              </div>
              
              <div className="md:col-span-2 mt-4 pt-4 border-t">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Select Rental Dates</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Pick-up</label>
                    <input required name="pickup_date" onChange={handleInput} type="date" className="w-full p-3 border rounded-lg" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Return</label>
                    <input required name="return_date" onChange={handleInput} type="date" className="w-full p-3 border rounded-lg" />
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 pt-6">
                <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-lg transition-all">
                  Confirm Booking Request
                </button>
              </div>
            </form>
          </div>

          {/* Summary Sidebar */}
          <aside>
            <div className="bg-white border rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="font-bold mb-4 uppercase text-sm tracking-wider">Booking Summary</h3>
              <div className="flex gap-4 mb-6">
                {vehicle.images && (
                  <img src={`http://127.0.0.1:8000/storage/${JSON.parse(vehicle.images)[0]}`} className="w-24 h-16 object-cover rounded-lg bg-gray-100" alt="" />
                )}
                <div>
                  <div className="font-bold text-gray-900">{vehicle.brand} {vehicle.model}</div>
                  <div className="text-[10px] text-gray-500 uppercase">{vehicle.transmission} • {vehicle.fuel}</div>
                </div>
              </div>
              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Daily Rate</span>
                  <span className="font-bold">Rs. {vehicle.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Duration</span>
                  <span className="font-bold">{getDuration()} Days</span>
                </div>
                <div className="flex justify-between text-lg pt-3 border-t font-black text-blue-600">
                  <span>Total</span>
                  <span>Rs. {(vehicle.price * getDuration()).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
}
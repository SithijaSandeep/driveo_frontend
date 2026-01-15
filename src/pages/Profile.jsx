

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";

const AVATAR = "https://cdn.builder.io/api/v1/image/assets%2F7adcc6b12c1b4af0bfcd78750bc66218%2Fb9d0be27e9ab41d3b3a3eca0df554e08?format=webp&width=400";

export default function Profile() {
  const [active, setActive] = useState("bookings");
  const [bookings, setBookings] = useState([]);

  
  const raw = typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const user = raw ? JSON.parse(raw) : null;

  useEffect(() => {
    const fetchMyBookings = async () => {
      if (user && user.email) {
        try {
          
          const res = await axios.get(`http://127.0.0.1:8000/api/bookings?email=${user.email}`);
          setBookings(res.data);
        } catch (err) {
          console.error("Error fetching bookings:", err);
        }
      }
    };
    fetchMyBookings();
  }, [user?.email]);

  if (!user) return <div className="p-10 text-center font-bold">Please Login First</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <div className="max-w-6xl mx-auto px-6 pt-12">
        {/* User Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          {/* <img src={AVATAR} alt="Profile" className="w-32 h-32 rounded-2xl object-cover" /> */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-black uppercase tracking-tight text-blue-900">{user.name}</h1>
            <p className="text-gray-500 font-medium">{user.email}</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mt-8 border-b border-gray-200">
          <button 
            onClick={() => setActive("bookings")}
            className={`pb-4 text-sm font-black uppercase tracking-widest transition-all ${active === 'bookings' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-400'}`}
          >
            My Bookings
          </button>
          <button 
            onClick={() => setActive("settings")}
            className={`pb-4 text-sm font-black uppercase tracking-widest transition-all ${active === 'settings' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-400'}`}
          >
            Account Settings
          </button>
        </div>

        {/* Dynamic Content Section */}
        <div className="mt-10">
          {active === "bookings" ? (
            <>
              <h2 className="text-2xl font-black uppercase tracking-tight mb-6">Booking History</h2>
              
              {bookings.length > 0 ? (
                <div className="grid gap-4">
                  {bookings.map((b) => (
                    <div key={b.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:shadow-md">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ID: #{b.id}</span>
                          <span className={`px-3 py-0.5 rounded-full text-[9px] font-black uppercase ${
                            b.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                            b.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {b.status}
                          </span>
                        </div>
                        <p className="font-bold text-lg text-blue-900">Vehicle ID: {b.car_id}</p>
                        <p className="text-sm text-gray-500">{b.pickup_date} <span className="mx-1">→</span> {b.return_date}</p>
                        <p className="text-xl font-black text-blue-600 mt-2">Rs. {parseFloat(b.total_price).toLocaleString()}</p>
                      </div>

                      <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                        {/* Manager විසින් Approve කර ඇත්නම් පමණක් 'Pay Now' බට්න් එක පෙන්වයි */}
                        {b.status === 'Approved' ? (
                          <Link 
                            to="/payment" 
                            state={{ booking: b }} // මෙතනින් තමයි Payment පේජ් එකට දත්ත යවන්නේ
                            className="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 text-center"
                          >
                            Pay Now
                          </Link>
                        ) : b.status === 'Pending' ? (
                          <p className="text-[10px] font-bold text-gray-400 italic uppercase">Waiting for manager approval</p>
                        ) : (
                          <p className="text-[10px] font-bold text-red-400 uppercase">Booking Rejected</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-20 text-center border border-dashed border-gray-200">
                   <p className="text-gray-400 font-bold italic">No bookings found for your account.</p>
                   <Link to="/vehicles" className="inline-block mt-4 text-blue-600 font-black uppercase text-sm underline underline-offset-4">Rent a Car Now</Link>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-black uppercase tracking-tight mb-6">Settings</h2>
                <p className="text-gray-500 font-medium">This section is currently under development.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
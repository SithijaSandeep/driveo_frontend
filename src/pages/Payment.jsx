


import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { CreditCard, ShieldCheck, Calendar, Car, ArrowLeft } from "lucide-react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking } = location.state || {}; 
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!booking) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
        <div className="text-center space-y-4">
           <div className="inline-flex p-4 rounded-full bg-red-50 text-red-500 mb-4">
              <ShieldCheck size={48} />
           </div>
           <h2 className="text-2xl font-black uppercase tracking-tight">No Booking Found</h2>
           <p className="text-gray-500 max-w-xs mx-auto">It seems like you haven't selected a booking to pay for.</p>
           <button onClick={() => navigate("/profile")} className="mt-6 px-8 py-3 bg-blue-600 text-white font-black uppercase text-xs rounded-xl hover:bg-blue-700 transition-all">Back to Profile</button>
        </div>
      </div>
    );
  }

  const handlePay = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      
      // await axios.put(`http://127.0.0.1:8000/api/bookings/${booking.id}/pay`);
      
      setTimeout(() => {
        setLoading(false);
        alert("Payment Successful! Your ride is officially confirmed.");
        navigate("/profile");
      }, 2000);
    } catch (error) {
      setLoading(false);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
      <Header />
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Back Button */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-black mb-8 transition-colors font-bold text-sm uppercase tracking-widest">
           <ArrowLeft size={16} /> Back
        </button>

        <div className="grid lg:grid-cols-3 gap-10">
          
          {/* LEFT COLUMN: Booking Summary */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Car size={120} />
              </div>
              
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 mb-6">Booking Summary</h2>
              
              <div className="space-y-6 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 rounded-2xl text-blue-600"><Car size={20} /></div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-gray-400">Vehicle ID</p>
                    <p className="font-bold text-lg text-slate-800">#{booking.car_id}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 rounded-2xl text-blue-600"><Calendar size={20} /></div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-gray-400">Duration</p>
                    <p className="font-bold text-sm text-slate-800">{booking.pickup_date} — {booking.return_date}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Total Amount</p>
                  <p className="text-4xl font-black text-slate-900 tracking-tighter">
                    <span className="text-lg font-bold mr-1">Rs.</span>
                    {parseFloat(booking.total_price).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-600 rounded-[2rem] p-8 text-white">
               <ShieldCheck className="mb-4 opacity-80" size={32} />
               <h3 className="font-black uppercase text-sm mb-2 tracking-wide">Secure Checkout</h3>
               <p className="text-blue-100 text-xs leading-relaxed">Your transaction is protected by 256-bit SSL encryption. We do not store your full card details.</p>
            </div>
          </div>

          {/* RIGHT COLUMN: Payment Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-10">
                <h1 className="text-3xl font-black uppercase tracking-tight text-slate-900">Payment Details</h1>
                <div className="flex gap-2">
                   <div className="w-10 h-6 bg-slate-100 rounded"></div>
                   <div className="w-10 h-6 bg-slate-100 rounded"></div>
                   <div className="w-10 h-6 bg-slate-100 rounded"></div>
                </div>
              </div>

              <form onSubmit={handlePay} className="space-y-8">
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Cardholder Name</label>
                    <input 
                      required 
                      type="text" 
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-700" 
                      placeholder="e.g. SITHIJA SANDEEP" 
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Card Number</label>
                    <div className="relative">
                      <input 
                        required 
                        type="text" 
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-700" 
                        placeholder="0000 0000 0000 0000" 
                      />
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300">
                        <CreditCard size={20} />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Expiry Date</label>
                      <input 
                        required 
                        type="text" 
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-700" 
                        placeholder="MM / YY" 
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">CVC / CVV</label>
                      <input 
                        required 
                        type="text" 
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-700" 
                        placeholder="123" 
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-[#0f1724] hover:bg-blue-600 text-white font-black py-6 rounded-[1.5rem] uppercase tracking-[0.2em] text-xs transition-all shadow-xl shadow-blue-900/10 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      `Confirm & Pay Rs. ${parseFloat(booking.total_price).toLocaleString()}`
                    )}
                  </button>
                  <p className="text-center text-[10px] text-gray-400 mt-6 uppercase font-bold tracking-widest">
                    By clicking, you agree to our terms of service
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
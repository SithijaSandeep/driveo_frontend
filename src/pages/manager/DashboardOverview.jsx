
import { useEffect, useState } from "react";
import axios from "axios";

export default function ManagerDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/bookings");
      setBookings(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching bookings", err);
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    if (!window.confirm("Are you sure you want to approve this booking?")) return;
    try {
      await axios.put(`http://127.0.0.1:8000/api/bookings/${id}/approve`);
      alert("Booking Approved Successfully!");
      fetchBookings(); 
    } catch (err) {
      alert("Failed to approve booking.");
    }
  };



  const handleDelete = async (id) => {
  
  console.log("Deleting ID:", id); 
  if (window.confirm("Are you sure you want to delete/reject this booking?")) {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/bookings/${id}`);
      alert("Booking deleted successfully!");
      
      
      fetchBookings(); 
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete the booking.");
    }
  }
};


  if (loading) return <div className="p-10 font-bold">Loading Bookings...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black uppercase tracking-tight text-gray-800">Booking Requests</h1>
        <div className="text-sm text-gray-500 font-bold">Total: {bookings.length}</div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-[10px] font-black uppercase text-gray-400 border-b">
            <tr>
              <th className="px-6 py-4">Customer & License</th>
              <th className="px-6 py-4">Rental Duration</th>
              <th className="px-6 py-4">Total Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {bookings.length > 0 ? bookings.map((b) => (
              <tr key={b.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-gray-900">{b.customer_name}</div>
                  <div className="text-xs text-blue-600 font-bold">DL: {b.driving_license}</div>
                  <div className="text-[10px] text-gray-400">{b.phone}</div>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="font-semibold text-gray-600">{b.pickup_date} <span className="text-gray-300 mx-1">to</span> {b.return_date}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-black text-gray-900">Rs. {Number(b.total_price).toLocaleString()}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${b.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {b.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    {b.status === 'Pending' ? (
                      <button onClick={() => handleApprove(b.id)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-700 transition-all">
                        Approve
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400 font-bold uppercase italic">No Action Needed</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
  <div className="flex justify-center gap-2">
   

    {/* Delete/Reject Button */}
    <button 
      onClick={() => handleDelete(b.id)} 
      className="border border-red-200 text-red-500 px-4 py-2 rounded-lg text-xs font-bold hover:bg-red-50 transition-all"
    >
      Reject
    </button>
  </div>
</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" className="px-6 py-10 text-center text-gray-400 font-bold italic">No bookings found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

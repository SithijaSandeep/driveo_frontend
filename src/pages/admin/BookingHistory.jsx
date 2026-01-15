import { useMemo, useState } from "react";
import { Download } from "lucide-react";

export default function BookingHistory() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [date, setDate] = useState("");

  const bookings = [
    { id: 'BK001', date: '2024-01-10', customer: 'John Doe', email: 'john.doe@email.com', vehicle: 'Toyota Camry 2023', registration: 'ABC-1234', duration: '5 days', amount: 450, status: 'Completed', payment: 'Paid', manager: 'John Smith' },
    { id: 'BK002', date: '2024-01-12', customer: 'Jane Smith', email: 'jane.smith@email.com', vehicle: 'Honda Civic 2022', registration: 'XYZ-5678', duration: '4 days', amount: 320, status: 'Completed', payment: 'Paid', manager: 'Sarah Johnson' },
    { id: 'BK003', date: '2024-01-14', customer: 'Mike Johnson', email: 'mike.johnson@email.com', vehicle: 'BMW X5 2023', registration: 'BMW-9012', duration: '5 days', amount: 890, status: 'Cancelled', payment: 'Refunded', manager: 'Mike Davis' },
    { id: 'BK004', date: '2024-01-16', customer: 'Sarah Wilson', email: 'sarah.wilson@email.com', vehicle: 'Audi A4 2022', registration: 'AUD-3456', duration: '6 days', amount: 650, status: 'Completed', payment: 'Paid', manager: 'John Smith' },
  ];

  const stats = useMemo(() => {
    const total = bookings.length;
    const completed = bookings.filter((b) => b.status === 'Completed').length;
    const cancelled = bookings.filter((b) => b.status === 'Cancelled').length;
    const revenue = bookings.reduce((s, b) => s + (b.status === 'Completed' ? b.amount : 0), 0);
    return { total, completed, cancelled, revenue };
  }, [bookings]);

  const filtered = bookings.filter((b) => {
    const q = query.trim().toLowerCase();
    if (q && !(`${b.id} ${b.customer} ${b.email} ${b.vehicle}`.toLowerCase().includes(q))) return false;
    if (statusFilter !== 'All Status' && b.status !== statusFilter) return false;
    if (date && b.date !== date) return false;
    return true;
  });

  return (
    <div>
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-extrabold">Booking History</h2>
            <p className="text-sm text-gray-500 mt-1">View and manage all completed and cancelled bookings</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm">
              <Download className="h-4 w-4" /> Export PDF
            </button>
            <button className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm">📤</button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-4">
          <div className="rounded-md border border-gray-100 bg-white p-4 shadow-sm">
            <div className="text-sm text-gray-500">Total Bookings</div>
            <div className="mt-2 text-xl font-bold">{stats.total}</div>
          </div>

          <div className="rounded-md border border-gray-100 bg-white p-4 shadow-sm">
            <div className="text-sm text-gray-500">Completed</div>
            <div className="mt-2 text-xl font-bold text-green-600">{stats.completed}</div>
          </div>

          <div className="rounded-md border border-gray-100 bg-white p-4 shadow-sm">
            <div className="text-sm text-gray-500">Cancelled</div>
            <div className="mt-2 text-xl font-bold text-red-600">{stats.cancelled}</div>
          </div>

          <div className="rounded-md border border-gray-100 bg-white p-4 shadow-sm">
            <div className="text-sm text-gray-500">Total Revenue</div>
            <div className="mt-2 text-xl font-bold text-blue-600">${stats.revenue}</div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search bookings..." className="w-full sm:w-1/2 rounded-md border border-gray-200 px-3 py-2 text-sm outline-none" />

          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none">
            <option>All Status</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>

          <input value={date} onChange={(e) => setDate(e.target.value)} placeholder="mm/dd/yyyy" className="rounded-md border border-gray-200 px-3 py-2 text-sm outline-none" />

          <button onClick={() => { setQuery(""); setStatusFilter("All Status"); setDate(""); }} className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm">Reset Filters</button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-gray-500 text-xs uppercase">
              <tr>
                <th className="py-3">Booking ID</th>
                <th className="py-3">Customer</th>
                <th className="py-3">Vehicle</th>
                <th className="py-3">Duration</th>
                <th className="py-3">Amount</th>
                <th className="py-3">Status</th>
                <th className="py-3">Payment</th>
                <th className="py-3">Manager</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id} className="border-t">
                  <td className="py-4">
                    <div className="font-semibold">{b.id}</div>
                    <div className="text-xs text-gray-400">{b.date}</div>
                  </td>
                  <td className="py-4">
                    <div className="font-medium">{b.customer}</div>
                    <div className="text-xs text-gray-400">{b.email}</div>
                  </td>
                  <td className="py-4">
                    <div className="font-medium">{b.vehicle}</div>
                    <div className="text-xs text-gray-400">{b.registration}</div>
                  </td>
                  <td className="py-4 text-sm">{b.duration}</td>
                  <td className="py-4 text-sm">${b.amount}</td>
                  <td className="py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${b.status === 'Completed' ? 'bg-green-100 text-green-800' : b.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>{b.status}</span>
                  </td>
                  <td className="py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${b.payment === 'Paid' ? 'bg-green-50 text-green-700' : b.payment === 'Refunded' ? 'bg-gray-50 text-gray-700' : 'bg-yellow-50 text-yellow-700'}`}>{b.payment}</span>
                  </td>
                  <td className="py-4 text-sm">{b.manager}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
            <div>Showing 1 to {filtered.length} of {bookings.length} results</div>
            <div className="flex items-center gap-2">
              <button className="rounded-md border border-gray-200 px-3 py-1">← Previous</button>
              <button className="rounded-md border border-gray-200 px-3 py-1">1</button>
              <button className="rounded-md border border-gray-200 px-3 py-1">Next →</button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

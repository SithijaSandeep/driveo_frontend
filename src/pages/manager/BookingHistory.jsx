import { useMemo, useState } from "react";

export default function ManagerBookingHistory(){
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState('All Status');
  const [range, setRange] = useState('All Time');

  const bookings = [
    { id: 'BK001', booked: '2024-12-10', customer: 'Sarah Johnson', email: 'sarah.johnson@email.com', phone: '+1 234 567 8901', vehicle: 'Toyota Camry', registration: 'ABC-1234', from: '2024-12-15', to: '2024-12-20', days: 5, amount: 250, status: 'Completed' },
    { id: 'BK002', booked: '2024-12-05', customer: 'Michael Chen', email: 'michael.chen@email.com', phone: '+1 234 567 8902', vehicle: 'Honda Civic', registration: 'XYZ-5678', from: '2024-12-08', to: '2024-12-12', days: 4, amount: 200, status: 'Completed' },
    { id: 'BK003', booked: '2024-11-15', customer: 'Emily Davis', email: 'emily.davis@email.com', phone: '+1 234 567 8903', vehicle: 'BMW X3', registration: 'BMW-9012', from: '2024-11-20', to: '2024-11-25', days: 5, amount: 400, status: 'Cancelled' },
    { id: 'BK004', booked: '2024-11-05', customer: 'David Wilson', email: 'david.wilson@email.com', phone: '+1 234 567 8904', vehicle: 'Ford Explorer', registration: 'FRD-3456', from: '2024-11-10', to: '2024-11-15', days: 5, amount: 350, status: 'Completed' },
    { id: 'BK005', booked: '2024-10-20', customer: 'Lisa Anderson', email: 'lisa.anderson@email.com', phone: '+1 234 567 8905', vehicle: 'Nissan Altima', registration: 'NSN-7890', from: '2024-10-25', to: '2024-10-30', days: 5, amount: 275, status: 'Completed' },
  ];

  const stats = useMemo(()=>{
    const total = bookings.length;
    const completed = bookings.filter(b=>b.status==='Completed').length;
    const cancelled = bookings.filter(b=>b.status==='Cancelled').length;
    const revenue = bookings.reduce((s,b)=>s + (b.status==='Completed' ? b.amount : 0),0);
    return { total, completed, cancelled, revenue };
  },[bookings]);

  const filtered = bookings.filter((b)=>{
    const q = query.trim().toLowerCase();
    if(q && !(`${b.id} ${b.customer} ${b.email} ${b.vehicle} ${b.registration}`.toLowerCase().includes(q))) return false;
    if(status !== 'All Status' && b.status !== status) return false;
    // date range filtering skipped for demo
    return true;
  });

  return (
    <div>
       <div className="pb-5">
            <h2 className="text-2xl font-extrabold">Booking History</h2>
            <p className="text-sm text-gray-500 mt-1">View completed and cancelled bookings</p>
        </div>

        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm">Export CSV</button>
            <button className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm">Export PDF</button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-4 mb-5">
          <div className="rounded-md bg-white p-4 shadow-lg">
            <div className="text-sm text-gray-500 font-bold">Total Bookings</div>
            <div className="mt-2 text-xl font-bold">{stats.total}</div>
          </div>

          <div className="rounded-md bg-white p-4 shadow-lg">
            <div className="text-sm text-gray-500 font-bold">Completed</div>
            <div className="mt-2 text-xl font-bold text-green-600">{stats.completed}</div>
          </div>

          <div className="rounded-md bg-white p-4 shadow-lg">
            <div className="text-sm text-gray-500 font-bold">Cancelled</div>
            <div className="mt-2 text-xl font-bold text-red-600">{stats.cancelled}</div>
          </div>

          <div className="rounded-md bg-white p-4 shadow-lg">
            <div className="text-sm text-gray-500 font-bold">Total Revenue</div>
            <div className="mt-2 text-xl font-bold text-blue-600">${stats.revenue}</div>
          </div>
        </div>


      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="sm:col-span-2 flex items-center gap-3">
            <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search bookings..." className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none" />
          </div>

          <div className="flex items-center gap-3">
            <select value={status} onChange={(e)=>setStatus(e.target.value)} className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none">
              <option>All Status</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>

            <select value={range} onChange={(e)=>setRange(e.target.value)} className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none">
              <option>All Time</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>

            <button onClick={() => { setQuery(''); setStatus('All Status'); setRange('All Time'); }} className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm">Reset Filters</button>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-gray-500 text-xs uppercase">
              <tr>
                <th className="py-3">Booking Details</th>
                <th className="py-3">Customer</th>
                <th className="py-3">Vehicle</th>
                <th className="py-3">Duration</th>
                <th className="py-3">Amount</th>
                <th className="py-3">Status</th>
                <th className="py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b)=> (
                <tr key={b.id} className="border-t">
                  <td className="py-4">
                    <div className="font-semibold">#{b.id}</div>
                    <div className="text-xs text-gray-400">Booked: {b.booked}</div>
                  </td>
                  <td className="py-4">
                    <div className="font-medium">{b.customer}</div>
                    <div className="text-xs text-gray-400">{b.email}<br/>{b.phone}</div>
                  </td>
                  <td className="py-4">
                    <div className="font-medium">{b.vehicle}</div>
                    <div className="text-xs text-gray-400">{b.registration}</div>
                  </td>
                  <td className="py-4 text-sm">{b.from} - {b.to}<br/>{b.days} days</td>
                  <td className="py-4 text-sm">${b.amount}</td>
                  <td className="py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${b.status==='Completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{b.status}</span>
                  </td>
                  <td className="py-4">
                    <button className="rounded-md border px-3 py-1 text-sm border-blue-600 text-blue-600 hover:bg-blue-200">View Details</button>
                  </td>
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

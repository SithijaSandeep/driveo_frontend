import { useState } from "react";

export default function ManagerPayments(){
  const [tab, setTab] = useState('All');
  const [query, setQuery] = useState('');

  const payments = [
    // { id: '#PAY001', booking: 'BK001', customer: 'Sarah Johnson', email: 'sarah.johnson@email.com', vehicle: 'Toyota Camry', amount: 250, method: 'Credit Card', status: 'Pending', date: '2025-01-18' },
    // { id: '#PAY002', booking: 'BK002', customer: 'Michael Chen', email: 'michael.chen@email.com', vehicle: 'Honda Civic', amount: 200, method: 'Debit Card', status: 'Received', date: '2025-01-15' },
    // { id: '#PAY003', booking: 'BK003', customer: 'Emily Davis', email: 'emily.davis@email.com', vehicle: 'BMW X3', amount: 400, method: 'Bank Transfer', status: 'Pending', date: '2025-01-20' },
    // { id: '#PAY004', booking: 'BK004', customer: 'David Wilson', email: 'david.wilson@email.com', vehicle: 'Ford Explorer', amount: 350, method: 'Credit Card', status: 'Failed', date: '2025-01-14' },
  ];

  const stats = {
    totalRevenue: payments.reduce((s,p)=>s+(p.status==='Received'?p.amount:0),0) , // demo add
    pending: payments.filter(p=>p.status==='Pending').length,
    received: payments.filter(p=>p.status==='Received').length,
    failed: payments.filter(p=>p.status==='Failed').length,
  };

  const filtered = payments.filter((p)=>{
    if(tab !== 'All' && p.status !== tab) return false;
    const q = query.trim().toLowerCase();
    if(q && !(`${p.id} ${p.booking} ${p.customer} ${p.vehicle}`.toLowerCase().includes(q))) return false;
    return true;
  });

  function markReceived(id){
    alert('Marked ' + id + ' as received (demo)');
  }

  return (
    <div>
        <h2 className="text-2xl font-extrabold">Payment Management</h2>
        <p className="text-sm text-gray-500 mt-1 pb-5">Track and manage customer payments</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-4 pb-5">
          <div className="rounded-md p-4 bg-white shadow-lg">
            <div className="text-sm text-gray-500 font-bold">Total Revenue</div>
            <div className="mt-2 text-xl font-bold">Rs{stats.totalRevenue}</div>
          </div>

          <div className="rounded-md p-4 bg-white shadow-lg">
            <div className="text-sm text-gray-500 font-bold">Pending</div>
            <div className="mt-2 text-xl font-bold">{stats.pending}</div>
          </div>

          <div className="rounded-md p-4 bg-white shadow-lg">
            <div className="text-sm text-gray-500 font-bold">Received</div>
            <div className="mt-2 text-xl font-bold">{stats.received}</div>
          </div>

          <div className="rounded-md p-4 bg-white shadow-lg">
            <div className="text-sm text-gray-500 font-bold">Failed</div>
            <div className="mt-2 text-xl font-bold">{stats.failed}</div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between bg-white py-6 px-6 rounded-lg shadow-md mb-5">
          <div className="flex items-center gap-3">
            {['All','Pending','Received','Failed','Refunded'].map((t)=> (
              <button key={t} onClick={()=>setTab(t)} className={`rounded-md px-3 py-2 text-sm font-bold ${tab===t ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 '}`}>{t}</button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search payments..." className="rounded-md border border-gray-200 px-3 py-2 text-sm outline-none" />
          </div>
        </div>


      <div className="rounded-lg bg-white p-6 shadow-sm">

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-gray-500 text-sm  font-bold">
              <tr>
                <th className="py-3">Payment Details</th>
                <th className="py-3">Customer</th>
                <th className="py-3">Vehicle</th>
                <th className="py-3">Amount</th>
                <th className="py-3">Payment Method</th>
                <th className="py-3">Status</th>
                <th className="py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p)=> (
                <tr key={p.id} className="border-t">
                  <td className="py-4">
                    <div className="font-semibold">{p.id}</div>
                    <div className="text-xs text-gray-400">Booking: {p.booking}<br/>Due: {p.date}</div>
                  </td>
                  <td className="py-4">
                    <div className="font-medium">{p.customer}</div>
                    <div className="text-xs text-gray-400">{p.email}</div>
                  </td>
                  <td className="py-4">
                    <div className="font-medium">{p.vehicle}</div>
                  </td>
                  <td className="py-4 text-sm">${p.amount}</td>
                  <td className="py-4 text-sm">{p.method}</td>
                  <td className="py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${p.status==='Received' ? 'bg-green-50 text-green-700' : p.status==='Failed' ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'}`}>{p.status}</span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      {p.status !== 'Received' && <button onClick={()=>markReceived(p.id)} className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white">Mark Received</button>}
                      <button className="rounded-md border px-3 py-1 text-sm">View Details</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

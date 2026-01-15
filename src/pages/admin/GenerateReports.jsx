import { useState } from "react";
import { FileText, BarChart2, PieChart, File } from "lucide-react";

export default function GenerateReports(){
  const [type, setType] = useState('Daily');
  const [metrics, setMetrics] = useState({ revenue: true, bookings: true, usage: false, customer: false, manager: false, cancellation: false });

  function toggleMetric(k){
    setMetrics((m) => ({ ...m, [k]: !m[k] }));
  }

  return (
    <div>
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-extrabold">Generate Reports</h2>
            <p className="text-sm text-gray-500 mt-1">Create comprehensive reports for business analysis</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"><File className="h-4 w-4" /> PDF</button>
           
            
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1 rounded-md border border-gray-100 p-4">
            <h3 className="font-medium mb-3">Report Configuration</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-2"><input type="radio" name="reportType" checked={type==='Daily'} onChange={() => setType('Daily')} /> <span className="ml-2">Daily Report</span></label>
              <label className="flex items-center gap-2"><input type="radio" name="reportType" checked={type==='Weekly'} onChange={() => setType('Weekly')} /> <span className="ml-2">Weekly Report</span></label>
              <label className="flex items-center gap-2"><input type="radio" name="reportType" checked={type==='Monthly'} onChange={() => setType('Monthly')} /> <span className="ml-2">Monthly Report</span></label>
            </div>

            <div className="mt-4">
              <div className="text-sm font-medium mb-2">Include Metrics</div>
              <div className="grid gap-2">
                <label className="inline-flex items-center gap-2"><input type="checkbox" checked={metrics.revenue} onChange={() => toggleMetric('revenue')} /> <span className="text-sm">Total Revenue</span></label>
                <label className="inline-flex items-center gap-2"><input type="checkbox" checked={metrics.bookings} onChange={() => toggleMetric('bookings')} /> <span className="text-sm">Total Bookings</span></label>
                {/* <label className="inline-flex items-center gap-2"><input type="checkbox" checked={metrics.usage} onChange={() => toggleMetric('usage')} /> <span className="text-sm">Vehicle Usage</span></label>
                <label className="inline-flex items-center gap-2"><input type="checkbox" checked={metrics.customer} onChange={() => toggleMetric('customer')} /> <span className="text-sm">Customer Analytics</span></label>
                <label className="inline-flex items-center gap-2"><input type="checkbox" checked={metrics.manager} onChange={() => toggleMetric('manager')} /> <span className="text-sm">Manager Performance</span></label>
                <label className="inline-flex items-center gap-2"><input type="checkbox" checked={metrics.cancellation} onChange={() => toggleMetric('cancellation')} /> <span className="text-sm">Cancellation Rate</span></label> */}
              </div>
            </div>

            <div className="mt-6">
              <button className="rounded-md bg-primary px-4 py-2 text-white">Generate Report</button>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-md border border-gray-100 p-4">
              <div className="grid gap-4 sm:grid-cols-4">
                <div className="rounded-md bg-blue-50 p-4">
                  <div className="text-xs text-gray-500">Total Revenue</div>
                  <div className="text-xl font-bold">$45,230</div>
                </div>
                <div className="rounded-md bg-green-50 p-4">
                  <div className="text-xs text-gray-500">Total Bookings</div>
                  <div className="text-xl font-bold">156</div>
                </div>
                <div className="rounded-md bg-purple-50 p-4">
                  <div className="text-xs text-gray-500">Active Vehicles</div>
                  <div className="text-xl font-bold">45</div>
                </div>
                {/* <div className="rounded-md bg-yellow-50 p-4">
                  <div className="text-xs text-gray-500">Completion Rate</div>
                  <div className="text-xl font-bold">92%</div>
                </div> */}
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-md border-2 border-dashed border-gray-200 h-40 flex items-center justify-center text-gray-400">Revenue Chart</div>
                <div className="rounded-md border-2 border-dashed border-gray-200 h-40 flex items-center justify-center text-gray-400">Pie Chart</div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium">Top Performing Vehicles</h4>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between bg-gray-50 rounded-md p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">1</div>
                      <div>
                        <div className="font-medium">Toyota Camry</div>
                        <div className="text-xs text-gray-500">23 bookings</div>
                      </div>
                    </div>
                    <div className="font-semibold">$2340</div>
                  </div>

                  <div className="flex items-center justify-between bg-gray-50 rounded-md p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">2</div>
                      <div>
                        <div className="font-medium">Honda Civic</div>
                        <div className="text-xs text-gray-500">18 bookings</div>
                      </div>
                    </div>
                    <div className="font-semibold">$1890</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

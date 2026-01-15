export default function DashboardOverview() {
  return (
    <div>
      <div className="py-5">
            <h2 className="text-2xl font-bold">Dashboard Overview</h2>
            <p className="mt-1 text-sm text-gray-500">View, edit, and manage your vehicle fleet and bookings</p>
          </div>
      {/* <div className="rounded-lg bg-white p-6 shadow-sm"> */}
        {/* <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Dashboard Overview</h2>
            <p className="mt-1 text-sm text-gray-500">View, edit, and manage your vehicle fleet and bookings</p>
          </div>
          <div className="text-sm text-gray-500">Total Vehicles: 45</div>
        </div> */}

        <div className="mt-6 grid gap-4 sm:grid-cols-4">
          <div className="rounded-lg  p-4 bg-white shadow-2xl h-40">
            <div className="text-sm text-gray-500 font-bold"></div>
            <div className="text-4xl font-bold mt-2 pt-4"></div>
          </div>
          <div className="rounded-lg  p-4 bg-white shadow-2xl h-40">
            <div className="text-sm text-gray-500 font-bold"></div>
            <div className="text-4xl font-bold mt-2 pt-4"></div>
          </div>
          <div className="rounded-lg  p-4 bg-white shadow-2xl h-40">
            <div className="text-sm text-gray-500 font-bold"></div>
            <div className="text-4xl font-bold mt-2 pt-4"></div>
          </div>
          <div className="rounded-lg  p-4 bg-white shadow-2xl h-40">
            <div className="text-sm text-gray-500 font-bold"></div>
            <div className="text-4xl font-bold mt-2 pt-4"></div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg p-4 bg-white shadow-2xl">{/* Chart placeholder */}
            <div className="h-60 flex items-center justify-center text-gray-400">Revenue Chart</div>
          </div>
          <div className="rounded-lg p-4 bg-white shadow-2xl">
            <div className="h-60 flex items-center justify-center text-gray-400">Booking Distribution</div>
          </div>
        </div>
      </div>
    // </div>
  );
}

import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import about from "../assets/about1.jpg"; 

const HERO = about;
const TEAM = [
  { name: "Sithija Sandeep", role: "CEO & Founder", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop" },
  { name: "Sachini Prasangika", role: "Operations Manager", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop"  },
  { name: "Kasun Gayantha", role: "Customer Experience Director", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop"  },
  { name: "Sandali Pavithra", role: "Fleet Manager", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop" },
  { name: "Shalika Manavi", role: "Fleet Manager", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop" },
  { name: "Kalani upeksha", role: "Fleet Manager", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop" },
];

export default function About() {
  return (
    <div className="bg-gray-100 text-foreground">
      <Header />
      <div className="relative">
        <div className="w-full h-56 md:h-72 lg:h-96 bg-cover bg-center" style={{ backgroundImage: `url(${HERO})` }} />
        <div className="container -mt-24 mx-auto px-4">
          <div className="rounded-xl bg-white p-8 shadow-lg">
            <h1 className="text-3xl font-extrabold text-center">About Our Company</h1>
            <p className="mt-3 text-gray-600 text-center">Your trusted partner in premium car rental services. We provide reliable, affordable, and convenient car rental services with a wide selection of vehicles.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-blue-50 p-6 text-center">
                <div className="text-2xl font-bold text-blue-600">5+</div>
                <div className="text-sm text-gray-500">Years Experience</div>
              </div>
              <div className="rounded-lg bg-blue-50 p-6 text-center">
                <div className="text-2xl font-bold text-blue-600">100+</div>
                <div className="text-sm text-gray-500">Happy Customers</div>
              </div>
              <div className="rounded-lg bg-blue-50 p-6 text-center">
                <div className="text-2xl font-bold text-blue-600">20+</div>
                <div className="text-sm text-gray-500">Vehicles Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12 mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 bg-white py-5 rounded-xl shadow-lg px-4q">
          <div >
            <h2 className="text-2xl font-semibold">Our Story</h2>
            <p className="mt-3 text-gray-600">Founded in 2008, we are a small company began with a simple mission to provide reliable, affordable, and convenient transportation solutions for everyone. What started as a small fleet of vehicles has grown into a full service rental company offering many options for your trips.</p>
            <p className="mt-3 text-gray-600">Our values are centered on reliability, fair pricing, convenience and customer-first service. We take pride in the quality of our vehicles, the friendliness of our staff, and the trust our customers place in us.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold ">Our Values</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-blue-600 p-4 bg-blue-50">
                <div className="text-medium font-bold">Reliability</div>
                <div className="text-sm text-gray-500 mt-1">Every vehicle in our fleet is thoroughly inspected and maintained to the highest standards.</div>
              </div>
              <div className="rounded-lg border border-green-600 p-4 bg-green-50">
                <div className="text-medium font-bold">Customer First</div>
                <div className="text-sm text-gray-500 mt-1">We prioritize customer satisfaction and strive to deliver exceptional service at every touchpoint.</div>
              </div>
              <div className="rounded-lg border border-red-600 p-4 bg-red-50">
                <div className="text-medium font-bold">Fair Pricing</div>
                <div className="text-sm text-gray-500 mt-1">Transparent pricing with no hidden fees so you know exactly what you're paying for.</div>
              </div>
              <div className="rounded-lg border border-yellow-600 p-4 bg-yellow-50">
                <div className="text-medium font-bold">Convenience</div>
                <div className="text-sm text-gray-500 mt-1">Quick booking, easy returns, and flexible rental options to suit your schedule.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4 text-center">Meet Our Team</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6 py-6">
            {TEAM.map((t) => (
              <div key={t.name} className="rounded-lg border border-gray-100 p-4 text-center bg-white rounded-2xl">
                <img src={t.img} alt={t.name} className="mx-auto h-28 w-28 rounded-full object-cover" />
                <div className="mt-3 font-medium">{t.name}</div>
                <div className="text-sm text-gray-500">{t.role}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold mb-3">Ready to Experience the Difference?</h3>
          <Link to="/vehicles" className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white">Browse Vehicles</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

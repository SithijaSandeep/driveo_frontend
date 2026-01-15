import { Calendar, Car, Gauge, Headphones, MapPin, Settings, User } from "lucide-react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { Link } from "react-router-dom";
import aqua from "../assets/aqua.jpg";
import suzukiAlto from "../assets/suzuki-alto-.jpg";
import axio from "../assets/axio.jpg";
import axios from "axios";
import { useEffect, useState } from "react";


const backgrounds = {
  hero:
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop",
  camry:
    "https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=1200&auto=format&fit=crop",
  crv:
    "https://images.unsplash.com/photo-1619767886558-efdc259cde1d?q=80&w=1200&auto=format&fit=crop",
  mustang:
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
};

export default function Index() {
  return (
    <div className="bg-gray-100 text-foreground ">
      <Header />
      <Hero />
      <WhyChooseUs />
      <FeaturedVehicles />
      <CTA />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative z-10">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.45)), url(${backgrounds.hero})` }}
      />
      <div className="container py-20 md:py-28 text-center text-white">
        <h1 className="mx-auto max-w-3xl text-4xl md:text-6xl font-extrabold tracking-tight">
          Rent Your Car Online <span className="text-sky-200">Easily</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/85">
          Choose from our wide selection of premium vehicles and enjoy hassle-free car rental experience with competitive prices and excellent service.
        </p>

        <SearchBar />
      </div>
    </section>
  );
}

function SearchBar() {
  return (

    <div className="mt-8">
  <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-3 rounded-xl bg-white/95 p-4 shadow-xl ring-1 ring-black/5 backdrop-blur md:grid-cols-4">
    
    {/* Pick-up Date */}
    <div className="flex flex-col gap-1 rounded-lg border border-gray-200 px-3 py-2">
      <span className="text-xs font-medium text-gray-500">Pick-up date</span>
      <div className="flex items-center gap-3">
        <Calendar className="h-5 w-5 text-gray-500" />
        <input 
          type="date" 
          className="w-full bg-transparent text-sm text-gray-600 outline-none" 
          aria-label="Pick-up date"
        />
      </div>
    </div>

    {/* Drop-off Date */}
    <div className="flex flex-col gap-1 rounded-lg border border-gray-200 px-3 py-2">
      <span className="text-xs font-medium text-gray-500">Drop-off date</span>
      <div className="flex items-center gap-3">
        <Calendar className="h-5 w-5 text-gray-500" />
        <input 
          type="date" 
          className="w-full bg-transparent text-sm text-gray-600 outline-none" 
          aria-label="Drop-off date"
        />
      </div>
    </div>

    {/* Vehicle Type */}
    <div className="flex flex-col gap-1 rounded-lg text-gray-600 border border-gray-200 px-3 py-2">
      <span className="text-xs font-medium text-gray-500">Vehicle type</span>
      <div className="flex items-center gap-3">
        <Car className="h-5 w-5 text-gray-500" />
        <select 
          className="w-full bg-transparent text-sm outline-none" 
          aria-label="Vehicle type"
        >
          <option>All Types</option>
          <option>Sedan</option>
          <option>SUV</option>
          <option>Sports</option>
        </select>
      </div>
    </div>

    {/* Button */}
    <button className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90">
      Search Available Cars
    </button>
  </div>
</div>

  );
}

function WhyChooseUs() {
  const items = [
    {
      icon: <Car className="h-6 w-6" />, title: "Wide Selection", desc: "Choose from our extensive fleet of well-maintained vehicles for every occasion.",
    },
    {
      icon: <Gauge className="h-6 w-6" />, title: "Competitive Prices", desc: "Enjoy affordable rates with no hidden fees and transparent pricing.",
    },
    {
      icon: <Headphones className="h-6 w-6" />, title: "24/7 Support", desc: "Get assistance anytime with our round-the-clock customer support.",
    },
  ];

  return (
    <section className="py-16 md:py-24 ">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Why Choose Us?</h2>
          <p className="mt-3 text-gray-600">
            We provide exceptional car rental services with unmatched convenience and reliability
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {item.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



function FeaturedVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedCars = async () => {
      try {
        // Backend එකෙන් සියලුම කාර් ලබා ගැනීම
        const response = await axios.get("http://127.0.0.1:8000/api/cars");
        
        // අන්තිමට එකතු කරපු කාර් 3 පමණක් තෝරා ගැනීම (Slice)
        const latestCars = response.data.slice(-3).reverse(); 
        setVehicles(latestCars);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching featured vehicles:", error);
        setLoading(false);
      }
    };

    fetchFeaturedCars();
  }, []);

  if (loading) {
    return <div className="py-20 text-center font-bold text-gray-400">Loading Featured Vehicles...</div>;
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 uppercase">Featured Vehicles</h2>
          <p className="mt-3 text-gray-600">Discover our most popular rental cars</p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {vehicles.map((v) => {
          
            const carImages = v.images ? JSON.parse(v.images) : [];
            const displayImage = carImages.length > 0 
              ? `http://127.0.0.1:8000/storage/${carImages[0]}` 
              : "https://via.placeholder.com/400x300?text=No+Image";

            return (
              <article key={v.id} className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-xl">
                {/* Car Image Section */}
                <div 
                  className="h-52 w-full bg-cover bg-center" 
                  style={{ backgroundImage: `url(${displayImage})` }} 
                />
                
                <div className="p-6">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">{v.brand} {v.model}</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-0.5 text-[10px] font-black uppercase text-blue-600 border border-blue-100">
                          {v.fuel}
                        </span>
                      </div>
                      
                      <ul className="mt-4 flex flex-wrap gap-4 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                        <li className="flex items-center gap-1">{v.seats} Seats</li>
                        <li className="flex items-center gap-1">{v.transmission}</li>
                      </ul>
                    </div>

                    <div className="text-right">
                      <p className="text-xl font-black text-gray-900">
                        <span className="text-[10px] text-gray-400 block uppercase tracking-tighter">Daily</span>
                        Rs.{Number(v.price).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Link 
                      to={`/vehicles/${v.id}`} 
                      className="flex-1 rounded-xl border border-gray-100 px-4 py-3 text-xs font-black uppercase tracking-widest text-gray-700 hover:bg-gray-50 text-center transition-all"
                    >
                      Details
                    </Link>
                    <Link 
                      to={`/booking-details/${v.id}`} 
                      className="flex-1 rounded-xl px-4 py-3 text-xs font-black uppercase tracking-widest text-white bg-blue-600 hover:bg-blue-700 text-center shadow-lg shadow-blue-100 transition-all"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link 
            to="/vehicles" 
            className="inline-flex items-center justify-center rounded-xl border-2 border-blue-600/20 px-8 py-3 text-xs font-black uppercase tracking-widest text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
          >
            View All Vehicles
          </Link>
        </div>
      </div>
    </section>
  );
}




function CTA() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 ">
      <div className="container py-16 md:py-024 mx-auto px-4">
        <div className=" bg-blue-600 px-6 py-10 text-center text-white md:px-12 md:py-14">
          <h2 className="text-3xl font-extrabold tracking-tight">Ready to Hit the Road?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/80">
            Book your perfect rental car today and enjoy the freedom of the open road with our reliable vehicles.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="/vehicles" className="inline-flex items-center justify-center rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-white/90">
              Browse Vehicles
            </a>

          </div>
        </div>
      </div>
    </section>
  );
}

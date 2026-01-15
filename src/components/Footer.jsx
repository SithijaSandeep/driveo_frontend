import { Link } from "react-router-dom";
import { Car, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";


export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container pl-4 ml-5 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 font-extrabold text-white text-lg">
            <span className="inline-flex font-extrabold text-2xl items-center justify-center text-white">Driveo
            </span>
           
          </div>
          <p className="mt-4 text-sm text-gray-400 max-w-sm">
            Your trusted partner for car rentals. We provide reliable, affordable, and convenient car rental services with a wide selection of vehicles to meet your needs.
          </p>
          <div className="mt-4 flex gap-3">
            <a href="#" aria-label="Facebook" className="p-2 rounded-md bg-white/5 hover:bg-white/10">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Twitter" className="p-2 rounded-md bg-white/5 hover:bg-white/10">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Instagram" className="p-2 rounded-md bg-white/5 hover:bg-white/10">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/Vehicles" className="hover:text-white">Vehicles</Link></li>
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
           
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold">Contact Info</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex items-center gap-2"><Phone className="text-blue-600 h-4 w-4"/> <span>+94 76084 1665</span></li>
            <li className="flex items-center gap-2"><Mail className="text-blue-600 h-4 w-4"/> <span>info@driveo.com</span></li>
            <li className="flex items-center gap-2"><MapPin className="text-blue-600 h-4 w-4"/> <span>123 Main St, Colombo</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-sm">
        <div className="container pl-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Driveo. All rights reserved.</p>
          <div className="flex pr-4 gap-4 text-gray-400">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            
          </div>
        </div>
      </div>
    </footer>
  );
}

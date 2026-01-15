import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import contact1 from "../assets/contact1.jpg";  

const HERO = contact1;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const handleChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); alert('Message sent — placeholder (no backend)'); };

  return (
    <div className="bg-gray-100 text-foreground">
      <Header />
      <div className="w-full h-56 bg-cover bg-center md:h-72 lg:h-96 " style={{ backgroundImage: `url(${HERO})` }} />
      <div className="container -mt-24 mx-auto px-4">
        <div className="rounded-xl bg-white p-8 shadow-lg text-center">
          <h1 className="text-3xl font-extrabold">Contact Us</h1>
          <p className="mt-3 text-gray-600">Get in touch with our team for any questions about our premium car rental services. We're here to help make your journey exceptional.</p>
        </div>
      </div>

      <div className="container py-12 mx-auto px-4">
        <div className="grid gap-6 md:grid-cols-3 bg-white py-5 rounded-2xl shadow-2xl">
          <div className="md:col-span-2 px-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-gray-100 p-6 text-center bg-blue-50">
                <div className="text-sm text-gray-500">Phone</div>
                <div className="mt-2 font-medium">+94 76 123 4567</div>
                <div className="text-sm text-gray-500 mt-1">Mon-Fri: 8AM-6PM</div>
              </div>
              <div className="rounded-lg border border-gray-100 p-6 text-center bg-blue-50">
                <div className="text-sm text-gray-500">Email</div>
                <div className="mt-2 font-medium">info@driveo.com</div>
                <div className="text-sm text-gray-500 mt-1">We respond within 24 hours</div>
              </div>
              <div className="rounded-lg border border-gray-100 p-6 text-center bg-blue-50">
                <div className="text-sm text-gray-500">Main Office</div>
                <div className="mt-2 font-medium">123 main street, colombo</div>
                <div className="text-sm text-gray-500 mt-1">colombo, NY 10001</div>
              </div>
              <div className="rounded-lg border border-gray-100 p-6 text-center bg-blue-50">
                <div className="text-sm text-gray-500">Business Hours</div>
                <div className="mt-2 font-medium">Mon-Fri: 9AM-6PM</div>
                <div className="text-sm text-gray-500 mt-1">Sat-Sun: 10AM-4PM</div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div className="grid gap-3 md:grid-cols-2">
                <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="w-full rounded-md border border-gray-200 px-3 py-2" required />
                <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email Address" className="w-full rounded-md border border-gray-200 px-3 py-2" required />
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="w-full rounded-md border border-gray-200 px-3 py-2" />
                <select name="subject" value={form.subject} onChange={handleChange} className="w-full rounded-md border border-gray-200 px-3 py-2">
                  <option value="">Inquiry Type</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Support</option>
                  <option value="booking">Booking</option>
                </select>
              </div>
              <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" className="w-full rounded-md border border-gray-200 px-3 py-2 h-40" />
              <div className="flex items-center justify-between">
                <Link to="/vehicles" className="inline-flex items-center justify-center rounded-md border border-gray-200 px-4 py-2 text-sm">← Back</Link>
                <button type="submit" className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-semibold text-white">Send Message</button>
              </div>
            </form>

          </div>

          <aside className="md:col-span-1">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-2xl">
              <h3 className="text-lg font-semibold">Find Us</h3>
              <div className="mt-4 text-sm text-gray-600">Downtown Office<br/>123 main street, colombo<br/>Mon-Fri: 9AM-6PM</div>

              <div className="mt-6">
                <h4 className="text-sm font-medium">Our Locations</h4>
                <ul className="mt-3 text-sm text-gray-600 space-y-3">
                  <li>
                    <div className="font-medium">Downtown Office</div>
                    <div className="text-xs">123 main street, colombo</div>
                  </li>
            
                </ul>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium">FAQ</h4>
                <div className="mt-3 text-sm text-gray-600 space-y-3">
                  <div>
                    <div className="font-medium">What do I need to rent a car?</div>
                    <div className="text-xs">You’ll need a valid driver’s license, credit card, and be at least 21 years old.</div>
                  </div>
                  <div>
                    <div className="font-medium">Can I modify or cancel my reservation?</div>
                    <div className="text-xs">Yes, you can modify or cancel up to 24 hours before pickup without penalty.</div>
                  </div>
                </div>
              </div>

            </div>
          </aside>
        </div>
      </div>
      <Footer />

    </div>
  );
}

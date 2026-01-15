
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://127.0.0.1:8000/api/client/register", { name, email, password });
      alert("successful!.");
      navigate("/login");
    } catch (err) {
      alert("Not success.");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-2">Create Account</h2>
        <p className="text-center text-gray-500 mb-8">Join with us today</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Full Name" onChange={e => setName(e.target.value)} required />
          <input className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
          <input className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition">
            {loading ? "Processing..." : "Register Now"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm">Already have an account? <Link to="/login" className="text-blue-600 font-bold">Login</Link></p>
      </div>
    </div>
  );
}
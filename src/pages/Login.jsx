
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/client/login", { email, password });
      if (res.data.status === 'success') {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/"); 
        window.location.reload(); 
      }
    } catch (err) {
      alert("Error!");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-2">Welcome Back</h2>
        <p className="text-center text-gray-500 mb-8">Login to your account</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" type="email" placeholder="Email Address" onChange={e => setEmail(e.target.value)} required />
          <input className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition">
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm">New user? <Link to="/register" className="text-blue-600 font-bold">Create Account</Link></p>
      </div>
    </div>
  );
}
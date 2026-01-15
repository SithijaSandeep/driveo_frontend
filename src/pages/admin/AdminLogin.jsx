

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/admin/login", {
        email,
        password,
      });

      if (res.data.status === "success") {
    
        localStorage.setItem("admin", JSON.stringify(res.data.user));
        navigate("/admin"); 
      }
    } catch (err) {
      setError("Invalid Email or Password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white font-black text-2xl">CR</span>
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-800">Admin Login</h1>
          <p className="text-gray-400 text-sm font-medium">Control Panel Access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
              placeholder="Enter Admin Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block">Password</label>
            <input 
              type="password" 
              required
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-xs font-bold text-center italic">{error}</p>}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white p-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
          >
            {loading ? "Authenticating..." : "Sign In to Dashboard"}
          </button>
        </form>

        <Link to="/" className="block text-center mt-6 text-gray-400 text-[10px] font-black uppercase hover:text-blue-600 transition-all">
          ← Back to Website
        </Link>
      </div>
    </div>
  );
}
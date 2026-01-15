

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function ManagerLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    setLoading(true);

    try {
      
      const response = await axios.post('http://127.0.0.1:8000/api/manager/login', {
        email: email,
        password: password
      });

      if (response.data.status === 'success') {
      
        localStorage.setItem('auth', JSON.stringify({
          role: 'manager',
          email: response.data.manager.email,
          name: response.data.manager.name,
          token: response.data.token 
        }));

        navigate('/manager'); 
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Login failed. Please check your credentials or server connection.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col justify-center">
      <div className="container py-12">
        <div className="rounded-xl bg-white p-8 shadow-2xl max-w-md mx-auto border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-blue-900">Manager Login</h1>
            <p className="mt-2 text-gray-500">Sign in to manage your rental fleet</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
              <input 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                type="email" 
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" 
                placeholder="manager@carrental.com" 
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <input 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                type="password" 
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" 
                placeholder="••••••••" 
                required
              />
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" /> 
                <span className="ml-2 text-gray-600">Remember me</span>
              </label>
              <Link to="/contact" className="font-medium text-blue-600 hover:text-blue-500">Forgot password?</Link>
            </div>

            {/* LOGIN BUTTON */}
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full flex justify-center items-center rounded-lg bg-blue-700 px-4 py-3 text-white font-bold text-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : 'Sign In'}
            </button>

            <div className="flex items-center justify-center mt-4">
              <Link to="/" className="text-sm text-gray-500 hover:text-gray-700 flex items-center">
                <span className="mr-1">←</span> Back to Home
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
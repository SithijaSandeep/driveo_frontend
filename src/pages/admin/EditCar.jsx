import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ImageIcon } from "lucide-react";
import axios from "axios";

export default function EditCar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [form, setForm] = useState({
    brand: "",
    model: "",
    year: "",
    reg: "",
    price: "",
    seats: "",
    fuel: "",
    transmission: "",
    color: "",
    mileage: "",
    features: {},
    notes: "",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const featuresList = [
    "Air Conditioning", "Backup Camera", "Cruise Control", "GPS Navigation",
    "Sunroof", "Parking Sensors", "Bluetooth", "Leather Seats",
    "Keyless Entry", "USB Charging", "Heated Seats", "Premium Sound",
  ];

  
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/cars/${id}`)
      .then(res => {
        const data = res.data;
        
        if (data.features && typeof data.features === 'string') {
          data.features = JSON.parse(data.features);
        }
        setForm(data);
      })
      .catch(err => {
        console.error("Error fetching car:", err);
        alert("Could not load car data.");
      });
  }, [id]);

  function toggleFeature(name) {
    setForm((f) => ({
      ...f,
      features: { ...f.features, [name]: !f.features[name] }
    }));
  }

  function onFiles(e) {
    const files = Array.from(e.target.files || []);
    setImages(files);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    
    
    formData.append("_method", "PUT");

    for (const key in form) {
      if (key === "features") {
        formData.append(key, JSON.stringify(form[key]));
      } else if (key !== "images") { 
        formData.append(key, form[key] || "");
      }
    }

    
    if (images.length > 0) {
      images.forEach((file) => {
        formData.append("images[]", file);
      });
    }

    try {
      
      await axios.post(`http://127.0.0.1:8000/api/cars/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Updated successfully!");
      navigate("/admin/manage-cars");
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
      alert("Update failed! Please check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-extrabold text-gray-900">Edit Car</h2>
        <p className="text-sm text-gray-500 mt-1">Update vehicle details for registration: {form.reg}</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Basic Information */}
          <section className="rounded-md border border-gray-100 p-4 shadow-md">
            <h3 className="font-medium mb-3 text-gray-700">Basic Information</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <input value={form.brand} onChange={(e) => setForm((s) => ({ ...s, brand: e.target.value }))} placeholder="Brand" className="rounded-md border border-gray-200 px-3 py-2 outline-blue-500" required />
              <input value={form.model} onChange={(e) => setForm((s) => ({ ...s, model: e.target.value }))} placeholder="Model" className="rounded-md border border-gray-200 px-3 py-2 outline-blue-500" required />
              <input value={form.year} onChange={(e) => setForm((s) => ({ ...s, year: e.target.value }))} placeholder="Year" className="rounded-md border border-gray-200 px-3 py-2 outline-blue-500" />
              <input value={form.reg} onChange={(e) => setForm((s) => ({ ...s, reg: e.target.value }))} placeholder="Registration" className="rounded-md border border-gray-200 px-3 py-2 outline-blue-500" required />
              <input value={form.price} onChange={(e) => setForm((s) => ({ ...s, price: e.target.value }))} placeholder="Price" className="rounded-md border border-gray-200 px-3 py-2 outline-blue-500" required />
              <select value={form.seats} onChange={(e) => setForm((s) => ({ ...s, seats: e.target.value }))} className="rounded-md border border-gray-200 px-3 py-2 outline-blue-500">
                <option value="">Seats</option>
                {[2, 4, 5, 7].map(n => <option key={n}>{n}</option>)}
              </select>
            </div>
          </section>

          {/* Features */}
          <section className="rounded-md border border-gray-100 p-4 shadow-md">
            <h3 className="font-medium mb-3 text-gray-700">Features</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              {featuresList.map((f) => (
                <label key={f} className="inline-flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={!!form.features?.[f]} onChange={() => toggleFeature(f)} className="rounded text-blue-600" />
                  <span className="text-sm text-gray-600">{f}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Image Upload */}
          {/* <section className="rounded-md border border-gray-100 p-4 shadow-md">
            <h3 className="font-medium mb-3 text-gray-700">Update Images (Optional)</h3>
            <div className="rounded-md border-2 border-dashed border-gray-200 p-6 text-center">
              <input ref={fileRef} multiple type="file" accept="image/*" onChange={onFiles} className="hidden" />
              <div className="flex flex-col items-center gap-2">
                <ImageIcon className="h-8 w-8 text-gray-400" />
                <button type="button" onClick={() => fileRef.current?.click()} className="text-blue-600 font-semibold hover:underline">Select New Images</button>
                <p className="text-xs text-gray-400">Uploading new images will replace existing ones (if logic is set in backend)</p>
                {images.length > 0 && <div className="text-sm font-medium text-green-600">{images.length} new image(s) selected</div>}
              </div>
            </div>
          </section> */}

          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => navigate(-1)} className="rounded-md border border-gray-300 px-6 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">Cancel</button>
            <button type="submit" disabled={loading} className="rounded-md bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-blue-300">
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}






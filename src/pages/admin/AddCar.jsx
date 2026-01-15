import { useRef, useState } from "react";
import { ImageIcon } from "lucide-react";
import axios from "axios";

export default function AddCar() {
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

  const featuresList = [
    "Air Conditioning",
    "Backup Camera",
    "Cruise Control",
    "GPS Navigation",
    "Sunroof",
    "Parking Sensors",
    "Bluetooth",
    "Leather Seats",
    "Keyless Entry",
    "USB Charging",
    "Heated Seats",
    "Premium Sound",
  ];

  const fileRef = useRef(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false); 

  function toggleFeature(name) {
    setForm((f) => ({ ...f, features: { ...f.features, [name]: !f.features[name] } }));
  }

  function onFiles(e) {
    const files = Array.from(e.target.files || []);
    setImages(files);
  }

 
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

     const formData = new FormData();

    
    
    for (const key in form) {
      if (key === "features") {
      
        formData.append(key, JSON.stringify(form[key]));
      } else {
        formData.append(key, form[key]);
      }
    }

    
    images.forEach((file) => {
      formData.append("images[]", file); 
    });

    try {
      
      
      const response = await axios.post("http://127.0.0.1:8000/api/cars", formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });

      console.log("Response:", response.data);
      alert("Vehicle saved successfully to Database!");
      
      
      setForm({
        brand: "", model: "", year: "", reg: "", price: "", seats: "",
        fuel: "", transmission: "", color: "", mileage: "", features: {}, notes: "",
      });
      setImages([]);

    } catch (error) {
      console.error("Submission Error:", error.response?.data || error.message);
      alert("Error saving vehicle. Please check console.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-extrabold">Add Car</h2>
        <p className="text-sm text-gray-500 mt-1">Add a new vehicle to your rental fleet</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <section className="rounded-md border border-gray-100 p-4 shadow-lg">
            <h3 className="font-medium mb-3">Basic Information</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <input value={form.brand} onChange={(e) => setForm((s) => ({ ...s, brand: e.target.value }))} placeholder="Brand" className="rounded-md border border-gray-200 px-3 py-2" />
              <input value={form.model} onChange={(e) => setForm((s) => ({ ...s, model: e.target.value }))} placeholder="Model" className="rounded-md border border-gray-200 px-3 py-2" />
              <input value={form.year} onChange={(e) => setForm((s) => ({ ...s, year: e.target.value }))} placeholder="Year" className="rounded-md border border-gray-200 px-3 py-2" />

              <input value={form.reg} onChange={(e) => setForm((s) => ({ ...s, reg: e.target.value }))} placeholder="Registration Number" className="rounded-md border border-gray-200 px-3 py-2" />
              <input value={form.price} onChange={(e) => setForm((s) => ({ ...s, price: e.target.value }))} placeholder="Rent Price (per day)" className="rounded-md border border-gray-200 px-3 py-2" />
              <select value={form.seats} onChange={(e) => setForm((s) => ({ ...s, seats: e.target.value }))} className="rounded-md border border-gray-200 px-3 py-2">
                <option value="">Seat Capacity</option>
                <option>2</option>
                <option>4</option>
                <option>5</option>
                <option>7</option>
              </select>
            </div>
          </section>

          <section className="rounded-md border border-gray-100 p-4 shadow-lg">
            <h3 className="font-medium mb-3">Technical Details</h3>
            <div className="grid gap-4 sm:grid-cols-4">
              <select value={form.fuel} onChange={(e) => setForm((s) => ({ ...s, fuel: e.target.value }))} className="rounded-md border border-gray-200 px-3 py-2">
                <option value="">Select Fuel Type</option>
                <option>Gasoline</option>
                <option>Diesel</option>
                <option>Hybrid</option>
                <option>Electric</option>
              </select>

              <select value={form.transmission} onChange={(e) => setForm((s) => ({ ...s, transmission: e.target.value }))} className="rounded-md border border-gray-200 px-3 py-2">
                <option value="">Select Transmission</option>
                <option>Automatic</option>
                <option>Manual</option>
              </select>

              <input value={form.color} onChange={(e) => setForm((s) => ({ ...s, color: e.target.value }))} placeholder="Color" className="rounded-md border border-gray-200 px-3 py-2" />
              <input value={form.mileage} onChange={(e) => setForm((s) => ({ ...s, mileage: e.target.value }))} placeholder="Mileage (km)" className="rounded-md border border-gray-200 px-3 py-2" />
            </div>
          </section>

          <section className="rounded-md border border-gray-100 p-4 shadow-lg">
            <h3 className="font-medium mb-3">Features</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              {featuresList.map((f) => (
                <label key={f} className="inline-flex items-center gap-2">
                  <input type="checkbox" checked={!!form.features[f]} onChange={() => toggleFeature(f)} />
                  <span className="text-sm">{f}</span>
                </label>
              ))}
            </div>
          </section>

          <section className="rounded-md border border-gray-100 p-4 shadow-lg">
            <h3 className="font-medium mb-3">Vehicle Images</h3>
            <div className="rounded-md border-2 border-dashed border-gray-200 p-8 text-center">
              <input ref={fileRef} multiple type="file" accept="image/*" onChange={onFiles} className="hidden" />
              <div className="flex flex-col items-center justify-center gap-3">
                <ImageIcon className="h-8 w-8 text-gray-400" />
                <div className="text-sm text-gray-600">Drag and drop images here or</div>
                <button type="button" onClick={() => fileRef.current?.click()} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Select Images</button>
                {images.length > 0 && <div className="mt-2 text-sm text-gray-600">{images.length} image(s) selected</div>}
              </div>
            </div>
          </section>

          <section className="rounded-md border border-gray-100 p-4 shadow-lg">
            <h3 className="font-medium mb-3">Additional Information</h3>
            <textarea value={form.notes} onChange={(e) => setForm((s) => ({ ...s, notes: e.target.value }))} placeholder="Any additional notes..." className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm h-24" />
          </section>

          <div className="flex justify-end">
            <button type="submit" className="rounded-md bg-blue-600 px-6 py-2 text-sm font-semibold text-white">Save Vehicle</button>
          </div>
        </form>
      </div>
    </div>
  );
}

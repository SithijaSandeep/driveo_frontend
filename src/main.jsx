import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Vehicles from "./pages/Vehicles.jsx"
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import VehicleDetail from "./pages/VehicleDetail.jsx";
import BookingDetails from './pages/BookingDetails.jsx';
import BookNow from './pages/BookNow.jsx';
import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminLayout from './pages/admin/AdminLayout.jsx';
import DashboardOverview from './pages/admin/DashboardOverview.jsx';
import ManageManagers from './pages/admin/ManageManagers.jsx';
import AddCar from './pages/admin/AddCar.jsx';
import ManageCars from './pages/admin/ManageCars.jsx';
import BookingHistory from './pages/admin/BookingHistory.jsx';
import GenerateReports from './pages/admin/GenerateReports.jsx';
import ProfileSettings from './pages/admin/ProfileSettings.jsx';
import EditCar from './pages/admin/EditCar.jsx';
import ManagerLogin from './pages/manager/ManagerLogin.jsx';
import ManagerLayout from './pages/manager/ManagerLayout.jsx';
import ManagerDashboard from './pages/manager/DashboardOverview.jsx';
import ManagerVehicles from './pages/manager/Vehicles.jsx';
import ManagerPayments from './pages/manager/Payments.jsx';
import ManagerBookingHistory from './pages/manager/BookingHistory.jsx';
import Profile from './pages/Profile.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import { ManagerRoute } from './ProtectedRoute.jsx';
import Payment from './pages/Payment.jsx';







     




const router = createBrowserRouter([
  {
    path: "/",element:  <App /> 
  },
  {
    path: "/Vehicles",element:  <Vehicles /> 
  },
    {
    path: "/About",element:  <About/> 
  },
    {
    path: "/Contact",element:  <Contact/> 
  },
     {
    path: "/Vehicles/:id",element:  <VehicleDetail/> 
  },
    {
    path: "/booking-details/:id",element:  <BookingDetails/> 
  },
   {
    path: "/book/:id",element:  <BookNow/> 
  },
   {
    path: "/profile",element:  <Profile /> 
  },
  { path: "/payment", element: <Payment /> },
     {
    path: "/login",element:  <Login/> 
  },
   {
    path: "/register",element:  <Register /> 
  },
  
  {
    path: "/admin/login",element:  <AdminLogin />
  },
    {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <DashboardOverview /> },
      { path: "manage-managers", element: <ManageManagers /> },
      { path: "add-car", element: <AddCar /> },
      { path: "manage-cars", element: <ManageCars /> },
      { path: "booking-history", element: <BookingHistory /> },
      { path: "generate-reports", element: <GenerateReports /> },
      { path: "profile-settings", element: <ProfileSettings /> },
      { path: "edit-car/:id", element: <EditCar /> },
    ],
  },
  // { path: "/manager/login", element: <ManagerLogin /> },
  // {
  //   path: "/manager",
  //   element: <ManagerLayout />,
  //   children: [
  //     { index: true, element: <ManagerDashboard /> },
  //     { path: "vehicles", element: <ManagerVehicles /> },
  //     { path: "payments", element: <ManagerPayments /> },
  //     { path: "booking-history", element: <ManagerBookingHistory /> },
  //   ],
  // },
    
  
{ 
  path: "/manager/login", 
  element: <ManagerLogin /> 
},
{
  path: "/manager",
  element: (
    <ManagerRoute>
      <ManagerLayout />
    </ManagerRoute>
  ),
  children: [
    { index: true, element: <ManagerDashboard /> },
    { path: "vehicles", element: <ManagerVehicles /> },
    { path: "payments", element: <ManagerPayments /> },
    { path: "booking-history", element: <ManagerBookingHistory /> },
  ],
},

    
 
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/**/}
    <RouterProvider router={router} />
  </StrictMode>,
)

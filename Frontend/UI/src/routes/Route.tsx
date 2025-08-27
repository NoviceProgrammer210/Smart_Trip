import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "@/pages/Home"
import SearchPage from "@/pages/Search"
import TripDetails from "@/pages/TripDetails"
import Profile from "@/pages/Profile"
import Settings from "@/pages/Setting"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Layout from "@/components/layout/layout"
import Recommendations from "@/pages/Recommendation"

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes with Navbar */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/trips?" element={<SearchPage />} />
          <Route path="/trip/:id" element={<TripDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/recommendations" element={<Recommendations />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

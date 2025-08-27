// src/pages/TripDetails.tsx
import { useParams, Link } from "react-router-dom"
import { Star, ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"
import type { Trip } from "@/components/layout/TripCard"

export default function TripDetails() {
  const { id } = useParams()
  const [trip, setTrip] = useState<Trip | null>(null)
  const [loading, setLoading] = useState(true)

const handleSaveTrip = async () => {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/trips/${id}/save/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: 1 }), // 👈 replace 1 with logged-in user's id
    });

    const data = await res.json();
    if (res.ok) {
      alert(data.message || "Trip saved!");
    } else {
      alert(data.error || "Failed to save trip");
    }
  } catch (err) {
    console.error("Error saving trip:", err);
    alert("Something went wrong");
  }
};



  

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/trips/${id}/`) // ✅ backend API endpoint
      .then((res) => res.json())
      .then((data) => {
        setTrip(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [id])

  if (loading) return <p className="p-6">Loading trip...</p>
  if (!trip) return <p className="p-6 text-red-500">Trip not found!</p>

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Back button */}
      <Link
        to="/home"
        className="flex items-center text-blue-600 hover:underline mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
      </Link>

      {/* Trip Image */}
      <div className="rounded-2xl overflow-hidden shadow-md">
        <img
          src={trip.image || "https://via.placeholder.com/1200x800?text=No+Image"}
          alt={trip.title}
          className="w-full h-[400px] object-cover"
        />
      </div>

      {/* Title & Info */}
      <div>
        <h1 className="text-3xl font-bold text-amber-700">{trip.title}</h1>
        <p className="text-gray-600 mt-1">{trip.duration} | {trip.price}</p>

        <div className="flex items-center gap-2 text-yellow-500 mt-2">
          <Star className="w-5 h-5" />
          <span className="font-semibold">{trip.rating}</span>
          <span className="text-gray-500 text-sm">
            ({trip.reviews} reviews)
          </span>
        </div>
      </div>

      {/* Tags */}
      {trip.tags && (
        <div className="flex flex-wrap gap-2">
          {trip.tags.map((tag: string, idx: number) => (
            <span
              key={idx}
              className="bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Description (mock for now) */}
      <div className="prose max-w-none">
        <h2 className="text-xl font-semibold">About this trip</h2>
        <p>
          Experience the best of {trip.title}! This package includes
          accommodation, guided tours, and exclusive activities designed for
          travelers who want to explore and enjoy at their own pace.
        </p>
      </div>

      {/* CTA */}
      <button onClick={handleSaveTrip} className="bg-amber-600 text-white px-6 py-3 rounded-xl shadow hover:bg-amber-700 transition">
        Save Trip
      </button>
    </div>
  )
}

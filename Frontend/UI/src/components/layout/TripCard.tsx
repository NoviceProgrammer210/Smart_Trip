import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Heart } from "lucide-react"
import { Link } from "react-router-dom"
import type { Trip } from "@/services/trips"
import api from "@/services/api"

interface TripCardProps {
  trip: Trip
  currentUserId?: number
}

// Use the axios api instance with auth headers
async function toggleTripLike(tripId: number) {
  try {
    const token = localStorage.getItem("access");

    const res = await fetch("http://127.0.0.1:8000/api/likes/toggle/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ trip: tripId }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed: ${res.status} - ${errorText}`);
    }

    const data = await res.json();
    console.log("Like response:", data);
    return data;
  } catch (err) {
    console.error("Failed to like:", err);
  }
}

export default function TripCard({ trip, currentUserId }: TripCardProps) {
  const [liked, setLiked] = useState(trip.likes?.some(like => like.user === currentUserId) ?? false)
  const [likesCount, setLikesCount] = useState(trip.likes?.length ?? 0)
const handleLike = async () => {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/likes/toggle/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ trip: trip.id }),
    });

    const data = await res.json();
    console.log("Like response:", data);
    setLikesCount((prev) => prev + 1); // just increment
  } catch (err) {
    console.error("Failed to like:", err);
  }
};



  return (
    <Card className="w-[300px] shadow-md hover:shadow-xl transition rounded-2xl bg-white dark:bg-gray-900 overflow-hidden">
      <div className="h-40 w-full">
        <img
          src={trip.image || "https://via.placeholder.com/300x200"}
          alt={trip.title}
          className="object-cover w-full h-full"
        />
      </div>

      <CardHeader>
        <CardTitle className="text-gray-800 dark:text-zinc-300 font-bold">{trip.title}</CardTitle>
        <p className="text-sm text-gray-600 dark:text-amber-200">{trip.duration} | {trip.price}</p>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-2 text-yellow-500">
          <Star className="w-4 h-4" />
          <span>{trip.rating}</span>
          <span className="text-gray-500 dark:text-gray-400 text-sm">({trip.reviews} reviews)</span>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {(trip.tags ?? []).map(tag => <span key={tag}>{tag}</span>)}
        </div>

        <div className="flex justify-between items-center mt-4">
          <Link to={`/trip/${trip.id}`} className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            View Details
          </Link>
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 transition ${liked ? "text-red-500" : "text-gray-400 hover:text-red-500"}`}
          >
            <Heart className="w-5 h-5" fill={liked ? "red" : "none"} />
            <span className="text-sm">{likesCount}</span>
          </button>
        </div>
      </CardContent>
    </Card>
  )
}

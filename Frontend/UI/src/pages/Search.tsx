import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import TripCard from "@/components/layout/TripCard"
import type { Trip } from "@/services/trips"

export default function SearchPage() {
  const [params] = useSearchParams()
  const [trips, setTrips] = useState<Trip[]>([])

useEffect(() => {
  const apiUrl = `http://127.0.0.1:8000/api/trips/?${params.toString()}`
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => setTrips(data.results))
}, [params])

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-amber-700 mb-6">Search Results</h1>
      {trips.length === 0 ? (
        <p className="text-gray-500">No trips found for your criteria.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      )}
    </div>
  )
}

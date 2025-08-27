import { useEffect, useState } from "react"
import TripCard from "@/components/layout/TripCard"
import type { Trip } from "@/components/layout/TripCard"

export default function Recommendations({ personalized = false }: { personalized?: boolean }) {
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const url = personalized
      ? "http://127.0.0.1:8000/api/recommendations/personalized/"
      : "http://127.0.0.1:8000/api/recommendations/popular/"

    // 🚀 Fetch with cache-first strategy
    const fetchTrips = async () => {
      try {
        setLoading(true)
        const res = await fetch(url, {
          credentials: personalized ? "include" : "omit",
          cache: "force-cache", // ✅ speeds up repeated requests
        })

        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()

        if (isMounted) {
          console.log("Fetched trips from API:", data)

          setTrips(Array.isArray(data) ? data : data.results || [])
        }
      } catch (e: any) {
        if (isMounted) setError(e.message || "Failed to load")
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchTrips()
    return () => {
      isMounted = false
    }
  }, [personalized])

  return (
    <section className="py-12 px-6">
      <h2 className="text-2xl font-bold mb-6">
        {personalized ? "Recommended for you" : "Trending trips"}
      </h2>

      {/* ✅ Show skeletons instead of "Loading..." */}
      {loading && !trips.length && (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-pulse">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-40 bg-gray-200 rounded-xl" />
          ))}
        </div>
      )}

      {/* ✅ Show errors gracefully */}
      {error && <div className="px-6 py-10 text-red-600">{error}</div>}

      {/* ✅ Render trips immediately */}
      {trips.length > 0 && (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {trips.map((t) => (
            <div key={t.id} className="hover:scale-[1.02] transition">
              <TripCard trip={t} />
            </div>
          ))}
        </div>
      )}

      {!loading && !error && trips.length === 0 && (
        <div className="px-6 py-10">No recommendations yet.</div>
      )}
    </section>
  )
}

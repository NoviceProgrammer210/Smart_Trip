import { useEffect, useState } from "react";
import { getTrips} from "@/services/trips";
import type { Trip } from "@/services/trips";
import Footer from "@/components/layout/Footer";
import TripCard from "@/components/layout/TripCard";
import everest from "./images/everest.jpg";
import Recommendations from "./Recommendation";

export default function Home() {
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    async function fetchTrips() {
      try {
        const data = await getTrips();
        setTrips(data);
      } catch (error) {
        console.error("Failed to fetch trips:", error);
      }
    }
    fetchTrips();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Hero Section */}
      <section
        className="relative h-[70vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${everest})` }}
      >
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4 sm:px-8 lg:px-16">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg">
            Find Your Perfect Trip
          </h1>
          <p className="mt-4 text-base sm:text-lg lg:text-xl text-gray-200 max-w-3xl">
            Discover curated experiences around the world
          </p>
        </div>
      </section>

      {/* Featured Trips */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
            Featured Trips
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {trips.map((trip) => (
              <div key={trip.id} className="hover:scale-105 transition">
                <TripCard trip={trip} />
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Why Choose Us */}
      <section className="py-16 bg-white dark:bg-gray-800 px-4 sm:px-6 lg:px-12 xl:px-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
            Why Choose Us?
          </h2>
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 text-center">
            <div className="hover:scale-105 transition">
              <div className="text-5xl">🌍</div>
              <h3 className="mt-3 font-semibold text-lg">Curated Destinations</h3>
              <p className="mt-1 text-gray-600 dark:text-gray-300">
                Handpicked experiences tailored for you
              </p>
            </div>
            <div className="hover:scale-105 transition">
              <div className="text-5xl">💰</div>
              <h3 className="mt-3 font-semibold text-lg">Best Price Guarantee</h3>
              <p className="mt-1 text-gray-600 dark:text-gray-300">
                Travel at the best possible prices
              </p>
            </div>
            <div className="hover:scale-105 transition">
              <div className="text-5xl">⭐</div>
              <h3 className="mt-3 font-semibold text-lg">Trusted by Travelers</h3>
              <p className="mt-1 text-gray-600 dark:text-gray-300">
                Loved by thousands worldwide
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

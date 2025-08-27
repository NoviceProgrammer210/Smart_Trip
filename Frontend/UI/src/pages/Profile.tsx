// src/pages/Profile.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MapPin, Calendar } from "lucide-react"
import { Link } from "react-router-dom"

export default function Profile() {
  // Mock user data (replace with real auth data)
  const user = {
    name: "Joy Pais",
    email: "joy@example.com",
    avatar: "https://source.unsplash.com/100x100/?face,portrait",
    favorites: [
      { id: 1, title: "Goa Beach Escape", date: "12 Sept 2025" },
      { id: 2, title: "Manali Adventure", date: "25 Nov 2025" },
    ],
    upcomingTrips: [
      { id: 3, title: "Jaipur Heritage Tour", date: "10 Oct 2025" },
    ],
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Profile Card */}
      <Card className="bg-gray-900 text-white rounded-2xl shadow-lg">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl">{user.name}</CardTitle>
            <p className="text-gray-400">{user.email}</p>
          </div>
        </CardHeader>
      </Card>

      {/* Upcoming Trips */}
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Upcoming Trips</CardTitle>
        </CardHeader>
        <CardContent>
          {user.upcomingTrips.length > 0 ? (
            <ul className="space-y-2">
              {user.upcomingTrips.map((trip) => (
                <li key={trip.id} className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-amber-600" />
                  <Link
                    to={`/trip/${trip.id}`}
                    className="hover:underline text-blue-600"
                  >
                    {trip.title}
                  </Link>
                  <span className="text-gray-500 text-sm">({trip.date})</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No upcoming trips.</p>
          )}
        </CardContent>
      </Card>

      {/* Favorites */}
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-500" /> Favorite Trips
          </CardTitle>
        </CardHeader>
        <CardContent>
          {user.favorites.length > 0 ? (
            <ul className="space-y-2">
              {user.favorites.map((fav) => (
                <li key={fav.id} className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <Link
                    to={`/trip/${fav.id}`}
                    className="hover:underline text-blue-600"
                  >
                    {fav.title}
                  </Link>
                  <span className="text-gray-500 text-sm">({fav.date})</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No favorites added yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

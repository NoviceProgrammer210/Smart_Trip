import api from "./api"; // your axios instance

// Trip interface
export interface Trip {
  id: number;
  title: string;
  destination: string;
  price: string;
  duration: string;
  date: string;
  created_at: string;
  ratings: any[];
  liked: any[];
  comments: any[];

  // Optional fields
  image?: string;
  rating?: number;
  reviews?: number;
  tags?: string[];
  likes_count?:string;
}


// Fetch all trips// Fetch all trips
// Fetch all trips
export async function getTrips(): Promise<Trip[]> {
  const res = await api.get("trips/");
  const data = Array.isArray(res.data) ? res.data : res.data.results || res.data.trips || [];

  return data.map((trip: any) => ({
    ...trip,
    tags: trip.tags || [],
    likes_count: trip.likes ? trip.likes.length : 0,        // ✅ total likes
    liked: trip.likes?.some((like: any) => like.user === 1) // ✅ replace 1 with current user ID
  }));
}


// Fetch a single trip by destination/city
export async function getTripByDestination(city: string): Promise<Trip> {
  const res = await api.get<Trip>(`destination/${city}/`);
  const trip = res.data;

  return {
    ...trip,
    tags: trip.tags || [],
    like_count: trip.liked ? trip.liked.length : 0,
    liked: trip.liked?.some((like: any) => like.user === 1) // replace with logged-in user ID
  };
}

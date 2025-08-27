import { Facebook, Twitter, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Branding */}
        <div>
          <h2 className="text-xl font-bold text-white">SmartTrip ✈️</h2>
          <p className="text-sm mt-2">Plan smarter, travel better.</p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/search" className="hover:text-white">Plan a Trip</a></li>
            <li><a href="/profile" className="hover:text-white">Saved Trips</a></li>
            <li><a href="/faq" className="hover:text-white">FAQs</a></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-lg font-semibold text-white">Contact</h3>
          <p>Email: support@smarttrip.com</p>
          <div className="flex gap-4 mt-3">
            <a href="#"><Facebook className="w-5 h-5 hover:text-blue-500" /></a>
            <a href="#"><Twitter className="w-5 h-5 hover:text-blue-400" /></a>
            <a href="#"><Instagram className="w-5 h-5 hover:text-pink-500" /></a>
          </div>
        </div>

      </div>

      <div className="text-center mt-6 text-sm border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} SmartTrip. All rights reserved.
      </div>
    </footer>
  )
}

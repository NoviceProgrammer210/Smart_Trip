import { useNavigate } from "react-router-dom"

export default function LogoutButton() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")

    navigate("/")
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
    >
      Logout
    </button>
  )
}

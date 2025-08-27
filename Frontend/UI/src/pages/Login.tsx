import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthService } from "@/services/auth"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault()
  try {
    const res = await AuthService.login({
      username: email, // treat the email input as username
      password,
    })
    console.log("Logged in:", res)
    navigate("/home")
  } catch (err: any) {
    console.error("Login failed", err.response?.data)
    alert("Login failed. Check console for details.")
  }
}

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-[350px] shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-gray-900 dark:text-gray-100">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email" className="font-bold">Username</Label><br />
              <Input
                id="email"
                type="text"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="font-bold">Password</Label><br />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-600 dark:text-blue-400 hover:underline">
              Register
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

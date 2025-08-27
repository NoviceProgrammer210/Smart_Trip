import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthService } from "@/services/auth"
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    await AuthService.register({
  username: formData.name,  // backend expects username
  email: formData.email,
  password: formData.password,
});


    alert("Registration successful! Please login.");
    navigate("/login");
  } catch (err) {
    console.error("Registration failed", err);
    alert("Registration failed. Check console for details.");
  }
};
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-[350px] shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-gray-900 dark:text-gray-100">
            Register
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Label htmlFor="name" className="font-bold">Full Name</Label><br />
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="font-bold">Email</Label><br />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="font-bold">Password</Label><br />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword"className="font-bold" >Confirm Password</Label><br />
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
<br />
            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>

          <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
              Login
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

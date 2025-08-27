import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTheme } from "next-themes"
import React from "react"

export default function Settings() {
  const { theme, setTheme } = useTheme() // ✅ get theme + setTheme
  const [notifications, setNotifications] = React.useState(true)

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          ⚙️ Account Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account details, preferences, and privacy settings.
        </p>

        {/* Profile Info */}
        <Card className="rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="Traveler123" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue="traveler@example.com"
              />
            </div>
            <Button className="bg-amber-600 hover:bg-amber-700 text-white">
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="password">New Password</Label>
              <Input id="password" type="password" placeholder="********" />
            </div>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Update Password
            </Button>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">Enable Notifications</Label>
              <Switch
                id="notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="darkmode">Dark Mode</Label>
              <Switch
                id="darkmode"
                checked={theme === "dark"}
                onCheckedChange={(checked) =>
                  setTheme(checked ? "dark" : "light")
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

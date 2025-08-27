// Navbar.tsx
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "../ui/button"
import SearchForm from "@/components/layout/SearchForm"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { useState } from "react"
import { Link } from "react-router-dom"
import LogoutButton from "@/pages/Logout"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center relative">
        {/* Logo / Brand */}
        <div className="text-2xl font-extrabold text-amber-600 tracking-tight cursor-pointer">
          <a href="/home">SmartTravel ✈️</a>
        </div>

        {/* Nav Menu */}
        <NavigationMenu>
          <NavigationMenuList className="flex items-center space-x-6">
            <NavigationMenuItem className="relative">
              <NavigationMenuTrigger className="text-gray-200 font-medium hover:text-amber-500 transition">
                Plan a Trip
              </NavigationMenuTrigger>

              {/* Dropdown */}
              <NavigationMenuContent className="absolute left-0 mt-2 w-[280px] bg-gray-800 dark:bg-gray-800 text-gray-100 shadow-xl rounded-xl p-4">
                <button
                  onClick={() => setOpen(true)}
                  className="w-full text-left block p-2 hover:bg-gray-700 rounded"
                >
                  🔍 Search Trips
                </button>

                <a
                  href="/recommendations"
                  className="block p-2 hover:bg-gray-700 rounded"
                >
                  🤖 AI Recommendations
                </a>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Saved Trips */}
            <NavigationMenuItem>
              <a href="/profile">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-4 py-2 rounded-lg">
                  ❤️ Saved Trips
                </Button>
              </a>
            </NavigationMenuItem>

            {/* Profile Button with Dropdown */}
            <NavigationMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center focus:outline-none">
                    <Avatar className="w-9 h-9">
                      <AvatarImage src="https://source.unsplash.com/50x50/?face" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 bg-gray-800 dark:bg-gray-800 text-gray-100 shadow-lg rounded-xl p-2">
                  <DropdownMenuItem asChild>
                    <Link to="/profile">👤 My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings">⚙️ Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-400 hover:text-red-500">
                    <LogoutButton />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* SearchForm Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-md rounded-2xl p-6 bg-gray-900 dark:bg-gray-900 text-gray-100">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-amber-500">
                Plan Your Trip
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Enter your preferences to find the perfect trip ✈️
              </DialogDescription>
            </DialogHeader>
            <SearchForm />
          </DialogContent>
        </Dialog>
      </div>
    </header>
  )
}

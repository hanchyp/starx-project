"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/app/providers"
import { Wallet, User, Music, Gift, LayoutDashboard, Home, LogOut, Sparkles } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function Navbar() {
  const { isConnected, user, connectWallet, disconnectWallet } = useWallet()
  const pathname = usePathname()

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Artists", href: "/artists", icon: Music },
    { name: "Benefits", href: "/benefits", icon: Gift },
  ]

  return (
    <nav className="border-b bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50 border-blue-100">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <img className="w-25" src="/images/starx.png" alt="starx"/>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-yellow-600 ${
                      pathname === item.href ? "text-yellow-600 font-semibold" : "text-gray-600"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {!isConnected ? (
              <Button
                onClick={connectWallet}
                className="flex items-center space-x-2 bg-gradient-to-r from-gray-500 to-gray-400 hover:from-gray-600 hover:to-gray-600 text-white border-0"
              >
                <Wallet className="h-4 w-4" />
                <span>Connect Wallet</span>
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 hover:bg-gray-50">
                    <Avatar className="h-8 w-8 border-2 border-blue-200">
                      <AvatarFallback className="bg-gradient-to-r from-gray-500 to-gray-500 text-white">
                        {user?.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:block text-gray-700">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-md border-blue-100">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center text-gray-700 hover:text-blue-600">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  {user?.isArtist && (
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex items-center text-gray-700 hover:text-gray-600">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Artist Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={disconnectWallet}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Disconnect
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

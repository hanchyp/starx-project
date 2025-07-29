"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { User, Music, Gift, LayoutDashboard, Home, LogOut, Menu, X } from "lucide-react"
import { ConnectButton, useActiveAccount, useActiveWallet, useDisconnect } from "thirdweb/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { chain, client } from "@/app/client"
import { useState } from "react"

export function Navbar() {
  const pathname = usePathname()
  const account = useActiveAccount()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Artists", href: "/artists", icon: Music },
    { name: "Benefits", href: "/benefits", icon: Gift },
  ]
  const { disconnect } = useDisconnect();
  const wallet = useActiveWallet();

  return (
    <nav className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-12">
            <Link href="/" className="flex items-center">
              <div className="text-2xl font-light text-foreground">STARX</div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-foreground ${
                    pathname === item.href ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {!account ? (
              <ConnectButton client={client} chain={chain} />
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-3 hover:bg-muted rounded-xl px-4 h-10">
                    <Avatar className="h-7 w-7 border border-border">
                      <AvatarFallback className="bg-muted text-muted-foreground text-sm">
                        {account?.address?.slice(2, 4)?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-foreground font-medium">
                      {account?.address?.slice(0, 6)}...{account?.address?.slice(-4)}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-popover border-border rounded-xl shadow-lg">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center text-popover-foreground hover:text-foreground">
                      <User className="mr-3 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/dashboard"
                      className="flex items-center text-popover-foreground hover:text-foreground"
                    >
                      <LayoutDashboard className="mr-3 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => disconnect(wallet)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    Disconnect Wallet
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer">
                    <ConnectButton client={client} chain={chain} />
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {account && (
              <Avatar className="h-7 w-7 border border-border">
                <AvatarFallback className="bg-muted text-muted-foreground text-sm">
                  {account?.address?.slice(2, 4)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      pathname === item.href
                        ? "text-foreground bg-muted"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
              
              <div className="border-t border-border pt-4 mt-4">
                {!account ? (
                  <div className="px-3">
                    <ConnectButton client={client} chain={chain} />
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="px-3 py-2">
                      <ConnectButton client={client} chain={chain} />
                    </div>
                    <Link
                      href="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
                    >
                      <User className="mr-3 h-5 w-5" />
                      Profile
                    </Link>
                    <Link
                      href="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
                    >
                      <LayoutDashboard className="mr-3 h-5 w-5" />
                      Artist Dashboard
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
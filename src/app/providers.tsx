"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { ThemeProvider } from "@/components/theme-provider"

interface User {
  id: string
  address: string
  name: string
  avatar?: string
  isArtist: boolean
}

interface WalletContextType {
  isConnected: boolean
  user: User | null
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
}

const WalletContext = createContext<WalletContextType | null>(null)

export function useWallet() {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error("useWallet must be used within WalletProvider")
  }
  return context
}

function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const connectWallet = async () => {
    // Mock wallet connection
    const mockAddress = "0x" + Math.random().toString(16).substr(2, 40)
    const mockUser: User = {
      id: "1",
      address: mockAddress,
      name: "User " + mockAddress.slice(-4),
      isArtist: Math.random() > 0.7,
    }

    setUser(mockUser)
    setIsConnected(true)
    localStorage.setItem("wallet_connected", "true")
    localStorage.setItem("user_data", JSON.stringify(mockUser))
  }

  const disconnectWallet = () => {
    setUser(null)
    setIsConnected(false)
    localStorage.removeItem("wallet_connected")
    localStorage.removeItem("user_data")
  }

  useEffect(() => {
    const connected = localStorage.getItem("wallet_connected")
    const userData = localStorage.getItem("user_data")

    if (connected && userData) {
      setUser(JSON.parse(userData))
      setIsConnected(true)
    }
  }, [])

  return (
    <WalletContext.Provider value={{ isConnected, user, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  )
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <WalletProvider>{children}</WalletProvider>
    </ThemeProvider>
  )
}

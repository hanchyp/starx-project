"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { TrendingUp, TrendingDown, Search } from "lucide-react"
import Link from "next/link"

const artistCoins = [
  {
    id: "taylor-swift",
    name: "Taylor Swift",
    symbol: "TAYLOR",
    price: 0.25,
    change: "+15.2%",
    isPositive: true,
    image: "/images/taylor.jpg",
    gradient: "from-gray-400 via-gray-400 to-gray-400",
    holders: "125K",
    volume: "2.4M",
    benefits: [
      "Early access to new albums",
      "Exclusive merchandise drops",
      "VIP concert tickets",
      "Behind-the-scenes content",
      "Meet & greet opportunities",
      "Signed memorabilia",
    ],
  },
  {
    id: "ariana-grande",
    name: "Ariana Grande",
    symbol: "ARIANA",
    price: 0.22,
    change: "+12.4%",
    isPositive: true,
    image: "/images/ariana.webp",
    gradient: "from-gray-400 via-gray-400 to-gray-400",
    holders: "110K",
    volume: "2.1M",
    benefits: [
      "Exclusive vocal lessons",
      "Limited edition perfume",
      "Backstage access",
      "Collaboration opportunities",
      "Early access to new albums",
      "VIP concert tickets",
    ],
  },
  {
    id: "taylor-swift",
    name: "Taylor Swift",
    symbol: "TAYLOR",
    price: 0.25,
    change: "+15.2%",
    isPositive: true,
    image: "/images/taylor.jpg",
    gradient: "from-gray-400 via-gray-400 to-gray-400",
    holders: "125K",
    volume: "2.4M",
    benefits: [
      "Early access to new albums",
      "Exclusive merchandise drops",
      "VIP concert tickets",
      "Behind-the-scenes content",
      "Meet & greet opportunities",
      "Signed memorabilia",
    ],
  },
  {
    id: "ariana-grande",
    name: "Ariana Grande",
    symbol: "ARIANA",
    price: 0.22,
    change: "+12.4%",
    isPositive: true,
    image: "/images/ariana.webp",
    gradient: "from-gray-400 via-gray-400 to-gray-400",
    holders: "110K",
    volume: "2.1M",
    benefits: [
      "Exclusive vocal lessons",
      "Limited edition perfume",
      "Backstage access",
      "Collaboration opportunities",
      "Early access to new albums",
      "VIP concert tickets",
    ],
  },
  {
    id: "ariana-grande",
    name: "Ariana Grande",
    symbol: "ARIANA",
    price: 0.22,
    change: "+12.4%",
    isPositive: true,
    image: "/images/ariana.webp",
    gradient: "from-gray-400 via-gray-400 to-gray-400",
    holders: "110K",
    volume: "2.1M",
    benefits: [
      "Exclusive vocal lessons",
      "Limited edition perfume",
      "Backstage access",
      "Collaboration opportunities",
      "Early access to new albums",
      "VIP concert tickets",
    ],
  },
]

export default function ArtistsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name") // name, price, change, holders

  // Filter and sort artists
  const filteredAndSortedArtists = artistCoins
    .filter(
      (artist) =>
        artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price":
          return b.price - a.price
        case "change":
          return Number.parseFloat(b.change.replace("%", "")) - Number.parseFloat(a.change.replace("%", ""))
        case "holders":
          return Number.parseFloat(b.holders.replace("K", "")) - Number.parseFloat(a.holders.replace("K", ""))
        default:
          return a.name.localeCompare(b.name)
      }
    })

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-600 via-gray-600 to-gray-600 bg-clip-text text-transparent">
          Discover Artists
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Invest in your favorite artists' tokens and unlock exclusive benefits, experiences, and content.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search artists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-2 border-gray-200 focus:border-gray-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border-2 border-gray-200 rounded-md focus:border-blue-500 focus:outline-none"
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="change">Change</option>
            <option value="holders">Holders</option>
          </select>
        </div>
      </div>

      {/* Artists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAndSortedArtists.map((artist, index) => (
          <div key={artist.id} className="group cursor-pointer">
            <Link href={`/artists/${artist.id}`}>
              <div className="relative">
                <div
                  className={`
                    relative w-full h-96 rounded-3xl p-6 
                    bg-gradient-to-br ${artist.gradient}
                    transform transition-all duration-300 
                    group-hover:scale-105 group-hover:shadow-2xl
                    border border-white/20 backdrop-blur-sm
                  `}
                >
                  {/* Artist Image */}
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white/30 shadow-lg">
                        <img
                          src={artist.image || "/placeholder.svg"}
                          alt={artist.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 rounded-full bg-white/20 blur-md -z-10"></div>
                    </div>
                  </div>

                  {/* Artist Info */}
                  <div className="text-center text-white mb-6">
                    <h3 className="text-2xl font-bold mb-2">{artist.name}</h3>
                    <p className="text-white/80 text-sm font-medium">${artist.symbol}</p>
                  </div>

                  {/* Price and Change */}
                  <div className="text-center">
                    <div className="flex justify-center text-white text-2xl font-bold items-center gap-1">
                      <img src="images/coin.png" className="h-7" alt="coin" />
                      <span>{artist.price} ETH</span>
                    </div>
                    <div
                      className={`flex items-center justify-center space-x-1 text-sm font-medium ${
                        artist.isPositive ? "text-green-200" : "text-red-200"
                      }`}
                    >
                      {artist.isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      <span>{artist.change}</span>
                    </div>
                  </div>

                  {/* Floating Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-white text-xs font-medium">
                        {artist.isPositive ? "🔥 Trending" : "📈 Growing"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredAndSortedArtists.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎵</div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">No artists found</h3>
          <p className="text-gray-500">Try adjusting your search terms or filters.</p>
        </div>
      )}
    </div>
  )
}

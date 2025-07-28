"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Search, Filter, Star } from "lucide-react"
import Link from "next/link"

const artistCoins = [
  {
    id: "taylor-swift",
    name: "Taylor Swift",
    symbol: "TAYLOR",
    price: 0.25,
    change: "+15.2%",
    isPositive: true,
    image: "/placeholder.svg?height=120&width=120",
    holders: "125K",
    volume: "2.4M",
    rating: 4.9,
    genre: "Pop",
    benefits: [
      "Early access to new albums",
      "Exclusive merchandise drops",
      "VIP concert tickets",
      "Behind-the-scenes content",
    ],
  },
  {
    id: "ariana-grande",
    name: "Ariana Grande",
    symbol: "ARIANA",
    price: 0.22,
    change: "+12.4%",
    isPositive: true,
    image: "/placeholder.svg?height=120&width=120",
    holders: "110K",
    volume: "2.1M",
    rating: 4.8,
    genre: "Pop",
    benefits: ["Exclusive vocal lessons", "Limited edition perfume", "Backstage access", "Collaboration opportunities"],
  },
  {
    id: "the-weeknd",
    name: "The Weeknd",
    symbol: "WEEKND",
    price: 0.31,
    change: "+8.7%",
    isPositive: true,
    image: "/placeholder.svg?height=120&width=120",
    holders: "98K",
    volume: "1.8M",
    rating: 4.7,
    genre: "R&B",
    benefits: ["Unreleased track access", "VIP event invitations", "Signed vinyl records", "Studio session footage"],
  },
  {
    id: "billie-eilish",
    name: "Billie Eilish",
    symbol: "BILLIE",
    price: 0.28,
    change: "-2.1%",
    isPositive: false,
    image: "/placeholder.svg?height=120&width=120",
    holders: "87K",
    volume: "1.5M",
    rating: 4.6,
    genre: "Alternative",
    benefits: [
      "Exclusive documentary access",
      "Limited merch drops",
      "Meet & greet opportunities",
      "Personal voice messages",
    ],
  },
  {
    id: "drake",
    name: "Drake",
    symbol: "DRAKE",
    price: 0.35,
    change: "+11.3%",
    isPositive: true,
    image: "/placeholder.svg?height=120&width=120",
    holders: "156K",
    volume: "3.2M",
    rating: 4.8,
    genre: "Hip-Hop",
    benefits: ["OVO merchandise access", "Concert VIP packages", "Exclusive playlist features", "Personal shoutouts"],
  },
  {
    id: "dua-lipa",
    name: "Dua Lipa",
    symbol: "DUA",
    price: 0.19,
    change: "+6.8%",
    isPositive: true,
    image: "/placeholder.svg?height=120&width=120",
    holders: "92K",
    volume: "1.7M",
    rating: 4.5,
    genre: "Pop",
    benefits: ["Dance lesson tutorials", "Fashion collaboration access", "Backstage content", "Meet & greet passes"],
  },
]

export default function ArtistsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [filterGenre, setFilterGenre] = useState("all")

  const genres = ["all", ...new Set(artistCoins.map((artist) => artist.genre))]

  const filteredAndSortedArtists = artistCoins
    .filter((artist) => {
      const matchesSearch =
        artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesGenre = filterGenre === "all" || artist.genre === filterGenre
      return matchesSearch && matchesGenre
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price":
          return b.price - a.price
        case "change":
          return Number.parseFloat(b.change.replace("%", "")) - Number.parseFloat(a.change.replace("%", ""))
        case "holders":
          return Number.parseFloat(b.holders.replace("K", "")) - Number.parseFloat(a.holders.replace("K", ""))
        case "rating":
          return b.rating - a.rating
        default:
          return a.name.localeCompare(b.name)
      }
    })

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-6 py-12 bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-100">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-gray-900">Discover Artists</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Invest in your favorite artists' tokens and unlock exclusive benefits, experiences, and content
          </p>
        </div>

        <div className="flex justify-center space-x-8 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>{artistCoins.length} Artists Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Live Trading</span>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search artists or symbols..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 border-gray-200 focus:border-gray-400 rounded-xl bg-gray-50 focus:bg-white transition-colors"
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={filterGenre}
                onChange={(e) => setFilterGenre(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-xl focus:border-gray-400 focus:outline-none bg-white"
              >
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre === "all" ? "All Genres" : genre}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-xl focus:border-gray-400 focus:outline-none bg-white"
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="change">Change</option>
                <option value="holders">Holders</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Artists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedArtists.map((artist, index) => (
          <Link key={`${artist.id}-${index}`} href={`/artists/${artist.id}`} className="group">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-gray-200 hover:-translate-y-1">
              {/* Header with image and basic info */}
              <div className="relative p-6 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={artist.image || "/placeholder.svg"}
                      alt={artist.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-sm"
                    />
                    <div className="absolute -top-1 -right-1">
                      <div
                        className={`w-4 h-4 rounded-full ${artist.isPositive ? "bg-green-500" : "bg-red-500"} border-2 border-white`}
                      ></div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">{artist.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="secondary" className="text-xs font-mono bg-gray-200 text-gray-700">
                        ${artist.symbol}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {artist.genre}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 mt-3">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-700">{artist.rating}</span>
                  <span className="text-xs text-gray-500">({artist.holders} holders)</span>
                </div>
              </div>

              {/* Price and stats */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-white"></div>
                      </div>
                      <span className="text-2xl font-semibold text-gray-900">{artist.price}</span>
                      <span className="text-sm text-gray-500">ETH</span>
                    </div>
                  </div>

                  <div
                    className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${
                      artist.isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {artist.isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    <span>{artist.change}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">{artist.holders}</div>
                    <div className="text-xs text-gray-500">Holders</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">{artist.volume}</div>
                    <div className="text-xs text-gray-500">Volume</div>
                  </div>
                </div>

                {/* Benefits preview */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="text-xs text-gray-500 mb-2">Top Benefits:</div>
                  <div className="space-y-1">
                    {artist.benefits.slice(0, 2).map((benefit, idx) => (
                      <div key={idx} className="text-sm text-gray-700 flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                        <span className="truncate">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action button */}
                <Button className="w-full mt-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl h-11 font-medium transition-colors">
                  View Details
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* No Results */}
      {filteredAndSortedArtists.length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-2xl">
          <div className="text-6xl mb-4">🎵</div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">No artists found</h3>
          <p className="text-gray-500">Try adjusting your search terms or filters.</p>
        </div>
      )}
    </div>
  )
}

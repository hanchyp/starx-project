"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, TrendingUp, TrendingDown } from "lucide-react"
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
    gradient: "from-pink-400 via-purple-400 to-indigo-400",
  },
  {
    id: "black-pink",
    name: "Black Pink",
    symbol: "BP",
    price: 0.18,
    change: "+8.7%",
    isPositive: true,
    image: "/images/blackpink.jpg",
    gradient: "from-blue-400 via-cyan-400 to-teal-400",
  },
  {
    id: "ariana-grande",
    name: "Ariana Grande",
    symbol: "ARIANA",
    price: 0.22,
    change: "+12.4%",
    isPositive: true,
    image: "/placeholder.svg?height=120&width=120&text=AG",
    gradient: "from-rose-400 via-pink-400 to-purple-400",
  },
  {
    id: "juicy-luicy",
    name: "Juicy Luicy",
    symbol: "JL",
    price: 0.16,
    change: "-2.1%",
    isPositive: false,
    image: "/placeholder.svg?height=120&width=120&text=ES",
    gradient: "from-orange-400 via-red-400 to-pink-400",
  },
  {
    id: "tulus",
    name: "Tulus",
    symbol: "TULUS",
    price: 0.21,
    change: "+9.8%",
    isPositive: true,
    image: "/placeholder.svg?height=120&width=120&text=BE",
    gradient: "from-green-400 via-emerald-400 to-teal-400",
  },
  {
    id: "niki",
    name: "NIKI",
    symbol: "NIKI",
    price: 0.28,
    change: "+18.5%",
    isPositive: true,
    image: "/placeholder.svg?height=120&width=120&text=DR",
    gradient: "from-yellow-400 via-orange-400 to-red-400",
  },
]

export function ArtistCoinCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320
      const newScrollLeft = scrollRef.current.scrollLeft + (direction === "right" ? scrollAmount : -scrollAmount)

      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })
    }
  }

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Trending Musician
          </h2>
          <p className="text-gray-600 mt-1">Invest in your favorite artists and unlock exclusive benefits</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {artistCoins.map((artist, index) => (
          <Link key={artist.id} href={`/artists/${artist.id}`} className="flex-shrink-0 group cursor-pointer">
            <div className="relative">
              <div
                className={`
                  relative w-80 h-[460px] rounded-3xl overflow-hidden group cursor-pointer bg-gradient-to-br from-pink-400 to-purple-400 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:z-20
                `}
                style={{ animationDelay: `${index * 0.2}s`, animationDuration: "3s" }}
              >
                
                <img
                    src={artist.image || "/placeholder.svg"}
                    alt={artist.name}
                    className="absolute inset-0 w-full h-full object-cover"
                />

                 {/* Overlay Blur */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all"></div>

                {/* Nama */}
                <div className="relative z-10 flex flex-col justify-end h-full p-6 text-white space-y-3">
                  <h3 className="text-xl font-bold">{artist.name}</h3>
                    <div className="flex items-center gap-1 text-white/90 text-sm font-semibold">
                        <img src="/coin-icon.svg" className="h-5 w-5" alt="coin" />
                        <span>${artist.symbol}</span>
                    </div>
                    <div className="text-2xl font-bold">{artist.price} ETH
                        <div
                            className={`flex justify-center items-center text-sm gap-1 ${
                                artist.isPositive ? "text-green-200" : "text-red-200"
                            }`}
                            >
                            {artist.isPositive ? (
                                <TrendingUp className="h-4 w-4" />
                            ) : (
                                <TrendingDown className="h-4 w-4" />
                            )}
                            <span>{artist.change}</span>
                        </div>
                    </div>
                </div>

                {/* Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <div className="bg-white/90 text-gray-900 px-6 py-2 rounded-full font-semibold text-sm shadow-lg">
                    View Details
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

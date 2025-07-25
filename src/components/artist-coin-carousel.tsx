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
    gradient: "from-gray-400 via-gray-400 to-gray-400",
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
  },
  {
    id: "taylor-swift",
    name: "Taylor Swift",
    symbol: "TAYLOR",
    price: 0.25,
    change: "+15.2%",
    isPositive: true,
    image: "/images/taylor.jpg",
    gradient: "from-pink-400 via-grey-400 to-indigo-400",
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
  },
  {
    id: "taylor-swift",
    name: "Taylor Swift",
    symbol: "TAYLOR",
    price: 0.25,
    change: "+15.2%",
    isPositive: true,
    image: "/images/taylor.jpg",
    gradient: "from-pink-400 via-grey-400 to-indigo-400",
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
      <div className="flex flex-col items-center justify-center text-center mb-10">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-600 to-gray-600 bg-clip-text text-transparent">
            Trending Artist
          </h2>
          <p className="text-gray-600 mt-1">Invest in your favorite artists and unlock exclusive benefits</p>
        </div>
        <div className="flex space-x-2"></div>
      </div>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {artistCoins.map((artist, index) => (
          <Link key={artist.id} href={`/artists/${artist.id}`} className="flex-shrink-0 group cursor-pointer">
            <div className="relative">
              <div
                className={`
                  relative w-80 h-[430px] rounded-3xl overflow-hidden group cursor-pointer bg-gradient-to-br from-gray-400 to-gray-400 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:z-10
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
                        <span>${artist.symbol}</span>
                    </div>
                    <div className="flex text-2xl font-bold items-center gap-1">
                      <img src="images/coin.png" className="h-7" alt="coin" />
                      <span>{artist.price} ETH</span>
                    </div>
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

                {/* Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

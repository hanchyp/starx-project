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
    image: "/placeholder.svg?height=400&width=320",
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
    image: "/placeholder.svg?height=400&width=320",
    benefits: [
      "Exclusive music previews",
      "Limited edition merchandise",
      "Concert pre-sale access",
      "Personal video messages",
      "Studio session access",
    ],
  },
  {
    id: "the-weeknd",
    name: "The Weeknd",
    symbol: "WEEKND",
    price: 0.31,
    change: "+8.7%",
    isPositive: true,
    image: "/placeholder.svg?height=400&width=320",
    benefits: ["Unreleased track access", "VIP event invitations", "Signed vinyl records", "Backstage passes"],
  },
  {
    id: "billie-eilish",
    name: "Billie Eilish",
    symbol: "BILLIE",
    price: 0.28,
    change: "-2.1%",
    isPositive: false,
    image: "/placeholder.svg?height=400&width=320",
    benefits: [
      "Exclusive documentary access",
      "Limited merch drops",
      "Meet & greet opportunities",
      "Studio visit passes",
    ],
  },
  {
    id: "drake",
    name: "Drake",
    symbol: "DRAKE",
    price: 0.35,
    change: "+11.3%",
    isPositive: true,
    image: "/placeholder.svg?height=400&width=320",
    benefits: ["OVO merchandise access", "Concert VIP packages", "Exclusive playlist features", "Personal shoutouts"],
  },
]

export function ArtistCoinCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 280
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
    <div className="relative max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-light text-foreground mb-3">Trending Artists</h2>
        <p className="text-muted-foreground text-lg font-light max-w-2xl mx-auto">
          Discover and invest in your favorite artists
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-6 z-10">
        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className="h-12 w-12 rounded-full border-border bg-background/80 backdrop-blur-sm hover:bg-background hover:border-border disabled:opacity-30 shadow-sm"
        >
          <ChevronLeft className="h-5 w-5 text-foreground" />
        </Button>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 -right-6 z-10">
        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className="h-12 w-12 rounded-full border-border bg-background/80 backdrop-blur-sm hover:bg-background hover:border-border disabled:opacity-30 shadow-sm"
        >
          <ChevronRight className="h-5 w-5 text-foreground" />
        </Button>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {artistCoins.map((artist, index) => (
          <Link key={`${artist.id}-${index}`} href={`/artists/${artist.id}`} className="flex-shrink-0 group">
            <div className="w-64 bg-card rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-border hover:-translate-y-1">
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={artist.image || "/placeholder.svg"}
                  alt={artist.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Price Change Badge */}
                <div className="absolute top-4 right-4">
                  <div
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm ${
                      artist.isPositive
                        ? "bg-green-500/20 text-green-100 border border-green-400/30"
                        : "bg-red-500/20 text-red-100 border border-red-400/30"
                    }`}
                  >
                    {artist.isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    <span>{artist.change}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-medium text-card-foreground mb-1">{artist.name}</h3>
                  <p className="text-sm text-muted-foreground font-mono">${artist.symbol}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-white" />
                    </div>
                    <span className="text-2xl font-light text-card-foreground">{artist.price}</span>
                    <span className="text-sm text-muted-foreground font-light">ETH</span>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border hover:bg-muted text-card-foreground font-medium bg-transparent"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

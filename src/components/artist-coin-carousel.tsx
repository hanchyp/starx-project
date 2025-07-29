"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useTokens } from "@/hooks/useTokens"

export function ArtistCoinCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const { tokens, isLoading, error } = useTokens()

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

  if (isLoading) {
    return <div className="text-center text-muted-foreground py-8">Loading tokens...</div>
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">Failed to load tokens: {error}</div>
  }

  return (
    <div className="relative max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-light text-foreground mb-3">Trending Artist Tokens</h2>
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
        {tokens.map((token, index) => (
          <Link key={`${token.address}-${index}`} href={`/artists/${token.address}`} className="flex-shrink-0 group">
            <div className="w-64 bg-card rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-border hover:-translate-y-1">
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src="/placeholder.svg?height=400&width=320"
                  alt={token.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-medium text-card-foreground mb-1">{token.name}</h3>
                  <p className="text-sm text-muted-foreground font-mono">${token.symbol}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-white" />
                    </div>
                    <span className="text-2xl font-light text-card-foreground">{Number(token.price).toFixed(3)}</span>
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

                {/* (Optional) Sample Benefits */}
                <ul className="mt-4 text-sm text-muted-foreground list-disc list-inside space-y-1">
                  <li>Exclusive content</li>
                  <li>Early access to events</li>
                </ul>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

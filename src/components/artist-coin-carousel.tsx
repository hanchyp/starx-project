"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTokens } from "@/hooks/useTokens"
import { ArtistCoinCard } from "./artist-coin-card"

interface Metadata {
  image?: string;
  artistName?: string;
  description?: string;
}

export function ArtistCoinCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const { tokens, isLoading, error } = useTokens()
  const [metadatas, setMetadatas] = useState<Record<string, Metadata>>({})

  useEffect(() => {
    const fetchMetadata = async () => {
      const entries = await Promise.all(
        tokens.map(async (token) => {
          try {
            const res = await fetch(token.descURI)
            const json = await res.json()
            return [token.address, json]
          } catch (err) {
            console.error("Failed to fetch metadata for", token.address, err)
            return [token.address, null]
          }
        })
      )
      setMetadatas(Object.fromEntries(entries))
    }
    if (tokens.length > 0) {
      fetchMetadata()
    }
  }, [tokens])

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
      // A small buffer (e.g., 10px) to account for potential sub-pixel rendering or rounding issues
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10) 
    }
  }

  // Update scroll state on mount and window resize
  useEffect(() => {
    handleScroll(); // Initial check
    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener('resize', handleScroll);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('resize', handleScroll);
      }
    };
  }, [tokens]); // Re-run if tokens change, as content width might change

  if (isLoading) {
    return <div className="text-center text-muted-foreground py-8">Loading tokens...</div>
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">Failed to load tokens: {error}</div>
  }

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-light text-foreground mb-3">Artist Tokens</h2>
        <p className="text-muted-foreground text-lg font-light max-w-2xl mx-auto">
          Discover and invest in your favorite artists
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-6 z-10 hidden md:block">
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
      <div className="absolute top-1/2 -translate-y-1/2 -right-6 z-10 hidden md:block">
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
        {tokens.map((token, index) => {
          const metadata = metadatas[token.address]
          if (!metadata) return null // Don't render if metadata is not yet loaded or failed

          return (
            <ArtistCoinCard
              key={`${token.address}-${index}`}
              token={token}
              metadata={metadata}
            />
          )
        })}
      </div>
    </div>
  )
}
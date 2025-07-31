"use client"

import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import Link from "next/link"
import { useTokens } from "@/hooks/useTokens"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Metadata {
  image?: string
  artistName?: string
  description?: string
}

// IPFS resolver
function resolveIPFS(uri: string | undefined): string {
  if (!uri) return "/placeholder.png"
  return uri.startsWith("ipfs://")
    ? uri.replace("ipfs://", "https://ipfs.io/ipfs/")
    : uri
}

export default function ArtistsPage() {
  const { tokens, isLoading } = useTokens()
  const [enrichedTokens, setEnrichedTokens] = useState<(typeof tokens[0] & Metadata)[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")

  // Fetch metadata from descURI
  useEffect(() => {
    const fetchMetadata = async () => {
      const enriched = await Promise.all(
        tokens.map(async (token) => {
          try {
            const res = await fetch(token.descURI)
            const json = await res.json()
            const image = resolveIPFS(json.image)
            return { ...token, ...json, image }
          } catch (err) {
            console.error("Failed to fetch metadata for", token.address, err)
            return { ...token, image: "/placeholder.png" }
          }
        })
      )
      setEnrichedTokens(enriched)
    }

    if (tokens.length > 0) {
      fetchMetadata()
    }
  }, [tokens])

  // Filter & sort
  const filteredAndSortedTokens = enrichedTokens
    .filter((token) => {
      const term = searchTerm.toLowerCase()
      return (
        token.name?.toLowerCase().includes(term) ||
        token.symbol?.toLowerCase().includes(term) ||
        token.artistName?.toLowerCase().includes(term)
      )
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price":
          return Number(b.price) - Number(a.price)
        default:
          return a.name.localeCompare(b.name)
      }
    })

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-5 text-center space-y-6 py-12 bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-100">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-gray-900">Discover Artists</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Invest in your favorite artists' tokens and unlock exclusive benefits, experiences, and content
          </p>
        </div>
        <div className="flex justify-center space-x-8 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>{tokens.length} Artists Available</span>
          </div>
        </div>
      </div>

      {/* Search and Sort */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search artist..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-xl bg-white"
        >
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>
      </div>

      {/* Token Cards */}
      {isLoading ? (
        <p>Loading...</p>
      ) : filteredAndSortedTokens.length === 0 ? (
        <p>No tokens found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedTokens.map((token) => (
            <Card key={token.address} className="hover:shadow-md transition-shadow">
              <CardHeader className="p-0">
                <img
                  src={token.image}
                  alt={token.artistName || token.name}
                  className="w-full h-48 object-cover rounded-t"
                />
                <div className="p-4">
                  <CardTitle>{token.artistName || token.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p>${token.symbol} Token</p>
                <p>Price: {token.price} ETH</p>
                <Button asChild className="w-full">
                  <Link href={`/artists/${token.address}`}>View Token</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

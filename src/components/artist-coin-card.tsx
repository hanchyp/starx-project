import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Token {
  address: string
  descURI: string
  symbol: string
  price: string
}

interface Metadata {
  image?: string
  artistName?: string
  name?: string
}

interface ArtistCoinCardProps {
  token: Token
  metadata: Metadata
}

export function ArtistCoinCard({ token, metadata }: ArtistCoinCardProps) {
  const imageUrl = metadata.image?.startsWith("ipfs://")
    ? `https://silver-permanent-goldfish-229.mypinata.cloud/ipfs/${metadata.image.replace("ipfs://", "")}`
    : metadata.image || "/placeholder.svg?height=320&width=256"

  return (
    <Link href={`/artists/${token.address}`} className="flex-shrink-0 group">
      <div className="w-64 bg-card rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-border hover:-translate-y-1">
        {/* Image */}
        <div className="relative h-80 overflow-hidden">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={metadata.artistName || metadata.name || "Artist image"}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-medium text-card-foreground mb-1">{metadata.artistName || "Unknown Artist"}</h3>
            <p className="text-sm text-muted-foreground font-mono">${token.symbol}</p>
          </div>
          {/* Updated price and button section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-white" />
              </div>
              <span className="text-2xl font-light text-card-foreground">{Number(token.price)}</span>
              <span className="text-sm text-muted-foreground font-light">ETH</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full border-border hover:bg-muted text-card-foreground font-medium bg-transparent"
            >
              View Details
            </Button>
          </div>
          {/* Optional benefit list */}
          <ul className="mt-4 text-sm text-muted-foreground list-disc list-inside space-y-1">
            <li>Exclusive content</li>
            <li>Early access to events</li>
          </ul>
        </div>
      </div>
    </Link>
  )
}

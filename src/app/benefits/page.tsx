"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Gift, Calendar, Music, Camera, Users, Disc3, Crown, MessageCircle, Video, Headphones } from "lucide-react"

const benefits = [
  {
    id: 1,
    title: "Free Merchandise",
    description: "Exclusive artist merchandise delivered to your doorstep at no cost",
    icon: Gift,
    color: "bg-slate-100 text-slate-600",
    badge: "Popular",
  },
  {
    id: 2,
    title: "Early Access to Special Concerts",
    description: "Get priority booking for intimate concerts and special performances",
    icon: Calendar,
    color: "bg-slate-100 text-slate-600",
    badge: "Exclusive",
  },
  {
    id: 3,
    title: "Early Access to New Music Demos",
    description: "Be the first to hear unreleased tracks and demo versions",
    color: "bg-slate-100 text-slate-600",
    icon: Music,
    badge: "New",
  },
  {
    id: 5,
    title: "Meet & Greet Opportunities",
    description: "Personal meetings with the artist at select events and venues",
    icon: Users,
    color: "bg-slate-100 text-slate-600",
    badge: "VIP",
  },
  {
    id: 6,
    title: "Limited Edition Vinyl",
    description: "Collector's edition vinyl records with unique artwork and packaging",
    icon: Disc3,
    color: "bg-slate-100 text-slate-600",
  },
  {
    id: 7,
    title: "VIP Concert Experience",
    description: "Premium seating, backstage access, and exclusive concert amenities",
    icon: Crown,
    color: "bg-slate-100 text-slate-600",
    badge: "Premium",
  },
  {
    id: 8,
    title: "Personalized Messages",
    description: "Custom audio or video messages from the artist on special occasions",
    icon: MessageCircle,
    color: "bg-slate-100 text-slate-600",
  },
  {
    id: 9,
    title: "Exclusive Livestream Access",
    description: "Private livestream performances and Q&A sessions with the artist",
    icon: Video,
    color: "bg-slate-100 text-slate-600",
  },
  {
    id: 10,
    title: "Unreleased Track Library",
    description: "Access to a growing collection of unreleased songs and acoustic versions",
    icon: Headphones,
    color: "bg-slate-100 text-slate-600",
  },
]

export default function ArtistBenefits() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Exclusive Fan Benefits</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Join our STARX and unlock amazing perks designed exclusively for most dedicated fans of your idols!
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit) => {
          const IconComponent = benefit.icon
          return (
            <Card key={benefit.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div
                    className={`p-3 rounded-lg ${benefit.color} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                  {benefit.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {benefit.badge}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                  {benefit.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16">
        <div className="bg-black rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Join?</h2>
          <p className="text-purple-100 mb-6 max-w-md mx-auto">
            Become part of STARX and start enjoying these amazing benefits today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/artists">
              <button className="border bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-black hover:text-white hover:border-white transition-colors">
                Get Started
              </button>
            </a>
            <a href="/">
              <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors">
                Learn More
              </button>
            </a>
            
          </div>
        </div>
      </div>
    </div>
  )
}

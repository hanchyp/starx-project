"use client";

import { Button } from "@/components/ui/button";
import { ArtistCoinCarousel } from "@/components/artist-coin-carousel";
import Link from "next/link";
import { useActiveAccount } from "thirdweb/react";
import { ConnectButton } from "thirdweb/react";
import { client, chain } from "./client";

export default function HomePage() {
  const account = useActiveAccount();

  return (
    <div className="space-y-20">
      <section className="min-h-[80vh] flex flex-col justify-center text-center space-y-8 py-20 relative">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-50 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto text-center">
          <img
            src="/images/logo.png"
            alt="starx-logo"
            className="h-[150px] mx-auto block"
          />

          <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
            Invest in artist tokens and unlock exclusive experiences with your
            favorite musicians
          </p>
        </div>

        {!account && (
          <>
            <div className="flex justify-center mt-12">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg rounded-xl font-medium"
                onClick={() => {
                  const el = document.getElementById("artists");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Explore Artists
              </Button>
            </div>

            <div className="flex justify-center mt-6">
              <ConnectButton client={client} chain={chain} />
            </div>
          </>
        )}

        {account && (
          <div className="flex justify-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-4 text-lg rounded-xl font-medium"
              asChild
            >
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        )}
      </section>

      <section id="artists" className="py-12">
        <ArtistCoinCarousel />
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-foreground mb-4">
              Why Choose STARX
            </h2>
            <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
              Connect with artists like never before through blockchain
              technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-muted/50 border border-border">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-6">
                <div className="w-6 h-6 rounded-full bg-primary-foreground"></div>
              </div>
              <h3 className="text-xl font-medium text-foreground mb-3">
                Exclusive Access
              </h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                Get early access to new releases, exclusive merchandise, and VIP
                experiences
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-muted/50 border border-border">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-6">
                <div className="w-6 h-6 rounded-full bg-primary-foreground"></div>
              </div>
              <h3 className="text-xl font-medium text-foreground mb-3">
                Direct Support
              </h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                Support your favorite artists directly while building your
                collection
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-muted/50 border border-border">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-6">
                <div className="w-6 h-6 rounded-full bg-primary-foreground"></div>
              </div>
              <h3 className="text-xl font-medium text-foreground mb-3">
                Community
              </h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                Join a community of fans and collectors who share your passion
                for music
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

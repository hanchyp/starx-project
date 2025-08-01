"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Music, Gift, LayoutDashboard, Home, LogOut } from "lucide-react";
import {
  ConnectButton,
  useActiveAccount,
  useActiveWallet,
  useDisconnect,
} from "thirdweb/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { chain, client } from "@/app/client";

export function Navbar() {
  const pathname = usePathname();
  const account = useActiveAccount();

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Artists", href: "/artists", icon: Music },
    { name: "Benefits", href: "/benefits", icon: Gift },
  ];
  const { disconnect } = useDisconnect();
  const wallet = useActiveWallet();

  return (
    <nav className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-12">
            <Link href="/" className="flex items-center">
              <img
                src="/images/logo.png"
                alt="starx-logo"
                className="h-[35px] mx-auto block mt-2"
              />
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-foreground ${
                    pathname === item.href
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {!account ? (
              <ConnectButton client={client} chain={chain} />
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-3 hover:bg-muted rounded-xl px-4 h-10"
                  >
                    <Avatar className="h-7 w-7 border border-border">
                      <AvatarFallback className="bg-muted text-muted-foreground text-sm">
                        {account?.address?.slice(2, 4)?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-foreground font-medium">
                      {account?.address?.slice(0, 6)}...
                      {account?.address?.slice(-4)}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-popover border-border rounded-xl shadow-lg"
                >
                  <DropdownMenuItem asChild>
                    <Link
                      href="/dashboard"
                      className="flex items-center text-popover-foreground hover:text-foreground"
                    >
                      <LayoutDashboard className="mr-3 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => {
                      if (wallet) {
                        disconnect(wallet);
                      }
                    }}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    Disconnect Wallet
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer">
                    <ConnectButton client={client} chain={chain} />
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

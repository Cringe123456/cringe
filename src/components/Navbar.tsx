import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Menu, User, Wallet, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import ConnectWallet from './ConnectWallet';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <Link to="/" className="flex items-center">
          <span className="font-black text-2xl bg-gradient-to-r from-cringe-purple to-cringe-pink bg-clip-text text-transparent">
            bigsnout
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">
            Feed
          </Link>
          <Link to="/vote" className="text-foreground/80 hover:text-foreground transition-colors">
            Vote
          </Link>
          <Link to="/leaderboard" className="text-foreground/80 hover:text-foreground transition-colors">
            Leaderboard
          </Link>
          <Link to="/about" className="text-foreground/80 hover:text-foreground transition-colors">
            About
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] bg-background">
              <div className="flex flex-col gap-4 mt-8">
                <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors text-lg">
                  Feed
                </Link>
                <Link to="/vote" className="text-foreground/80 hover:text-foreground transition-colors text-lg">
                  Vote
                </Link>
                <Link to="/leaderboard" className="text-foreground/80 hover:text-foreground transition-colors text-lg">
                  Leaderboard
                </Link>
                <Link to="/about" className="text-foreground/80 hover:text-foreground transition-colors text-lg">
                  About
                </Link>
              </div>
            </SheetContent>
          </Sheet>

          <Button variant="ghost" className="relative p-2 hidden md:flex">
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-cringe-pink rounded-full"></span>
          </Button>
          <Button variant="ghost" className="p-2 hidden md:flex">
            <Wallet size={18} />
          </Button>
          <Link to="/dashboard">
            <Button variant="outline" size="sm" className="hidden md:flex items-center gap-2">
              <User size={16} />
              <span>Dashboard</span>
            </Button>
          </Link>
          <ConnectWallet />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

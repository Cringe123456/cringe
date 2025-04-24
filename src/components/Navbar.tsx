
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, User, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-background/80 backdrop-blur-lg border-b border-border flex items-center px-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-black text-2xl bg-gradient-to-r from-cringe-purple to-cringe-pink bg-clip-text text-transparent">
            bigsnout
          </span>
          <span className="bg-cringe-yellow text-black text-xs px-2 py-1 rounded-full font-bold">
            ALPHA
          </span>
        </Link>

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
          <Button variant="ghost" className="relative p-2">
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-cringe-pink rounded-full"></span>
          </Button>
          <Button variant="ghost" className="p-2">
            <Wallet size={18} />
          </Button>
          <Link to="/dashboard">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <User size={16} />
              <span className="hidden sm:inline">Dashboard</span>
            </Button>
          </Link>
          <Button className="bg-gradient-to-r from-cringe-purple to-cringe-pink hover:opacity-90 transition-opacity">
            Connect
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

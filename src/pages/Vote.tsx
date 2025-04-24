import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import CringeCard from '@/components/CringeCard';
import { Button } from '@/components/ui/button';
import { ArrowUp, Filter, Trash2 } from 'lucide-react';

const mockVotingVideos = [
  {
    id: '1',
    videoUrl: 'https://d3en4sxvqufuix.cloudfront.net/videos/cringe1.mp4',
    creator: {
      username: 'cringelord420',
      avatar: 'https://images.unsplash.com/photo-1521119989659-a83eee488004',
      verified: true,
      tokensEarned: 4200,
    },
    title: 'When the cringe hits just right 👌',
    votes: 1423,
    hasVoted: false,
    hasStaked: false,
  },
  {
    id: '2',
    videoUrl: 'https://d3en4sxvqufuix.cloudfront.net/videos/cringe2.mp4',
    creator: {
      username: 'awkwardandy',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
      verified: false,
      tokensEarned: 1890,
    },
    title: 'This is how I enter the club 😎',
    votes: 987,
    hasVoted: true,
    hasStaked: true,
  },
  {
    id: '3',
    videoUrl: 'https://d3en4sxvqufuix.cloudfront.net/videos/cringe3.mp4',
    creator: {
      username: 'memequeen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      verified: true,
      tokensEarned: 7642,
    },
    title: "POV: You're watching my SNOUT earnings go up 📈",
    votes: 3241,
    hasVoted: false,
    hasStaked: false,
  },
  {
    id: '4',
    videoUrl: 'https://d3en4sxvqufuix.cloudfront.net/videos/cringe4.mp4',
    creator: {
      username: 'memeking',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
      verified: false,
      tokensEarned: 1256,
    },
    title: "I'm definitely winning the SNOUT rewards with this one",
    votes: 876,
    hasVoted: false,
    hasStaked: false,
  },
];

type SortOption = 'newest' | 'trending' | 'voted';

const Vote = () => {
  const [videos, setVideos] = useState(mockVotingVideos);
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [showFilters, setShowFilters] = useState(false);
  
  const sortedVideos = [...videos].sort((a, b) => {
    switch (sortOption) {
      case 'trending':
        return b.votes - a.votes;
      case 'voted':
        return (b.hasVoted ? 1 : 0) - (a.hasVoted ? 1 : 0);
      case 'newest':
      default:
        return parseInt(b.id) - parseInt(a.id);
    }
  });
  
  const handleReset = () => {
    setVideos(mockVotingVideos);
    setSortOption('newest');
    setShowFilters(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container pt-24 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-cringe-purple">Vote & Stake</h1>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={16} />
              <span>Filters</span>
            </Button>
            
            <div className="bg-muted rounded-md overflow-hidden flex">
              <Button 
                variant="ghost" 
                size="sm"
                className={sortOption === 'newest' ? 'bg-cringe-purple text-white' : ''}
                onClick={() => setSortOption('newest')}
              >
                Newest
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className={sortOption === 'trending' ? 'bg-cringe-purple text-white' : ''}
                onClick={() => setSortOption('trending')}
              >
                Trending
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className={sortOption === 'voted' ? 'bg-cringe-purple text-white' : ''}
                onClick={() => setSortOption('voted')}
              >
                My Votes
              </Button>
            </div>
          </div>
        </div>
        
        {showFilters && (
          <div className="bg-muted rounded-lg p-4 mb-6 animate-slide-down">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Filters</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-cringe-purple flex items-center gap-1"
                onClick={handleReset}
              >
                <Trash2 size={14} />
                <span>Reset</span>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
              <div className="space-y-1">
                <label className="text-sm">Minimum Votes</label>
                <input 
                  type="range" 
                  min="0" 
                  max="5000" 
                  className="w-full accent-cringe-purple" 
                  onChange={() => {}} 
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm">Creator Type</label>
                <select className="w-full cringe-input text-sm">
                  <option>All Creators</option>
                  <option>Verified Only</option>
                  <option>New Creators</option>
                </select>
              </div>
              
              <div className="space-y-1">
                <label className="text-sm">Content Type</label>
                <select className="w-full cringe-input text-sm">
                  <option>All Content</option>
                  <option>Skits</option>
                  <option>Dances</option>
                  <option>Challenges</option>
                  <option>Memes</option>
                </select>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-gradient-to-r from-cringe-purple to-cringe-pink p-4 rounded-xl text-white mb-8 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg">Your SNOUT Balance</h3>
              <p className="text-sm opacity-80">Stake tokens to earn rewards with creators</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">1,000 SNOUT</div>
              <div className="text-xs opacity-80 flex items-center justify-end gap-1">
                <ArrowUp size={12} className="text-cringe-yellow" />
                <span className="text-cringe-yellow">+14% this week</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedVideos.map((video) => (
            <CringeCard 
              key={video.id}
              {...video}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vote;

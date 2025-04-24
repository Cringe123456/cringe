
import React, { useState } from 'react';
import CreatorInfo from './CreatorInfo';
import { Button } from '@/components/ui/button';
import { Trophy, TrendingUp, Users } from 'lucide-react';

// Mock data for leaderboard
const mockContentLeaders = [
  {
    id: '1',
    title: 'When the cringe hits just right 👌',
    creator: {
      username: 'cringelord420',
      avatar: 'https://images.unsplash.com/photo-1521119989659-a83eee488004',
      verified: true,
    },
    votes: 13423,
    staked: 4200,
  },
  {
    id: '2',
    title: 'POV: You're watching my SNOUT earnings go up 📈',
    creator: {
      username: 'memequeen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      verified: true,
    },
    votes: 9872,
    staked: 3651,
  },
  {
    id: '3',
    title: 'This is how I enter the club 😎',
    creator: {
      username: 'awkwardandy',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
      verified: false,
    },
    votes: 8109,
    staked: 2974,
  },
];

const mockCreatorLeaders = [
  {
    username: 'memequeen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    verified: true,
    tokensEarned: 24680,
    contentCount: 42,
    totalStaked: 8975,
  },
  {
    username: 'cringelord420',
    avatar: 'https://images.unsplash.com/photo-1521119989659-a83eee488004',
    verified: true,
    tokensEarned: 18590,
    contentCount: 37,
    totalStaked: 6214,
  },
  {
    username: 'awkwardandy',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
    verified: false,
    tokensEarned: 12345,
    contentCount: 28,
    totalStaked: 4132,
  },
];

type LeaderboardTab = 'content' | 'creators';

const Leaderboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<LeaderboardTab>('content');
  
  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-cringe-purple">Leaderboard</h2>
        <div className="flex">
          <Button 
            variant="ghost" 
            className={`flex items-center gap-2 ${activeTab === 'content' ? 'bg-cringe-purple/10 text-cringe-purple' : ''}`}
            onClick={() => setActiveTab('content')}
          >
            <Trophy size={18} />
            <span>Top Content</span>
          </Button>
          <Button 
            variant="ghost" 
            className={`flex items-center gap-2 ${activeTab === 'creators' ? 'bg-cringe-purple/10 text-cringe-purple' : ''}`}
            onClick={() => setActiveTab('creators')}
          >
            <Users size={18} />
            <span>Top Creators</span>
          </Button>
        </div>
      </div>
      
      {/* Live stats bar */}
      <div className="flex items-center justify-between p-3 bg-cringe-purple/10 rounded-lg mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp size={18} className="text-cringe-purple" />
          <span className="text-sm font-semibold">Live Stats</span>
        </div>
        <div className="flex gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Total Staked:</span>
            <span className="font-bold ml-1">143,250 SNOUT</span>
          </div>
          <div>
            <span className="text-muted-foreground">Active Users:</span>
            <span className="font-bold ml-1">2,865</span>
          </div>
        </div>
      </div>
      
      {activeTab === 'content' ? (
        <div className="space-y-4">
          {mockContentLeaders.map((content, index) => (
            <div 
              key={content.id} 
              className="flex items-center gap-4 p-4 cringe-card animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`flex items-center justify-center w-10 h-10 rounded-full 
                ${index === 0 ? 'bg-cringe-yellow' : 
                  index === 1 ? 'bg-zinc-300' : 
                  index === 2 ? 'bg-amber-700' : 'bg-muted'} text-black font-bold`}>
                {index + 1}
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold truncate max-w-[200px] sm:max-w-none">
                  {content.title}
                </h3>
                <CreatorInfo 
                  username={content.creator.username} 
                  avatar={content.creator.avatar}
                  verified={content.creator.verified}
                />
              </div>
              
              <div className="flex flex-col items-end">
                <div className="font-bold text-cringe-purple">
                  {content.votes.toLocaleString()} votes
                </div>
                <div className="text-sm text-cringe-yellow">
                  {content.staked.toLocaleString()} SNOUT staked
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {mockCreatorLeaders.map((creator, index) => (
            <div 
              key={creator.username} 
              className="flex items-center gap-4 p-4 cringe-card animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`flex items-center justify-center w-10 h-10 rounded-full 
                ${index === 0 ? 'bg-cringe-yellow' : 
                  index === 1 ? 'bg-zinc-300' : 
                  index === 2 ? 'bg-amber-700' : 'bg-muted'} text-black font-bold`}>
                {index + 1}
              </div>
              
              <div className="flex-1">
                <CreatorInfo 
                  username={creator.username} 
                  avatar={creator.avatar}
                  verified={creator.verified}
                  tokenEarned={creator.tokensEarned}
                  isExpanded={true}
                />
              </div>
              
              <div className="flex flex-col items-end">
                <div className="font-bold text-cringe-purple">
                  {creator.contentCount} videos
                </div>
                <div className="text-sm text-cringe-yellow">
                  {creator.totalStaked.toLocaleString()} SNOUT staked
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;

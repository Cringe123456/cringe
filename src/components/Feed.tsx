
import React, { useState, useEffect } from 'react';
import CringeCard from './CringeCard';

// Mock data for initial feed content
const mockVideos = [
  {
    id: '1',
    videoUrl: 'https://v16-webapp.tiktok.com/0b29c968837ec030754b294167a38870/656b425c/video/tos/useast2a/tos-useast2a-pve-0037-aiso/oUAm6PHAfDTze4QBPsmAeEAXghAsuXoJsHPIJK/',
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
    videoUrl: 'https://v16-webapp.tiktok.com/0b29c968837ec030754b294167a38870/656b425c/video/tos/useast2a/tos-useast2a-pve-0037-aiso/oUAm6PHAfDTze4QBPsmAeEAXghAsuXoJsHPIJK/',
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
    videoUrl: 'https://v16-webapp.tiktok.com/0b29c968837ec030754b294167a38870/656b425c/video/tos/useast2a/tos-useast2a-pve-0037-aiso/oUAm6PHAfDTze4QBPsmAeEAXghAsuXoJsHPIJK/',
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
];

const Feed: React.FC = () => {
  const [videos, setVideos] = useState(mockVideos);
  const [loading, setLoading] = useState(false);
  
  // Simulated infinite scroll
  const loadMoreVideos = () => {
    setLoading(true);
    
    // Simulate API fetch with timeout
    setTimeout(() => {
      const newVideos = [...videos];
      
      // Clone and modify existing videos for demo purposes
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * mockVideos.length);
        const clone = { ...mockVideos[randomIndex] };
        clone.id = `new-${Date.now()}-${i}`;
        clone.votes = Math.floor(Math.random() * 5000);
        clone.creator.tokensEarned = Math.floor(Math.random() * 10000);
        clone.title = `${clone.title} ${i + 1}`;
        newVideos.push(clone);
      }
      
      setVideos(newVideos);
      setLoading(false);
    }, 1500);
  };
  
  // Detect when user scrolls to bottom
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >= 
        document.documentElement.offsetHeight - 100
      ) {
        if (!loading) {
          loadMoreVideos();
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [videos, loading]);

  return (
    <div className="feed-container">
      {videos.map((video) => (
        <div key={video.id} className="feed-item">
          <CringeCard {...video} inFeed={true} />
        </div>
      ))}
      
      {loading && (
        <div className="w-full py-8 flex justify-center">
          <div className="animate-pulse flex space-x-2">
            <div className="h-3 w-3 bg-cringe-purple rounded-full"></div>
            <div className="h-3 w-3 bg-cringe-pink rounded-full"></div>
            <div className="h-3 w-3 bg-cringe-blue rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;

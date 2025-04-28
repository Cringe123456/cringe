
import React, { useState, useEffect } from 'react';
import CringeCard from './CringeCard';
import { toast } from "sonner";

const mockVideos = [
  {
    id: '1',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    creator: {
      username: 'cringelord420',
      avatar: 'https://images.unsplash.com/photo-1521119989659-a83eee488004',
      verified: true,
      tokensEarned: 4200,
    },
    title: 'My dance moves are totally fire 🔥',
    votes: 1423,
    hasVoted: false,
    hasStaked: false,
  },
  {
    id: '2',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    creator: {
      username: 'awkwardandy',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
      verified: false,
      tokensEarned: 1890,
    },
    title: 'Watch my amazing moves 🕺',
    votes: 987,
    hasVoted: true,
    hasStaked: true,
  },
  {
    id: '3',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    creator: {
      username: 'memequeen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      verified: true,
      tokensEarned: 7642,
    },
    title: "Epic fail attempt! 😱",
    votes: 3241,
    hasVoted: false,
    hasStaked: false,
  }
];

const Feed: React.FC = () => {
  const [videos, setVideos] = useState(mockVideos);
  const [loading, setLoading] = useState(false);
  
  const loadMoreVideos = () => {
    setLoading(true);
    
    setTimeout(() => {
      const newVideos = [...videos];
      
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

  useEffect(() => {
    // Show toast notification on component mount
    toast.success("Videos will autoplay as you scroll", {
      position: "top-center",
      duration: 3000,
    });
  }, []);

  return (
    <div className="container mx-auto px-4 pt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div key={video.id} className="feed-item min-h-[600px] w-full">
            <CringeCard {...video} inFeed={true} />
          </div>
        ))}
      </div>
      
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

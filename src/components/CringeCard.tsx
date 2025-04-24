
import React, { useState, useRef } from 'react';
import CreatorInfo from './CreatorInfo';
import VoteStakeButton from './VoteStakeButton';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface CringeCardProps {
  id: string;
  videoUrl: string;
  creator: {
    username: string;
    avatar: string;
    verified: boolean;
    tokensEarned: number;
  };
  title: string;
  votes: number;
  hasVoted?: boolean;
  hasStaked?: boolean;
  inFeed?: boolean;
}

const CringeCard: React.FC<CringeCardProps> = ({
  id,
  videoUrl,
  creator,
  title,
  votes,
  hasVoted = false,
  hasStaked = false,
  inFeed = false
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // This would ideally use IntersectionObserver in a real implementation
  React.useEffect(() => {
    if (inFeed) {
      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play();
          setIsPlaying(true);
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [inFeed]);

  return (
    <div className={`cringe-card flex flex-col ${inFeed ? 'h-full w-full max-w-md mx-auto' : 'w-full'}`}>
      <div className="relative aspect-[9/16] bg-black overflow-hidden">
        <video
          ref={videoRef}
          src={videoUrl}
          className="h-full w-full object-cover"
          loop
          playsInline
          muted={isMuted}
          onClick={togglePlay}
        />
        
        {/* Overlay controls */}
        <div className="absolute inset-0 flex flex-col justify-between p-4">
          <div className="flex justify-between">
            <button 
              onClick={(e) => { e.stopPropagation(); toggleMute(); }}
              className="p-2 bg-black/40 backdrop-blur-sm rounded-full"
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>
          
          <div className="flex justify-between items-end">
            <div className="space-y-2 max-w-[80%]">
              <h3 className="font-bold text-white drop-shadow-md">{title}</h3>
              <CreatorInfo 
                username={creator.username} 
                avatar={creator.avatar}
                verified={creator.verified}
                tokenEarned={creator.tokensEarned}
              />
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <VoteStakeButton 
                contentId={id}
                initialVotes={votes}
                hasVoted={hasVoted}
                hasStaked={hasStaked}
                compact={true}
              />
              
              <button 
                onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                className="p-3 bg-cringe-pink rounded-full"
              >
                {isPlaying ? <Pause size={22} fill="white" /> : <Play size={22} fill="white" />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {!inFeed && (
        <div className="p-4 flex flex-col gap-4">
          <div className="flex justify-between">
            <CreatorInfo 
              username={creator.username} 
              avatar={creator.avatar}
              verified={creator.verified}
              tokenEarned={creator.tokensEarned}
            />
            
            <div className="text-xs bg-cringe-purple/20 text-cringe-purple px-3 py-1 rounded-full">
              Rewards: <span className="font-bold">{(votes * 0.1).toFixed(1)} SNOUT</span>
            </div>
          </div>
          
          <h3 className="text-lg font-bold">{title}</h3>
          
          <VoteStakeButton 
            contentId={id}
            initialVotes={votes}
            hasVoted={hasVoted}
            hasStaked={hasStaked}
          />
        </div>
      )}
    </div>
  );
};

export default CringeCard;

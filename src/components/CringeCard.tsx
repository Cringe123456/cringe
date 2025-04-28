
import React, { useState, useRef, useEffect } from 'react';
import CreatorInfo from './CreatorInfo';
import VoteStakeButton from './VoteStakeButton';
import CommentPopup from './CommentPopup';
import VoteModal from './VoteModal';
import { Play, Pause, Volume2, VolumeX, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';

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
  const [showComments, setShowComments] = useState(false);
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(error => {
              console.error("Video play error:", error);
              toast.error("Couldn't play video. Try clicking to play manually.");
            });
        }
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current && videoLoaded && !videoError) {
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
              playPromise
                .then(() => {
                  setIsPlaying(true);
                })
                .catch(error => {
                  console.error("Auto-play prevented:", error);
                  // We don't show a toast here as it would be too noisy
                });
            }
          } else if (videoRef.current && isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.6 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [videoLoaded, videoError]);

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
    setVideoError(false);
  };

  const handleVideoError = () => {
    console.error(`Failed to load video: ${videoUrl}`);
    setVideoError(true);
    setVideoLoaded(false);
  };

  const handleVoteSubmit = (amount: number) => {
    console.log(`Voted ${amount} tokens on content ${id}`);
    // Here you would typically make an API call to process the vote
  };

  return (
    <div className={`cringe-card flex flex-col ${inFeed ? 'h-full w-full max-w-md mx-auto' : 'w-full'}`}>
      <div className="relative aspect-[9/16] bg-black overflow-hidden">
        <video
          ref={videoRef}
          src={videoUrl}
          className="h-full w-full object-cover feed-video"
          loop
          playsInline
          muted={isMuted}
          onClick={togglePlay}
          onCanPlay={handleVideoLoaded}
          onError={handleVideoError}
          preload="auto"
        />
        
        {videoError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70">
            <p className="text-white text-center p-4">
              Video couldn't be loaded
              <br />
              <span className="text-sm text-gray-400">Try refreshing the page</span>
            </p>
          </div>
        )}
        
        {/* Overlay controls */}
        <div className="absolute inset-0 flex flex-col justify-between p-4">
          <div className="flex justify-between">
            <button 
              onClick={toggleMute}
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
              <Button 
                variant="ghost" 
                size="sm" 
                className="bg-black/40 backdrop-blur-sm text-white"
                onClick={(e) => { e.stopPropagation(); setShowComments(true); }}
              >
                <MessageSquare size={20} />
              </Button>

              <div onClick={(e) => { e.stopPropagation(); setShowVoteModal(true); }}>
                <VoteStakeButton 
                  contentId={id}
                  initialVotes={votes}
                  hasVoted={hasVoted}
                  hasStaked={hasStaked}
                  compact={true}
                />
              </div>
              
              <button 
                onClick={togglePlay}
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
      
      <CommentPopup 
        isOpen={showComments} 
        onClose={() => setShowComments(false)} 
      />

      <VoteModal
        isOpen={showVoteModal}
        onClose={() => setShowVoteModal(false)}
        onVote={handleVoteSubmit}
      />
    </div>
  );
};

export default CringeCard;

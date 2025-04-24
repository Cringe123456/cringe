
import React, { useState } from 'react';
import { ArrowUp, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface VoteStakeButtonProps {
  contentId: string;
  initialVotes: number;
  hasVoted?: boolean;
  hasStaked?: boolean;
  compact?: boolean;
}

const VoteStakeButton: React.FC<VoteStakeButtonProps> = ({
  contentId,
  initialVotes,
  hasVoted = false,
  hasStaked = false,
  compact = false
}) => {
  const [votes, setVotes] = useState(initialVotes);
  const [isVoted, setIsVoted] = useState(hasVoted);
  const [isStaked, setIsStaked] = useState(hasStaked);
  const [isVoting, setIsVoting] = useState(false);
  const [isStaking, setIsStaking] = useState(false);
  
  const handleVote = () => {
    if (isVoting) return;
    
    setIsVoting(true);
    
    // Simulate API call
    setTimeout(() => {
      if (isVoted) {
        setVotes(prev => prev - 1);
        setIsVoted(false);
        toast({
          title: "Vote removed",
          description: "Your vote has been removed"
        });
      } else {
        setVotes(prev => prev + 1);
        setIsVoted(true);
        toast({
          title: "Voted!",
          description: "Your vote has been counted"
        });
      }
      setIsVoting(false);
    }, 500);
  };
  
  const handleStake = () => {
    if (isStaking) return;
    
    setIsStaking(true);
    
    // Simulate API call
    setTimeout(() => {
      if (isStaked) {
        setIsStaked(false);
        toast({
          title: "Stake removed",
          description: "Your stake has been withdrawn"
        });
      } else {
        setIsStaked(true);
        toast({
          title: "Staked!",
          description: "You've staked 10 SNOUT on this content"
        });
      }
      setIsStaking(false);
    }, 500);
  };

  if (compact) {
    return (
      <div className="flex flex-col items-center gap-1">
        <button 
          onClick={handleVote}
          className={`p-2 rounded-full ${isVoted ? 'bg-cringe-pink text-white' : 'bg-muted text-foreground/70'} 
            transition-all hover:scale-105 active:scale-95`}
        >
          <ArrowUp size={20} className={isVoting ? "animate-pulse" : ""} />
        </button>
        <span className="font-bold text-sm">{votes}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleVote}
        disabled={isVoting}
        className={`cringe-button flex items-center justify-center gap-2 ${
          isVoted ? 'from-cringe-pink to-cringe-purple' : ''
        } ${isVoting ? 'opacity-70' : ''}`}
      >
        <ArrowUp size={18} className={isVoting ? "animate-spin" : ""} />
        <span>{isVoted ? 'Voted' : 'Vote'}</span>
        <span className="font-mono font-bold">{votes}</span>
      </button>
      
      <button
        onClick={handleStake}
        disabled={isStaking}
        className={`cringe-button flex items-center justify-center gap-2 ${
          isStaked ? 'from-cringe-yellow to-cringe-blue' : 'from-cringe-blue to-cringe-cyan'
        } ${isStaking ? 'opacity-70' : ''}`}
      >
        <Star size={18} className={isStaking ? "animate-spin" : ""} />
        <span>{isStaked ? 'Staked' : 'Stake 10 SNOUT'}</span>
      </button>
    </div>
  );
};

export default VoteStakeButton;

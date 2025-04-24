
import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { VerifiedIcon } from 'lucide-react';

interface CreatorInfoProps {
  username: string;
  avatar: string;
  verified?: boolean;
  tokenEarned?: number;
  isExpanded?: boolean;
}

const CreatorInfo: React.FC<CreatorInfoProps> = ({ 
  username, 
  avatar, 
  verified = false, 
  tokenEarned = 0,
  isExpanded = false 
}) => {
  return (
    <div className={`flex items-center gap-2 ${isExpanded ? 'flex-col' : ''}`}>
      <Avatar className={`border-2 border-cringe-purple ${isExpanded ? 'h-16 w-16' : 'h-8 w-8'}`}>
        <img src={avatar} alt={username} className="object-cover" />
      </Avatar>
      
      <div className={`flex ${isExpanded ? 'flex-col items-center' : 'items-center'}`}>
        <div className="flex items-center gap-1">
          <span className="font-semibold text-sm">@{username}</span>
          {verified && (
            <span className="text-cringe-blue">
              <VerifiedIcon size={14} />
            </span>
          )}
        </div>
        
        {tokenEarned > 0 && (
          <div className="text-xs text-cringe-yellow flex items-center gap-1">
            <span className="font-mono font-bold">{tokenEarned.toLocaleString()}</span>
            <span>SNOUT</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorInfo;

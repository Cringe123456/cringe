
import React, { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ArrowUp } from 'lucide-react';

interface VoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVote: (amount: number) => void;
}

const VoteModal: React.FC<VoteModalProps> = ({ isOpen, onClose, onVote }) => {
  const [amount, setAmount] = useState('10');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tokenAmount = Number(amount);
    if (tokenAmount > 0) {
      onVote(tokenAmount);
      toast({
        title: "Vote successful!",
        description: `You voted ${tokenAmount} tokens`
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-fade-in">
      <div className="bg-background w-96 rounded-xl p-6 animate-scale-in">
        <h3 className="font-semibold text-xl mb-4">Vote with SNOUT Tokens</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Enter token amount</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              placeholder="Enter amount of tokens"
            />
          </div>
          
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-cringe-purple hover:bg-cringe-purple/90">
              <ArrowUp className="w-4 h-4 mr-1" />
              Vote
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VoteModal;

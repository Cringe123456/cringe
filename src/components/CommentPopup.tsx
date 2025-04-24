
import React from 'react';
import { toast } from '@/hooks/use-toast';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { MessageSquare } from 'lucide-react';

interface CommentPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const CommentPopup: React.FC<CommentPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Comment posted!",
      description: "Your comment has been added successfully"
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center sm:items-center animate-fade-in">
      <div className="bg-background w-full sm:w-96 rounded-t-xl sm:rounded-xl p-4 animate-slide-up">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Comments</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>×</Button>
        </div>
        
        <div className="max-h-[60vh] overflow-y-auto mb-4 space-y-4">
          <div className="flex items-start gap-2">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" className="w-8 h-8 rounded-full" />
            <div>
              <p className="text-sm font-semibold">memequeen</p>
              <p className="text-sm">This is peak cringe! 🤣</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea 
            placeholder="Add a comment..."
            className="resize-none"
            rows={1}
          />
          <Button type="submit" size="sm">
            <MessageSquare className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CommentPopup;

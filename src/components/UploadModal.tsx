
import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Film, X, Upload } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (data: FormData) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onUpload }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if it's a video file
    if (!file.type.startsWith('video/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a video file',
        variant: 'destructive',
      });
      return;
    }
    
    // Size check (max 50MB for example)
    if (file.size > 50 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Video must be less than 50MB',
        variant: 'destructive',
      });
      return;
    }
    
    setVideoFile(file);
    setVideoPreviewUrl(URL.createObjectURL(file));
  };
  
  const clearVideo = () => {
    if (videoPreviewUrl) {
      URL.revokeObjectURL(videoPreviewUrl);
    }
    setVideoFile(null);
    setVideoPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!videoFile) {
      toast({
        title: 'No video selected',
        description: 'Please select a video to upload',
        variant: 'destructive',
      });
      return;
    }
    
    if (!title.trim()) {
      toast({
        title: 'Title required',
        description: 'Please add a title for your video',
        variant: 'destructive',
      });
      return;
    }
    
    setUploading(true);
    
    // Create form data
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('video', videoFile);
    
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onUpload(formData);
      toast({
        title: 'Upload successful!',
        description: 'Your video has been uploaded',
      });
      
      // Reset form
      setTitle('');
      setDescription('');
      clearVideo();
      onClose();
    } catch (error) {
      toast({
        title: 'Upload failed',
        description: 'There was an error uploading your video',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Film className="text-cringe-purple" size={20} />
            Upload Cringe Content
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your cringe a catchy title"
              maxLength={100}
              className="cringe-input"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us about your cringe masterpiece..."
              className="cringe-input resize-none"
              rows={3}
              maxLength={500}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Video</Label>
            
            {videoPreviewUrl ? (
              <div className="relative rounded-md overflow-hidden bg-muted aspect-[9/16] max-h-64 mx-auto">
                <video 
                  src={videoPreviewUrl} 
                  className="w-full h-full object-contain"
                  controls
                />
                <button 
                  type="button"
                  onClick={clearVideo}
                  className="absolute top-2 right-2 p-1 bg-black/50 rounded-full"
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <div 
                className="border-2 border-dashed border-cringe-purple/30 rounded-md p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mx-auto text-cringe-purple/70" size={32} />
                <p className="mt-2 text-sm text-muted-foreground">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  MP4, MOV or WEBM (max 50MB)
                </p>
              </div>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="hidden"
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={uploading}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={uploading || !videoFile}
              className="cringe-button"
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadModal;

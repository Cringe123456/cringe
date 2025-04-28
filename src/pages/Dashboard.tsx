
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Film, TrendingUp, Upload, Star, Wallet, Award } from 'lucide-react';
import CringeCard from '@/components/CringeCard';
import UploadModal from '@/components/UploadModal';
import { toast } from '@/hooks/use-toast';

// Mock data for user's videos
const mockUserVideos = [
  {
    id: '1',
    videoUrl: 'https://v16-webapp.tiktok.com/0b29c968837ec030754b294167a38870/656b425c/video/tos/useast2a/tos-useast2a-pve-0037-aiso/oUAm6PHAfDTze4QBPsmAeEAXghAsuXoJsHPIJK/',
    creator: {
      username: 'yourusername',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
      verified: true,
      tokensEarned: 1423,
    },
    title: 'My best cringe compilation',
    votes: 1423,
    hasVoted: false,
    hasStaked: false,
  },
  {
    id: '2',
    videoUrl: 'https://v16-webapp.tiktok.com/0b29c968837ec030754b294167a38870/656b425c/video/tos/useast2a/tos-useast2a-pve-0037-aiso/oUAm6PHAfDTze4QBPsmAeEAXghAsuXoJsHPIJK/',
    creator: {
      username: 'yourusername',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
      verified: true,
      tokensEarned: 876,
    },
    title: 'Watch this to instantly cringe',
    votes: 876,
    hasVoted: false,
    hasStaked: false,
  },
];

// Mock analytics data
const mockAnalytics = {
  totalEarnings: 2299,
  availableToWithdraw: 1845,
  totalVideos: 2,
  totalVotes: 2299,
  totalStaked: 968,
  recentEarnings: [
    { date: 'Jan 1', amount: 120 },
    { date: 'Jan 2', amount: 145 },
    { date: 'Jan 3', amount: 90 },
    { date: 'Jan 4', amount: 240 },
    { date: 'Jan 5', amount: 320 },
    { date: 'Jan 6', amount: 290 },
    { date: 'Jan 7', amount: 380 },
  ],
};

const Dashboard = () => {
  const [videos, setVideos] = useState(mockUserVideos);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  
  const handleUpload = (formData: FormData) => {
    // In a real app, this would send formData to your backend
    console.log('Upload form data:', formData);
    
    // Create a new mock video
    const newVideo = {
      id: (videos.length + 1).toString(),
      videoUrl: 'https://v16-webapp.tiktok.com/0b29c968837ec030754b294167a38870/656b425c/video/tos/useast2a/tos-useast2a-pve-0037-aiso/oUAm6PHAfDTze4QBPsmAeEAXghAsuXoJsHPIJK/',
      creator: {
        username: 'yourusername',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
        verified: true,
        tokensEarned: 0,
      },
      title: formData.get('title') as string,
      votes: 0,
      hasVoted: false,
      hasStaked: false,
    };
    
    setVideos([newVideo, ...videos]);
  };
  
  const handleWithdraw = () => {
    toast({
      title: "Withdrawal requested",
      description: `${mockAnalytics.availableToWithdraw} SNOUT will be sent to your wallet`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container pt-24 pb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-cringe-purple">Creator Dashboard</h1>
            <p className="text-muted-foreground">Manage your content and track your earnings</p>
          </div>
          
          <Button 
            onClick={() => setIsUploadModalOpen(true)}
            className="cringe-button flex items-center gap-2"
          >
            <Upload size={18} />
            <span>Upload New Content</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="text-cringe-yellow" size={18} />
                Total Earnings
              </CardTitle>
              <CardDescription>All time token earnings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockAnalytics.totalEarnings} SNOUT</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Wallet className="text-cringe-blue" size={18} />
                Available to Withdraw
              </CardTitle>
              <CardDescription>Ready to claim now</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">{mockAnalytics.availableToWithdraw} SNOUT</div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-cringe-blue border-cringe-blue"
                  onClick={handleWithdraw}
                >
                  Withdraw
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Star className="text-cringe-pink" size={18} />
                Staked on Your Content
              </CardTitle>
              <CardDescription>From voters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockAnalytics.totalStaked} SNOUT</div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp size={18} />
              Earnings Overview
            </CardTitle>
            <CardDescription>Your token earnings over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2">
              {mockAnalytics.recentEarnings.map((day, index) => (
                <div key={day.date} className="flex flex-col items-center gap-1 flex-1">
                  <div 
                    className="w-full bg-cringe-purple/60 rounded-t-md transition-all hover:bg-cringe-purple" 
                    style={{ 
                      height: `${(day.amount / 400) * 100}%`,
                      animationDelay: `${index * 100}ms`,
                    }}
                  ></div>
                  <span className="text-xs">{day.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="videos">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="videos" className="flex items-center gap-2">
                <Film size={16} />
                <span>Your Videos</span>
              </TabsTrigger>
              <TabsTrigger value="voted" className="flex items-center gap-2">
                <Star size={16} />
                <span>Voted Content</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="videos">
            {videos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <CringeCard 
                    key={video.id}
                    {...video}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <Film size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="font-bold text-xl mb-2">No videos yet</h3>
                <p className="text-muted-foreground mb-4">
                  Upload your first cringe content and start earning tokens!
                </p>
                <Button 
                  onClick={() => setIsUploadModalOpen(true)}
                  className="cringe-button"
                >
                  Upload Now
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="voted">
            <div className="text-center py-12">
              <Star size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="font-bold text-xl mb-2">No votes yet</h3>
              <p className="text-muted-foreground mb-4">
                Vote on other creators' content to see them here
              </p>
              <Button 
                className="cringe-button"
                onClick={() => window.location.href = '/vote'}
              >
                Browse Content
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <UploadModal 
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUpload}
      />
    </div>
  );
};

export default Dashboard;

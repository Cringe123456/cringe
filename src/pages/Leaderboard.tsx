
import React from 'react';
import Navbar from '@/components/Navbar';
import LeaderboardComp from '@/components/Leaderboard';

const LeaderboardPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container pt-24 pb-16">
        <LeaderboardComp />
      </div>
    </div>
  );
};

export default LeaderboardPage;

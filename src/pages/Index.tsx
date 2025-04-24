
import React from 'react';
import Navbar from '@/components/Navbar';
import Feed from '@/components/Feed';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <Feed />
      </div>
    </div>
  );
};

export default Index;

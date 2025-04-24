
import React from 'react';
import Navbar from '@/components/Navbar';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Hero Section */}
          <section className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-cringe-purple to-cringe-pink bg-clip-text text-transparent">
              bigsnout
            </h1>
            <p className="text-xl text-foreground/80">
              Inspired by the majestic proboscis monkey, bringing you the most cringe-worthy content
            </p>
            <img 
              src="https://i.imgur.com/H6RqHPn.png" 
              alt="Proboscis Monkey"
              className="w-64 h-64 mx-auto rounded-full object-cover"
            />
          </section>

          {/* Features Section */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-center">Platform Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="cringe-card p-6 space-y-4">
                <h3 className="text-xl font-semibold text-cringe-pink">Vote & Earn</h3>
                <p>Vote on the cringiest content and earn SNOUT tokens for participating in the community.</p>
              </div>
              <div className="cringe-card p-6 space-y-4">
                <h3 className="text-xl font-semibold text-cringe-purple">Create & Share</h3>
                <p>Upload your most cringe-worthy content and let the community decide its fate.</p>
              </div>
              <div className="cringe-card p-6 space-y-4">
                <h3 className="text-xl font-semibold text-cringe-yellow">Climb the Ranks</h3>
                <p>Rise through the leaderboard and become a cringe legend in the bigsnout community.</p>
              </div>
            </div>
          </section>

          {/* Reward Mechanism */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-center">How Rewards Work</h2>
            <div className="cringe-card p-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-cringe-purple">1. Stake to Vote</h3>
                  <p>Use your SNOUT tokens to vote on content. The more you stake, the more weight your vote carries.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-cringe-pink">2. Earn from Engagement</h3>
                  <p>When your content receives votes or engagements, you earn a portion of the staked tokens.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-cringe-yellow">3. Daily Rewards</h3>
                  <p>Top creators and active voters receive daily SNOUT token rewards from the community pool.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;

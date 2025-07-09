import React, { useState, useEffect } from 'react';
import { Check, X, Twitter, MessageCircle, Users, Link2, Mail, Loader2, ExternalLink, Trophy, Zap, Target, Award } from 'lucide-react';
import { badgeService } from '../services/supabase';
import './BadgeLanding.css';

const BadgeLanding = () => {
  const [email, setEmail] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [tweetUrl, setTweetUrl] = useState('');
  const [tasks, setTasks] = useState({
    email: false,
    twitter: false,
    telegram: false,
    discord: false,
    tweet: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isClaimLoading, setIsClaimLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const completedTasks = Object.values(tasks).filter(Boolean).length;
  const totalTasks = Object.keys(tasks).length;
  const progress = (completedTasks / totalTasks) * 100;
  const allTasksComplete = completedTasks === totalTasks;

  const handleEmailSubmit = async () => {
    if (!email) return;
    
    setIsLoading(true);
    try {
      await badgeService.registerUser(email);
      setUserEmail(email);
      setTasks(prev => ({ ...prev, email: true }));
      setIsRegistered(true);
    } catch (error) {
      console.error('Registration error:', error);
      alert('Error registering. Please try again.');
    }
    setIsLoading(false);
  };

  const handleTaskVerification = async (taskName) => {
    setIsLoading(true);
    try {
      await badgeService.updateTaskProgress(userEmail, taskName);
      setTasks(prev => ({ ...prev, [taskName]: true }));
    } catch (error) {
      console.error('Verification error:', error);
      alert('Error verifying task. Please try again.');
    }
    setIsLoading(false);
  };

  const handleTweetSubmit = async () => {
    if (!tweetUrl) return;
    
    setIsLoading(true);
    try {
      await badgeService.submitTweet(userEmail, tweetUrl);
      setTasks(prev => ({ ...prev, tweet: true }));
    } catch (error) {
      console.error('Tweet submission error:', error);
      alert('Error submitting tweet. Please try again.');
    }
    setIsLoading(false);
  };

  const handleClaimBadge = async () => {
    setIsClaimLoading(true);
    try {
      await badgeService.claimBadge(userEmail);
      setShowSuccess(true);
    } catch (error) {
      console.error('Claim badge error:', error);
      alert('Error claiming badge. Please try again.');
    }
    setIsClaimLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a14] text-white p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#15BFC2] rounded-full blur-[120px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#7D40B6] rounded-full blur-[120px] opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#CA6B0D] rounded-full blur-[120px] opacity-10 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#15BFC2] to-[#7D40B6] rounded-xl flex items-center justify-center">
              <span className="text-2xl font-bold">n</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">IOPn</h1>
              <p className="text-gray-400 text-sm">Early Badge Landing Page</p>
            </div>
          </div>
          {isRegistered && (
            <div className="bg-[#1a1a2e] rounded-xl px-4 py-2">
              <p className="text-sm text-gray-400">Progress</p>
              <p className="text-xl font-bold text-[#15BFC2]">{completedTasks}/{totalTasks}</p>
            </div>
          )}
        </div>

        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2">Welcome, Early Adopter! 🎯</h2>
          <p className="text-gray-400 text-lg">Complete all tasks to claim your exclusive IOPn badge</p>
        </div>

        {!isRegistered ? (
          // Email Registration Section
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-[#7D40B6]/20 to-[#15BFC2]/20 rounded-2xl p-8 border border-[#7D40B6]/30">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-[#CA6B0D]" />
                  Start Your Journey
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="enter@youremail.com"
                      className="w-full px-4 py-3 bg-[#0a0a14]/50 border border-[#7D40B6]/30 rounded-xl focus:outline-none focus:border-[#15BFC2] transition-colors"
                    />
                  </div>
                  <button
                    onClick={handleEmailSubmit}
                    disabled={isLoading || !email}
                    className="w-full py-4 bg-gradient-to-r from-[#7D40B6] to-[#15BFC2] hover:from-[#9050c6] hover:to-[#25cfd2] rounded-xl font-semibold transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Zap className="w-5 h-5 mr-2" />
                        Pre-Register Now
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Side Stats */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-[#CB121C]/20 to-[#CA6B0D]/20 rounded-2xl p-6 border border-[#CB121C]/30">
                <div className="flex items-center justify-between mb-2">
                  <Award className="w-8 h-8 text-[#CA6B0D]" />
                  <span className="text-sm text-gray-400">Limited Edition</span>
                </div>
                <p className="text-3xl font-bold">Badge #1</p>
                <p className="text-sm text-gray-400 mt-1">First 1000 supporters only</p>
              </div>
              <div className="bg-gradient-to-br from-[#1F2750]/30 to-[#59443C]/30 rounded-2xl p-6 border border-[#1F2750]/40">
                <p className="text-sm text-gray-400 mb-1">Time Remaining</p>
                <p className="text-2xl font-bold text-[#15BFC2]">48:00:00</p>
              </div>
            </div>
          </div>
        ) : (
          // Task Dashboard
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Progress Overview */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-[#15BFC2]/20 to-[#15BFC2]/10 rounded-xl p-4 border border-[#15BFC2]/30">
                <p className="text-sm text-gray-300 mb-1">Total Progress</p>
                <p className="text-2xl font-bold text-[#15BFC2]">{Math.round(progress)}%</p>
              </div>
              <div className="bg-gradient-to-br from-[#7D40B6]/20 to-[#7D40B6]/10 rounded-xl p-4 border border-[#7D40B6]/30">
                <p className="text-sm text-gray-300 mb-1">Tasks Complete</p>
                <p className="text-2xl font-bold text-[#7D40B6]">{completedTasks}/{totalTasks}</p>
              </div>
              <div className="bg-gradient-to-br from-[#CA6B0D]/20 to-[#CA6B0D]/10 rounded-xl p-4 border border-[#CA6B0D]/30">
                <p className="text-sm text-gray-300 mb-1">Badge Rank</p>
                <p className="text-2xl font-bold text-[#CA6B0D]">#247</p>
              </div>
              <div className="bg-gradient-to-br from-[#CB121C]/20 to-[#CB121C]/10 rounded-xl p-4 border border-[#CB121C]/30">
                <p className="text-sm text-gray-300 mb-1">Time Left</p>
                <p className="text-2xl font-bold text-[#CB121C]">47:45:32</p>
              </div>
            </div>

            {/* Main Task Panel */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-[#1a1a2e] rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#15BFC2]" />
                  Complete Your Tasks
                </h3>
                
                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="w-full bg-[#0a0a14] rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#7D40B6] via-[#15BFC2] to-[#CA6B0D] transition-all duration-700 ease-out rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Tasks */}
                <div className="space-y-3">
                  {/* Email Task */}
                  <div className={`rounded-xl p-4 flex items-center justify-between transition-all ${tasks.email ? 'bg-gradient-to-r from-[#15BFC2]/10 to-transparent border border-[#15BFC2]/30' : 'bg-[#0a0a14] border border-gray-800'}`}>
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tasks.email ? 'bg-[#15BFC2]/20' : 'bg-gray-800'}`}>
                        <Mail className={`w-5 h-5 ${tasks.email ? 'text-[#15BFC2]' : 'text-gray-400'}`} />
                      </div>
                      <div>
                        <p className="font-medium">Email Registered</p>
                        <p className="text-xs text-gray-400">+50 REP</p>
                      </div>
                    </div>
                    <Check className={`w-5 h-5 ${tasks.email ? 'text-[#15BFC2]' : 'text-gray-600'}`} />
                  </div>

                  {/* Twitter Task */}
                  <div className={`rounded-xl p-4 flex items-center justify-between transition-all ${tasks.twitter ? 'bg-gradient-to-r from-[#7D40B6]/10 to-transparent border border-[#7D40B6]/30' : 'bg-[#0a0a14] border border-gray-800'}`}>
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tasks.twitter ? 'bg-[#7D40B6]/20' : 'bg-gray-800'}`}>
                        <Twitter className={`w-5 h-5 ${tasks.twitter ? 'text-[#7D40B6]' : 'text-gray-400'}`} />
                      </div>
                      <div>
                        <p className="font-medium">Follow IOPn on X</p>
                        <p className="text-xs text-gray-400">+100 REP</p>
                      </div>
                    </div>
                    {tasks.twitter ? (
                      <Check className="w-5 h-5 text-[#7D40B6]" />
                    ) : (
                      <button
                        onClick={() => handleTaskVerification('twitter')}
                        disabled={isLoading}
                        className="px-4 py-2 bg-gradient-to-r from-[#7D40B6] to-[#9050c6] hover:from-[#9050c6] hover:to-[#a060d6] rounded-lg text-sm font-medium transition-all disabled:opacity-50"
                      >
                        Verify
                      </button>
                    )}
                  </div>

                  {/* Telegram Task */}
                  <div className={`rounded-xl p-4 flex items-center justify-between transition-all ${tasks.telegram ? 'bg-gradient-to-r from-[#15BFC2]/10 to-transparent border border-[#15BFC2]/30' : 'bg-[#0a0a14] border border-gray-800'}`}>
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tasks.telegram ? 'bg-[#15BFC2]/20' : 'bg-gray-800'}`}>
                        <MessageCircle className={`w-5 h-5 ${tasks.telegram ? 'text-[#15BFC2]' : 'text-gray-400'}`} />
                      </div>
                      <div>
                        <p className="font-medium">Join Telegram</p>
                        <p className="text-xs text-gray-400">+100 REP</p>
                      </div>
                    </div>
                    {tasks.telegram ? (
                      <Check className="w-5 h-5 text-[#15BFC2]" />
                    ) : (
                      <button
                        onClick={() => handleTaskVerification('telegram')}
                        disabled={isLoading}
                        className="px-4 py-2 bg-gradient-to-r from-[#15BFC2] to-[#25cfd2] hover:from-[#25cfd2] hover:to-[#35dfe2] rounded-lg text-sm font-medium transition-all disabled:opacity-50"
                      >
                        Verify
                      </button>
                    )}
                  </div>

                  {/* Discord Task */}
                  <div className={`rounded-xl p-4 flex items-center justify-between transition-all ${tasks.discord ? 'bg-gradient-to-r from-[#CA6B0D]/10 to-transparent border border-[#CA6B0D]/30' : 'bg-[#0a0a14] border border-gray-800'}`}>
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tasks.discord ? 'bg-[#CA6B0D]/20' : 'bg-gray-800'}`}>
                        <Users className={`w-5 h-5 ${tasks.discord ? 'text-[#CA6B0D]' : 'text-gray-400'}`} />
                      </div>
                      <div>
                        <p className="font-medium">Join Discord</p>
                        <p className="text-xs text-gray-400">+100 REP</p>
                      </div>
                    </div>
                    {tasks.discord ? (
                      <Check className="w-5 h-5 text-[#CA6B0D]" />
                    ) : (
                      <button
                        onClick={() => handleTaskVerification('discord')}
                        disabled={isLoading}
                        className="px-4 py-2 bg-gradient-to-r from-[#CA6B0D] to-[#da7b1d] hover:from-[#da7b1d] hover:to-[#ea8b2d] rounded-lg text-sm font-medium transition-all disabled:opacity-50"
                      >
                        Verify
                      </button>
                    )}
                  </div>

                  {/* Tweet Task */}
                  <div className={`rounded-xl p-4 transition-all ${tasks.tweet ? 'bg-gradient-to-r from-[#CB121C]/10 to-transparent border border-[#CB121C]/30' : 'bg-[#0a0a14] border border-gray-800'}`}>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tasks.tweet ? 'bg-[#CB121C]/20' : 'bg-gray-800'}`}>
                        <Link2 className={`w-5 h-5 ${tasks.tweet ? 'text-[#CB121C]' : 'text-gray-400'}`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Tweet Badge Link</p>
                        <p className="text-xs text-gray-400">+150 REP</p>
                      </div>
                      {tasks.tweet && <Check className="w-5 h-5 text-[#CB121C]" />}
                    </div>
                    {!tasks.tweet && (
                      <div className="flex space-x-2 ml-13">
                        <input
                          type="url"
                          value={tweetUrl}
                          onChange={(e) => setTweetUrl(e.target.value)}
                          placeholder="https://x.com/..."
                          className="flex-1 px-3 py-2 bg-[#0a0a14] border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-[#CB121C]/50"
                        />
                        <button
                          onClick={handleTweetSubmit}
                          disabled={isLoading || !tweetUrl}
                          className="px-4 py-2 bg-gradient-to-r from-[#CB121C] to-[#db222c] hover:from-[#db222c] hover:to-[#eb323c] rounded-lg text-sm font-medium transition-all disabled:opacity-50"
                        >
                          Submit
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Claim Button */}
              <button
                onClick={handleClaimBadge}
                disabled={!allTasksComplete || isClaimLoading}
                className={`w-full py-5 rounded-2xl font-bold text-lg transition-all transform flex items-center justify-center ${
                  allTasksComplete 
                    ? 'bg-gradient-to-r from-[#7D40B6] via-[#15BFC2] to-[#CA6B0D] hover:scale-[1.02] text-white shadow-lg shadow-[#15BFC2]/30' 
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isClaimLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    <Trophy className="w-6 h-6 mr-2" />
                    Claim Your Badge
                  </>
                )}
              </button>
            </div>

            {/* Side Panel */}
            <div className="space-y-4">
              {/* Quick Stats */}
              <div className="bg-[#1a1a2e] rounded-2xl p-6">
                <h4 className="text-lg font-bold mb-4">Quick Stats</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Daily Average</span>
                    <span className="font-bold text-[#15BFC2]">35 REP/day</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Percentile</span>
                    <span className="font-bold text-[#7D40B6]">Top 10%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Current Streak</span>
                    <span className="font-bold text-[#CA6B0D]">7 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Next Rank</span>
                    <span className="font-bold text-[#CB121C]">300 REP to #4</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-[#1a1a2e] rounded-2xl p-6">
                <h4 className="text-lg font-bold mb-4">Recent Activity</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#7D40B6] to-[#15BFC2] flex items-center justify-center text-xs font-bold">
                      D
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">DemoUser earned +50 REP</p>
                      <p className="text-xs text-gray-400">30m ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#15BFC2] to-[#CA6B0D] flex items-center justify-center text-xs font-bold">
                      C
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">CryptoKing earned +100 REP</p>
                      <p className="text-xs text-gray-400">2h ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <div className="flex justify-center space-x-6">
            <a href="#" className="hover:text-[#15BFC2] transition-colors flex items-center gap-1">
              <ExternalLink className="w-3 h-3" />
              IOPn Website
            </a>
            <a href="#" className="hover:text-[#7D40B6] transition-colors flex items-center gap-1">
              <Twitter className="w-3 h-3" />
              Twitter
            </a>
            <a href="#" className="hover:text-[#CA6B0D] transition-colors flex items-center gap-1">
              <MessageCircle className="w-3 h-3" />
              Telegram
            </a>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a2e] border border-[#15BFC2]/30 rounded-2xl p-8 max-w-md w-full text-center transform scale-100 shadow-2xl shadow-[#15BFC2]/20">
            <div className="w-20 h-20 bg-gradient-to-r from-[#7D40B6] via-[#15BFC2] to-[#CA6B0D] rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#15BFC2] to-[#7D40B6] bg-clip-text text-transparent">
              Congratulations!
            </h3>
            <p className="text-gray-300 mb-2">You've successfully claimed your</p>
            <p className="text-xl font-bold text-[#CA6B0D] mb-6">IOPn Early Supporter Badge #247</p>
            <button
              onClick={() => setShowSuccess(false)}
              className="px-8 py-3 bg-gradient-to-r from-[#7D40B6] to-[#15BFC2] hover:from-[#9050c6] hover:to-[#25cfd2] rounded-xl font-medium transition-all transform hover:scale-[1.02]"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BadgeLanding;
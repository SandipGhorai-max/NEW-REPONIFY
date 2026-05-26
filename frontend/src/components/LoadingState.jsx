import React, { useState, useEffect } from 'react'

const LoadingState = ({ onComplete }) => {
  const steps = [
    "Fetching repository structure...",
    "Analyzing tech stack...",
    "Scanning dependencies...",
    "Checking for vulnerabilities...",
    "Generating setup guide..."
  ];
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  useEffect(() => {
    if (currentStepIndex < steps.length) {
      const t = setTimeout(() => setCurrentStepIndex(prev => prev + 1), 400);
      return () => clearTimeout(t);
    } else {
      setTimeout(onComplete, 500);
    }
  }, [currentStepIndex, onComplete, steps.length]);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 pb-24">
      {/* Skeleton — overview card */}
      <div className="card-glass rounded-2xl p-6">
        <div className="shimmer h-3 w-24 rounded-full mb-5"/>
        <div className="shimmer h-6 w-52 rounded mb-3"/>
        <div className="shimmer h-3 w-full rounded mb-2"/>
        <div className="shimmer h-3 w-4/5 rounded mb-5"/>
        <div className="flex gap-2">
          {[0,1,2].map(i => <div key={i} className="shimmer h-5 w-16 rounded-full"/>)}
        </div>
      </div>
      {/* Skeleton — two-column */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[0,1].map(i => (
          <div key={i} className="card-glass rounded-2xl p-6">
            <div className="shimmer h-3 w-28 rounded-full mb-5"/>
            {[0,1,2].map(j => <div key={j} className="shimmer h-14 rounded-xl mb-2"/>)}
          </div>
        ))}
      </div>
      {/* Skeleton — setup steps */}
      <div className="card-glass rounded-2xl p-6">
        <div className="shimmer h-3 w-24 rounded-full mb-6"/>
        {[0,1,2].map(i => (
          <div key={i} className="flex gap-4 mb-5">
            <div className="shimmer w-8 h-8 rounded-full flex-shrink-0"/>
            <div className="flex-1">
              <div className="shimmer h-3 w-40 rounded mb-2"/>
              <div className="shimmer h-12 rounded-xl"/>
            </div>
          </div>
        ))}
      </div>
      {/* Status line */}
      <div className="flex items-center gap-2 px-1 text-xs text-zinc-600 font-mono">
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"/>
        {steps[Math.min(currentStepIndex, steps.length - 1)]}
      </div>
    </div>
  );
};

export default LoadingState

import React, { useState } from 'react'
import { Icons, osOptions, expOptions } from './Icons'

const OnboardingModal = ({ onComplete }) => {
  const [os, setOs] = useState('Windows');
  const [exp, setExp] = useState('beginner');

  const handleGo = () => {
    localStorage.setItem('reponify_os', os);
    localStorage.setItem('reponify_experience', exp);
    localStorage.setItem('reponify_onboarded', 'true');
    onComplete(os, exp);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="card-glass rounded-2xl w-full max-w-2xl p-8 transform transition-all shadow-2xl">
        <h2 className="text-2xl font-bold text-zinc-50 mb-2">Welcome to Reponify</h2>
        <p className="text-zinc-400 mb-8">Let's set up your profile so we can generate the right commands for you.</p>

        <div className="mb-8">
          <div className="text-sm font-semibold text-zinc-300 uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="bg-cyan-500/20 text-cyan-400 w-5 h-5 rounded flex items-center justify-center text-xs">1</span> 
            Operating System
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {osOptions.map(opt => (
              <button 
                key={opt.id} 
                onClick={() => setOs(opt.id)}
                className={`flex flex-col items-center justify-center p-5 rounded-xl border transition-all ${
                  os === opt.id ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]' : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800'
                }`}
              >
                {React.createElement(Icons[opt.icon], { className: `mb-3 transition-colors ${os === opt.id ? 'text-cyan-400' : 'text-zinc-500'}` })}
                <span className="font-medium text-sm">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <div className="text-sm font-semibold text-zinc-300 uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="bg-cyan-500/20 text-cyan-400 w-5 h-5 rounded flex items-center justify-center text-xs">2</span> 
            Experience Level
          </div>
          <div className="grid grid-cols-1 gap-3">
            {expOptions.map(opt => (
              <button 
                key={opt.id} 
                onClick={() => setExp(opt.id)}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                  exp === opt.id ? 'border-cyan-500 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.15)]' : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-800'
                }`}
              >
                <div className={`p-2.5 rounded-lg transition-colors ${exp === opt.id ? 'bg-cyan-500/20 text-cyan-400' : 'bg-zinc-800 text-zinc-500'}`}>
                  {React.createElement(Icons[opt.icon], { className: "w-6 h-6" })}
                </div>
                <div>
                  <div className={`font-medium mb-1 transition-colors ${exp === opt.id ? 'text-cyan-400' : 'text-zinc-200'}`}>{opt.label}</div>
                  <div className="text-xs text-zinc-500">{opt.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={handleGo}
          className="w-full btn-primary rounded-xl py-3.5 text-base flex items-center justify-center gap-2 mt-4 font-semibold"
        >
          Let's Go
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>
      </div>
    </div>
  );
};

export default OnboardingModal

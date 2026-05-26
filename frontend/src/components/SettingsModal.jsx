import React, { useState } from 'react'
import { Icons, osOptions, expOptions } from './Icons'

const SettingsModal = ({ os, exp, onClose, onSave }) => {
  const [sOs, setSOs] = useState(os);
  const [sExp, setSExp] = useState(exp);

  const handleSave = () => {
    localStorage.setItem('reponify_os', sOs);
    localStorage.setItem('reponify_experience', sExp);
    onSave(sOs, sExp);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="card-glass rounded-2xl w-full max-w-md p-6 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 transition-colors p-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <h2 className="text-xl font-bold text-zinc-50 mb-6 flex items-center gap-2">
          <Icons.Settings className="text-cyan-500" /> Settings
        </h2>
        
        <div className="mb-6">
          <div className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">Operating System</div>
          <div className="grid grid-cols-3 gap-2">
            {osOptions.map(opt => (
              <button 
                key={opt.id} onClick={() => setSOs(opt.id)}
                className={`py-2.5 px-2 text-xs rounded-lg border flex flex-col items-center gap-2 transition-all ${sOs === opt.id ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400' : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800'}`}
              >
                {React.createElement(Icons[opt.icon], { className: `w-5 h-5 ${sOs === opt.id ? 'text-cyan-400' : 'text-zinc-500'}` })}
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <div className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">Experience Level</div>
          <div className="space-y-2">
            {expOptions.map(opt => (
              <button 
                key={opt.id} onClick={() => setSExp(opt.id)}
                className={`w-full py-3 px-4 text-sm rounded-lg border flex items-center gap-3 transition-all ${sExp === opt.id ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400' : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800'}`}
              >
                <div className={sExp === opt.id ? 'text-cyan-400' : 'text-zinc-500'}>
                  {React.createElement(Icons[opt.icon], { className: "w-5 h-5" })}
                </div>
                <div className="flex-1 text-left">{opt.label}</div>
              </button>
            ))}
          </div>
        </div>

        <button onClick={handleSave} className="w-full btn-primary rounded-xl py-3 text-sm font-medium">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SettingsModal

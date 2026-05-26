import React, { useState } from 'react'
import { CopyButton } from './ResultsDashboard'

const PrerequisiteCard = ({ req }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);

  const hasContent = !!(req.install_command || req.verify_command);

  const toggle = () => {
    if (hasContent) {
      setIsOpen(!isOpen);
      setHasClicked(true);
    }
  };

  return (
    <div 
      className={`flex flex-col rounded-xl bg-zinc-950/60 border border-zinc-800 transition-colors ${hasContent ? 'cursor-pointer hover:bg-zinc-900/40' : ''}`}
      onClick={toggle}
    >
      <div className="p-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-2.5 min-w-0">
            <div className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${req.status==='required'?'bg-cyan-400':'bg-amber-400'}`}/>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                <div className="text-sm font-medium text-zinc-200 truncate">
                  {req.name} <span className="text-zinc-500 font-mono text-xs">{req.version}</span>
                </div>
                {!req.kb_verified && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 whitespace-nowrap">⚠ May vary</span>
                )}
              </div>
              <div className="text-xs text-zinc-500">{req.why}</div>
              {hasContent && !hasClicked && (
                <div className="text-[10px] text-zinc-500 mt-1">Click to see install commands</div>
              )}
            </div>
          </div>
          {req.download_url && (
            <a href={req.download_url} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="text-cyan-500 hover:text-cyan-400 ml-2 mt-1 flex-shrink-0">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          )}
        </div>
      </div>
      {hasContent && (
        <div className={`acc-body ${isOpen ? 'open' : ''}`}>
          <div className="px-4 pb-4 bg-zinc-900/40 border-l-2 border-cyan-500/30 ml-4 mr-2 mb-2 rounded-r-xl">
            <div className="space-y-3 pt-3">
              {req.install_command && (
                <div className="flex flex-col gap-1.5">
                  <span className="text-zinc-400 text-xs font-semibold">Install</span>
                  <div className="bg-zinc-950 rounded-lg border border-zinc-800 flex items-start justify-between group">
                    <code className="p-3 text-zinc-300 font-mono text-xs overflow-x-auto flex-1 whitespace-pre-wrap">{req.install_command}</code>
                    <div className="p-1.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      <CopyButton text={req.install_command}/>
                    </div>
                  </div>
                </div>
              )}
              {req.verify_command && (
                <div className="flex flex-col gap-1.5">
                  <span className="text-zinc-400 text-xs font-semibold">Verify</span>
                  <div className="bg-zinc-950 rounded-lg border border-zinc-800 flex items-start justify-between group">
                    <code className="p-3 text-zinc-300 font-mono text-xs overflow-x-auto flex-1 whitespace-pre-wrap">{req.verify_command}</code>
                    <div className="p-1.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      <CopyButton text={req.verify_command}/>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrerequisiteCard

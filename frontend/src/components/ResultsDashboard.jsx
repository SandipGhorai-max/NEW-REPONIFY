import React, { useState, useEffect, useRef } from 'react'
import PrerequisiteCard from './PrerequisiteCard'

export const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} title="Copy" className={`copy-btn flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono flex-shrink-0 ${
      copied ? 'bg-emerald-500/15 text-emerald-400' : 'bg-zinc-800 text-zinc-500'
    }`}>
      {copied
        ? <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>Copied</>
        : <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>Copy</>
      }
    </button>
  );
};

const ResultsDashboard = ({ data }) => {
  const [openError, setOpenError] = useState(null);

  const useReveal = () => {
    const ref = useRef(null);
    useEffect(() => {
      const el = ref.current; if (!el) return;
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect(); } }, { threshold: 0.08 });
      obs.observe(el); return () => obs.disconnect();
    }, []);
    return ref;
  };

  const Label = ({ icon, text }) => (
    <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono uppercase tracking-widest mb-4">
      <span className="text-cyan-500">{icon}</span>{text}
    </div>
  );

  const scoreColor = data.dependency_health.score > 80 ? '#10b981' : data.dependency_health.score > 50 ? '#f59e0b' : '#ef4444';

  // Icons
  const Pkg  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16.5 9.4 7.55 4.24"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><line x1="12" y1="22" x2="12" y2="12"/></svg>;
  const Bolt = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
  const Shld = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
  const Term = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>;
  const Lyrs = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
  const Bug  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="6" width="8" height="14" rx="4"/><path d="m19 7-3 2"/><path d="m5 7 3 2"/><path d="m19 19-3-2"/><path d="m5 19 3-2"/><path d="M20 13h-4"/><path d="M4 13h4"/></svg>;
  const Chev = ({open}) => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{transform:open?'rotate(180deg)':'none',transition:'transform 0.3s'}}><polyline points="6 9 12 15 18 9"/></svg>;

  const r1 = useReveal(), r2 = useReveal(), r3 = useReveal(), r4 = useReveal(), r5 = useReveal(), r6 = useReveal();

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 pb-24">

      {/* Card 1 — Overview */}
      <div ref={r1} className="reveal card-glass rounded-2xl p-6">
        <Label icon={<Pkg/>} text="Repository"/>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <h2 className="text-xl font-semibold font-mono text-zinc-50">{data.repo_overview.name}</h2>
          <span className="text-amber-400 text-sm font-mono">★ {data.repo_overview.stars.toLocaleString()}</span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">{data.repo_overview.language}</span>
        </div>
        <p className="text-zinc-400 text-sm leading-relaxed max-w-[65ch] mb-4">{data.repo_overview.description}</p>
        <div className="flex flex-wrap gap-2">
          {data.repo_overview.topics.slice(0,8).map(t => (
            <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">{t}</span>
          ))}
        </div>
      </div>

      {/* Cards 2+3 — 2-col */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Prerequisites */}
        <div ref={r2} className="reveal card-glass rounded-2xl p-6" style={{transitionDelay:'80ms'}}>
          <Label icon={<Bolt/>} text="Prerequisites"/>
          <div className="space-y-2">
            {data.prerequisites.map(req => (
              <PrerequisiteCard key={req.name} req={req} />
            ))}
          </div>
        </div>

        {/* Dependency Health */}
        <div ref={r3} className="reveal card-glass rounded-2xl p-6" style={{transitionDelay:'140ms'}}>
          <Label icon={<Shld/>} text="Dependency Health"/>
          <div className="flex items-center gap-6 mb-5">
            <div className="relative w-20 h-20 flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="38" fill="none" stroke="#27272a" strokeWidth="8"/>
                <circle cx="50" cy="50" r="38" fill="none" stroke={scoreColor} strokeWidth="8"
                  strokeDasharray={`${data.dependency_health.score * 2.39} 239`} strokeLinecap="round"/>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-zinc-50">{data.dependency_health.score}</span>
                <span className="text-xs text-zinc-500">/100</span>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"/><span className="text-zinc-300">{data.dependency_health.healthy} healthy</span></div>
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-500"/><span className="text-zinc-300">{data.dependency_health.warnings} warnings</span></div>
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"/><span className="text-zinc-300">{data.dependency_health.critical} critical</span></div>
            </div>
          </div>
          <div className="space-y-1.5">
            {data.dependency_health.details.slice(0,4).map(d => (
              <div key={d.name} className="flex items-center justify-between text-xs py-1.5 border-b border-zinc-800/60 last:border-0">
                <span className="font-mono text-zinc-400">{d.name}</span>
                <span className={d.status==='healthy'?'text-emerald-400':d.status==='warning'?'text-amber-400':'text-red-400'}>{d.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card 4 — Setup Guide */}
      <div ref={r4} className="reveal card-glass rounded-2xl p-6 border-cyan-500/20 relative overflow-hidden" style={{transitionDelay:'200ms'}}>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"/>
        <Label icon={<Term/>} text="Setup Guide"/>

        {/* Direct Installer Banner */}
        {data.has_direct_installer && data.installer_links && data.installer_links.length > 0 && (
          <div className="mb-6 rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-5 border-l-4 border-l-cyan-500">
            <div className="flex items-center gap-2 mb-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              <span className="text-sm font-semibold text-cyan-400">Direct Download Available</span>
            </div>
            <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
              <span className="text-zinc-200 font-medium">{data.repo_overview.name}</span> provides an official installer for your operating system. This is the easiest way to get started.
            </p>
            {data.installer_links.map((link, idx) => (
              <div key={idx} className="mb-2 last:mb-0">
                <a
                  href={link.download_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-500 text-zinc-950 font-semibold text-sm hover:bg-cyan-400 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Download for {link.platform === 'windows' ? 'Windows' : link.platform === 'macos' ? 'macOS' : 'Linux'}
                </a>
                <span className="ml-3 text-xs text-zinc-500 font-mono">{link.filename} · Official Release</span>
              </div>
            ))}
            <p className="text-xs text-zinc-500 mt-4">
              Prefer to install from source? See the commands below ↓
            </p>
          </div>
        )}

        <div className="space-y-6">
          {data.setup_steps.map((step, i) => (
            <div key={i} className="relative flex gap-4">
              {i !== data.setup_steps.length - 1 && (
                <div className="absolute left-4 top-9 w-px h-full bg-zinc-800"/>
              )}
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-mono text-xs z-10">
                {step.step_number}
              </div>
              <div className="flex-1 pt-1 pb-2">
                <h3 className="text-sm font-semibold text-zinc-200 mb-2">{step.title}</h3>
                {step.download_url ? (
                  <a href={step.download_url} target="_blank" rel="noreferrer"
                     className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 text-zinc-950 font-semibold text-sm hover:bg-cyan-400 transition-colors mb-2.5"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Download
                  </a>
                ) : (
                  <div className="bg-zinc-950 rounded-xl border border-zinc-800 flex items-start justify-between mb-2.5 group">
                    <pre className="p-4 text-cyan-400 font-mono text-sm overflow-x-auto flex-1 whitespace-pre-wrap"><code>{step.command}</code></pre>
                    <div className="p-2 pt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <CopyButton text={step.command}/>
                    </div>
                  </div>
                )}
                <p className="text-xs text-zinc-500 mb-1"><span className="text-zinc-400">What it does:</span> {step.what_it_does}</p>
                <p className="text-xs text-cyan-600">{step.what_you_learn}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Card 5 — Tech Stack */}
      <div ref={r5} className="reveal card-glass rounded-2xl p-6" style={{transitionDelay:'260ms'}}>
        <Label icon={<Lyrs/>} text="Tech Stack"/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {data.tech_stack.slice(0, 6).map(tech => (
            <div key={tech.name} className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800 hover:border-zinc-700 transition-colors">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-sm font-semibold text-zinc-200">{tech.name}</span>
                <span className="text-xs font-mono text-cyan-500 bg-cyan-500/10 px-2 py-0.5 rounded-full">{tech.role}</span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">{tech.explanation}</p>
            </div>
          ))}
        </div>
        {data.tech_stack.length > 6 && (
          <p className="text-xs text-zinc-600 text-center mt-3">+ {data.tech_stack.length - 6} more technologies</p>
        )}
      </div>

      {/* Card 6 — Common Errors */}
      <div ref={r6} className="reveal card-glass rounded-2xl p-6" style={{transitionDelay:'320ms'}}>
        <Label icon={<Bug/>} text="Common Errors"/>
        <div className="space-y-2">
          {data.common_errors.map((err, i) => (
            <div key={i} className="rounded-xl border border-zinc-800 overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-zinc-800/50 transition-colors"
                onClick={() => setOpenError(openError === i ? null : i)}
              >
                <span className="font-mono text-red-400 text-xs truncate mr-3">"{err.error}"</span>
                <Chev open={openError === i}/>
              </button>
              <div className={`acc-body ${openError === i ? 'open' : ''}`}>
                <div className="px-4 pb-4 pt-0 border-t border-zinc-800/60">
                  <p className="text-xs text-zinc-400 mt-3 mb-3"><span className="text-zinc-300 font-medium">Why: </span>{err.why}</p>
                  <div className="bg-zinc-950 rounded-lg border border-zinc-800 flex items-center justify-between">
                    <code className="p-3 text-emerald-400 font-mono text-xs flex-1">{err.fix}</code>
                    <div className="pr-2"><CopyButton text={err.fix}/></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ResultsDashboard

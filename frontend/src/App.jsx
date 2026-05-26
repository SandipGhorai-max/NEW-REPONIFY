import React, { useState, useEffect, Suspense } from 'react'

import LoadingState from './components/LoadingState'
import OnboardingModal from './components/OnboardingModal'
import SettingsModal from './components/SettingsModal'
import ResultsDashboard from './components/ResultsDashboard'
import { Icons, osOptions, expOptions } from './components/Icons'
import heroBg from './assets/hero-bg.jpeg'
import osAwareCommandsImg from './assets/os-aware-commands.jpeg'
import pasteUrlImg from './assets/paste-url.png'
import selectProfileImg from './assets/select-profile.png'
import directInstallerDetectionImg from './assets/Direct-installer--detection.jpg'
import dependencyHealthImg from './assets/dependency-health.jpg'
import errorPredictionImg from './assets/error-prediction.jpg'
import techStackExplainerImg from './assets/tech-stack-explainer.jpg'
import experienceLevelsImg from './assets/experience-levels.jpg'
import aiAnalysisImg from './assets/ai-analysis.jpg'
import getYourGuideImg from './assets/get-your-guide.jpg'
import brandLogo from './assets/LOGO.png'

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          color: '#00d4ff',
          fontFamily: 'JetBrains Mono',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <h2>Something went wrong.</h2>
          <button
            onClick={() => window.location.reload()}
            style={{
              border: '1px solid #00d4ff',
              background: 'transparent',
              color: '#00d4ff',
              padding: '8px 24px',
              cursor: 'pointer',
              fontFamily: 'JetBrains Mono'
            }}
          >
            Reload
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

const useScrollReveal = (loading, result) => {
  useEffect(() => {
    if (loading || result) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const timeout = setTimeout(() => {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-blur, .reveal-scale').forEach(el => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [loading, result]);
};

const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        let startTimestamp = null;
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          // easeOutQuart
          const easeProgress = 1 - Math.pow(1 - progress, 4);
          setCount(Math.floor(easeProgress * end));
          if (progress < 1) {
            window.requestAnimationFrame(step);
          } else {
            setCount(end);
          }
        };
        window.requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return <span ref={ref}>{count}{suffix}</span>;
};
const InputSection = ({ url, setUrl, analyzeRepo, loading, userOs, userExp, setShowSettings, error }) => (
  <div className="w-full">
    <div className="input-ring relative z-10 flex items-center w-full max-w-2xl mx-auto mt-10 bg-black/40 backdrop-blur-2xl border border-white/[0.1] rounded-2xl p-2 shadow-[0_0_40px_-10px_rgba(0,212,255,0.1)] ring-1 ring-inset ring-white/[0.05]">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && analyzeRepo()}
        placeholder="https://github.com/owner/repo"
        className="flex-1 bg-transparent border-none text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-0 px-5 py-4 font-mono text-sm"
      />
      <button
        onClick={() => analyzeRepo()}
        disabled={!url.trim() || loading}
        className="bg-gradient-to-b from-brand-primary to-[#00b3d6] text-black font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,212,255,0.4)] hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
      >
        Analyze
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
        </svg>
      </button>
    </div>

    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-zinc-500 text-sm mt-4 font-medium">
      <div className="flex items-center gap-2">
        <span>Analyzing for:</span>
        <span className="flex items-center gap-1.5 text-zinc-200">
          {React.createElement(Icons[osOptions.find(o => o.id === userOs)?.icon || 'Windows'], { className: "w-4 h-4 text-brand-primary" })}
          {osOptions.find(o => o.id === userOs)?.label}
        </span>
        <span className="text-zinc-600">·</span>
        <span className="flex items-center gap-1.5 text-zinc-200">
          {React.createElement(Icons[expOptions.find(o => o.id === userExp)?.icon || 'beginner'], { className: "w-4 h-4 text-brand-primary" })}
          {expOptions.find(o => o.id === userExp)?.label}
        </span>
        <button onClick={() => setShowSettings(true)} className="ml-1 text-zinc-500 hover:text-brand-primary transition-colors">
          <Icons.Edit className="w-4 h-4" />
        </button>
      </div>
    </div>

    {error && (
      <div className="mt-4 flex items-start gap-3 text-sm bg-brand-danger/10 border border-brand-danger/20 rounded-xl px-4 py-3">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f85149" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
          <triangle points="10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <div>
          <div className="font-semibold text-brand-danger mb-0.5">Analysis Failed</div>
          <div className="text-brand-danger/80">{error}</div>
        </div>
      </div>
    )}
  </div>
);

const App = () => {
  const [isModelReady, setIsModelReady] = useState(false);
  const [shouldMountModel, setShouldMountModel] = useState(false);
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useScrollReveal(loading, result);
  const [animationDone, setAnimationDone] = useState(false);
  const [apiDone, setApiDone] = useState(false);
  const [pendingResult, setPendingResult] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [userOs, setUserOs] = useState('Windows');
  const [userExp, setUserExp] = useState('beginner');

  useEffect(() => {
    const onboarded = localStorage.getItem('reponify_onboarded');
    if (!onboarded) {
      setShowOnboarding(true);
    } else {
      setUserOs(localStorage.getItem('reponify_os') || 'Windows');
      setUserExp(localStorage.getItem('reponify_experience') || 'beginner');
    }
  }, []);

  useEffect(() => {
    // Delay mounting the heavy WebGL iframe so it doesn't block initial page animations
    const timer = setTimeout(() => {
      setShouldMountModel(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleOnboardingComplete = (os, exp) => {
    setUserOs(os);
    setUserExp(exp);
    setShowOnboarding(false);
  };

  const handleSettingsSave = (os, exp) => {
    setUserOs(os);
    setUserExp(exp);
    setShowSettings(false);
  };

  useEffect(() => {
    if (animationDone && apiDone && pendingResult) {
      setResult(pendingResult);
      setLoading(false);
    }
    if (animationDone && apiDone && !pendingResult && error) {
      setLoading(false);
    }
  }, [animationDone, apiDone, pendingResult, error]);

  const analyzeRepo = async (targetUrl = url) => {
    if (!targetUrl.trim()) return;
    setUrl(targetUrl);
    setResult(null);
    setError(null);
    setPendingResult(null);
    setAnimationDone(false);
    setApiDone(false);
    setLoading(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const response = await fetch(`${API_URL}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          github_url: targetUrl,
          os: localStorage.getItem('reponify_os') || 'Windows',
          experience_level: localStorage.getItem('reponify_experience') || 'beginner'
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const detail = errorData.detail || `Server returned ${response.status}`;
        throw new Error(detail);
      }

      const data = await response.json();
      setPendingResult(data);
      setApiDone(true);
    } catch (err) {
      console.error("[Reponify]", err);
      setError(err.message || "Failed to analyze repo. Is the backend running?");
      setApiDone(true);
    }
  };

  const handleReset = () => {
    setUrl("");
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setResult(null);
    setError(null);
    setLoading(false);
    setPendingResult(null);
    setAnimationDone(false);
    setApiDone(false);
  };

  // Render Navbar
  const renderNav = () => (
    <nav className="fixed top-0 left-0 right-0 h-16 z-50 border-b border-brand-border bg-brand-bg/85 backdrop-blur-xl flex items-center justify-between px-6 md:px-10">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2.5 cursor-pointer select-none" onClick={handleReset}>
          <img src={brandLogo} alt="Reponify Logo" className="w-6 h-6 object-contain" />
          <span className="text-lg font-display font-semibold tracking-tight text-white">Reponify</span>
        </div>
        {result && (
          <button onClick={handleReset} className="hidden sm:flex items-center gap-1.5 text-sm text-zinc-400 hover:text-brand-primary transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
            Analyze Another Repo
          </button>
        )}
      </div>

      {!result && (
        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm font-medium">How it Works</a>
          <a href="#features" className="text-sm font-medium">Features</a>
          <a href="#preview" className="text-sm font-medium">Preview</a>
          <a href="#ecosystems" className="text-sm font-medium">Ecosystems</a>
          <a href="#stats" className="text-sm font-medium">Stats</a>
          <a href="#cta" className="text-sm font-medium">Try it</a>
        </div>
      )}

      <div className="flex items-center gap-4">
        {(!loading && !result) ? (
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="btn-outline px-4 py-1.5 rounded-full text-xs flex items-center gap-2">
            Analyze a Repo
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </button>
        ) : (
          <button onClick={() => setShowSettings(true)} className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-brand-primary transition-colors bg-brand-surface2 rounded-lg border border-brand-border hover:border-brand-primary/30">
            <Icons.Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
          </button>
        )}
      </div>
    </nav>
  );


  return (
    <div className="min-h-screen bg-[#030303] text-zinc-300 relative overflow-hidden font-sans z-0">
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        {/* Accent Light */}
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-accent/20 blur-[150px] mix-blend-screen" />
        {/* Primary Light */}
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-primary/15 blur-[150px] mix-blend-screen" />
        {/* Center Ambient Glow */}
        <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[60vw] h-[30vw] rounded-full bg-indigo-500/10 blur-[120px] mix-blend-screen" />

      </div>
      <div className="min-h-screen flex flex-col pt-16">
        {renderNav()}

        {/* State 1: Landing Page */}
        <div className={`flex-grow flex flex-col ${loading || result ? 'hidden' : ''}`}>

            {/* SECTION 1 - HERO */}
            <div className="relative w-full">
              <div className="absolute inset-0 z-0">
                <img src={heroBg} alt="Hero Background" className="w-full h-full object-cover opacity-30" style={{ mixBlendMode: 'luminosity' }} />
                <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/40 via-[#030303]/80 to-[#030303]"></div>
              </div>
              <section className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                <div className="lg:col-span-7 flex flex-col items-start">
                  <div className="animate-fade-up inline-flex items-center gap-2 text-xs font-mono text-brand-primary bg-brand-primary/10 border border-brand-primary/20 rounded-full px-3 py-1 mb-8" style={{ animationDelay: '0ms' }}>
                    <span className="text-[10px]">◈</span> 4-Layer AI Pipeline
                  </div>

                  <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-50 leading-[1.1] z-10 relative">
                    <div className="animate-fade-up text-white" style={{ animationDelay: '100ms' }}>From zero to</div>
                    <div className="animate-fade-up text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent" style={{ animationDelay: '200ms' }}>running in seconds</div>
                  </h1>

                  <p className="animate-fade-up text-lg text-zinc-400 max-w-2xl mx-auto mt-6" style={{ animationDelay: '300ms' }}>
                    Paste any public GitHub URL. Reponify reads the README, analyzes the stack, and generates a precise setup guide — no guessing.
                  </p>

                  <div className="animate-fade-up w-full max-w-xl mb-8" style={{ animationDelay: '400ms' }}>
                    <InputSection url={url} setUrl={setUrl} analyzeRepo={analyzeRepo} loading={loading} userOs={userOs} userExp={userExp} setShowSettings={setShowSettings} error={error} />
                  </div>

                  <div className="animate-fade-up flex flex-wrap items-center gap-3 text-xs" style={{ animationDelay: '500ms' }}>
                    <span className="text-zinc-600 font-mono">Try:</span>
                    {["vercel/next.js", "fastapi/fastapi", "expressjs/express"].map(repo => (
                      <button key={repo} onClick={() => analyzeRepo(`https://github.com/${repo}`)} className="pill px-3 py-1.5 rounded-full border border-brand-border bg-brand-surface2 text-zinc-400 font-mono">
                        {repo}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 w-full h-[500px] animate-fade-up" style={{ animationDelay: '600ms' }}>
                  {/* Bounding Box: Restricts the model and hides the watermark via overflow-hidden */}
                  <div className="relative w-full h-full min-h-[500px] overflow-hidden z-10 isolate">
                    
                    {/* THE WATERMARK GUILLOTINE: We make the height 115% so the bottom logo bleeds out of the hidden bounds */}
                    <div className="absolute top-0 left-0 w-full h-[115%] z-10 pointer-events-auto">
                      <Suspense fallback={null}>
                        <div className={`w-full h-full transition-opacity duration-1000 ease-in-out ${
                          isModelReady ? 'opacity-100' : 'opacity-0'
                        }`}>
                          {shouldMountModel && (
                            <iframe 
                              src="https://my.spline.design/nexbotrobotcharacterconcept-RApx5jBsVVAGhfXkUm8agkQB/" 
                              frameBorder="0" 
                              width="100%" 
                              height="100%"
                              onLoad={() => setIsModelReady(true)}
                              title="Spline 3D Model"
                            />
                          )}
                        </div>
                      </Suspense>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* SECTION 2 - HOW IT WORKS */}
            <section id="how-it-works" className="w-full py-24 border-t border-brand-border/50 bg-brand-surface/30">
              <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="text-center mb-16 reveal-blur">
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">How it works</h2>
                  <p className="text-zinc-400 text-lg">Four steps. Zero confusion.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                  <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-px bg-brand-border -translate-y-1/2 z-0 reveal delay-200">
                    <div className="h-full bg-brand-primary/30 w-full origin-left animate-[shimmer_3s_infinite]"></div>
                  </div>

                  {[
                    { isImage: true, image: pasteUrlImg, title: "Paste URL" },
                    { isImage: true, image: selectProfileImg, title: "Select Profile" },
                    { isImage: true, image: aiAnalysisImg, title: "AI Analysis" },
                    { isImage: true, image: getYourGuideImg, title: "Get Your Guide" }
                  ].map((step, i) => (
                    <div key={i} className={`reveal relative group overflow-hidden rounded-[2rem] bg-white/[0.015] backdrop-blur-3xl border border-white/[0.08] shadow-[0_24px_40px_-12px_rgba(0,0,0,0.5)] transition-all duration-700 hover:bg-white/[0.03] hover:border-white/[0.15] feature-card flex flex-col items-center text-center ${step.isImage ? 'p-0' : 'p-6'}`} style={{ transitionDelay: `${i * 100}ms` }}>
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.2] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20" />
                      {step.isImage ? (
                        <div className="w-full h-full min-h-[254px] overflow-hidden rounded-[2rem]">
                          <img src={step.image} alt={step.title} className="w-full h-full object-fill transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" />
                        </div>
                      ) : (
                        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
                          <div className="text-4xl font-display font-bold text-brand-primary/20 mb-4">{step.num}</div>
                          <div className="w-12 h-12 rounded-full bg-brand-surface2 flex items-center justify-center text-brand-primary mb-4 shadow-[0_0_15px_rgba(0,212,255,0.15)]">
                            {step.icon}
                          </div>
                          <h3 className="text-xl font-semibold text-zinc-100 mb-3">{step.title}</h3>
                          <p className="text-sm text-zinc-400 leading-relaxed">{step.desc}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 3 - FEATURES */}
            <section id="features" className="w-full py-24">
              <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="mb-16 reveal-blur">
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Everything a beginner needs</h2>
                  <p className="text-zinc-400 text-lg">Everything an expert expects</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                  {[
                    { isImage: true, image: osAwareCommandsImg, title: "OS-Aware Commands" },
                    { isImage: true, image: directInstallerDetectionImg, title: "Direct Installer Detection" },
                    { isImage: true, image: dependencyHealthImg, title: "Dependency Health" },
                    { isImage: true, image: errorPredictionImg, title: "Error Predictions" },
                    { isImage: true, image: techStackExplainerImg, title: "Tech Stack Explainer" },
                    { isImage: true, image: experienceLevelsImg, title: "Experience Levels" }
                  ].map((feat, i) => (
                    <div key={i} className={`reveal relative group overflow-hidden rounded-[2rem] bg-white/[0.015] backdrop-blur-3xl border border-white/[0.08] shadow-[0_24px_40px_-12px_rgba(0,0,0,0.5)] transition-all duration-700 hover:bg-white/[0.03] hover:border-white/[0.15] feature-card ${feat.isImage ? 'p-0' : 'p-8'}`} style={{ transitionDelay: `${i * 50}ms` }}>
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.2] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20" />
                      {feat.isImage ? (
                        <div className="w-full h-full min-h-[220px] overflow-hidden rounded-[2rem]">
                          <img src={feat.image} alt={feat.title} className="w-full h-full object-fill transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" />
                        </div>
                      ) : (
                        <div className="relative z-10 flex flex-col h-full justify-center">
                          <div className="text-brand-primary mb-6">{feat.icon}</div>
                          <h3 className="text-xl font-semibold text-zinc-100 mb-3">{feat.title}</h3>
                          <p className="text-sm text-zinc-400 leading-relaxed">{feat.desc}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 4 - LIVE PREVIEW */}
            <section id="preview" className="w-full py-24 border-y border-brand-border/50 bg-brand-surface/30 overflow-hidden">
              <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="text-center mb-16 reveal">
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">See what Reponify generates</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Panel */}
                  <div className="reveal-left bg-brand-bg rounded-2xl border border-brand-border p-6 font-mono text-sm flex flex-col h-[400px]">
                    <div className="flex gap-2 mb-6">
                      <div className="w-3 h-3 rounded-full bg-brand-border"></div>
                      <div className="w-3 h-3 rounded-full bg-brand-border"></div>
                      <div className="w-3 h-3 rounded-full bg-brand-border"></div>
                    </div>
                    <div className="flex-1 space-y-4 text-zinc-400">
                      <div><span className="text-brand-secondary">➜</span> <span className="text-white">Analyzing:</span> langflow-ai/langflow</div>
                      <div><span className="text-brand-secondary">➜</span> <span className="text-white">OS:</span> Windows</div>
                      <div><span className="text-brand-secondary">➜</span> <span className="text-white">Level:</span> Beginner</div>
                      <div className="pt-4 border-l-2 border-brand-primary/50 pl-4 space-y-2 mt-4 text-xs">
                        <div className="text-brand-primary">Layer 1: Vision ... [OK]</div>
                        <div className="text-brand-primary">Layer 2: Dependencies ... [OK]</div>
                        <div className="animate-pulse">Layer 3: Guide Generation ...</div>
                      </div>
                    </div>
                  </div>

                  {/* Right Panel */}
                  <div className="reveal-right bg-brand-bg rounded-2xl border border-brand-border p-6 h-[400px] overflow-hidden relative" style={{ boxShadow: '0 0 50px rgba(0,212,255,0.03)' }}>
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent" />
                    <div className="space-y-6 opacity-80">
                      <div>
                        <div className="text-xs font-mono font-bold text-zinc-500 mb-3 tracking-wider uppercase">Prerequisites</div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-brand-surface2 border border-brand-border mb-2">
                          <span className="text-sm text-white font-sans font-medium">Python 3.11+</span>
                          <span className="text-xs text-brand-secondary bg-brand-secondary/10 px-2 py-1 rounded">Verified</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-brand-surface2 border border-brand-border">
                          <span className="text-sm text-white font-sans font-medium">uv latest</span>
                          <span className="text-xs text-brand-secondary bg-brand-secondary/10 px-2 py-1 rounded">Verified</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-mono font-bold text-zinc-500 mb-3 tracking-wider uppercase">Setup Guide</div>
                        <div className="mb-4">
                          <div className="text-sm font-semibold text-white mb-2 font-sans">1. Install Langflow</div>
                          <div className="bg-[#09090b] rounded-lg border border-brand-border p-3 flex justify-between">
                            <code className="text-brand-primary font-mono text-xs">uv pip install langflow -U</code>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-500"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white mb-2 font-sans">2. Run Langflow</div>
                          <div className="bg-[#09090b] rounded-lg border border-brand-border p-3 flex justify-between">
                            <code className="text-brand-primary font-mono text-xs">uv run langflow run</code>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-500"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-bg to-transparent pointer-events-none"></div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5 - SUPPORTED ECOSYSTEMS */}
            <section id="ecosystems" className="w-full py-20 overflow-hidden relative">
              <div className="text-center mb-12 reveal-blur">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">Works with any public repository</h2>
                <p className="text-zinc-500 text-base">50+ prerequisites in our knowledge base</p>
              </div>

              <div className="relative -rotate-[4deg] scale-[1.05] my-16">
                {/* Marquee Row 1 — seamless infinite loop */}
                <div className="relative" style={{ overflow: 'hidden' }}>
                  <div className="absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-purple-900/40 via-purple-800/15 to-transparent pointer-events-none" />
                  <div className="absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-purple-900/40 via-purple-800/15 to-transparent pointer-events-none" />
                  {/* inline-flex: always sizes to true content width, never compressed by overflow:hidden parent */}
                  <div
                    className="animate-marquee border-y border-white/[0.08] py-4 bg-white/[0.04] backdrop-blur-xl shadow-[0_10px_40px_rgba(124,58,237,0.08),_inset_0_1px_0_rgba(255,255,255,0.05)]"
                    style={{ display: 'inline-flex', whiteSpace: 'nowrap' }}
                  >
                    {[0, 1].map(copy => (
                      <div key={copy} style={{ display: 'inline-flex', flexShrink: 0, alignItems: 'center' }}>
                        {['Python', 'Node.js', 'Rust', 'Go', 'Java', 'Docker', 'React', 'FastAPI', 'Django', 'NestJS', 'Flutter', 'TypeScript'].map(tech => (
                          <div key={tech} style={{ display: 'inline-flex', alignItems: 'center', margin: '0 2rem' }}>
                            <span style={{ color: '#8b949e', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>{tech}</span>
                            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#21262d', marginLeft: '2rem', flexShrink: 0 }}></span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Marquee Row 2 — seamless infinite loop reversed */}
                <div className="relative" style={{ overflow: 'hidden' }}>
                  <div className="absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-purple-900/40 via-purple-800/15 to-transparent pointer-events-none" />
                  <div className="absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-purple-900/40 via-purple-800/15 to-transparent pointer-events-none" />
                  <div
                    className="animate-marquee-reverse border-b border-white/[0.08] py-4 bg-white/[0.04] backdrop-blur-xl shadow-[0_10px_40px_rgba(124,58,237,0.08),_inset_0_1px_0_rgba(255,255,255,0.05)]"
                    style={{ display: 'inline-flex', whiteSpace: 'nowrap' }}
                  >
                    {[0, 1].map(copy => (
                      <div key={copy} style={{ display: 'inline-flex', flexShrink: 0, alignItems: 'center' }}>
                        {['PostgreSQL', 'MongoDB', 'Redis', 'Bun', 'Deno', 'Kotlin', 'Swift', 'PHP', 'Ruby', '.NET', 'Elixir', 'Haskell'].map(tech => (
                          <div key={tech} style={{ display: 'inline-flex', alignItems: 'center', margin: '0 2rem' }}>
                            <span style={{ color: '#8b949e', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>{tech}</span>
                            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#21262d', marginLeft: '2rem', flexShrink: 0 }}></span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-center mt-12 reveal">
                <p className="text-zinc-500 italic text-sm">If it's on GitHub, Reponify can guide you through it.</p>
              </div>
            </section>

            {/* SECTION 6 - STATS */}
            <section id="stats" className="w-full py-24 bg-brand-bg border-y border-brand-border/50">
              <div className="max-w-5xl mx-auto px-6 md:px-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-brand-border">
                  <div className="flex flex-col items-center text-center reveal pt-8 md:pt-0">
                    <div className="text-5xl md:text-6xl font-display font-bold text-brand-primary mb-3">
                      <AnimatedCounter end={50} suffix="+" />
                    </div>
                    <div className="text-zinc-400 text-sm font-medium">Prerequisites in knowledge base</div>
                  </div>
                  <div className="flex flex-col items-center text-center reveal delay-100 pt-8 md:pt-0">
                    <div className="text-5xl md:text-6xl font-display font-bold text-brand-primary mb-3">
                      <AnimatedCounter end={4} />
                    </div>
                    <div className="text-zinc-400 text-sm font-medium">AI layers per analysis</div>
                  </div>
                  <div className="flex flex-col items-center text-center reveal delay-200 pt-8 md:pt-0">
                    <div className="text-5xl md:text-6xl font-display font-bold text-brand-primary mb-3">
                      <AnimatedCounter end={45} suffix="s" />
                    </div>
                    <div className="text-zinc-400 text-sm font-medium">Average analysis time</div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7 - FINAL CTA */}
            <section id="cta" className="w-full py-32 relative overflow-hidden flex flex-col items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-primary/10 via-brand-bg to-brand-bg"></div>
              <div className="max-w-2xl w-full mx-auto px-6 z-10 text-center reveal">
                <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Ready to run your first repo?</h2>
                <p className="text-zinc-400 text-lg mb-12">Paste a GitHub URL and get your personalized setup guide in seconds.</p>

                <div className="max-w-xl mx-auto mb-6">
                  <InputSection url={url} setUrl={setUrl} analyzeRepo={analyzeRepo} loading={loading} userOs={userOs} userExp={userExp} setShowSettings={setShowSettings} error={error} />
                </div>
                <p className="text-zinc-500 text-xs">Free. No signup. No API key needed.</p>
              </div>
            </section>

            {/* FOOTER */}
            <footer className="w-full py-8 border-t border-brand-border mt-auto">
              <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <img src={brandLogo} alt="Reponify Logo" className="w-5 h-5 object-contain opacity-80" />
                  <span className="text-sm font-display font-semibold text-white">Reponify</span>
                </div>
                <div className="text-zinc-500 text-xs text-center">Built for developers who just want it to run</div>
                <div>
                  <a href="#" className="text-zinc-500 hover:text-white transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                  </a>
                </div>
              </div>
            </footer>
          </div>

        {/* State 2: Processing */}
        {loading && (
          <main className="flex-grow flex items-center justify-center px-6 relative z-10 pt-16">
            <LoadingState onComplete={() => setAnimationDone(true)} />
          </main>
        )}

        {/* State 3: Results */}
        {!loading && result && (
          <main className="flex-grow px-6 md:px-10 py-10 relative z-10 pt-[60px]">
            <ResultsDashboard data={result} />

            <div className="w-full max-w-5xl mx-auto mt-12 mb-12">
              <button onClick={handleReset} className="w-full py-4 rounded-xl bg-transparent border border-brand-primary text-brand-primary text-sm font-semibold hover:bg-brand-primary hover:text-brand-bg transition-colors flex items-center justify-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                Analyze Another Repo
              </button>
            </div>
          </main>
        )}

        {showOnboarding && <OnboardingModal onComplete={handleOnboardingComplete} />}
        {showSettings && <SettingsModal os={userOs} exp={userExp} onClose={() => setShowSettings(false)} onSave={handleSettingsSave} />}
      </div>
    </div>
  );
};

export default App;

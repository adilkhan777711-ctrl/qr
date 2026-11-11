import React, { useState } from 'react';
import { ArrowRight, Sparkles, X, ShieldCheck, Zap, DownloadCloud, Eye } from 'lucide-react';

interface HeroProps {
  onQuickGenerate: (url: string) => void;
  onOpenTestScan: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onQuickGenerate, onOpenTestScan }) => {
  const [quickInput, setQuickInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickInput.trim()) {
      onQuickGenerate(quickInput.trim());
      const el = document.getElementById('generator');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClear = () => {
    setQuickInput('');
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden">
      {/* Subtle background ambient gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-violet-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading, Value Prop & Quick Input */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-200/80 dark:border-purple-800/80 text-xs font-semibold text-purple-700 dark:text-purple-300">
              <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>Next-Gen High Resolution QR Engine</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12] text-balance">
              Create Your QR Code{' '}
              <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-500 bg-clip-text text-transparent">
                in Seconds
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl font-normal leading-relaxed text-balance">
              Turn any link into a beautiful, scannable QR code. Generate, customize, and download your QR codes instantly.
            </p>

            {/* Quick URL Input Bar */}
            <div className="pt-2 max-w-xl mx-auto lg:mx-0">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-center gap-2 p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none"
              >
                <div className="relative flex-1 w-full">
                  <input
                    type="text"
                    value={quickInput}
                    onChange={(e) => setQuickInput(e.target.value)}
                    placeholder="Enter your website URL (e.g. google.com)"
                    className="w-full px-4 py-3 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none"
                  />
                  {quickInput && (
                    <button
                      type="button"
                      onClick={handleClear}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                      title="Clear"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-semibold shadow-md shadow-purple-600/20 hover:shadow-purple-600/30 transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-2 active:scale-95"
                  >
                    <span>Generate QR Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-4 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Instant Client-Side Render</span>
                </div>
                <span className="text-slate-300 dark:text-slate-700">·</span>
                <div className="flex items-center gap-1.5">
                  <DownloadCloud className="w-4 h-4 text-purple-500" />
                  <span>Vector SVG & 4K PNG</span>
                </div>
                <span className="text-slate-300 dark:text-slate-700">·</span>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>100% Private & Free</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-2xl bg-slate-900 group">
              <img
                src="/src/assets/images/smartphone_qr_scanner_1794408794467.jpg"
                alt="Smartphone scanning a glowing QR code on a card"
                className="w-full h-auto object-cover transform group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Interactive Test Simulator Floating Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-700/60 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-medium text-slate-200">
                    Real Optical Camera Scan Ready
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onOpenTestScan}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Test Viewfinder</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { QrCode, Moon, Sun, Clock, Sparkles } from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenHistory: () => void;
  historyCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDarkMode,
  onToggleTheme,
  onOpenHistory,
  historyCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-slate-900 dark:text-white font-bold text-xl tracking-tight whitespace-nowrap shrink-0 group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-700 via-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform duration-200">
            <QrCode className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span>
            QR<span className="text-purple-600 dark:text-purple-400">ify</span>
          </span>
        </a>

        {/* Zone 2: Single-line Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a
            href="#generator"
            className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors whitespace-nowrap shrink-0"
          >
            Generator
          </a>
          <a
            href="#how-it-works"
            className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors whitespace-nowrap shrink-0"
          >
            How It Works
          </a>
          <a
            href="#features"
            className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors whitespace-nowrap shrink-0"
          >
            Features
          </a>
          <a
            href="#faq"
            className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors whitespace-nowrap shrink-0"
          >
            FAQ
          </a>
          <button
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 hover:text-purple-600 dark:hover:text-purple-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Clock className="w-4 h-4 text-slate-400 dark:text-slate-500" />
            <span>History</span>
            {historyCount > 0 && (
              <span className="ml-1 text-[11px] font-semibold px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                {historyCount}
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: Primary Action + Theme Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleTheme}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          <a
            href="#generator"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl shadow-md shadow-purple-600/20 hover:shadow-purple-600/30 transition-all duration-200 active:scale-95 whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>Create QR Code</span>
          </a>
        </div>
      </div>
    </header>
  );
};

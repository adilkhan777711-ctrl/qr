/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ContentInputs } from './components/ContentInputs';
import { CustomizationControls } from './components/CustomizationControls';
import { QRPreviewCard } from './components/QRPreviewCard';
import { HistoryDrawer } from './components/HistoryDrawer';
import { ScanSimulatorModal } from './components/ScanSimulatorModal';
import { ContactModal, PrivacyModal, TermsModal } from './components/LegalModals';
import { HowItWorks } from './components/HowItWorks';
import { FeaturesSection } from './components/FeaturesSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { QRConfig, QRHistoryItem, ToastMessage } from './types/qr';
import { DEFAULT_CONFIG, compileQRPayload } from './utils/qrHelper';
import { Sparkles, QrCode } from 'lucide-react';

const STORAGE_KEY_CONFIG = 'qrify_current_config';
const STORAGE_KEY_HISTORY = 'qrify_history_items';
const STORAGE_KEY_THEME = 'qrify_theme_dark';

export default function App() {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY_THEME);
      if (saved !== null) return saved === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Config state
  const [config, setConfig] = useState<QRConfig>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY_CONFIG);
        if (saved) return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
      } catch (e) {
        console.error('Failed to parse saved config', e);
      }
    }
    return DEFAULT_CONFIG;
  });

  // History state
  const [history, setHistory] = useState<QRHistoryItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY_HISTORY);
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved history', e);
      }
    }
    return [
      {
        id: 'hist-default-1',
        title: 'Google Homepage',
        content: 'https://google.com',
        contentType: 'url',
        createdAt: Date.now() - 3600000 * 2,
        config: { ...DEFAULT_CONFIG, urlData: 'https://google.com' },
      },
    ];
  });

  // UI Drawer & Modal States
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Apply dark class to <html>
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_KEY_THEME, String(isDarkMode));
  }, [isDarkMode]);

  // Persist current config
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
  }, [config]);

  // Persist history
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(history));
  }, [history]);

  // Toast Helper
  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Config Update Handler
  const handleConfigChange = (updated: Partial<QRConfig>) => {
    setConfig((prev) => ({ ...prev, ...updated }));
  };

  // Reset Handler
  const handleReset = () => {
    setConfig(DEFAULT_CONFIG);
    addToast('info', 'Customization reset to default parameters');
  };

  // Save to history helper
  const saveCurrentToHistory = (customTitle?: string) => {
    const payload = compileQRPayload(config);
    const newItem: QRHistoryItem = {
      id: `qr-${Date.now()}`,
      title: customTitle || payload,
      content: payload,
      contentType: config.contentType,
      createdAt: Date.now(),
      config: { ...config },
    };

    setHistory((prev) => {
      // Avoid duplicate consecutive identical items
      const filtered = prev.filter((item) => item.content !== payload);
      return [newItem, ...filtered].slice(0, 25);
    });
  };

  // Quick Generate from Hero
  const handleQuickGenerate = (url: string) => {
    setConfig((prev) => ({
      ...prev,
      contentType: 'url',
      urlData: url,
    }));
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      saveCurrentToHistory(`Quick URL: ${url}`);
      addToast('success', 'Generated scannable QR code!');
    }, 300);
  };

  // Regenerate / Refresh QR Code
  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      saveCurrentToHistory();
      addToast('success', 'QR Code regenerated with current settings!');
    }, 400);
  };

  // History Actions
  const handleLoadHistoryItem = (item: QRHistoryItem) => {
    if (item.config) {
      setConfig((prev) => ({
        ...prev,
        ...item.config,
        content: item.content,
        contentType: item.contentType,
      }));
      addToast('info', `Loaded QR code from history: ${item.title}`);
    }
  };

  const handleDeleteHistoryItem = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
    addToast('info', 'Item removed from history');
  };

  const handleClearAllHistory = () => {
    setHistory([]);
    addToast('info', 'All history cleared');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Navigation */}
      <Navbar
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={history.length}
      />

      {/* Hero Section */}
      <Hero
        onQuickGenerate={handleQuickGenerate}
        onOpenTestScan={() => setIsScanModalOpen(true)}
      />

      {/* Main Generator Section */}
      <section
        id="generator"
        className="py-12 md:py-16 border-t border-slate-200/80 dark:border-slate-800/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Kicker */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-1">
                <QrCode className="w-4 h-4" />
                <span>Interactive Studio</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                QR Code Generator & Styling Suite
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
              Configure content, adjust matrix dots, frame geometries, and preview optical scannability live.
            </p>
          </div>

          {/* Generator Workspace Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Content & Customization (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              {/* Step 1: Content Input */}
              <ContentInputs
                config={config}
                onChange={handleConfigChange}
                onToast={addToast}
              />

              {/* Step 2: Customization Controls */}
              <CustomizationControls
                config={config}
                onChange={handleConfigChange}
                onReset={handleReset}
                onToast={addToast}
              />
            </div>

            {/* Right Column: Sticky Live Preview & Export (5 cols) */}
            <div className="lg:col-span-5">
              <QRPreviewCard
                config={config}
                onRegenerate={handleRegenerate}
                onOpenScanModal={() => setIsScanModalOpen(true)}
                onToast={addToast}
                isGenerating={isGenerating}
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Features Section */}
      <FeaturesSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <Footer
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenTerms={() => setIsTermsOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* History Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onLoadItem={handleLoadHistoryItem}
        onDeleteItem={handleDeleteHistoryItem}
        onClearAll={handleClearAllHistory}
      />

      {/* Camera Viewfinder Simulator Modal */}
      <ScanSimulatorModal
        isOpen={isScanModalOpen}
        onClose={() => setIsScanModalOpen(false)}
        config={config}
      />

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Privacy Policy Modal */}
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      {/* Terms of Service Modal */}
      <TermsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />

      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}

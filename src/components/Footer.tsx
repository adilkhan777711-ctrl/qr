import React from 'react';
import { QrCode, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacy,
  onOpenTerms,
  onOpenContact,
}) => {
  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-2.5 text-slate-900 dark:text-white font-bold text-xl tracking-tight">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-500/20">
                <QrCode className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span>
                QR<span className="text-purple-600 dark:text-purple-400">ify</span>
              </span>
            </a>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Professional, scannable QR code generator for modern marketing campaigns, restaurant menus, retail packaging, and enterprise collateral.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Client-Side In-Browser Execution</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <a href="#generator" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  QR Code Generator
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Core Features
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Common Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Trust & Support
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenTerms}
                  className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer text-left"
                >
                  Contact Support
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} QRify. All rights reserved. Open standard 2D barcodes.</p>
          <p className="flex items-center gap-1">
            Built with modern web standards and client-side cryptography
          </p>
        </div>
      </div>
    </footer>
  );
};

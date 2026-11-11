import React, { useState } from 'react';
import { X, Send, ShieldCheck, FileText, CheckCircle2, Mail } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setIsSubmitted(true);
    setTimeout(() => {
      // Auto-reset after confirmation
    }, 4000);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setName('');
    setEmail('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={handleClose} className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs" />
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 z-10">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Contact QRify Support
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              Message Received!
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xs mx-auto">
              Thank you, {name}. Our engineering and design team typically responds within 24 hours.
            </p>
            <button
              onClick={handleClose}
              className="mt-4 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold cursor-pointer"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:border-purple-600 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:border-purple-600 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                Inquiry Topic
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200"
              >
                <option value="General Inquiry">General Product Inquiry</option>
                <option value="Commercial Print Consulting">Commercial Print Consulting</option>
                <option value="Feature Request">Feature Request</option>
                <option value="Bug Report">Technical Bug Report</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                Your Message *
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can our technical team assist you?"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:border-purple-600 text-slate-900 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-purple-600/20 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export const PrivacyModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs" />
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 z-10 max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Privacy Policy
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-5 space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pr-2">
          <p className="font-medium text-slate-800 dark:text-slate-200">
            Last Updated: November 2026
          </p>
          <h4 className="font-bold text-slate-900 dark:text-white">
            1. Zero Server-Side Logging
          </h4>
          <p>
            QRify is built as a zero-telemetry, client-side utility. All QR code compilation, canvas drawing, mathematical Reed-Solomon calculations, and file exports take place entirely inside your browser’s local JavaScript sandbox. We do not transmit your destination URLs, Wi-Fi credentials, or vCard details to any server.
          </p>
          <h4 className="font-bold text-slate-900 dark:text-white">
            2. Local Storage Usage
          </h4>
          <p>
            When you create QR codes, your recent configurations are stored strictly on your device using the standard browser `localStorage` API. You retain full control over this data and may purge it at any time using the "Clear History" button.
          </p>
          <h4 className="font-bold text-slate-900 dark:text-white">
            3. No Tracking Pixels or Redirects
          </h4>
          <p>
            Unlike commercial URL redirect services that insert intermediate tracking domains between the scanner and your destination, QRify generates direct static QR codes. Scanning the code connects the user’s camera directly to your target address without intermediary tracking servers.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold cursor-pointer"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};

export const TermsModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs" />
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 z-10 max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Terms of Service
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-5 space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pr-2">
          <p className="font-medium text-slate-800 dark:text-slate-200">
            Last Updated: November 2026
          </p>
          <h4 className="font-bold text-slate-900 dark:text-white">
            1. Grant of License
          </h4>
          <p>
            You are granted a worldwide, perpetual, royalty-free license to generate, download, distribute, print, and display QR codes created using QRify for personal, commercial, and enterprise applications.
          </p>
          <h4 className="font-bold text-slate-900 dark:text-white">
            2. Acceptable Use
          </h4>
          <p>
            You agree not to encode malicious software links, phishing sites, or prohibited harmful content into QR codes. The QR codes produced are static standard 2D barcodes, and the user assumes full responsibility for the safety and validity of target destination URLs.
          </p>
          <h4 className="font-bold text-slate-900 dark:text-white">
            3. Print Verification Warranty
          </h4>
          <p>
            While QRify employs strict ISO/IEC standard algorithms and contrast calculations, users must perform a physical test scan using multiple smartphone models prior to committing to large-scale mass commercial printing runs (e.g., millions of retail packaging cartons).
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold cursor-pointer"
          >
            Accept Terms
          </button>
        </div>
      </div>
    </div>
  );
};

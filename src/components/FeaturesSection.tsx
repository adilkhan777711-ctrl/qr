import React from 'react';
import {
  ShieldCheck,
  Maximize2,
  Sparkles,
  Camera,
  Layers,
  HardDriveDownload,
  CheckCircle,
} from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-20 md:py-28 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            Engineered for Precision
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Features Built for Professionals
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Every QR code generated adheres strictly to ISO/IEC 18004 standards with high-fidelity styling.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Vector SVG (col-span-2) */}
          <div className="md:col-span-2 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
            <div className="relative z-10 max-w-md space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <Maximize2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Infinite Resolution Vector SVG & 4K PNG
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Download crisp vector SVG graphics that never blur or pixelate, whether printed on a tiny business card, restaurant tabletop acrylic, or a massive 50-foot outdoor highway billboard.
              </p>
              <div className="pt-2 flex flex-wrap gap-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  CMYK-ready SVG vectors
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  2048x2048px Ultra 4K PNG
                </span>
              </div>
            </div>

            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-gradient-to-br from-purple-500/10 via-indigo-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* Card 2: 100% Client-Side Privacy */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                100% Client-Side & Private
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Your URLs, credentials, and contact cards never leave your browser. Zero backend telemetry, zero tracking redirects, and no account required.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              Zero Server Interception
            </div>
          </div>

          {/* Card 3: Brand Logo & Error Correction */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                30% Error Correction
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Upload your brand logo into the center matrix with confidence. High Reed-Solomon redundancy ensures scannability even if 30% of the code is obstructed or damaged.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              ISO/IEC 18004 Compliant
            </div>
          </div>

          {/* Card 4: Universal Camera Compatibility (col-span-2) */}
          <div className="md:col-span-2 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4 max-w-lg">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Universal Native Camera Scanning
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Tested against stock iOS Camera, Google Lens, Samsung Camera, and handheld 2D barcode imagers. Customized dots maintain optical contrast ratios for instantaneous 0.2s scanning response.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-4 text-xs font-medium text-slate-500">
              <span>Apple iOS 11–18+</span>
              <span>·</span>
              <span>Android 9–15+</span>
              <span>·</span>
              <span>Zebra & Honeywell Handhelds</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

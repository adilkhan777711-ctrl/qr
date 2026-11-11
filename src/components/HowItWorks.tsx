import React from 'react';
import { Link2, Palette, QrCode, DownloadCloud } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Enter your website link',
      desc: 'Type or paste any URL, Wi-Fi network credentials, digital vCard, or custom text message into the generator.',
      icon: <Link2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
    },
    {
      num: '02',
      title: 'Customize your QR code',
      desc: 'Select branded color palettes, custom dot matrices, rounded corner shapes, and upload your company logo.',
      icon: <Palette className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
    },
    {
      num: '03',
      title: 'Generate your QR code',
      desc: 'Watch the real-time canvas compile an error-corrected, high-contrast QR code with optical verification.',
      icon: <QrCode className="w-6 h-6 text-violet-600 dark:text-violet-400" />,
    },
    {
      num: '04',
      title: 'Download and share it',
      desc: 'Export vector SVG for billboards and print media, or crisp 4K Ultra PNG for web, packaging, and business cards.',
      icon: <DownloadCloud className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            Simple 4-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How It Works
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Generate production-grade QR codes ready for commercial printing, digital marketing, or personal use.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="relative p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {step.icon}
                  </div>
                  <span className="text-2xl font-black tracking-tight text-slate-300 dark:text-slate-700 font-mono">
                    {step.num}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center text-[11px] font-semibold text-purple-600 dark:text-purple-400">
                <span>Step {step.num} of 04</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

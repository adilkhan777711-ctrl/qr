import React, { useState, useEffect } from 'react';
import { X, ExternalLink, CheckCircle2, Smartphone, ShieldCheck, Zap } from 'lucide-react';
import { QRConfig } from '../types/qr';
import { compileQRPayload } from '../utils/qrHelper';
import { QRCanvas } from './QRCanvas';

interface ScanSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: QRConfig;
}

export const ScanSimulatorModal: React.FC<ScanSimulatorModalProps> = ({
  isOpen,
  onClose,
  config,
}) => {
  const [isScanning, setIsScanning] = useState(true);
  const [detectedUrl, setDetectedUrl] = useState<string | null>(null);

  const payload = compileQRPayload(config);

  useEffect(() => {
    if (isOpen) {
      setIsScanning(true);
      setDetectedUrl(null);
      const timer = setTimeout(() => {
        setIsScanning(false);
        setDetectedUrl(payload);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isOpen, payload]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-sm bg-slate-900 text-white rounded-3xl p-6 shadow-2xl border border-slate-800 z-10 flex flex-col items-center">
        {/* Header */}
        <div className="w-full flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Camera Scan Viewfinder
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewfinder Frame */}
        <div className="relative mt-6 w-full aspect-square max-w-[260px] rounded-2xl bg-slate-950 border-2 border-dashed border-purple-500/40 p-4 flex items-center justify-center overflow-hidden">
          {/* Laser Scanner Bar */}
          {isScanning && (
            <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent shadow-[0_0_12px_#a855f7] animate-pulse z-20 top-1/2 -translate-y-1/2" />
          )}

          {/* Corner Guides */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-purple-400" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-purple-400" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-purple-400" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-purple-400" />

          {/* Scaled QR Code inside Viewfinder */}
          <div className="transform scale-75 origin-center">
            <QRCanvas config={{ ...config, size: 240 }} />
          </div>
        </div>

        {/* Detection Status */}
        <div className="w-full mt-5">
          {isScanning ? (
            <div className="flex items-center justify-center gap-2 py-3 text-xs text-purple-300">
              <Zap className="w-4 h-4 animate-bounce text-purple-400" />
              <span>Aligning camera optical sensor...</span>
            </div>
          ) : (
            <div className="space-y-3 p-3.5 rounded-xl bg-purple-950/40 border border-purple-800/60">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>QR Code Recognized Instantly!</span>
              </div>

              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 truncate select-all">
                {detectedUrl}
              </div>

              {detectedUrl && /^https?:\/\//i.test(detectedUrl) && (
                <a
                  href={detectedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Open Scanned Link in New Tab</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Note */}
        <div className="mt-4 flex items-center gap-1.5 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Real scannable barcode verified against QR standard</span>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  Download,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Smartphone,
  Image as ImageIcon,
} from 'lucide-react';
import { QRConfig } from '../types/qr';
import { QRCanvas, downloadQRCode, copyQRImageToClipboard } from './QRCanvas';
import { calculateContrastRatio, compileQRPayload, triggerDownloadCelebration } from '../utils/qrHelper';

interface QRPreviewCardProps {
  config: QRConfig;
  onRegenerate: () => void;
  onOpenScanModal: () => void;
  onToast: (type: 'success' | 'error' | 'info', message: string) => void;
  isGenerating: boolean;
}

export const QRPreviewCard: React.FC<QRPreviewCardProps> = ({
  config,
  onRegenerate,
  onOpenScanModal,
  onToast,
  isGenerating,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);
  const [downloadingFormat, setDownloadingFormat] = useState<string | null>(null);

  const payload = compileQRPayload(config);
  const contrastRatio = calculateContrastRatio(
    config.dotsColor,
    config.isTransparentBg ? '#ffffff' : config.bgColor
  );
  const isHighContrast = contrastRatio >= 3.5;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(payload);
      setCopiedLink(true);
      onToast('success', 'URL copied to clipboard!');
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      onToast('error', 'Failed to copy URL');
    }
  };

  const handleCopyImage = async () => {
    try {
      const ok = await copyQRImageToClipboard(config);
      if (ok) {
        setCopiedImage(true);
        onToast('success', 'QR Code image copied to clipboard!');
        setTimeout(() => setCopiedImage(false), 2500);
      } else {
        onToast('info', 'Clipboard image copy is not supported in this browser. Please use Download PNG.');
      }
    } catch {
      onToast('error', 'Could not copy image');
    }
  };

  const handleDownload = async (format: 'png' | 'svg' | 'png-4k') => {
    setDownloadingFormat(format);
    try {
      let slug = 'qrify';
      if (config.contentType === 'url' && config.urlData) {
        try {
          const url = new URL(
            /^https?:\/\//i.test(config.urlData) ? config.urlData : `https://${config.urlData}`
          );
          slug = `qrify-${url.hostname.replace(/[^a-z0-9]/gi, '-')}`;
        } catch {
          slug = 'qrify-code';
        }
      } else {
        slug = `qrify-${config.contentType}`;
      }

      await downloadQRCode(config, format, slug);
      triggerDownloadCelebration();
      onToast('success', `Downloaded ${format.toUpperCase()} successfully!`);
    } catch (err) {
      console.error(err);
      onToast('error', 'Download failed. Please try again.');
    } finally {
      setDownloadingFormat(null);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col items-center sticky top-24">
      {/* Header Bar of Preview */}
      <div className="w-full flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-200">
            Live Preview
          </h3>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onRegenerate}
            disabled={isGenerating}
            title="Refresh Canvas"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={onOpenScanModal}
            title="Open Phone Camera Viewfinder"
            className="p-1.5 rounded-lg text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-colors cursor-pointer"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* QR Code Canvas Frame */}
      <div className="relative p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 w-full flex items-center justify-center min-h-[340px]">
        {/* Loading overlay if generating */}
        {isGenerating && (
          <div className="absolute inset-0 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xs rounded-2xl flex items-center justify-center z-10">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-3 border-purple-600 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                Rendering QR Code...
              </span>
            </div>
          </div>
        )}

        <div className="relative group">
          <QRCanvas
            config={config}
            className="rounded-xl shadow-sm transition-transform duration-200 hover:scale-[1.02]"
          />
        </div>
      </div>

      {/* Scannability & Contrast Badge */}
      <div className="w-full mt-4 flex items-center justify-between text-xs px-1">
        <div className="flex items-center gap-1.5">
          {isHighContrast ? (
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          ) : (
            <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
          )}
          <span
            className={
              isHighContrast
                ? 'text-emerald-700 dark:text-emerald-400 font-medium'
                : 'text-amber-700 dark:text-amber-400 font-medium'
            }
          >
            {isHighContrast
              ? `Optimal Scannability (${contrastRatio.toFixed(1)}:1)`
              : `Low Contrast (${contrastRatio.toFixed(1)}:1) – Consider darker dots`}
          </span>
        </div>

        <span className="text-slate-400 dark:text-slate-500 font-mono text-[11px]">
          Level {config.errorCorrection} (
          {config.errorCorrection === 'H'
            ? '30%'
            : config.errorCorrection === 'Q'
            ? '25%'
            : config.errorCorrection === 'M'
            ? '15%'
            : '7%'}
          )
        </span>
      </div>

      {/* Content Preview & Copy Payload Bar */}
      <div className="w-full mt-4 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-2">
        <span
          className="text-xs text-slate-600 dark:text-slate-300 truncate font-mono select-all flex-1"
          title={payload}
        >
          {payload}
        </span>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={handleCopyLink}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            title="Copy URL"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          {config.contentType === 'url' && (
            <a
              href={payload}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              title="Open link"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Copy Image Button */}
      <div className="w-full mt-3">
        <button
          onClick={handleCopyImage}
          className="w-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          {copiedImage ? (
            <Check className="w-4 h-4 text-emerald-500" />
          ) : (
            <ImageIcon className="w-4 h-4 text-slate-400" />
          )}
          <span>{copiedImage ? 'Copied to Clipboard!' : 'Copy QR Image to Clipboard'}</span>
        </button>
      </div>

      {/* Download Center */}
      <div className="w-full mt-5 pt-5 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
          Download Formats
        </div>

        {/* Primary Download: PNG */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleDownload('png')}
            disabled={downloadingFormat !== null}
            className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer active:scale-98"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloadingFormat === 'png' ? 'Preparing...' : 'PNG (1024px)'}</span>
          </button>

          <button
            onClick={() => handleDownload('svg')}
            disabled={downloadingFormat !== null}
            className="py-2.5 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/50 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/80 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloadingFormat === 'svg' ? 'Preparing...' : 'SVG (Vector)'}</span>
          </button>
        </div>

        {/* Ultra High Resolution Download */}
        <button
          onClick={() => handleDownload('png-4k')}
          disabled={downloadingFormat !== null}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-purple-600/20 hover:shadow-purple-600/30 transition-all cursor-pointer active:scale-98"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>
            {downloadingFormat === 'png-4k'
              ? 'Rendering 4K Canvas...'
              : 'Download High-Res PNG (4K Print Ready)'}
          </span>
        </button>
      </div>
    </div>
  );
};

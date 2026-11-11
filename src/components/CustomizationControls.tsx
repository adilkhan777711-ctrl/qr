import React, { useRef } from 'react';
import {
  RotateCcw,
  Palette,
  Sparkles,
  Layers,
  Upload,
  Trash2,
  Sliders,
  Check,
} from 'lucide-react';
import {
  QRConfig,
  DotStyleType,
  CornerSquareStyleType,
  CornerDotStyleType,
  ErrorCorrectionType,
} from '../types/qr';
import { PRESET_THEMES, DEFAULT_CONFIG } from '../utils/qrHelper';

interface CustomizationControlsProps {
  config: QRConfig;
  onChange: (updated: Partial<QRConfig>) => void;
  onReset: () => void;
  onToast: (type: 'success' | 'error' | 'info', message: string) => void;
}

// Built-in logo SVG presets encoded as DataURIs
const LOGO_PRESETS = [
  {
    name: 'QRify Mark',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="#7c3aed"><rect width="100" height="100" rx="28" fill="#7c3aed"/><path d="M30 30h16v16H30zm24 0h16v16H54zm-24 24h16v16H30zm24 10h10v10H54zm10-10h10v10H64z" fill="#ffffff"/></svg>`,
  },
  {
    name: 'Link',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="28" fill="#0f172a"/><path d="M42 58a12 12 0 0 1 0-17l7-7a12 12 0 1 1 17 17l-3.5 3.5a2 2 0 0 1-2.8-2.8l3.5-3.5a8 8 0 0 0-11.3-11.3l-7 7a8 8 0 0 0 0 11.3 2 2 0 0 1-2.9 2.8zm16-16a12 12 0 0 1 0 17l-7 7a12 12 0 1 1-17-17l3.5-3.5a2 2 0 0 1 2.8 2.8l-3.5 3.5a8 8 0 0 0 11.3 11.3l7-7a8 8 0 0 0 0-11.3 2 2 0 0 1 2.9-2.8z" fill="#ffffff"/></svg>`,
  },
  {
    name: 'WiFi',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="28" fill="#2563eb"/><path d="M25 38c14-12 36-12 50 0m-42 12c10-9 24-9 34 0m-26 12c5-5 13-5 18 0m-9 12a3 3 0 1 1 0-.01" fill="none" stroke="#ffffff" stroke-width="7" stroke-linecap="round"/></svg>`,
  },
  {
    name: 'Star',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="28" fill="#f59e0b"/><polygon points="50,22 59,40 79,42 64,56 68,76 50,65 32,76 36,56 21,42 41,40" fill="#ffffff"/></svg>`,
  },
  {
    name: 'Heart',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="28" fill="#e11d48"/><path d="M50 72s-22-14-22-26a11 11 0 0 1 22-3 11 11 0 0 1 22 3c0 12-22 26-22 26z" fill="#ffffff"/></svg>`,
  },
  {
    name: 'Shopping',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="28" fill="#10b981"/><path d="M30 38h40l-4 34H34zm8 0v-8a12 12 0 0 1 24 0v8" fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
];

const presetLogoDataUris = LOGO_PRESETS.map((p) => ({
  name: p.name,
  uri: `data:image/svg+xml;utf8,${encodeURIComponent(p.svg)}`,
}));

export const CustomizationControls: React.FC<CustomizationControlsProps> = ({
  config,
  onChange,
  onReset,
  onToast,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dotTypes: { label: string; value: DotStyleType }[] = [
    { label: 'Rounded', value: 'rounded' },
    { label: 'Dots', value: 'dots' },
    { label: 'Classy', value: 'classy' },
    { label: 'Classy Round', value: 'classy-rounded' },
    { label: 'Square', value: 'square' },
    { label: 'Extra Round', value: 'extra-rounded' },
  ];

  const cornerSquareTypes: { label: string; value: CornerSquareStyleType }[] = [
    { label: 'Rounded Box', value: 'extra-rounded' },
    { label: 'Square Box', value: 'square' },
    { label: 'Circle Box', value: 'dot' },
  ];

  const cornerDotTypes: { label: string; value: CornerDotStyleType }[] = [
    { label: 'Circle Dot', value: 'dot' },
    { label: 'Square Dot', value: 'square' },
  ];

  const errorCorrectionLevels: { label: string; value: ErrorCorrectionType; desc: string }[] = [
    { label: 'L', value: 'L', desc: '7% recovery (simplest)' },
    { label: 'M', value: 'M', desc: '15% recovery (standard)' },
    { label: 'Q', value: 'Q', desc: '25% recovery (high)' },
    { label: 'H', value: 'H', desc: '30% recovery (best with logos)' },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      onToast('error', 'Please upload a valid image file (PNG, SVG, JPG)');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      onToast('error', 'Logo image size must be under 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      if (result) {
        onChange({
          logoUrl: result,
          errorCorrection: 'H', // Auto-upgrade error correction for scannability
        });
        onToast('success', 'Custom logo applied with 30% error correction!');
      }
    };
    reader.readAsDataURL(file);
  };

  const applyPresetTheme = (theme: (typeof PRESET_THEMES)[0]) => {
    onChange({
      dotsColor: theme.dots,
      bgColor: theme.bg,
      cornerSquareColor: theme.cornerSquare,
      cornerDotColor: theme.cornerDot,
      isTransparentBg: false,
    });
    onToast('info', `Applied ${theme.name} palette`);
  };

  return (
    <div className="space-y-8">
      {/* Header with Reset Action */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Customize Design
          </h2>
        </div>

        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* Preset Color Themes */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Color Themes
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {PRESET_THEMES.map((theme) => {
            const isActive =
              config.dotsColor === theme.dots &&
              config.bgColor === theme.bg &&
              config.cornerDotColor === theme.cornerDot;

            return (
              <button
                key={theme.name}
                type="button"
                onClick={() => applyPresetTheme(theme)}
                className={`p-2.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                  isActive
                    ? 'border-purple-600 ring-2 ring-purple-600/20 bg-purple-50/50 dark:bg-purple-950/30'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    <span
                      className="w-4 h-4 rounded-full border border-white dark:border-slate-900 shadow-xs"
                      style={{ backgroundColor: theme.dots }}
                    />
                    <span
                      className="w-4 h-4 rounded-full border border-white dark:border-slate-900 shadow-xs"
                      style={{ backgroundColor: theme.cornerDot }}
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate">
                    {theme.name}
                  </span>
                </div>
                {isActive && <Check className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Colors Section */}
      <div className="space-y-4">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Color Customization
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Dots Foreground */}
          <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                Pattern Dots Color
              </span>
              <span className="text-xs font-mono text-slate-400">{config.dotsColor}</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={config.dotsColor}
                onChange={(e) => onChange({ dotsColor: e.target.value })}
                className="w-9 h-9 rounded-lg border-0 cursor-pointer p-0 bg-transparent"
              />
              <input
                type="text"
                value={config.dotsColor}
                onChange={(e) => onChange({ dotsColor: e.target.value })}
                className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-mono bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 uppercase"
              />
            </div>
          </div>

          {/* Background Color */}
          <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                Background Canvas
              </span>
              <label className="flex items-center gap-1.5 text-xs text-slate-500 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.isTransparentBg}
                  onChange={(e) => onChange({ isTransparentBg: e.target.checked })}
                  className="rounded text-purple-600 focus:ring-purple-500"
                />
                <span>Transparent</span>
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={config.bgColor}
                disabled={config.isTransparentBg}
                onChange={(e) => onChange({ bgColor: e.target.value })}
                className="w-9 h-9 rounded-lg border-0 cursor-pointer p-0 bg-transparent disabled:opacity-30"
              />
              <input
                type="text"
                disabled={config.isTransparentBg}
                value={config.isTransparentBg ? 'Transparent' : config.bgColor}
                onChange={(e) => onChange({ bgColor: e.target.value })}
                className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-mono bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 uppercase disabled:opacity-50"
              />
            </div>
          </div>
        </div>

        {/* Gradient Dots Option */}
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Gradient Pattern Dots
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.useGradient}
                onChange={(e) => onChange({ useGradient: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-slate-600 peer-checked:bg-purple-600"></div>
            </label>
          </div>

          {config.useGradient && (
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-800">
              <div className="space-y-1">
                <span className="text-[11px] text-slate-500">Secondary Gradient Color</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={config.gradientColor2}
                    onChange={(e) => onChange({ gradientColor2: e.target.value })}
                    className="w-8 h-8 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={config.gradientColor2}
                    onChange={(e) => onChange({ gradientColor2: e.target.value })}
                    className="flex-1 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 text-xs font-mono uppercase bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] text-slate-500">Gradient Type</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onChange({ gradientType: 'linear' })}
                    className={`flex-1 py-1.5 px-3 text-xs rounded-lg font-medium border ${
                      config.gradientType === 'linear'
                        ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    Linear (45°)
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange({ gradientType: 'radial' })}
                    className={`flex-1 py-1.5 px-3 text-xs rounded-lg font-medium border ${
                      config.gradientType === 'radial'
                        ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    Radial
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Shapes: Dots and Corners */}
      <div className="space-y-4">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Pattern & Corner Shapes
        </label>

        {/* Dots Style */}
        <div className="space-y-2">
          <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
            Dot Pattern Style
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {dotTypes.map((dot) => (
              <button
                key={dot.value}
                type="button"
                onClick={() => onChange({ dotsType: dot.value })}
                className={`py-2 px-3 text-xs font-medium rounded-xl border transition-all cursor-pointer ${
                  config.dotsType === dot.value
                    ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-semibold'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                {dot.label}
              </button>
            ))}
          </div>
        </div>

        {/* Corner Square Style */}
        <div className="space-y-2">
          <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
            Corner Frame Style
          </span>
          <div className="grid grid-cols-3 gap-2">
            {cornerSquareTypes.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => onChange({ cornerSquareType: c.value })}
                className={`py-2 px-2 text-xs font-medium rounded-xl border transition-all cursor-pointer text-center ${
                  config.cornerSquareType === c.value
                    ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-semibold'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Corner Dot Style */}
        <div className="space-y-2">
          <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
            Corner Inner Dot Style
          </span>
          <div className="grid grid-cols-2 gap-2">
            {cornerDotTypes.map((cd) => (
              <button
                key={cd.value}
                type="button"
                onClick={() => onChange({ cornerDotType: cd.value })}
                className={`py-2 px-3 text-xs font-medium rounded-xl border transition-all cursor-pointer text-center ${
                  config.cornerDotType === cd.value
                    ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-semibold'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                {cd.label}
              </button>
            ))}
          </div>
        </div>

        {/* Corner Custom Colors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
            <span className="text-xs text-slate-600 dark:text-slate-300">Corner Frame Color</span>
            <input
              type="color"
              value={config.cornerSquareColor}
              onChange={(e) => onChange({ cornerSquareColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer"
            />
          </div>

          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
            <span className="text-xs text-slate-600 dark:text-slate-300">Corner Dot Color</span>
            <input
              type="color"
              value={config.cornerDotColor}
              onChange={(e) => onChange({ cornerDotColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Logo in Center */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Center Logo (Optional)
          </label>
          {config.logoUrl && (
            <button
              onClick={() => onChange({ logoUrl: '' })}
              className="text-xs text-rose-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Remove Logo</span>
            </button>
          )}
        </div>

        {/* Preset Logos */}
        <div className="space-y-2">
          <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
            Choose Preset Icon
          </span>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {presetLogoDataUris.map((preset) => {
              const isSelected = config.logoUrl === preset.uri;
              return (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() =>
                    onChange({
                      logoUrl: preset.uri,
                      errorCorrection: 'H',
                    })
                  }
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-purple-600 ring-2 ring-purple-600/20 bg-purple-50/50 dark:bg-purple-950/40'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 bg-white dark:bg-slate-900'
                  }`}
                >
                  <img src={preset.uri} alt={preset.name} className="w-7 h-7 object-contain" />
                  <span className="text-[10px] text-slate-600 dark:text-slate-400 truncate w-full text-center">
                    {preset.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Upload Custom File */}
        <div className="p-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center space-y-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/png,image/jpeg,image/svg+xml,image/webp"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/50 hover:bg-purple-100 dark:hover:bg-purple-900/50 rounded-xl transition-colors cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Custom Brand Logo (PNG / SVG)</span>
          </button>
          <p className="text-[11px] text-slate-400">
            Max 2MB · Automatically increases error correction to 30% for instant scannability
          </p>
        </div>

        {/* Logo Size and Margin Adjustments */}
        {config.logoUrl && (
          <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
              <span>Logo Size</span>
              <span className="font-mono">{Math.round(config.logoSize * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="0.45"
              step="0.05"
              value={config.logoSize}
              onChange={(e) => onChange({ logoSize: parseFloat(e.target.value) })}
              className="w-full accent-purple-600"
            />

            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span>Clear Background Dots Behind Logo</span>
              <input
                type="checkbox"
                checked={config.hideBackgroundDots}
                onChange={(e) => onChange({ hideBackgroundDots: e.target.checked })}
                className="rounded text-purple-600 focus:ring-purple-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* Error Correction Level */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Error Correction Level
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {errorCorrectionLevels.map((ec) => (
            <button
              key={ec.value}
              type="button"
              onClick={() => onChange({ errorCorrection: ec.value })}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                config.errorCorrection === ec.value
                  ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/40'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-bold ${
                    config.errorCorrection === ec.value
                      ? 'text-purple-700 dark:text-purple-300'
                      : 'text-slate-800 dark:text-slate-200'
                  }`}
                >
                  Level {ec.label}
                </span>
                {config.errorCorrection === ec.value && (
                  <Check className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                )}
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">{ec.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

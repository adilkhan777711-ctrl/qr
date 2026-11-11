import confetti from 'canvas-confetti';
import { QRConfig, QRContentType } from '../types/qr';

export const DEFAULT_CONFIG: QRConfig = {
  content: 'https://example.com',
  contentType: 'url',
  urlData: 'https://google.com',
  textData: 'Welcome to QRify!',
  wifiData: {
    ssid: 'Home_WiFi_5G',
    password: 'SuperSecretPassword',
    encryption: 'WPA',
    hidden: false,
  },
  vcardData: {
    firstName: 'Alex',
    lastName: 'Morgan',
    phone: '+1 (555) 234-5678',
    email: 'alex@example.com',
    company: 'NextGen Digital',
    title: 'Lead Architect',
    website: 'https://example.com',
  },
  emailData: {
    email: 'contact@example.com',
    subject: 'Inquiry from QRify',
    body: 'Hello, I would like to get more information.',
  },
  size: 320,
  dotsColor: '#0f172a', // Deep navy
  dotsType: 'rounded',
  useGradient: false,
  gradientColor2: '#7c3aed', // Electric purple
  gradientType: 'linear',
  gradientRotation: 45,
  bgColor: '#ffffff',
  isTransparentBg: false,
  cornerSquareColor: '#0f172a',
  cornerSquareType: 'extra-rounded',
  cornerDotColor: '#7c3aed',
  cornerDotType: 'dot',
  logoUrl: '',
  logoMargin: 6,
  logoSize: 0.35,
  hideBackgroundDots: true,
  errorCorrection: 'Q',
};

// Color palettes for quick one-click themes
export const PRESET_THEMES = [
  {
    name: 'Executive Navy',
    dots: '#0f172a',
    bg: '#ffffff',
    cornerSquare: '#0f172a',
    cornerDot: '#4338ca',
  },
  {
    name: 'Electric Purple',
    dots: '#6d28d9',
    bg: '#ffffff',
    cornerSquare: '#4c1d95',
    cornerDot: '#7c3aed',
  },
  {
    name: 'Midnight Neon',
    dots: '#7c3aed',
    bg: '#090d16',
    cornerSquare: '#8b5cf6',
    cornerDot: '#a78bfa',
  },
  {
    name: 'Emerald Tech',
    dots: '#047857',
    bg: '#ffffff',
    cornerSquare: '#064e3b',
    cornerDot: '#10b981',
  },
  {
    name: 'Crimson Bold',
    dots: '#b91c1c',
    bg: '#ffffff',
    cornerSquare: '#7f1d1d',
    cornerDot: '#ef4444',
  },
  {
    name: 'Sunset Gradient',
    dots: '#4338ca',
    bg: '#ffffff',
    cornerSquare: '#312e81',
    cornerDot: '#7c3aed',
  },
];

// Helper to compile payload string based on content type
export function compileQRPayload(config: QRConfig): string {
  switch (config.contentType) {
    case 'url': {
      let url = config.urlData.trim();
      if (!url) return 'https://example.com';
      if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
      }
      return url;
    }
    case 'text':
      return config.textData.trim() || 'QRify Code';
    case 'wifi': {
      const { ssid, password, encryption, hidden } = config.wifiData;
      const enc = encryption === 'nopass' ? 'nopass' : encryption;
      const pass = enc === 'nopass' ? '' : password;
      return `WIFI:T:${enc};S:${ssid};P:${pass};H:${hidden ? 'true' : 'false'};;`;
    }
    case 'vcard': {
      const v = config.vcardData;
      return [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${v.lastName};${v.firstName};;;`,
        `FN:${v.firstName} ${v.lastName}`.trim(),
        v.company ? `ORG:${v.company}` : '',
        v.title ? `TITLE:${v.title}` : '',
        v.phone ? `TEL;TYPE=CELL:${v.phone}` : '',
        v.email ? `EMAIL:${v.email}` : '',
        v.website ? `URL:${v.website}` : '',
        'END:VCARD',
      ]
        .filter(Boolean)
        .join('\n');
    }
    case 'email': {
      const { email, subject, body } = config.emailData;
      const params = new URLSearchParams();
      if (subject) params.append('subject', subject);
      if (body) params.append('body', body);
      const query = params.toString();
      return `mailto:${email}${query ? '?' + query : ''}`;
    }
    default:
      return config.urlData;
  }
}

// Check URL validity
export function isValidUrl(urlStr: string): boolean {
  if (!urlStr || urlStr.trim().length === 0) return false;
  try {
    const formatted = /^https?:\/\//i.test(urlStr) ? urlStr : `https://${urlStr}`;
    const url = new URL(formatted);
    return url.hostname.includes('.');
  } catch {
    return false;
  }
}

// Calculate luminance & contrast ratio
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace('#', '');
  if (clean.length === 3) {
    return {
      r: parseInt(clean[0] + clean[0], 16),
      g: parseInt(clean[1] + clean[1], 16),
      b: parseInt(clean[2] + clean[2], 16),
    };
  }
  if (clean.length === 6) {
    return {
      r: parseInt(clean.substring(0, 2), 16),
      g: parseInt(clean.substring(2, 4), 16),
      b: parseInt(clean.substring(4, 6), 16),
    };
  }
  return null;
}

function getLuminance(rgb: { r: number; g: number; b: number }): number {
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((v) => {
    const val = v / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function calculateContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  if (!rgb1 || !rgb2) return 21; // Default safe assumption

  const l1 = getLuminance(rgb1);
  const l2 = getLuminance(rgb2);
  const brightest = Math.max(l1, l2);
  const darkest = Math.min(l1, l2);
  return (brightest + 0.05) / (darkest + 0.05);
}

// Confetti celebration trigger
export function triggerDownloadCelebration() {
  confetti({
    particleCount: 50,
    spread: 60,
    origin: { y: 0.75 },
    colors: ['#7c3aed', '#6366f1', '#3b82f6', '#10b981'],
  });
}

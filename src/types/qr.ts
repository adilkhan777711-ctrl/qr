export type QRContentType = 'url' | 'text' | 'wifi' | 'vcard' | 'email';

export type DotStyleType = 'rounded' | 'dots' | 'classy' | 'classy-rounded' | 'square' | 'extra-rounded';
export type CornerSquareStyleType = 'dot' | 'square' | 'extra-rounded';
export type CornerDotStyleType = 'dot' | 'square';
export type ErrorCorrectionType = 'L' | 'M' | 'Q' | 'H';

export interface QRConfig {
  content: string;
  contentType: QRContentType;
  // Specific data representations
  urlData: string;
  textData: string;
  wifiData: {
    ssid: string;
    password: string;
    encryption: 'WPA' | 'WEP' | 'nopass';
    hidden: boolean;
  };
  vcardData: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    company: string;
    title: string;
    website: string;
  };
  emailData: {
    email: string;
    subject: string;
    body: string;
  };
  // Styling
  size: number;
  dotsColor: string;
  dotsType: DotStyleType;
  useGradient: boolean;
  gradientColor2: string;
  gradientType: 'linear' | 'radial';
  gradientRotation: number;
  bgColor: string;
  isTransparentBg: boolean;
  cornerSquareColor: string;
  cornerSquareType: CornerSquareStyleType;
  cornerDotColor: string;
  cornerDotType: CornerDotStyleType;
  // Logo
  logoUrl?: string;
  logoMargin: number;
  logoSize: number;
  hideBackgroundDots: boolean;
  // Error correction
  errorCorrection: ErrorCorrectionType;
}

export interface QRHistoryItem {
  id: string;
  title: string;
  content: string;
  contentType: QRContentType;
  createdAt: number;
  config: Partial<QRConfig>;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

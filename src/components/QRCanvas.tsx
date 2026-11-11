import React, { useEffect, useRef } from 'react';
import QRCodeStyling, {
  Options,
  DotType,
  CornerSquareType,
  CornerDotType,
  ErrorCorrectionLevel,
} from 'qr-code-styling';
import { QRConfig } from '../types/qr';
import { compileQRPayload } from '../utils/qrHelper';

interface QRCanvasProps {
  config: QRConfig;
  onReady?: (instance: QRCodeStyling) => void;
  className?: string;
}

export const QRCanvas: React.FC<QRCanvasProps> = ({ config, onReady, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrInstanceRef = useRef<QRCodeStyling | null>(null);

  // Compile options from config
  const getOptions = (cfg: QRConfig, sizeOverride?: number): Options => {
    const payload = compileQRPayload(cfg);
    const size = sizeOverride || cfg.size;

    const dotsOptions: Options['dotsOptions'] = {
      type: cfg.dotsType as DotType,
    };

    if (cfg.useGradient) {
      dotsOptions.gradient = {
        type: cfg.gradientType,
        rotation: (cfg.gradientRotation * Math.PI) / 180,
        colorStops: [
          { offset: 0, color: cfg.dotsColor },
          { offset: 1, color: cfg.gradientColor2 },
        ],
      };
    } else {
      dotsOptions.color = cfg.dotsColor;
    }

    const options: Options = {
      width: size,
      height: size,
      type: 'canvas',
      data: payload,
      margin: 12,
      qrOptions: {
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: cfg.errorCorrection as ErrorCorrectionLevel,
      },
      imageOptions: {
        hideBackgroundDots: cfg.hideBackgroundDots,
        imageSize: cfg.logoSize,
        margin: cfg.logoMargin,
        crossOrigin: 'anonymous',
      },
      dotsOptions,
      backgroundOptions: {
        color: cfg.isTransparentBg ? 'transparent' : cfg.bgColor,
      },
      cornersSquareOptions: {
        type: cfg.cornerSquareType as CornerSquareType,
        color: cfg.cornerSquareColor || cfg.dotsColor,
      },
      cornersDotOptions: {
        type: cfg.cornerDotType as CornerDotType,
        color: cfg.cornerDotColor || cfg.dotsColor,
      },
    };

    if (cfg.logoUrl && cfg.logoUrl.trim().length > 0) {
      options.image = cfg.logoUrl;
    } else {
      delete options.image;
    }

    return options;
  };

  // Initialize once
  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous elements if any
    containerRef.current.innerHTML = '';

    const initialOptions = getOptions(config);
    const qr = new QRCodeStyling(initialOptions);
    qr.append(containerRef.current);
    qrInstanceRef.current = qr;

    if (onReady) {
      onReady(qr);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  // Update when config changes
  useEffect(() => {
    if (!qrInstanceRef.current) return;
    const updatedOptions = getOptions(config);
    qrInstanceRef.current.update(updatedOptions);
    if (onReady) {
      onReady(qrInstanceRef.current);
    }
  }, [config]);

  return (
    <div
      ref={containerRef}
      className={`flex items-center justify-center overflow-hidden transition-transform duration-200 ${className || ''}`}
    />
  );
};

// Export helper to trigger high-res download or custom format
export async function downloadQRCode(
  config: QRConfig,
  format: 'png' | 'svg' | 'png-4k',
  filename = 'qrify-code'
) {
  const payload = compileQRPayload(config);
  const size = format === 'png-4k' ? 2048 : format === 'png' ? 1024 : 800;

  const dotsOptions: Options['dotsOptions'] = {
    type: config.dotsType as DotType,
  };

  if (config.useGradient) {
    dotsOptions.gradient = {
      type: config.gradientType,
      rotation: (config.gradientRotation * Math.PI) / 180,
      colorStops: [
        { offset: 0, color: config.dotsColor },
        { offset: 1, color: config.gradientColor2 },
      ],
    };
  } else {
    dotsOptions.color = config.dotsColor;
  }

  const options: Options = {
    width: size,
    height: size,
    type: format === 'svg' ? 'svg' : 'canvas',
    data: payload,
    margin: format === 'png-4k' ? 40 : 16,
    qrOptions: {
      typeNumber: 0,
      mode: 'Byte',
      errorCorrectionLevel: config.errorCorrection as ErrorCorrectionLevel,
    },
    imageOptions: {
      hideBackgroundDots: config.hideBackgroundDots,
      imageSize: config.logoSize,
      margin: config.logoMargin,
      crossOrigin: 'anonymous',
    },
    dotsOptions,
    backgroundOptions: {
      color: config.isTransparentBg ? 'transparent' : config.bgColor,
    },
    cornersSquareOptions: {
      type: config.cornerSquareType as CornerSquareType,
      color: config.cornerSquareColor || config.dotsColor,
    },
    cornersDotOptions: {
      type: config.cornerDotType as CornerDotType,
      color: config.cornerDotColor || config.dotsColor,
    },
  };

  if (config.logoUrl && config.logoUrl.trim().length > 0) {
    options.image = config.logoUrl;
  }

  const exportInstance = new QRCodeStyling(options);
  const ext = format === 'svg' ? 'svg' : 'png';
  const finalName = format === 'png-4k' ? `${filename}-4k-ultra` : filename;

  await exportInstance.download({
    name: finalName,
    extension: ext,
  });
}

// Helper to copy QR blob to clipboard
export async function copyQRImageToClipboard(config: QRConfig): Promise<boolean> {
  try {
    const payload = compileQRPayload(config);
    const options: Options = {
      width: 1024,
      height: 1024,
      type: 'canvas',
      data: payload,
      margin: 16,
      qrOptions: {
        errorCorrectionLevel: config.errorCorrection as ErrorCorrectionLevel,
      },
      dotsOptions: {
        type: config.dotsType as DotType,
        color: config.dotsColor,
      },
      backgroundOptions: {
        color: config.isTransparentBg ? 'transparent' : config.bgColor,
      },
      cornersSquareOptions: {
        type: config.cornerSquareType as CornerSquareType,
        color: config.cornerSquareColor || config.dotsColor,
      },
      cornersDotOptions: {
        type: config.cornerDotType as CornerDotType,
        color: config.cornerDotColor || config.dotsColor,
      },
    };

    if (config.logoUrl) options.image = config.logoUrl;

    const qr = new QRCodeStyling(options);
    const blob = (await qr.getRawData('png')) as Blob;
    if (!blob) return false;

    if (navigator.clipboard && window.ClipboardItem) {
      await navigator.clipboard.write([
        new ClipboardItem({
          'image/png': blob,
        }),
      ]);
      return true;
    }
    return false;
  } catch (err) {
    console.error('Clipboard copy error:', err);
    return false;
  }
}

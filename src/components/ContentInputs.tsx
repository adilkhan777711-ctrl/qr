import React from 'react';
import {
  Globe,
  FileText,
  Wifi,
  Contact,
  Mail,
  X,
  Clipboard,
  AlertCircle,
  Eye,
  EyeOff,
} from 'lucide-react';
import { QRConfig, QRContentType } from '../types/qr';
import { isValidUrl } from '../utils/qrHelper';

interface ContentInputsProps {
  config: QRConfig;
  onChange: (updated: Partial<QRConfig>) => void;
  onToast: (type: 'success' | 'error' | 'info', message: string) => void;
}

export const ContentInputs: React.FC<ContentInputsProps> = ({
  config,
  onChange,
  onToast,
}) => {
  const [showWifiPassword, setShowWifiPassword] = React.useState(false);

  const tabs: { id: QRContentType; label: string; icon: React.ReactNode }[] = [
    { id: 'url', label: 'Website Link', icon: <Globe className="w-4 h-4" /> },
    { id: 'text', label: 'Plain Text', icon: <FileText className="w-4 h-4" /> },
    { id: 'wifi', label: 'Wi-Fi Network', icon: <Wifi className="w-4 h-4" /> },
    { id: 'vcard', label: 'vCard Contact', icon: <Contact className="w-4 h-4" /> },
    { id: 'email', label: 'Email Message', icon: <Mail className="w-4 h-4" /> },
  ];

  const handlePasteUrl = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        onChange({ urlData: text.trim() });
        onToast('success', 'URL pasted from clipboard');
      }
    } catch {
      onToast('error', 'Clipboard access denied or empty');
    }
  };

  const isUrlValid = isValidUrl(config.urlData);
  const showUrlWarning = config.urlData.trim().length > 0 && !isUrlValid;

  return (
    <div className="space-y-6">
      {/* Content Type Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 overflow-x-auto border border-slate-200/80 dark:border-slate-800">
        {tabs.map((tab) => {
          const isActive = config.contentType === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange({ contentType: tab.id })}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-white dark:bg-slate-800 text-purple-700 dark:text-purple-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        {/* 1. URL Input */}
        {config.contentType === 'url' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Destination URL
              </label>
              <button
                type="button"
                onClick={handlePasteUrl}
                className="text-xs text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 cursor-pointer font-medium"
              >
                <Clipboard className="w-3.5 h-3.5" />
                <span>Paste from Clipboard</span>
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                value={config.urlData}
                onChange={(e) => onChange({ urlData: e.target.value })}
                placeholder="https://example.com"
                className={`w-full px-4 py-3 pr-10 rounded-xl border text-sm bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-colors ${
                  showUrlWarning
                    ? 'border-amber-400 focus:ring-2 focus:ring-amber-400/20'
                    : 'border-slate-200 dark:border-slate-700 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20'
                }`}
              />
              {config.urlData && (
                <button
                  type="button"
                  onClick={() => onChange({ urlData: '' })}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  title="Clear input"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* URL Validation Feedback */}
            {showUrlWarning ? (
              <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>URL format might be incomplete. E.g.: https://yourbrand.com</span>
              </div>
            ) : (
              <p className="text-[11px] text-slate-400">
                Your QR code opens this exact link immediately when scanned with any smartphone camera.
              </p>
            )}

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs text-slate-400">Examples:</span>
              {['google.com', 'github.com', 'instagram.com/mybrand', 'linkedin.com'].map((ex) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => onChange({ urlData: `https://${ex}` })}
                  className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono transition-colors cursor-pointer"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 2. Text Input */}
        {config.contentType === 'text' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Text Message / Note
              </label>
              <span className="text-xs text-slate-400 font-mono">
                {config.textData.length} chars
              </span>
            </div>
            <textarea
              rows={4}
              value={config.textData}
              onChange={(e) => onChange({ textData: e.target.value })}
              placeholder="Enter plain text, promotional codes, instructions or notes..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20"
            />
            <p className="text-[11px] text-slate-400">
              Plain text will be displayed directly on the scanner screen.
            </p>
          </div>
        )}

        {/* 3. WiFi Input */}
        {config.contentType === 'wifi' && (
          <div className="space-y-4">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Wi-Fi Network Credentials
            </label>

            <div className="space-y-3">
              <div>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                  Network SSID (Name)
                </span>
                <input
                  type="text"
                  value={config.wifiData.ssid}
                  onChange={(e) =>
                    onChange({
                      wifiData: { ...config.wifiData, ssid: e.target.value },
                    })
                  }
                  placeholder="e.g. CoffeeShop_Guest"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-purple-600"
                />
              </div>

              <div>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                  Password
                </span>
                <div className="relative">
                  <input
                    type={showWifiPassword ? 'text' : 'password'}
                    value={config.wifiData.password}
                    onChange={(e) =>
                      onChange({
                        wifiData: { ...config.wifiData, password: e.target.value },
                      })
                    }
                    placeholder="Enter network password"
                    className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-purple-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowWifiPassword(!showWifiPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showWifiPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                    Security Type
                  </span>
                  <select
                    value={config.wifiData.encryption}
                    onChange={(e) =>
                      onChange({
                        wifiData: {
                          ...config.wifiData,
                          encryption: e.target.value as 'WPA' | 'WEP' | 'nopass',
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200"
                  >
                    <option value="WPA">WPA / WPA2 / WPA3 (Recommended)</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">No Password (Open)</option>
                  </select>
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.wifiData.hidden}
                      onChange={(e) =>
                        onChange({
                          wifiData: { ...config.wifiData, hidden: e.target.checked },
                        })
                      }
                      className="rounded text-purple-600"
                    />
                    <span>Hidden SSID</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. vCard Contact */}
        {config.contentType === 'vcard' && (
          <div className="space-y-4">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              vCard Digital Business Card
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                  First Name
                </span>
                <input
                  type="text"
                  value={config.vcardData.firstName}
                  onChange={(e) =>
                    onChange({
                      vcardData: { ...config.vcardData, firstName: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                />
              </div>
              <div>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                  Last Name
                </span>
                <input
                  type="text"
                  value={config.vcardData.lastName}
                  onChange={(e) =>
                    onChange({
                      vcardData: { ...config.vcardData, lastName: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                />
              </div>
              <div>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                  Phone Number
                </span>
                <input
                  type="tel"
                  value={config.vcardData.phone}
                  onChange={(e) =>
                    onChange({
                      vcardData: { ...config.vcardData, phone: e.target.value },
                    })
                  }
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                />
              </div>
              <div>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                  Email Address
                </span>
                <input
                  type="email"
                  value={config.vcardData.email}
                  onChange={(e) =>
                    onChange({
                      vcardData: { ...config.vcardData, email: e.target.value },
                    })
                  }
                  placeholder="contact@company.com"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                />
              </div>
              <div>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                  Company / Organization
                </span>
                <input
                  type="text"
                  value={config.vcardData.company}
                  onChange={(e) =>
                    onChange({
                      vcardData: { ...config.vcardData, company: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                />
              </div>
              <div>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                  Job Title
                </span>
                <input
                  type="text"
                  value={config.vcardData.title}
                  onChange={(e) =>
                    onChange({
                      vcardData: { ...config.vcardData, title: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* 5. Email */}
        {config.contentType === 'email' && (
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Email Dispatch
            </label>
            <div>
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                Recipient Email
              </span>
              <input
                type="email"
                value={config.emailData.email}
                onChange={(e) =>
                  onChange({
                    emailData: { ...config.emailData, email: e.target.value },
                  })
                }
                placeholder="hello@company.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
              />
            </div>
            <div>
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                Subject Line
              </span>
              <input
                type="text"
                value={config.emailData.subject}
                onChange={(e) =>
                  onChange({
                    emailData: { ...config.emailData, subject: e.target.value },
                  })
                }
                placeholder="e.g. VIP Inquiry"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
              />
            </div>
            <div>
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                Message Body
              </span>
              <textarea
                rows={3}
                value={config.emailData.body}
                onChange={(e) =>
                  onChange({
                    emailData: { ...config.emailData, body: e.target.value },
                  })
                }
                placeholder="Default message text..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { ToastMessage } from '../types/qr';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let icon = <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
        let borderClass = 'border-emerald-500/20 bg-emerald-50/90 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100';

        if (toast.type === 'error') {
          icon = <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />;
          borderClass = 'border-rose-500/20 bg-rose-50/90 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100';
        } else if (toast.type === 'info') {
          icon = <Info className="w-5 h-5 text-purple-500 shrink-0" />;
          borderClass = 'border-purple-500/20 bg-purple-50/90 dark:bg-purple-950/40 text-purple-950 dark:text-purple-100';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-lg transition-all duration-200 transform translate-y-0 ${borderClass}`}
          >
            <div className="flex items-center gap-2.5 text-sm font-medium">
              {icon}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-500 dark:text-slate-400"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

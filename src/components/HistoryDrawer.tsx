import React from 'react';
import { X, Clock, Trash2, ArrowUpRight, FolderOpen } from 'lucide-react';
import { QRHistoryItem, QRConfig } from '../types/qr';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: QRHistoryItem[];
  onLoadItem: (item: QRHistoryItem) => void;
  onDeleteItem: (id: string) => void;
  onClearAll: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onLoadItem,
  onDeleteItem,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl border-l border-slate-200 dark:border-slate-800 z-10 flex flex-col">
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                QR Code History
              </h3>
              <p className="text-xs text-slate-500">
                {history.length} {history.length === 1 ? 'item' : 'items'} stored locally
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {history.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                <FolderOpen className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  No QR codes saved yet
                </p>
                <p className="text-xs text-slate-400 max-w-xs">
                  Generate and download QR codes to automatically save your work here.
                </p>
              </div>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-purple-300 dark:hover:border-purple-700 transition-all group flex items-start justify-between gap-3"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                      {item.contentType}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {new Date(item.createdAt).toLocaleDateString()} ·{' '}
                      {new Date(item.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  <p className="text-xs font-mono text-slate-800 dark:text-slate-200 truncate">
                    {item.content}
                  </p>
                </div>

                <div className="flex items-center gap-1 shrink-0 pt-0.5">
                  <button
                    onClick={() => {
                      onLoadItem(item);
                      onClose();
                    }}
                    title="Load into Editor"
                    className="p-1.5 rounded-lg text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-950/60 transition-colors cursor-pointer"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteItem(item.id)}
                    title="Delete"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {history.length > 0 && (
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
            <button
              onClick={onClearAll}
              className="w-full py-2.5 px-4 rounded-xl border border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Entire History</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

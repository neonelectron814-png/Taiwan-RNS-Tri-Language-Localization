import React from 'react';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import type { ToastMessage } from '../types';

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let bgClass = 'bg-slate-900/85 dark:bg-slate-900/90 text-white border-white/20';
        let Icon = CheckCircle2;

        if (toast.type === 'warning') {
          bgClass = 'bg-amber-950/85 text-amber-100 border-amber-500/30';
          Icon = AlertTriangle;
        } else if (toast.type === 'info') {
          bgClass = 'bg-emerald-950/85 text-emerald-100 border-emerald-500/30';
          Icon = Info;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-2xl border backdrop-blur-xl shadow-2xl flex items-center justify-between gap-3 text-xs animate-in slide-in-from-bottom-2 duration-200 ${bgClass}`}
          >
            <div className="flex items-center gap-2.5">
              <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="leading-tight font-medium">{toast.message}</span>
            </div>
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 shrink-0 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Moon, Sun, GripHorizontal } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import type { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onToast: (msg: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  isDark,
  onToggleTheme,
  onToast,
}) => {
  const { t } = useTranslation('common');

  return (
    <header className="glass-header sticky top-0 z-40 mx-3 sm:mx-4 mt-3 mb-2 rounded-2xl border border-white/30 dark:border-white/10 shadow-lg backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-3 sm:gap-6 h-16 py-1">
          {/* Zone 1: Single Brand wordmark element + Drag Handle */}
          <div className="flex items-center gap-2 shrink-0">
            <div
              className="hidden sm:flex items-center justify-center text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-grab active:cursor-grabbing p-1 rounded-lg transition-colors"
              title="Header Bar (Draggable Island)"
            >
              <GripHorizontal className="w-4 h-4" />
            </div>

            <button
              type="button"
              onClick={() => onTabChange('dashboard')}
              className="flex items-center gap-2.5 text-left text-slate-900 dark:text-white whitespace-nowrap shrink-0 group focus-visible:outline-hidden cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center font-bold text-sm shadow-[0_4px_16px_rgba(16,185,129,0.3)] border border-emerald-300/40 group-hover:scale-105 transition-all">
                <ShieldCheck className="w-5 h-5 drop-shadow-xs" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight leading-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                  Taiwan-RNS
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-none hidden sm:inline">
                  {t('ministryBadge')}
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Active Section Breadcrumb Badge (Floating pill) */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/25 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 font-mono">
              {t(`nav.${activeTab}`)}
            </span>
          </div>

          {/* Zone 3: Actions - Language Selector, Theme Toggle & Citizen Status */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Global Language Switcher */}
            <LanguageSwitcher onLanguageChangeNotice={onToast} />

            {/* Dark / Light Mode Toggle */}
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label="Toggle dark mode"
              className="glass-button-secondary p-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white rounded-xl transition-all cursor-pointer shadow-xs"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Citizen Level 4 Badge */}
            <div className="hidden xl:flex items-center gap-2 pl-3 border-l border-slate-200/60 dark:border-slate-800/60 text-xs text-slate-600 dark:text-slate-400">
              <span className="font-medium text-slate-900 dark:text-slate-100">
                林美玲 (Lin Mei-Ling)
              </span>
              <span className="font-mono text-[11px] text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 dark:bg-emerald-500/15 backdrop-blur-md px-2 py-0.5 rounded-lg border border-emerald-500/25 shadow-xs">
                did:taiwan:89304a...
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

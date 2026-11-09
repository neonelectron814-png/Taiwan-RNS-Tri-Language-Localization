import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard,
  UserCheck,
  Home,
  Award,
  Grid,
  KeyRound,
  ShieldAlert,
  Settings as SettingsIcon,
  CheckCircle2,
  X,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import type { ActiveTab } from '../types';

interface AndroidNavigationProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const AndroidNavigation: React.FC<AndroidNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  const { t } = useTranslation('common');
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  // 4 Primary tabs displayed directly in the Android bottom dock
  const primaryTabs: { id: ActiveTab; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: t('nav.dashboard'), icon: LayoutDashboard },
    { id: 'identity', label: t('nav.identity'), icon: UserCheck },
    { id: 'household', label: t('nav.household'), icon: Home },
    { id: 'credentials', label: t('nav.credentials'), icon: Award },
  ];

  // Extended tabs displayed in the dedicated "More" Card
  const secondaryTabs: {
    id: ActiveTab;
    label: string;
    desc: string;
    icon: React.ElementType;
    badge?: string;
  }[] = [
    {
      id: 'verification',
      label: t('nav.verification'),
      desc: t('terms.zeroKnowledgeProof'),
      icon: KeyRound,
      badge: 'ZKP',
    },
    {
      id: 'admin',
      label: t('nav.admin'),
      desc: t('terms.publicLedger'),
      icon: ShieldAlert,
      badge: 'Level 4',
    },
    {
      id: 'settings',
      label: t('nav.settings'),
      desc: t('languages.selector'),
      icon: SettingsIcon,
    },
    {
      id: 'qa',
      label: t('nav.qaChecklist'),
      desc: 'en · zh-TW · nan-TW',
      icon: CheckCircle2,
      badge: '100%',
    },
  ];

  const isSecondaryActive = secondaryTabs.some((tab) => tab.id === activeTab);

  // Close sheet on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMoreOpen(false);
    };
    if (isMoreOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMoreOpen]);

  const handleSelectTab = (tab: ActiveTab) => {
    onTabChange(tab);
    setIsMoreOpen(false);
  };

  return (
    <>
      {/* "More" Extended Menu Card / Sheet (Mobile Android GlassyUI Card) */}
      {isMoreOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end p-4 pb-24 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200">
          {/* Backdrop click to dismiss */}
          <div
            className="fixed inset-0 -z-10"
            onClick={() => setIsMoreOpen(false)}
            aria-hidden="true"
          />

          {/* Floating Glass Card with Extended Menus */}
          <div className="glass-panel rounded-3xl p-5 border border-white/20 dark:border-white/10 shadow-2xl max-w-md w-full mx-auto animate-in slide-in-from-bottom-6 duration-250">
            {/* Sheet Header */}
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-200/60 dark:border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center shadow-md">
                  <Grid className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    {t('nav.more')}
                  </h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    Taiwan-RNS Extended Services
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsMoreOpen(false)}
                className="w-8 h-8 rounded-xl glass-button-secondary flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white cursor-pointer transition-colors"
                aria-label={t('actions.close')}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Grid of Extended Menu Items */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {secondaryTabs.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectTab(item.id)}
                    className={`p-3.5 rounded-2xl text-left transition-all flex flex-col justify-between cursor-pointer ${
                      isActive
                        ? 'glass-card ring-2 ring-emerald-500/60 border-emerald-500/60 shadow-lg shadow-emerald-500/10'
                        : 'glass-card-interactive hover:bg-white/70 dark:hover:bg-slate-800/70'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          isActive
                            ? 'bg-emerald-600 text-white shadow-md'
                            : 'bg-emerald-500/15 dark:bg-emerald-400/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      {item.badge && (
                        <span className="text-[9px] font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 px-1.5 py-0.5 rounded-md border border-emerald-500/20">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                        {item.label}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {item.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Citizen Status Mini Badge Footer */}
            <div className="pt-3 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 px-1">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>林美玲 (Lin Mei-Ling)</span>
              </div>
              <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
                Level 4 Active
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Android Bottom Navigation Dock */}
      <nav
        aria-label={t('nav.androidBar')}
        className="md:hidden fixed bottom-4 inset-x-3 sm:inset-x-6 max-w-md mx-auto z-40 glass-dock rounded-2xl p-1.5 shadow-2xl transition-all"
      >
        <div className="grid grid-cols-5 items-center gap-1">
          {/* 4 Primary Navigation Tabs */}
          {primaryTabs.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectTab(item.id)}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-semibold shadow-[0_4px_16px_rgba(16,185,129,0.35)] border border-emerald-400/40'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
                }`}
              >
                <Icon
                  className={`w-4 h-4 mb-1 transition-transform ${
                    isActive ? 'scale-110 text-white' : 'text-slate-500 dark:text-slate-400'
                  }`}
                />
                <span className="text-[10px] font-medium leading-none truncate max-w-full text-center">
                  {item.label}
                </span>
              </button>
            );
          })}

          {/* 5th Tab: "More" button that toggles the Extended Menu Card */}
          <button
            type="button"
            onClick={() => setIsMoreOpen((prev) => !prev)}
            aria-expanded={isMoreOpen}
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all cursor-pointer relative ${
              isMoreOpen || isSecondaryActive
                ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-semibold shadow-[0_4px_16px_rgba(16,185,129,0.35)] border border-emerald-400/40'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
            }`}
          >
            <Grid
              className={`w-4 h-4 mb-1 transition-transform ${
                isMoreOpen || isSecondaryActive
                  ? 'scale-110 text-white rotate-45'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            />
            <span className="text-[10px] font-medium leading-none truncate max-w-full text-center">
              {t('nav.more')}
            </span>
            {isSecondaryActive && !isMoreOpen && (
              <span className="absolute top-1.5 right-2 w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping" />
            )}
          </button>
        </div>
      </nav>
    </>
  );
};

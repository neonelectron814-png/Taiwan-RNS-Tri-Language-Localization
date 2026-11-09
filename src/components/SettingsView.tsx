import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Settings as SettingsIcon,
  Globe,
  Sun,
  Moon,
  Laptop,
  KeyRound,
  Download,
  ShieldCheck,
} from 'lucide-react';
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from '../i18n';

interface SettingsViewProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onToast: (msg: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  isDark,
  onToggleTheme,
  onToast,
}) => {
  const { t, i18n } = useTranslation(['settings', 'common']);

  const currentLang = i18n.language as SupportedLanguage;

  const handleSelectLanguage = (code: SupportedLanguage) => {
    i18n.changeLanguage(code);
    onToast(t('common:notifications.languageChanged'));
  };

  const handleExportKeys = () => {
    onToast(t('securitySection.keysBackedUp'));
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {t('title')}
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          {t('subtitle')}
        </p>
      </div>

      {/* Language Section */}
      <div className="glass-panel p-6 sm:p-7 space-y-5">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 dark:bg-emerald-400/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Globe className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {t('languageSection.title')}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {t('languageSection.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = lang.code === currentLang;
            let desc = '';
            if (lang.code === 'en') desc = t('languageSection.enDesc');
            if (lang.code === 'zh-TW') desc = t('languageSection.zhTWDesc');
            if (lang.code === 'nan-TW') desc = t('languageSection.nanTWDesc');

            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSelectLanguage(lang.code)}
                className={`p-4 text-left rounded-2xl transition-all flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'glass-card ring-2 ring-emerald-500/50 shadow-lg shadow-emerald-500/10 border-emerald-500/60 dark:border-emerald-400/60'
                    : 'glass-card-interactive opacity-80 hover:opacity-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-7 h-7 rounded-lg bg-emerald-500/15 dark:bg-emerald-400/15 font-mono text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center justify-center border border-emerald-500/20">
                      {lang.script}
                    </span>
                    {isSelected && (
                      <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        {t('languageSection.current')}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {lang.label}
                  </h3>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{lang.enLabel}</div>
                  <p className="mt-3 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Theme Section */}
      <div className="glass-panel p-6 sm:p-7 space-y-5">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 dark:bg-amber-400/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Sun className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {t('themeSection.title')}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {t('themeSection.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <button
            type="button"
            onClick={() => {
              if (isDark) onToggleTheme();
            }}
            className={`p-4 rounded-2xl text-left transition-all flex items-center justify-between cursor-pointer ${
              !isDark
                ? 'glass-card ring-2 ring-emerald-500/50 shadow-lg shadow-emerald-500/10 border-emerald-500/60 dark:border-emerald-400/60'
                : 'glass-card-interactive opacity-80 hover:opacity-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-500 border border-amber-500/20">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  {t('themeSection.light')}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Government Standard Bright</span>
              </div>
            </div>
            {!isDark && (
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">Active</span>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              if (!isDark) onToggleTheme();
            }}
            className={`p-4 rounded-2xl text-left transition-all flex items-center justify-between cursor-pointer ${
              isDark
                ? 'glass-card ring-2 ring-emerald-500/50 shadow-lg shadow-emerald-500/10 border-emerald-500/60 dark:border-emerald-400/60'
                : 'glass-card-interactive opacity-80 hover:opacity-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                <Moon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  {t('themeSection.dark')}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">OLED High-Contrast Dark</span>
              </div>
            </div>
            {isDark && (
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">Active</span>
            )}
          </button>
        </div>
      </div>

      {/* Security Section */}
      <div className="glass-panel p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 dark:bg-emerald-400/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <KeyRound className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {t('securitySection.title')}
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {t('securitySection.description')}
            </p>
            <div className="mt-2 text-xs font-mono text-emerald-700 dark:text-emerald-400">
              {t('securitySection.keyType')}
            </div>
          </div>

          <button
            type="button"
            onClick={handleExportKeys}
            className="glass-button-primary px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 shrink-0 whitespace-nowrap cursor-pointer shadow-lg"
          >
            <Download className="w-4 h-4" />
            <span>{t('securitySection.exportKeys')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

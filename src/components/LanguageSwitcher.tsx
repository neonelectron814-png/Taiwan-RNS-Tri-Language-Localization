import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from '../i18n';

interface LanguageSwitcherProps {
  onLanguageChangeNotice?: (msg: string) => void;
  variant?: 'header' | 'compact' | 'segmented';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  onLanguageChangeNotice,
  variant = 'header',
}) => {
  const { i18n, t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = i18n.language as SupportedLanguage;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (langCode: SupportedLanguage) => {
    if (langCode === currentLang) {
      setIsOpen(false);
      return;
    }
    i18n.changeLanguage(langCode);
    setIsOpen(false);
    if (onLanguageChangeNotice) {
      onLanguageChangeNotice(t('notifications.languageChanged'));
    }
  };

  const currentLangObj =
    SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  if (variant === 'segmented') {
    return (
      <div className="flex items-center gap-1.5 p-1.5 glass-panel rounded-xl">
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isActive = lang.code === currentLang;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleSelectLanguage(lang.code)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-[0_2px_10px_rgba(16,185,129,0.3)] font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <span className="inline-block mr-1.5 text-slate-400 dark:text-slate-400 font-mono text-[11px]">
                {lang.script}
              </span>
              {lang.label}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={t('languages.selector')}
        className="glass-button-secondary flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 rounded-xl transition-all whitespace-nowrap shrink-0"
      >
        <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <span className="font-semibold text-slate-900 dark:text-white">
          {currentLangObj.label}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label={t('languages.selector')}
          className="absolute right-0 mt-2 w-52 glass-panel rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.18)] p-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
        >
          <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider border-b border-slate-200/50 dark:border-slate-800/60 mb-1">
            {t('languages.selector')}
          </div>
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = lang.code === currentLang;
            return (
              <button
                key={lang.code}
                role="option"
                aria-selected={isSelected}
                type="button"
                onClick={() => handleSelectLanguage(lang.code)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-500/25'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 text-center text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400 bg-slate-200/50 dark:bg-slate-800/80 rounded-md py-0.5">
                    {lang.script}
                  </span>
                  <span>{lang.label}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

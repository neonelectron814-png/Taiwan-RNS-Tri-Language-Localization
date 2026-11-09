import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  CheckCircle2,
  Table,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from '../i18n';

interface QAChecklistViewProps {
  onToast: (msg: string) => void;
}

export const QAChecklistView: React.FC<QAChecklistViewProps> = ({ onToast }) => {
  const { t, i18n } = useTranslation(['qa', 'common']);
  const currentLang = i18n.language as SupportedLanguage;

  const checklistItems = [
    'item1',
    'item2',
    'item3',
    'item4',
    'item5',
    'item6',
    'item7',
    'item8',
  ] as const;

  const terminologyRows = [
    {
      concept: 'Digital Identity',
      en: 'Digital Identity',
      zhTW: '數位身分',
      nanTW: '數位身分 (Sò͘-ūi Sin-hun)',
    },
    {
      concept: 'Household Registration',
      en: 'Household Registration',
      zhTW: '戶籍登記',
      nanTW: '戶口登記 (Hō͘-kháu Teng-kì)',
    },
    {
      concept: 'Verifiable Credentials',
      en: 'Verifiable Credentials',
      zhTW: '可驗證憑證',
      nanTW: '可驗證憑證 (Khó Giām-chèng Pîn-chèng)',
    },
    {
      concept: 'Identity Verification',
      en: 'Identity Verification',
      zhTW: '身分驗證',
      nanTW: '身分驗證 (Sin-hun Giām-chèng)',
    },
    {
      concept: 'Privacy Protection',
      en: 'Privacy Protection',
      zhTW: '隱私保護',
      nanTW: '隱私保護 (Ín-su Pó-hō͘)',
    },
    {
      concept: 'Zero-Knowledge Proof',
      en: 'Zero-Knowledge Proof',
      zhTW: '零知識證明',
      nanTW: '零知識證明 (Lêng-ti-sek Chèng-bêng)',
    },
    {
      concept: 'Government Organization',
      en: 'Government Organization',
      zhTW: '政府機關',
      nanTW: '政府機關 (Chèng-hú Ki-koan)',
    },
    {
      concept: 'Household Head',
      en: 'Head of Household',
      zhTW: '戶長',
      nanTW: '戶長 (Hō͘-tiúⁿ)',
    },
    {
      concept: 'Household Transcript',
      en: 'Household Certified Transcript',
      zhTW: '戶籍謄本證明書',
      nanTW: '戶口謄本證明書 (Hō͘-kháu Thêng-pún)',
    },
    {
      concept: 'Decentralized Identifier',
      en: 'Decentralized Identifier (DID)',
      zhTW: '分散式身分識別碼 (DID)',
      nanTW: '分散式身分識別碼 (Hun-sàn-sek DID)',
    },
  ];

  const handleQuickSwitch = (langCode: SupportedLanguage) => {
    i18n.changeLanguage(langCode);
    onToast(t('common:notifications.languageChanged'));
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

      {/* Interactive Quick Switch Stress Test Box */}
      <div className="glass-panel p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 dark:bg-emerald-400/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                {t('liveTest.title')}
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {t('liveTest.description')}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isActive = lang.code === currentLang;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleQuickSwitch(lang.code)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer shadow-sm ${
                    isActive
                      ? 'glass-button-primary ring-2 ring-emerald-500/50'
                      : 'glass-button-secondary'
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-75">{lang.script}</span>
                  <span>{lang.label}</span>
                  {isActive && <Check className="w-3.5 h-3.5" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 8-Point Compliance Checklist */}
      <div className="glass-panel p-6 sm:p-7 space-y-5">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 dark:bg-emerald-400/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {t('checklistTitle')}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {t('checklistSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {checklistItems.map((item) => (
            <div
              key={item}
              className="glass-card p-4 rounded-2xl flex items-start gap-3.5"
            >
              <div className="w-7 h-7 rounded-full bg-emerald-500/15 dark:bg-emerald-400/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/25">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {t(`items.${item}.title`)}
                  </h3>
                  <span className="text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 dark:bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-500/30 shrink-0">
                    {t(`items.${item}.status`)}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t(`items.${item}.desc`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Terminology Matrix Table */}
      <div className="glass-panel overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200/60 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 dark:bg-emerald-400/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Table className="w-4 h-4" />
            </div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              {t('terminologyTitle')}
            </h2>
          </div>
          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">Section 4 Requirement</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[580px]">
            <thead className="bg-slate-100/50 dark:bg-slate-800/40 backdrop-blur-md text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200/60 dark:border-white/10">
              <tr>
                <th className="py-3 px-4">{t('cols.term')}</th>
                <th className="py-3 px-4">{t('cols.en')}</th>
                <th className="py-3 px-4">{t('cols.zhTW')}</th>
                <th className="py-3 px-4">{t('cols.nanTW')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/50 dark:divide-white/5">
              {terminologyRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-emerald-500/5 dark:hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 font-mono font-semibold text-slate-500 dark:text-slate-400">
                    {row.concept}
                  </td>
                  <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                    {row.en}
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-900 dark:text-slate-100">
                    {row.zhTW}
                  </td>
                  <td className="py-3 px-4 font-semibold text-emerald-700 dark:text-emerald-400">
                    {row.nanTW}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

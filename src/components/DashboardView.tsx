import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Users,
  ShieldCheck,
  Zap,
  Activity,
  ArrowUpRight,
  FileText,
  KeyRound,
  ExternalLink,
} from 'lucide-react';
import type { ActiveTab } from '../types';

interface DashboardViewProps {
  onNavigate: (tab: ActiveTab) => void;
  onToast: (msg: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate, onToast }) => {
  const { t } = useTranslation(['dashboard', 'common']);
  const [selectedMonth, setSelectedMonth] = useState<string>('jun');

  const chartData = [
    { monthKey: 'jan', zkp: 420, standard: 680, share: '38.2%' },
    { monthKey: 'feb', zkp: 530, standard: 710, share: '42.7%' },
    { monthKey: 'mar', zkp: 690, standard: 740, share: '48.3%' },
    { monthKey: 'apr', zkp: 840, standard: 720, share: '53.8%' },
    { monthKey: 'may', zkp: 1050, standard: 760, share: '58.0%' },
    { monthKey: 'jun', zkp: 1289, standard: 780, share: '62.3%' },
  ];

  const activeMonthData = chartData.find((d) => d.monthKey === selectedMonth) || chartData[5];

  return (
    <div className="space-y-6">
      {/* Welcome Banner - Glass Holographic Smart Card */}
      <div className="glass-smart-card text-white rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 mb-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 drop-shadow-xs" />
              <span className="tracking-wide">{t('citizenStatus')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {t('welcomeTitle', { name: '林美玲 Lin Mei-Ling' })}
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-200/90 max-w-2xl leading-relaxed">
              {t('welcomeSubtitle')}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('verification')}
              className="glass-button-primary px-4 py-2.5 text-white font-semibold text-xs rounded-xl shadow-lg flex items-center gap-1.5 whitespace-nowrap"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{t('quickActions.generateProofTitle')}</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('household')}
              className="glass-button-secondary px-4 py-2.5 text-white font-medium text-xs rounded-xl border border-white/20 hover:border-white/40 flex items-center gap-1.5 whitespace-nowrap bg-white/10 hover:bg-white/20"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-300" />
              <span>{t('quickActions.viewHouseholdTitle')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid - Glass Cards with Specular Highlight */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Verified Citizens */}
        <div className="glass-card glass-card-interactive rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2.5">
            <span className="text-xs font-medium">{t('stats.verifiedCitizens')}</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center border border-emerald-500/20">
              <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-mono tabular-nums">
            23,418,920
          </div>
          <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            {t('stats.verifiedCitizensSub')}
          </div>
        </div>

        {/* Active Verifiable Credentials */}
        <div className="glass-card glass-card-interactive rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2.5">
            <span className="text-xs font-medium">{t('stats.activeCredentials')}</span>
            <div className="w-8 h-8 rounded-xl bg-teal-500/10 dark:bg-teal-500/20 flex items-center justify-center border border-teal-500/20">
              <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            </div>
          </div>
          <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-mono tabular-nums">
            41,892,105
          </div>
          <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            {t('stats.activeCredentialsSub')}
          </div>
        </div>

        {/* Daily ZKP Verifications */}
        <div className="glass-card glass-card-interactive rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2.5">
            <span className="text-xs font-medium">{t('stats.dailyZkpVerifications')}</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center border border-emerald-500/20">
              <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-mono tabular-nums">
            1,289,430
          </div>
          <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            {t('stats.dailyZkpVerificationsSub')}
          </div>
        </div>

        {/* Cryptographic Uptime */}
        <div className="glass-card glass-card-interactive rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2.5">
            <span className="text-xs font-medium">{t('stats.cryptographicUptime')}</span>
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/20 flex items-center justify-center border border-cyan-500/20">
              <Activity className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            </div>
          </div>
          <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-mono tabular-nums">
            99.99%
          </div>
          <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            {t('stats.cryptographicUptimeSub')}
          </div>
        </div>
      </div>

      {/* Chart Section - Glass Panel */}
      <div className="glass-panel rounded-2xl p-6 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {t('chart.title')}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {t('chart.subtitle')}
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-xs bg-emerald-600 dark:bg-emerald-500 inline-block"></span>
              <span className="text-slate-600 dark:text-slate-400">{t('chart.legendZkp')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-xs bg-slate-300 dark:bg-slate-700 inline-block"></span>
              <span className="text-slate-600 dark:text-slate-400">{t('chart.legendStandard')}</span>
            </div>
          </div>
        </div>

        {/* Interactive SVG Bar & Trend Chart */}
        <div className="relative pt-4">
          <div className="grid grid-cols-6 gap-2 sm:gap-6 items-end h-56 border-b border-slate-200 dark:border-slate-800 pb-2">
            {chartData.map((d) => {
              const isSelected = d.monthKey === selectedMonth;
              const zkpHeight = (d.zkp / 1400) * 100;
              const stdHeight = (d.standard / 1400) * 100;
              return (
                <button
                  key={d.monthKey}
                  type="button"
                  onClick={() => setSelectedMonth(d.monthKey)}
                  className={`group flex flex-col items-center justify-end h-full focus:outline-hidden transition-all ${
                    isSelected ? 'opacity-100' : 'opacity-85 hover:opacity-100'
                  }`}
                >
                  <div className="w-full flex items-end justify-center gap-1 sm:gap-2 h-44">
                    {/* ZKP Bar */}
                    <div
                      style={{ height: `${zkpHeight}%` }}
                      className={`w-1/2 max-w-[28px] rounded-t-sm transition-all ${
                        isSelected
                          ? 'bg-emerald-600 dark:bg-emerald-500 ring-2 ring-emerald-400'
                          : 'bg-emerald-500/80 group-hover:bg-emerald-600'
                      }`}
                    />
                    {/* Standard Bar */}
                    <div
                      style={{ height: `${stdHeight}%` }}
                      className={`w-1/2 max-w-[28px] rounded-t-sm transition-all ${
                        isSelected
                          ? 'bg-slate-400 dark:bg-slate-600 ring-2 ring-slate-300'
                          : 'bg-slate-200 dark:bg-slate-700 group-hover:bg-slate-300'
                      }`}
                    />
                  </div>
                  <span
                    className={`mt-2 text-xs font-medium font-mono ${
                      isSelected
                        ? 'text-emerald-700 dark:text-emerald-400 font-bold'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {t(`chart.months.${d.monthKey}`)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Month Detail Badge */}
          <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {t(`chart.months.${activeMonthData.monthKey}`)}:
              </span>
              <span className="font-mono tabular-nums text-emerald-700 dark:text-emerald-400 font-semibold">
                {activeMonthData.zkp}k ZKP
              </span>
              <span>·</span>
              <span className="font-mono tabular-nums text-slate-600 dark:text-slate-400">
                {activeMonthData.standard}k Standard
              </span>
            </div>
            <div className="font-mono text-emerald-600 dark:text-emerald-400 font-medium">
              {t('chart.zkpShare')}: {activeMonthData.share}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Verification Activity Table - Glass Panel */}
      <div className="glass-panel rounded-2xl overflow-hidden shadow-sm transition-colors">
        <div className="px-6 py-4 border-b border-slate-200/60 dark:border-white/10 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {t('recentActivity.title')}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t('recentActivity.subtitle')}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('admin')}
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 flex items-center gap-1 transition-colors"
          >
            <span>{t('common:actions.viewDetails')}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[580px]">
            <thead className="bg-slate-100/60 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 font-medium border-b border-slate-200/60 dark:border-white/10">
              <tr>
                <th className="py-3 px-4">{t('recentActivity.colTime')}</th>
                <th className="py-3 px-4">{t('recentActivity.colRequester')}</th>
                <th className="py-3 px-4">{t('recentActivity.colCredential')}</th>
                <th className="py-3 px-4">{t('recentActivity.colMethod')}</th>
                <th className="py-3 px-4 text-right">{t('recentActivity.colStatus')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80 dark:divide-white/5">
              <tr className="hover:bg-emerald-500/5 dark:hover:bg-emerald-400/5 transition-colors">
                <td className="py-3.5 px-4 font-mono tabular-nums text-slate-500 dark:text-slate-400">
                  2026-11-08 09:42:15
                </td>
                <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-slate-100">
                  {t('recentActivity.activities.act1.agency')}
                </td>
                <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                  {t('recentActivity.activities.act1.credential')}
                </td>
                <td className="py-3.5 px-4">
                  <span className="font-mono text-[11px] text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 dark:bg-emerald-500/20 px-2 py-0.5 rounded-md border border-emerald-500/25">
                    {t('recentActivity.activities.act1.method')}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                    {t('recentActivity.activities.act1.status')}
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-emerald-500/5 dark:hover:bg-emerald-400/5 transition-colors">
                <td className="py-3.5 px-4 font-mono tabular-nums text-slate-500 dark:text-slate-400">
                  2026-11-08 08:15:32
                </td>
                <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-slate-100">
                  {t('recentActivity.activities.act2.agency')}
                </td>
                <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                  {t('recentActivity.activities.act2.credential')}
                </td>
                <td className="py-3.5 px-4">
                  <span className="font-mono text-[11px] text-slate-700 dark:text-slate-300 bg-slate-200/50 dark:bg-slate-700/50 px-2 py-0.5 rounded-md border border-slate-300/50 dark:border-slate-600/50">
                    {t('recentActivity.activities.act2.method')}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                    {t('recentActivity.activities.act2.status')}
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-emerald-500/5 dark:hover:bg-emerald-400/5 transition-colors">
                <td className="py-3.5 px-4 font-mono tabular-nums text-slate-500 dark:text-slate-400">
                  2026-11-07 16:30:00
                </td>
                <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-slate-100">
                  {t('recentActivity.activities.act3.agency')}
                </td>
                <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                  {t('recentActivity.activities.act3.credential')}
                </td>
                <td className="py-3.5 px-4">
                  <span className="font-mono text-[11px] text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 dark:bg-emerald-500/20 px-2 py-0.5 rounded-md border border-emerald-500/25">
                    {t('recentActivity.activities.act3.method')}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                    {t('recentActivity.activities.act3.status')}
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-emerald-500/5 dark:hover:bg-emerald-400/5 transition-colors">
                <td className="py-3.5 px-4 font-mono tabular-nums text-slate-500 dark:text-slate-400">
                  2026-11-06 11:05:44
                </td>
                <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-slate-100">
                  {t('recentActivity.activities.act4.agency')}
                </td>
                <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                  {t('recentActivity.activities.act4.credential')}
                </td>
                <td className="py-3.5 px-4">
                  <span className="font-mono text-[11px] text-slate-700 dark:text-slate-300 bg-slate-200/50 dark:bg-slate-700/50 px-2 py-0.5 rounded-md border border-slate-300/50 dark:border-slate-600/50">
                    {t('recentActivity.activities.act4.method')}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                    {t('recentActivity.activities.act4.status')}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Action Cards - Glass Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          type="button"
          onClick={() => onNavigate('verification')}
          className="glass-card glass-card-interactive p-5 text-left rounded-2xl group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform border border-emerald-500/20">
            <Zap className="w-5 h-5" />
          </div>
          <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between">
            <span>{t('quickActions.generateProofTitle')}</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
          </div>
          <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {t('quickActions.generateProofDesc')}
          </p>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('household')}
          className="glass-card glass-card-interactive p-5 text-left rounded-2xl group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform border border-emerald-500/20">
            <FileText className="w-5 h-5" />
          </div>
          <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between">
            <span>{t('quickActions.viewHouseholdTitle')}</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
          </div>
          <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {t('quickActions.viewHouseholdDesc')}
          </p>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('credentials')}
          className="glass-card glass-card-interactive p-5 text-left rounded-2xl group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform border border-teal-500/20">
            <KeyRound className="w-5 h-5" />
          </div>
          <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between">
            <span>{t('quickActions.requestCredentialTitle')}</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
          </div>
          <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {t('quickActions.requestCredentialDesc')}
          </p>
        </button>
      </div>
    </div>
  );
};

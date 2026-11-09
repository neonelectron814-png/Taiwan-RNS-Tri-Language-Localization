import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ShieldAlert,
  Server,
  Activity,
  CheckCircle,
  Clock,
  Filter,
  Check,
  Radio,
} from 'lucide-react';
import type { AuditRecord } from '../types';

interface AdminViewProps {
  onToast: (msg: string) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ onToast }) => {
  const { t } = useTranslation(['admin', 'common']);

  const [agencyFilter, setAgencyFilter] = useState('all');

  const [auditLogs] = useState<AuditRecord[]>([
    {
      id: 'aud-001',
      timestamp: '2026-11-08 09:51:02',
      agencyKey: 'agencies.moda',
      eventTypeKey: 'events.ev4',
      proofStandard: 'Groth16 zk-SNARK / BN254',
      auditHash: '0x3a7e...91f0',
      statusKey: 'common:status.valid',
    },
    {
      id: 'aud-002',
      timestamp: '2026-11-08 09:44:18',
      agencyKey: 'agencies.moi',
      eventTypeKey: 'events.ev2',
      proofStandard: 'Ed25519-2026 Key Attestation',
      auditHash: '0x88c1...e45b',
      statusKey: 'common:status.valid',
    },
    {
      id: 'aud-003',
      timestamp: '2026-11-08 09:30:45',
      agencyKey: 'agencies.moi',
      eventTypeKey: 'events.ev3',
      proofStandard: 'BBS+ Selective Credential Proof',
      auditHash: '0x55d2...107a',
      statusKey: 'common:status.valid',
    },
    {
      id: 'aud-004',
      timestamp: '2026-11-08 08:00:00',
      agencyKey: 'agencies.moda',
      eventTypeKey: 'events.ev1',
      proofStandard: 'X.509 GCA Trust Anchor CRL',
      auditHash: '0x10fa...66e2',
      statusKey: 'common:status.valid',
    },
  ]);

  const filteredLogs = auditLogs.filter((log) => {
    if (agencyFilter === 'all') return true;
    return log.agencyKey.includes(agencyFilter);
  });

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

      {/* Metrics Strip - Glass Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card glass-card-interactive rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2.5">
            <span className="text-xs font-medium">{t('metrics.activeNodes')}</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center border border-emerald-500/20">
              <Server className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-mono tabular-nums">
            64
          </div>
          <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            {t('metrics.activeNodesSub')}
          </div>
        </div>

        <div className="glass-card glass-card-interactive rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2.5">
            <span className="text-xs font-medium">{t('metrics.verificationLatency')}</span>
            <div className="w-8 h-8 rounded-xl bg-teal-500/10 dark:bg-teal-500/20 flex items-center justify-center border border-teal-500/20">
              <Activity className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            </div>
          </div>
          <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-mono tabular-nums">
            18ms
          </div>
          <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            {t('metrics.verificationLatencySub')}
          </div>
        </div>

        <div className="glass-card glass-card-interactive rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2.5">
            <span className="text-xs font-medium">{t('metrics.dailyThroughput')}</span>
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/20 flex items-center justify-center border border-cyan-500/20">
              <Activity className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            </div>
          </div>
          <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-mono tabular-nums">
            2,481,200
          </div>
          <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            {t('metrics.dailyThroughputSub')}
          </div>
        </div>

        <div className="glass-card glass-card-interactive rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2.5">
            <span className="text-xs font-medium">{t('metrics.securityAlerts')}</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center border border-emerald-500/20">
              <ShieldAlert className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-mono tabular-nums">
            0
          </div>
          <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            {t('metrics.securityAlertsSub')}
          </div>
        </div>
      </div>

      {/* Node Cluster Health Status - Glass Panel */}
      <div className="glass-panel rounded-2xl p-6 shadow-sm transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-3.5 border-b border-slate-200/60 dark:border-white/10">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {t('nodeManagement.title')}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t('nodeManagement.subtitle')}
            </p>
          </div>
          <div className="text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 dark:bg-emerald-500/20 px-3 py-1.5 rounded-xl border border-emerald-500/25">
            {t('nodeManagement.keyRotation')}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl glass-card">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-slate-900 dark:text-white">
                {t('nodeManagement.nodeTaipei')}
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 text-[11px] font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-md">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>ONLINE</span>
              </span>
            </div>
            <div className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
              Latency: 1.2ms · Consensus: 100%
            </div>
          </div>

          <div className="p-4 rounded-xl glass-card">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-slate-900 dark:text-white">
                {t('nodeManagement.nodeTaichung')}
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 text-[11px] font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-md">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>ONLINE</span>
              </span>
            </div>
            <div className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
              Latency: 2.4ms · Consensus: 100%
            </div>
          </div>

          <div className="p-4 rounded-xl glass-card">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-slate-900 dark:text-white">
                {t('nodeManagement.nodeKaohsiung')}
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 text-[11px] font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-md">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>ONLINE</span>
              </span>
            </div>
            <div className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
              Latency: 3.1ms · Consensus: 100%
            </div>
          </div>
        </div>
      </div>

      {/* Real-Time Audit Table - Glass Panel */}
      <div className="glass-panel rounded-2xl overflow-hidden shadow-sm transition-colors">
        <div className="px-6 py-4 border-b border-slate-200/60 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {t('auditTable.title')}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t('auditTable.subtitle')}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={agencyFilter}
              onChange={(e) => setAgencyFilter(e.target.value)}
              className="glass-input px-3.5 py-1.5 text-xs rounded-xl text-slate-800 dark:text-slate-200"
            >
              <option value="all">{t('auditTable.filterAll')}</option>
              <option value="moi">{t('auditTable.agencies.moi')}</option>
              <option value="moda">{t('auditTable.agencies.moda')}</option>
              <option value="mohw">{t('auditTable.agencies.mohw')}</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[640px]">
            <thead className="bg-slate-100/60 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 font-medium border-b border-slate-200/60 dark:border-white/10">
              <tr>
                <th className="py-3 px-4">{t('auditTable.cols.timestamp')}</th>
                <th className="py-3 px-4">{t('auditTable.cols.agency')}</th>
                <th className="py-3 px-4">{t('auditTable.cols.eventType')}</th>
                <th className="py-3 px-4">{t('auditTable.cols.proofStandard')}</th>
                <th className="py-3 px-4">{t('auditTable.cols.auditHash')}</th>
                <th className="py-3 px-4 text-right">{t('auditTable.cols.status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80 dark:divide-white/5">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-emerald-500/5 dark:hover:bg-emerald-400/5 transition-colors">
                  <td className="py-3.5 px-4 font-mono tabular-nums text-slate-500 dark:text-slate-400">
                    {log.timestamp}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-slate-100">
                    {t(log.agencyKey as any)}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">
                    {t(log.eventTypeKey as any)}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                    {log.proofStandard}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-emerald-700 dark:text-emerald-300">
                    {log.auditHash}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      {t(log.statusKey as any)}
                    </span>
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

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FileText,
  Users,
  Send,
  Building,
  CheckCircle2,
  Calendar,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import type { HouseholdMember } from '../types';

interface HouseholdViewProps {
  onToast: (msg: string) => void;
}

export const HouseholdView: React.FC<HouseholdViewProps> = ({ onToast }) => {
  const { t } = useTranslation(['household', 'common']);

  const [members] = useState<HouseholdMember[]>([
    {
      id: 'm1',
      relationKey: 'members.head',
      name: '林美玲 (Lin Mei-Ling)',
      nationalId: 'A223456789',
      birthDate: '1995-04-12',
      statusKey: 'members.activeRecord',
    },
    {
      id: 'm2',
      relationKey: 'members.father',
      name: '林銘宏 (Lin Ming-Hong)',
      nationalId: 'A109823488',
      birthDate: '1963-08-20',
      statusKey: 'members.activeRecord',
    },
    {
      id: 'm3',
      relationKey: 'members.mother',
      name: '陳月霞 (Chen Yue-Xia)',
      nationalId: 'F220194831',
      birthDate: '1965-11-03',
      statusKey: 'members.activeRecord',
    },
    {
      id: 'm4',
      relationKey: 'members.sister',
      name: '林美宣 (Lin Mei-Hsuan)',
      nationalId: 'A230491823',
      birthDate: '1998-09-25',
      statusKey: 'members.activeRecord',
    },
  ]);

  const [transferForm, setTransferForm] = useState({
    moveType: 'in',
    newCity: '臺北市',
    newDistrict: '信義區',
    newAddress: '松仁路 100 號 12 樓',
    moveReason: 'job',
    effectiveDate: '2026-12-01',
  });

  const [recentApplications, setRecentApplications] = useState([
    {
      id: 'TW-HH-2026-9042',
      date: '2026-11-08',
      target: '臺北市信義區松仁路 100 號',
      status: 'pending',
    },
  ]);

  const handleSubmitTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `TW-HH-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setRecentApplications([
      {
        id: newId,
        date: new Date().toISOString().split('T')[0],
        target: `${transferForm.newCity}${transferForm.newDistrict}${transferForm.newAddress}`,
        status: 'pending',
      },
      ...recentApplications,
    ]);
    onToast(t('transferForm.successNotice'));
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

      {/* Official Certified Household Transcript Card - Glass Smart Card */}
      <div className="glass-smart-card text-white rounded-3xl p-6 sm:p-7 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/15 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md text-emerald-300 flex items-center justify-center font-bold border border-white/20 shadow-md">
                <FileText className="w-5 h-5 drop-shadow-xs" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-emerald-300 tracking-wide uppercase bg-emerald-500/15 px-2 py-0.5 rounded-md border border-emerald-400/25">
                  {t('householdCard.badge')}
                </span>
                <h2 className="text-base font-bold text-white mt-1">
                  {t('householdCard.registrationOfficeVal')}
                </h2>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-300 bg-slate-950/40 px-3 py-1.5 rounded-xl border border-white/10">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>SHA-256: 7f3a9e...4b81c</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 py-4 text-xs">
            <div className="bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/10">
              <span className="text-slate-300 block text-[11px] mb-0.5">{t('householdCard.householdNumber')}</span>
              <span className="font-mono font-bold text-white text-base">
                A1098234-88
              </span>
            </div>
            <div className="bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/10">
              <span className="text-slate-300 block text-[11px] mb-0.5">{t('householdCard.householdType')}</span>
              <span className="font-semibold text-white">
                {t('householdCard.householdTypeVal')}
              </span>
            </div>
            <div className="bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/10">
              <span className="text-slate-300 block text-[11px] mb-0.5">{t('householdCard.headOfHousehold')}</span>
              <span className="font-semibold text-white">
                林美玲 (Lin Mei-Ling)
              </span>
            </div>
            <div className="bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/10">
              <span className="text-slate-300 block text-[11px] mb-0.5">{t('householdCard.certifiedDate')}</span>
              <span className="font-mono text-slate-200">
                2026-11-08 09:30:00
              </span>
            </div>
          </div>

          <div className="pt-3 text-xs border-t border-white/15">
            <span className="text-slate-300 block text-[11px] mb-0.5">{t('householdCard.address')}</span>
            <span className="font-medium text-emerald-200 text-xs sm:text-sm">
              {t('householdCard.addressVal')}
            </span>
          </div>
        </div>
      </div>

      {/* Household Members Table - Glass Panel */}
      <div className="glass-panel rounded-2xl overflow-hidden shadow-sm transition-colors">
        <div className="px-6 py-4 border-b border-slate-200/60 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center border border-emerald-500/20">
              <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {t('membersTitle')}
            </h2>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            4 {t('householdCard.householdTypeVal')}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[580px]">
            <thead className="bg-slate-100/60 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 font-medium border-b border-slate-200/60 dark:border-white/10">
              <tr>
                <th className="py-3 px-4">{t('memberCols.relation')}</th>
                <th className="py-3 px-4">{t('memberCols.name')}</th>
                <th className="py-3 px-4">{t('memberCols.nationalId')}</th>
                <th className="py-3 px-4">{t('memberCols.birthDate')}</th>
                <th className="py-3 px-4 text-right">{t('memberCols.status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80 dark:divide-white/5">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-emerald-500/5 dark:hover:bg-emerald-400/5 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    {t(member.relationKey)}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-800 dark:text-slate-200">
                    {member.name}
                  </td>
                  <td className="py-3.5 px-4 font-mono tabular-nums text-slate-500 dark:text-slate-400">
                    {member.nationalId}
                  </td>
                  <td className="py-3.5 px-4 font-mono tabular-nums text-slate-500 dark:text-slate-400">
                    {member.birthDate}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="text-emerald-700 dark:text-emerald-300 font-medium text-[11px] bg-emerald-500/10 dark:bg-emerald-500/20 px-2 py-0.5 rounded-md border border-emerald-500/25">
                      {t(member.statusKey)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Household Transfer Application Form - Glass Panel */}
      <div className="glass-panel rounded-2xl p-6 transition-colors">
        <div className="mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-500/10 dark:bg-teal-500/20 flex items-center justify-center border border-teal-500/20">
              <Building className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {t('transferTitle')}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {t('transferSubtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmitTransfer} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t('transferForm.moveType')}
              </label>
              <select
                value={transferForm.moveType}
                onChange={(e) => setTransferForm({ ...transferForm, moveType: e.target.value })}
                className="glass-input w-full px-3.5 py-2.5 text-xs rounded-xl text-slate-900 dark:text-white"
              >
                <option value="in">{t('transferForm.moveTypeIn')}</option>
                <option value="out">{t('transferForm.moveTypeOut')}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t('transferForm.newCity')}
              </label>
              <input
                type="text"
                value={transferForm.newCity}
                onChange={(e) => setTransferForm({ ...transferForm, newCity: e.target.value })}
                className="glass-input w-full px-3.5 py-2.5 text-xs rounded-xl text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t('transferForm.newDistrict')}
              </label>
              <input
                type="text"
                value={transferForm.newDistrict}
                onChange={(e) => setTransferForm({ ...transferForm, newDistrict: e.target.value })}
                className="glass-input w-full px-3.5 py-2.5 text-xs rounded-xl text-slate-900 dark:text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t('transferForm.newAddress')}
              </label>
              <input
                type="text"
                value={transferForm.newAddress}
                onChange={(e) => setTransferForm({ ...transferForm, newAddress: e.target.value })}
                className="glass-input w-full px-3.5 py-2.5 text-xs rounded-xl text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t('transferForm.moveReason')}
              </label>
              <select
                value={transferForm.moveReason}
                onChange={(e) => setTransferForm({ ...transferForm, moveReason: e.target.value })}
                className="glass-input w-full px-3.5 py-2.5 text-xs rounded-xl text-slate-900 dark:text-white"
              >
                <option value="job">{t('transferForm.moveReasonJob')}</option>
                <option value="purchase">{t('transferForm.moveReasonPurchase')}</option>
                <option value="family">{t('transferForm.moveReasonFamily')}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t('transferForm.effectiveDate')}
              </label>
              <input
                type="date"
                value={transferForm.effectiveDate}
                onChange={(e) => setTransferForm({ ...transferForm, effectiveDate: e.target.value })}
                className="glass-input w-full px-3.5 py-2.5 text-xs font-mono rounded-xl text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-5 border-t border-slate-200/60 dark:border-white/10">
            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{t('common:compliance', { defaultValue: 'Level 4 Digital Signature' })}</span>
            </div>
            <button
              type="submit"
              className="glass-button-primary px-5 py-2.5 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{t('transferForm.submitBtn')}</span>
            </button>
          </div>
        </form>

        {/* Existing Application Records */}
        {recentApplications.length > 0 && (
          <div className="mt-6 pt-5 border-t border-slate-200/60 dark:border-white/10">
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2.5">
              {t('common:status.pending')}:
            </h3>
            <div className="space-y-2.5">
              {recentApplications.map((app) => (
                <div
                  key={app.id}
                  className="glass-card flex items-center justify-between p-3.5 rounded-xl text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-semibold text-slate-900 dark:text-white">{app.id}</span>
                    <span className="text-slate-500 dark:text-slate-400">{app.target}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-400">{app.date}</span>
                    <span className="text-amber-700 dark:text-amber-300 font-medium bg-amber-500/15 px-2 py-0.5 rounded-md border border-amber-500/25">
                      {t('common:status.pending')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

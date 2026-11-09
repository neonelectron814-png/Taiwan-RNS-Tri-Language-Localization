import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  QrCode,
  Copy,
  Check,
  Shield,
  Eye,
  EyeOff,
  Save,
  Key,
} from 'lucide-react';
import type { CitizenProfile } from '../types';

interface IdentityViewProps {
  profile: CitizenProfile;
  onUpdateProfile: (updated: Partial<CitizenProfile>) => void;
  onToast: (msg: string) => void;
}

export const IdentityView: React.FC<IdentityViewProps> = ({
  profile,
  onUpdateProfile,
  onToast,
}) => {
  const { t } = useTranslation(['identity', 'common']);
  const [showQr, setShowQr] = useState(false);
  const [copiedDid, setCopiedDid] = useState(false);
  const [formData, setFormData] = useState({
    name: profile.name,
    englishName: profile.englishName,
    nationalId: profile.nationalId,
    birthDate: profile.birthDate,
    gender: profile.gender,
    birthPlace: profile.birthPlace,
    address: profile.address,
    phone: profile.phone,
    email: profile.email,
  });
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleCopyDid = () => {
    navigator.clipboard.writeText(profile.did);
    setCopiedDid(true);
    onToast(t('common:actions.copied'));
    setTimeout(() => setCopiedDid(false), 2000);
  };

  const handleToggleMask = (field: 'maskId' | 'maskBirth' | 'maskAddress') => {
    onUpdateProfile({ [field]: !profile[field] });
    onToast(t('saveSuccess'));
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setValidationError(t('validation.nameRequired'));
      return;
    }
    const idRegex = /^[A-Z][12]\d{8}$/;
    if (!idRegex.test(formData.nationalId.trim())) {
      setValidationError(t('validation.nationalIdInvalid'));
      return;
    }
    setValidationError(null);
    onUpdateProfile(formData);
    onToast(t('saveSuccess'));
  };

  const displayNationalId = profile.maskId
    ? `${profile.nationalId.slice(0, 3)}*****${profile.nationalId.slice(-2)}`
    : profile.nationalId;

  const displayBirthDate = profile.maskBirth
    ? '****-**-** (Age >= 18 Verified)'
    : profile.birthDate;

  const displayAddress = profile.maskAddress
    ? '臺北市大安區 (Street Obfuscated)'
    : profile.address;

  return (
    <div className="space-y-6">
      {/* Title & Introduction */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {t('title')}
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          {t('subtitle')}
        </p>
      </div>

      {/* Sovereign DID Card - Holographic Glass Smart Card */}
      <div className="glass-smart-card text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-3">
              {/* Smart Card Holographic Chip Visual */}
              <div className="w-10 h-7 rounded-md bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 p-0.5 shadow-md flex items-center justify-center border border-amber-200/50">
                <div className="w-full h-full border border-amber-800/30 rounded-xs flex items-center justify-center">
                  <div className="w-3 h-2 border-t border-b border-amber-900/40" />
                </div>
              </div>
              <span className="text-[11px] font-mono tracking-wider uppercase text-emerald-300 font-semibold bg-emerald-500/15 backdrop-blur-md px-2 py-0.5 rounded-md border border-emerald-400/30">
                {t('didCard.badge')}
              </span>
              <span className="text-white/40">·</span>
              <span className="text-xs text-emerald-300 flex items-center gap-1 font-medium">
                <Shield className="w-3.5 h-3.5 text-emerald-400 drop-shadow-xs" />
                <span>{t('didCard.statusActive')}</span>
              </span>
            </div>

            <div>
              <div className="text-xs text-slate-300 font-medium">{t('didCard.didLabel')}</div>
              <div className="mt-1.5 font-mono text-xs sm:text-sm text-white break-all flex items-center gap-2 bg-slate-950/40 backdrop-blur-md p-3 rounded-xl border border-white/10 shadow-inner">
                <span>{profile.did}</span>
                <button
                  type="button"
                  onClick={handleCopyDid}
                  className="p-1.5 hover:text-emerald-300 text-slate-300 hover:bg-white/10 rounded-lg transition-all shrink-0 ml-auto"
                  aria-label={t('didCard.copyDid')}
                >
                  {copiedDid ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs pt-1">
              <div className="bg-white/5 backdrop-blur-xs p-2.5 rounded-xl border border-white/10">
                <span className="text-slate-300 block text-[11px]">{t('didCard.holder')}</span>
                <span className="font-semibold text-white text-sm">{profile.name}</span>
              </div>
              <div className="bg-white/5 backdrop-blur-xs p-2.5 rounded-xl border border-white/10">
                <span className="text-slate-300 block text-[11px]">{t('didCard.algorithm')}</span>
                <span className="font-mono text-emerald-300 text-sm">Ed25519-2026</span>
              </div>
              <div className="bg-white/5 backdrop-blur-xs p-2.5 rounded-xl border border-white/10">
                <span className="text-slate-300 block text-[11px]">{t('didCard.issuedAt')}</span>
                <span className="font-mono text-slate-200 text-sm">2026-01-15</span>
              </div>
            </div>
          </div>

          {/* QR Code Action Box - Frosted Glass Container */}
          <div className="flex flex-col items-center justify-center p-5 bg-slate-950/60 backdrop-blur-xl rounded-2xl border border-white/15 shadow-xl shrink-0">
            {showQr ? (
              <div className="bg-white p-3 rounded-xl shadow-lg ring-1 ring-white/30">
                {/* Clean inline SVG QR Pattern representing DID */}
                <svg className="w-32 h-32 text-slate-950" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M10,10 h30 v30 h-30 z M15,15 h20 v20 h-20 z M20,20 h10 v10 h-10 z" />
                  <path d="M60,10 h30 v30 h-30 z M65,15 h20 v20 h-20 z M70,20 h10 v10 h-10 z" />
                  <path d="M10,60 h30 v30 h-30 z M15,65 h20 v20 h-20 z M20,70 h10 v10 h-10 z" />
                  <rect x="50" y="15" width="5" height="15" />
                  <rect x="15" y="50" width="15" height="5" />
                  <rect x="50" y="50" width="10" height="10" />
                  <rect x="70" y="50" width="15" height="10" />
                  <rect x="50" y="70" width="20" height="10" />
                  <rect x="75" y="75" width="15" height="15" />
                </svg>
              </div>
            ) : (
              <div className="w-32 h-32 flex flex-col items-center justify-center text-slate-300 border border-dashed border-white/20 rounded-xl bg-white/5">
                <QrCode className="w-10 h-10 mb-2 opacity-60 text-emerald-400" />
                <span className="text-[10px] text-center px-2">{t('didCard.qrScanNotice')}</span>
              </div>
            )}
            <button
              type="button"
              onClick={() => setShowQr(!showQr)}
              className="mt-3.5 px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-xl transition-all border border-white/20 w-full shadow-xs active:scale-95"
            >
              {showQr ? t('didCard.hideQr') : t('didCard.showQr')}
            </button>
          </div>
        </div>
      </div>

      {/* Selective Disclosure & Privacy Protection Shields - Glass Panel */}
      <div className="glass-panel rounded-2xl p-6 transition-colors">
        <div className="mb-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center border border-emerald-500/20">
              <Key className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span>{t('privacyTitle')}</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {t('privacySubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Mask ID Toggle */}
          <div className="p-4 rounded-2xl glass-card glass-card-interactive flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  {t('privacyToggles.maskId')}
                </span>
                {profile.maskId ? (
                  <EyeOff className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Eye className="w-4 h-4 text-slate-400" />
                )}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                {t('privacyToggles.maskIdDesc')}
              </p>
              <div className="mt-3 font-mono text-xs text-slate-800 dark:text-slate-200 glass-input px-3 py-2 rounded-xl">
                {displayNationalId}
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleToggleMask('maskId')}
              className={`mt-4 px-3 py-2 text-xs font-semibold rounded-xl transition-all w-full ${
                profile.maskId
                  ? 'glass-button-primary text-white shadow-md'
                  : 'glass-button-secondary text-slate-700 dark:text-slate-200'
              }`}
            >
              {profile.maskId ? t('common:status.active') : t('common:actions.edit')}
            </button>
          </div>

          {/* Mask DOB Toggle */}
          <div className="p-4 rounded-2xl glass-card glass-card-interactive flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  {t('privacyToggles.maskBirth')}
                </span>
                {profile.maskBirth ? (
                  <EyeOff className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Eye className="w-4 h-4 text-slate-400" />
                )}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                {t('privacyToggles.maskBirthDesc')}
              </p>
              <div className="mt-3 font-mono text-xs text-slate-800 dark:text-slate-200 glass-input px-3 py-2 rounded-xl">
                {displayBirthDate}
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleToggleMask('maskBirth')}
              className={`mt-4 px-3 py-2 text-xs font-semibold rounded-xl transition-all w-full ${
                profile.maskBirth
                  ? 'glass-button-primary text-white shadow-md'
                  : 'glass-button-secondary text-slate-700 dark:text-slate-200'
              }`}
            >
              {profile.maskBirth ? t('common:status.active') : t('common:actions.edit')}
            </button>
          </div>

          {/* Mask Address Toggle */}
          <div className="p-4 rounded-2xl glass-card glass-card-interactive flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  {t('privacyToggles.maskAddress')}
                </span>
                {profile.maskAddress ? (
                  <EyeOff className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Eye className="w-4 h-4 text-slate-400" />
                )}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                {t('privacyToggles.maskAddressDesc')}
              </p>
              <div className="mt-3 font-mono text-xs text-slate-800 dark:text-slate-200 glass-input px-3 py-2 rounded-xl truncate">
                {displayAddress}
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleToggleMask('maskAddress')}
              className={`mt-4 px-3 py-2 text-xs font-semibold rounded-xl transition-all w-full ${
                profile.maskAddress
                  ? 'glass-button-primary text-white shadow-md'
                  : 'glass-button-secondary text-slate-700 dark:text-slate-200'
              }`}
            >
              {profile.maskAddress ? t('common:status.active') : t('common:actions.edit')}
            </button>
          </div>
        </div>
      </div>

      {/* Profile Attributes & Interactive Form - Glass Panel */}
      <div className="glass-panel rounded-2xl p-6 transition-colors">
        <div className="mb-6">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            {t('attributesTitle')}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {t('attributesSubtitle')}
          </p>
        </div>

        {validationError && (
          <div className="mb-4 p-3.5 bg-red-500/10 dark:bg-red-500/15 border border-red-500/25 text-red-700 dark:text-red-300 text-xs rounded-xl backdrop-blur-md">
            {validationError}
          </div>
        )}

        <form onSubmit={handleSaveForm} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t('fields.name')}
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="glass-input w-full px-3.5 py-2.5 text-xs rounded-xl text-slate-900 dark:text-white"
                placeholder={t('fields.name')}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t('fields.englishName')}
              </label>
              <input
                type="text"
                value={formData.englishName}
                onChange={(e) => setFormData({ ...formData, englishName: e.target.value })}
                className="glass-input w-full px-3.5 py-2.5 text-xs rounded-xl text-slate-900 dark:text-white"
                placeholder="Lin, Mei-Ling"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t('fields.nationalId')}
              </label>
              <input
                type="text"
                value={formData.nationalId}
                onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                className="glass-input w-full px-3.5 py-2.5 text-xs font-mono rounded-xl text-slate-900 dark:text-white"
                placeholder="A223456789"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t('fields.birthDate')}
              </label>
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                className="glass-input w-full px-3.5 py-2.5 text-xs font-mono rounded-xl text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t('fields.gender')}
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'female' | 'male' })}
                className="glass-input w-full px-3.5 py-2.5 text-xs rounded-xl text-slate-900 dark:text-white"
              >
                <option value="female">{t('fields.genderFemale')}</option>
                <option value="male">{t('fields.genderMale')}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t('fields.birthPlace')}
              </label>
              <input
                type="text"
                value={formData.birthPlace}
                onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                className="glass-input w-full px-3.5 py-2.5 text-xs rounded-xl text-slate-900 dark:text-white"
                placeholder={t('fields.taipeiCity')}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t('fields.address')}
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="glass-input w-full px-3.5 py-2.5 text-xs rounded-xl text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t('fields.phone')}
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="glass-input w-full px-3.5 py-2.5 text-xs font-mono rounded-xl text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-5 border-t border-slate-200/60 dark:border-white/10">
            <button
              type="button"
              onClick={() => {
                setFormData({
                  name: profile.name,
                  englishName: profile.englishName,
                  nationalId: profile.nationalId,
                  birthDate: profile.birthDate,
                  gender: profile.gender,
                  birthPlace: profile.birthPlace,
                  address: profile.address,
                  phone: profile.phone,
                  email: profile.email,
                });
                setValidationError(null);
              }}
              className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              {t('common:actions.reset')}
            </button>
            <button
              type="submit"
              className="glass-button-primary px-5 py-2.5 text-white font-semibold text-xs rounded-xl shadow-md flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{t('editProfile')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

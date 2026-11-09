import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Award,
  Search,
  ExternalLink,
  ShieldCheck,
  Check,
  Plus,
  X,
  Calendar,
  Lock,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { VerifiableCredentialItem } from '../types';

interface CredentialsViewProps {
  onToast: (msg: string) => void;
}

export const CredentialsView: React.FC<CredentialsViewProps> = ({ onToast }) => {
  const { t } = useTranslation(['credentials', 'common']);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [inspectingCredential, setInspectingCredential] = useState<VerifiableCredentialItem | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [newCredType, setNewCredType] = useState('driverLicense');
  const [newCredReason, setNewCredReason] = useState('');

  const [credentials, setCredentials] = useState<VerifiableCredentialItem[]>([
    {
      id: 'cid1',
      titleKey: 'items.cid1.name',
      typeKey: 'items.cid1.type',
      issuerKey: 'items.cid1.issuer',
      descriptionKey: 'items.cid1.description',
      claimsKey: 'items.cid1.claims',
      issuerDid: 'did:taiwan:moi:gov-id-issuer-01',
      subjectDid: 'did:taiwan:resident:89304a2f7c',
      issuanceDate: '2026-01-15 00:00:00 UTC',
      expirationDate: '2036-01-15 23:59:59 UTC',
      proofType: 'Ed25519Signature2020 / BBS+ Multi-Message',
      status: 'valid',
      category: 'id',
    },
    {
      id: 'cid2',
      titleKey: 'items.cid2.name',
      typeKey: 'items.cid2.type',
      issuerKey: 'items.cid2.issuer',
      descriptionKey: 'items.cid2.description',
      claimsKey: 'items.cid2.claims',
      issuerDid: 'did:taiwan:mohw:nhi-telemedicine-09',
      subjectDid: 'did:taiwan:resident:89304a2f7c',
      issuanceDate: '2026-02-01 10:20:00 UTC',
      expirationDate: '2031-02-01 23:59:59 UTC',
      proofType: 'JsonWebSignature2020 / ES256K',
      status: 'valid',
      category: 'health',
    },
    {
      id: 'cid3',
      titleKey: 'items.cid3.name',
      typeKey: 'items.cid3.type',
      issuerKey: 'items.cid3.issuer',
      descriptionKey: 'items.cid3.description',
      claimsKey: 'items.cid3.claims',
      issuerDid: 'did:taiwan:moi:household-registry-03',
      subjectDid: 'did:taiwan:resident:89304a2f7c',
      issuanceDate: '2026-03-10 14:35:10 UTC',
      expirationDate: '2027-03-10 23:59:59 UTC',
      proofType: 'BbsBlsSignatureProof2020',
      status: 'valid',
      category: 'civil',
    },
    {
      id: 'cid4',
      titleKey: 'items.cid4.name',
      typeKey: 'items.cid4.type',
      issuerKey: 'items.cid4.issuer',
      descriptionKey: 'items.cid4.description',
      claimsKey: 'items.cid4.claims',
      issuerDid: 'did:taiwan:gca:cert-auth-root',
      subjectDid: 'did:taiwan:resident:89304a2f7c',
      issuanceDate: '2026-01-15 00:00:00 UTC',
      expirationDate: '2031-01-15 23:59:59 UTC',
      proofType: 'Ed25519HardwareAttestation',
      status: 'valid',
      category: 'signature',
    },
  ]);

  const filteredCredentials = credentials.filter((c) => {
    const title = t(c.titleKey).toLowerCase();
    const issuer = t(c.issuerKey).toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch = title.includes(query) || issuer.includes(query);
    const matchesCategory = selectedCategory === 'all' || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `cid-${Date.now()}`;
    const newCred: VerifiableCredentialItem = {
      id: newId,
      titleKey: `requestNew.${newCredType}`,
      typeKey: 'requestNew.title',
      issuerKey: 'items.cid1.issuer',
      descriptionKey: 'requestNew.subtitle',
      claimsKey: 'items.cid1.claims',
      issuerDid: 'did:taiwan:motc:license-issuer',
      subjectDid: 'did:taiwan:resident:89304a2f7c',
      issuanceDate: new Date().toISOString(),
      expirationDate: '2036-12-31 23:59:59 UTC',
      proofType: 'Ed25519Signature2020',
      status: 'valid',
      category: 'license',
    };

    setCredentials([newCred, ...credentials]);
    setIsRequestModalOpen(false);
    onToast(t('requestNew.successNotice'));
    try {
      confetti({ particleCount: 60, spread: 55, origin: { y: 0.6 } });
    } catch {
      // safe fallback if canvas is not available
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Request Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t('title')}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {t('subtitle')}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsRequestModalOpen(true)}
          className="glass-button-primary px-4 py-2.5 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 shadow-md whitespace-nowrap shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{t('requestNew.title')}</span>
        </button>
      </div>

      {/* Filter and Search Bar - Glassy UI Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full sm:flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="glass-input w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl text-slate-900 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-2 text-xs font-medium rounded-xl transition-all whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-[0_2px_10px_rgba(16,185,129,0.3)] font-semibold'
                : 'glass-button-secondary text-slate-600 dark:text-slate-300'
            }`}
          >
            {t('filterAll')}
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('id')}
            className={`px-3.5 py-2 text-xs font-medium rounded-xl transition-all whitespace-nowrap ${
              selectedCategory === 'id'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-[0_2px_10px_rgba(16,185,129,0.3)] font-semibold'
                : 'glass-button-secondary text-slate-600 dark:text-slate-300'
            }`}
          >
            {t('common:terms.digitalIdentity')}
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('civil')}
            className={`px-3.5 py-2 text-xs font-medium rounded-xl transition-all whitespace-nowrap ${
              selectedCategory === 'civil'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-[0_2px_10px_rgba(16,185,129,0.3)] font-semibold'
                : 'glass-button-secondary text-slate-600 dark:text-slate-300'
            }`}
          >
            {t('common:terms.householdRegistration')}
          </button>
        </div>
      </div>

      {/* Credential Cards Grid - Glass Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCredentials.map((cred) => (
          <div
            key={cred.id}
            className="glass-card glass-card-interactive rounded-2xl p-5 sm:p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                  {t(cred.typeKey)}
                </span>
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-300 flex items-center gap-1 shrink-0 bg-emerald-500/10 dark:bg-emerald-500/20 px-2 py-0.5 rounded-md border border-emerald-500/25">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{t('common:status.valid')}</span>
                </span>
              </div>

              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {t(cred.titleKey)}
              </h2>

              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                {t(cred.issuerKey)}
              </div>

              <p className="mt-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {t(cred.descriptionKey)}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-white/10">
                <div className="text-[11px] text-slate-400 mb-1.5 font-medium">
                  {t('common:terms.selectiveDisclosure')}
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-300 font-mono text-[11px] bg-slate-100/60 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-200/50 dark:border-white/10">
                  {t(cred.claimsKey)}
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400">
                W3C VC 1.1 / JSON-LD
              </span>
              <button
                type="button"
                onClick={() => setInspectingCredential(cred)}
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 flex items-center gap-1"
              >
                <span>{t('common:actions.viewDetails')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Inspect Credential Modal - Glassmorphic Overlay */}
      {inspectingCredential && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel border border-white/30 dark:border-white/10 rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center border border-emerald-500/20">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {t('modal.inspectTitle')}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectingCredential(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3.5 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px] mb-1 font-medium">{t('modal.issuerDid')}</span>
                <span className="font-mono text-slate-800 dark:text-slate-200 break-all glass-input p-2.5 rounded-xl block">
                  {inspectingCredential.issuerDid}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px] mb-1 font-medium">{t('modal.subjectDid')}</span>
                <span className="font-mono text-slate-800 dark:text-slate-200 break-all glass-input p-2.5 rounded-xl block">
                  {inspectingCredential.subjectDid}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="glass-card p-3 rounded-xl">
                  <span className="text-slate-400 block text-[11px] mb-0.5">{t('modal.issuanceDate')}</span>
                  <span className="font-mono text-slate-700 dark:text-slate-200">
                    {inspectingCredential.issuanceDate}
                  </span>
                </div>
                <div className="glass-card p-3 rounded-xl">
                  <span className="text-slate-400 block text-[11px] mb-0.5">{t('modal.expirationDate')}</span>
                  <span className="font-mono text-slate-700 dark:text-slate-200">
                    {inspectingCredential.expirationDate}
                  </span>
                </div>
              </div>
              <div className="glass-card p-3 rounded-xl">
                <span className="text-slate-400 block text-[11px] mb-0.5">{t('modal.proofType')}</span>
                <span className="font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                  {inspectingCredential.proofType}
                </span>
              </div>
              <div className="p-3.5 bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="font-medium">{t('modal.verifySuccess')}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200/60 dark:border-white/10 flex justify-end">
              <button
                type="button"
                onClick={() => setInspectingCredential(null)}
                className="glass-button-secondary px-5 py-2 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl"
              >
                {t('common:actions.close')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request New Credential Modal - Glassmorphic Dialog */}
      {isRequestModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel border border-white/30 dark:border-white/10 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-white/10">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {t('requestNew.title')}
              </h3>
              <button
                type="button"
                onClick={() => setIsRequestModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRequestSubmit} className="py-4 space-y-4 text-xs">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {t('requestNew.selectType')}
                </label>
                <select
                  value={newCredType}
                  onChange={(e) => setNewCredType(e.target.value)}
                  className="glass-input w-full px-3.5 py-2.5 text-xs rounded-xl text-slate-900 dark:text-white"
                >
                  <option value="driverLicense">{t('requestNew.driverLicense')}</option>
                  <option value="residenceCert">{t('requestNew.residenceCert')}</option>
                  <option value="taxCert">{t('requestNew.taxCert')}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {t('requestNew.reason')}
                </label>
                <textarea
                  rows={3}
                  value={newCredReason}
                  onChange={(e) => setNewCredReason(e.target.value)}
                  placeholder="Official administrative reason for requesting verifiable credential..."
                  className="glass-input w-full px-3.5 py-2.5 text-xs rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-4 border-t border-slate-200/60 dark:border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsRequestModalOpen(false)}
                  className="glass-button-secondary px-4 py-2 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-xl"
                >
                  {t('common:actions.cancel')}
                </button>
                <button
                  type="submit"
                  className="glass-button-primary px-5 py-2 text-white font-semibold text-xs rounded-xl shadow-md"
                >
                  {t('requestNew.requestBtn')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

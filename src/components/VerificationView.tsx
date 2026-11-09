import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  KeyRound,
  Shield,
  Zap,
  CheckCircle2,
  Lock,
  EyeOff,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface VerificationViewProps {
  onToast: (msg: string) => void;
  onAuditLog?: (entry: { agency: string; event: string; status: string }) => void;
}

export const VerificationView: React.FC<VerificationViewProps> = ({ onToast, onAuditLog }) => {
  const { t } = useTranslation(['verification', 'common']);

  const [selectedScenario, setSelectedScenario] = useState<'s1' | 's2' | 's3'>('s1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [generatedProof, setGeneratedProof] = useState<{
    pi_a: string;
    pi_b: string;
    pi_c: string;
    publicSignals: string[];
    timestamp: string;
  } | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleGenerateProof = () => {
    setIsGenerating(true);
    setIsVerified(false);
    setTimeout(() => {
      const mockProof = {
        pi_a: '0x1a8f9c2d7e4b5031...88f12a (G1 point: 256 bits)',
        pi_b: '[[0x2b3c..., 0x4d5e...], [0x6f7a..., 0x8b9c...]] (G2 point: 512 bits)',
        pi_c: '0x9e8d7c6b5a4f3e2d...01bc56 (G1 point: 256 bits)',
        publicSignals: [
          selectedScenario === 's1'
            ? '0x0000000000000000000000000000000000000000000000000000000000000012 (Threshold: 18 Years)'
            : selectedScenario === 's2'
            ? '0x5461697065692043697479000000000000000000000000000000000000000000 (Taipei City HASH)'
            : '0x0000000000000000000000000000000000000000000000000000000000000014 (Age >= 20 & Citizen)',
          '0x0000000000000000000000000000000000000000000000000000000000000001 (Valid Root Commitment)',
        ],
        timestamp: new Date().toISOString(),
      };
      setGeneratedProof(mockProof);
      setIsGenerating(false);
      onToast(t('common:notifications.proofGenerated'));
    }, 600);
  };

  const handleVerifyProof = () => {
    if (!generatedProof) return;
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      setShowConfirmDialog(true);
      onToast(t('common:notifications.proofVerified'));
      if (onAuditLog) {
        onAuditLog({
          agency: 'National Trust Gateway / Relying Party',
          event: `ZKP Verification (${t(`zkpScenarios.${selectedScenario}.name`)})`,
          status: 'Valid',
        });
      }
      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } catch {
        // safe fallback
      }
    }, 700);
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

      {/* Educational ZKP Explainer Box - Glass Card with Emerald Accents */}
      <div className="glass-card rounded-2xl p-6 border border-emerald-500/25 shadow-md transition-colors">
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center shrink-0 shadow-[0_4px_16px_rgba(16,185,129,0.3)] border border-emerald-400/40">
            <Shield className="w-5 h-5 drop-shadow-xs" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              {t('zkpExplanationTitle')}
            </h2>
            <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {t('zkpExplanationBody')}
            </p>
          </div>
        </div>
      </div>

      {/* Predicate Selector Cards - Glass Cards with Interactive Glow */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(['s1', 's2', 's3'] as const).map((sKey) => {
          const isSelected = selectedScenario === sKey;
          return (
            <button
              key={sKey}
              type="button"
              onClick={() => {
                setSelectedScenario(sKey);
                setGeneratedProof(null);
                setIsVerified(false);
              }}
              className={`p-5 text-left rounded-2xl transition-all flex flex-col justify-between ${
                isSelected
                  ? 'glass-card border-emerald-500 ring-2 ring-emerald-500/30 shadow-[0_8px_25px_rgba(16,185,129,0.15)]'
                  : 'glass-card glass-card-interactive opacity-90 hover:opacity-100'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-300 uppercase font-semibold bg-emerald-500/10 dark:bg-emerald-500/20 px-2 py-0.5 rounded-md border border-emerald-500/20">
                    Predicate #{sKey.toUpperCase()}
                  </span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  {t(`zkpScenarios.${sKey}.name`)}
                </h3>

                <div className="mt-3 font-mono text-[11px] text-slate-800 dark:text-slate-200 glass-input p-2.5 rounded-xl">
                  {t(`zkpScenarios.${sKey}.predicate`)}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-white/10 text-[11px] text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 font-medium">
                <EyeOff className="w-3.5 h-3.5 shrink-0" />
                <span>{t(`zkpScenarios.${sKey}.hiddenData`)}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Generator & Verifier Split Section - Glass Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Prover Panel */}
        <div className="glass-panel rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-200/60 dark:border-white/10 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center border border-emerald-500/20">
                  <Cpu className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {t('generator.title')}
                </h3>
              </div>
              <span className="font-mono text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded-md">Groth16 / BN254</span>
            </div>

            <div className="space-y-3 text-xs mb-4">
              <div className="p-3.5 rounded-xl glass-card text-slate-600 dark:text-slate-300">
                <div className="font-semibold text-slate-900 dark:text-white mb-1">
                  {t('generator.circuitType')}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {t('generator.proverKey')}
                </div>
              </div>
            </div>

            {generatedProof ? (
              <div className="space-y-3.5 animate-in fade-in duration-200">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  {t('generator.generatedProofHeader')}
                </div>
                <div className="space-y-2 font-mono text-[11px]">
                  <div className="p-2.5 bg-slate-950/80 backdrop-blur-md text-emerald-400 rounded-xl border border-emerald-500/30 truncate shadow-inner">
                    <span className="text-slate-400 mr-2">π_a:</span>
                    {generatedProof.pi_a}
                  </div>
                  <div className="p-2.5 bg-slate-950/80 backdrop-blur-md text-emerald-400 rounded-xl border border-emerald-500/30 truncate shadow-inner">
                    <span className="text-slate-400 mr-2">π_b:</span>
                    {generatedProof.pi_b}
                  </div>
                  <div className="p-2.5 bg-slate-950/80 backdrop-blur-md text-emerald-400 rounded-xl border border-emerald-500/30 truncate shadow-inner">
                    <span className="text-slate-400 mr-2">π_c:</span>
                    {generatedProof.pi_c}
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                    {t('generator.publicSignals')}
                  </span>
                  <div className="p-2.5 glass-input rounded-xl font-mono text-[11px] text-slate-800 dark:text-slate-200 space-y-1">
                    {generatedProof.publicSignals.map((sig, idx) => (
                      <div key={idx} className="truncate">
                        [{idx}] {sig}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400 border border-dashed border-slate-300 dark:border-white/10 rounded-2xl bg-white/5">
                <Layers className="w-8 h-8 mx-auto mb-2 opacity-50 text-emerald-500" />
                <span className="text-xs">
                  {t('generator.selectScenario')}
                </span>
              </div>
            )}
          </div>

          <div className="pt-6">
            <button
              type="button"
              disabled={isGenerating}
              onClick={handleGenerateProof}
              className="glass-button-primary w-full py-2.5 px-4 disabled:opacity-50 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg"
            >
              <Zap className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>
                {isGenerating ? t('common:status.processing') : t('generator.generateBtn')}
              </span>
            </button>
          </div>
        </div>

        {/* Verifier Panel - Glass Panel */}
        <div className="glass-panel rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-200/60 dark:border-white/10 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-teal-500/10 dark:bg-teal-500/20 flex items-center justify-center border border-teal-500/20">
                  <Lock className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {t('verifier.title')}
                </h3>
              </div>
              <span className="font-mono text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded-md">e(π_a, π_b) == e(α, β)</span>
            </div>

            <div className="space-y-4 text-xs">
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                {t('zkpExplanationBody')}
              </p>

              {isVerified && (
                <div className="p-4 bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 rounded-2xl text-emerald-900 dark:text-emerald-200 animate-in fade-in duration-200 backdrop-blur-md">
                  <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>{t('verifier.verificationResult')}: {t('common:status.valid')}</span>
                  </div>
                  <p className="text-xs leading-relaxed mt-1">
                    {t('verifier.validMathProof')}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="pt-6">
            <button
              type="button"
              disabled={!generatedProof || isVerifying}
              onClick={handleVerifyProof}
              className="glass-button-primary w-full py-2.5 px-4 disabled:opacity-40 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg"
            >
              <CheckCircle2 className={`w-4 h-4 ${isVerifying ? 'animate-spin' : ''}`} />
              <span>
                {isVerifying ? t('common:status.processing') : t('verifier.verifyBtn')}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog - Glassmorphic Modal */}
      {showConfirmDialog && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel border border-white/30 dark:border-white/10 rounded-3xl max-w-md w-full p-7 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center mx-auto mb-4 shadow-[0_4px_16px_rgba(16,185,129,0.35)] border border-emerald-400/40">
              <CheckCircle2 className="w-7 h-7 drop-shadow-xs" />
            </div>
            <h3 className="text-base font-bold text-center text-slate-900 dark:text-white">
              {t('verifier.dialogTitle')}
            </h3>
            <p className="mt-2 text-xs text-center text-slate-600 dark:text-slate-300 leading-relaxed">
              {t('verifier.dialogBody')}
            </p>
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => setShowConfirmDialog(false)}
                className="glass-button-primary px-7 py-2.5 text-white font-semibold text-xs rounded-xl shadow-lg"
              >
                {t('common:actions.confirm')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

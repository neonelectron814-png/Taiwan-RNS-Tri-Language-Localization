import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { AndroidNavigation } from './components/AndroidNavigation';
import { DashboardView } from './components/DashboardView';
import { IdentityView } from './components/IdentityView';
import { HouseholdView } from './components/HouseholdView';
import { CredentialsView } from './components/CredentialsView';
import { VerificationView } from './components/VerificationView';
import { AdminView } from './components/AdminView';
import { SettingsView } from './components/SettingsView';
import { QAChecklistView } from './components/QAChecklistView';
import { ToastContainer } from './components/ToastContainer';
import type { ActiveTab, CitizenProfile, ToastMessage } from './types';

export default function App() {
  const { t } = useTranslation('common');
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      return (
        localStorage.getItem('taiwan_rns_theme') === 'dark' ||
        window.matchMedia('(prefers-color-scheme: dark)').matches
      );
    } catch {
      return false;
    }
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const [profile, setProfile] = useState<CitizenProfile>({
    name: '林美玲',
    englishName: 'Lin, Mei-Ling',
    nationalId: 'A223456789',
    birthDate: '1995-04-12',
    gender: 'female',
    birthPlace: '臺北市',
    address: '臺北市大安區信義路三段 120 號 3 樓',
    phone: '0912-345-678',
    email: 'meiling.lin@gov.tw',
    did: 'did:taiwan:resident:89304a2f7c9e10d4',
    maskId: true,
    maskBirth: true,
    maskAddress: false,
  });

  // Sidebar Docking Position (Left or Right) with persistence
  const [sidebarPosition, setSidebarPosition] = useState<'left' | 'right'>(() => {
    try {
      return (localStorage.getItem('taiwan_rns_sidebar_pos') as 'left' | 'right') || 'left';
    } catch {
      return 'left';
    }
  });

  const [isDraggingSidebar, setIsDraggingSidebar] = useState<boolean>(false);
  const [activeDropTarget, setActiveDropTarget] = useState<'left' | 'right' | null>(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      try {
        localStorage.setItem('taiwan_rns_theme', 'dark');
      } catch {}
    } else {
      document.documentElement.classList.remove('dark');
      try {
        localStorage.setItem('taiwan_rns_theme', 'light');
      } catch {}
    }
  }, [isDark]);

  const handleToggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const showToast = (message: string, type: 'info' | 'success' | 'warning' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleUpdateProfile = (updated: Partial<CitizenProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
  };

  const handleToggleSidebarPosition = () => {
    setSidebarPosition((prev) => {
      const next = prev === 'left' ? 'right' : 'left';
      try {
        localStorage.setItem('taiwan_rns_sidebar_pos', next);
      } catch {}
      return next;
    });
  };

  const handleDragStartPanel = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', 'sidebar-panel');
    e.dataTransfer.effectAllowed = 'move';
    setIsDraggingSidebar(true);
  };

  const handleDragEndPanel = () => {
    setIsDraggingSidebar(false);
    setActiveDropTarget(null);
  };

  const handleDragOverZone = (e: React.DragEvent, zone: 'left' | 'right') => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setActiveDropTarget(zone);
  };

  const handleDropOnZone = (e: React.DragEvent, zone: 'left' | 'right') => {
    e.preventDefault();
    setSidebarPosition(zone);
    try {
      localStorage.setItem('taiwan_rns_sidebar_pos', zone);
    } catch {}
    setIsDraggingSidebar(false);
    setActiveDropTarget(null);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-50/80 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors selection:bg-emerald-500 selection:text-white relative">
      {/* GlassyUI Ambient Background Light Orbs (Pure CSS decorative mesh glow) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
        {/* Top-Right Emerald Aurora Orb */}
        <div className="absolute -top-32 -right-32 w-96 sm:w-[540px] h-96 sm:h-[540px] rounded-full bg-emerald-500/12 dark:bg-emerald-500/16 blur-[120px] transition-all" />
        {/* Mid-Left Cyan/Teal Shimmer Orb */}
        <div className="absolute top-1/3 -left-32 w-80 sm:w-[500px] h-80 sm:h-[500px] rounded-full bg-cyan-500/10 dark:bg-teal-500/14 blur-[130px] transition-all" />
        {/* Bottom-Center Indigo/Blue Ambient Glow */}
        <div className="absolute -bottom-24 left-1/4 w-96 sm:w-[600px] h-96 sm:h-[600px] rounded-full bg-indigo-500/8 dark:bg-emerald-950/25 blur-[140px] transition-all" />
      </div>

      {/* Top Bar (Floating Island with Spacing and Borders) */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        onToast={(msg) => showToast(msg, 'info')}
      />

      {/* Main Workspace Frame: Floating Island Panels with Borders, Spacing, and Drag-and-Drop */}
      <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col md:flex-row h-[calc(100vh-5.5rem)] overflow-hidden min-h-0 px-3 sm:px-4 pb-3 sm:pb-4 gap-3 sm:gap-4 relative">
        {/* Visual Dropzone on Left when dragging sidebar */}
        {isDraggingSidebar && (
          <div
            onDragOver={(e) => handleDragOverZone(e, 'left')}
            onDragLeave={() => setActiveDropTarget(null)}
            onDrop={(e) => handleDropOnZone(e, 'left')}
            className={`hidden md:flex w-64 rounded-2xl border-2 border-dashed transition-all items-center justify-center p-4 text-center z-30 ${
              activeDropTarget === 'left'
                ? 'border-emerald-500 bg-emerald-500/15 scale-102 shadow-lg shadow-emerald-500/20'
                : 'border-slate-300 dark:border-slate-700 bg-white/40 dark:bg-slate-900/40'
            }`}
          >
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              {t('sidebar.dropLeft')}
            </span>
          </div>
        )}

        {/* Sidebar rendered on Left if position is 'left' */}
        {sidebarPosition === 'left' && (
          <Sidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            sidebarPosition={sidebarPosition}
            onTogglePosition={handleToggleSidebarPosition}
            onDragStartPanel={handleDragStartPanel}
            onDragEndPanel={handleDragEndPanel}
          />
        )}

        {/* Main Content Floating Island with Border, Spacing, and Custom Scrollbar */}
        <main className="flex-1 h-full overflow-y-auto overflow-x-hidden min-w-0 glass-panel rounded-2xl border border-white/30 dark:border-white/10 shadow-xl p-4 sm:p-6 lg:p-8 pb-28 md:pb-8 flex flex-col justify-between transition-all">
          <div className="space-y-6 flex-1">
            {activeTab === 'dashboard' && (
              <DashboardView
                onNavigate={setActiveTab}
                onToast={(msg) => showToast(msg, 'success')}
              />
            )}

            {activeTab === 'identity' && (
              <IdentityView
                profile={profile}
                onUpdateProfile={handleUpdateProfile}
                onToast={(msg) => showToast(msg, 'success')}
              />
            )}

            {activeTab === 'household' && (
              <HouseholdView onToast={(msg) => showToast(msg, 'success')} />
            )}

            {activeTab === 'credentials' && (
              <CredentialsView onToast={(msg) => showToast(msg, 'success')} />
            )}

            {activeTab === 'verification' && (
              <VerificationView onToast={(msg) => showToast(msg, 'success')} />
            )}

            {activeTab === 'admin' && (
              <AdminView onToast={(msg) => showToast(msg, 'info')} />
            )}

            {activeTab === 'settings' && (
              <SettingsView
                isDark={isDark}
                onToggleTheme={handleToggleTheme}
                onToast={(msg) => showToast(msg, 'info')}
              />
            )}

            {activeTab === 'qa' && (
              <QAChecklistView onToast={(msg) => showToast(msg, 'info')} />
            )}
          </div>

          {/* Global Footer (inside the scrollable content container) */}
          <footer className="mt-12 pt-6 border-t border-slate-200/60 dark:border-white/10 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div>
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {t('footer.copyright')}
                </span>
                <span className="hidden sm:inline mx-2">·</span>
                <span className="block sm:inline mt-1 sm:mt-0">{t('footer.compliance')}</span>
              </div>
              <div className="font-mono text-[11px] text-slate-400">
                {t('footer.version')}
              </div>
            </div>
          </footer>
        </main>

        {/* Sidebar rendered on Right if position is 'right' */}
        {sidebarPosition === 'right' && (
          <Sidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            sidebarPosition={sidebarPosition}
            onTogglePosition={handleToggleSidebarPosition}
            onDragStartPanel={handleDragStartPanel}
            onDragEndPanel={handleDragEndPanel}
          />
        )}

        {/* Visual Dropzone on Right when dragging sidebar */}
        {isDraggingSidebar && (
          <div
            onDragOver={(e) => handleDragOverZone(e, 'right')}
            onDragLeave={() => setActiveDropTarget(null)}
            onDrop={(e) => handleDropOnZone(e, 'right')}
            className={`hidden md:flex w-64 rounded-2xl border-2 border-dashed transition-all items-center justify-center p-4 text-center z-30 ${
              activeDropTarget === 'right'
                ? 'border-emerald-500 bg-emerald-500/15 scale-102 shadow-lg shadow-emerald-500/20'
                : 'border-slate-300 dark:border-slate-700 bg-white/40 dark:bg-slate-900/40'
            }`}
          >
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              {t('sidebar.dropRight')}
            </span>
          </div>
        )}
      </div>

      {/* Android Mobile Navigation (Floating dock with rounded corners and spacing) */}
      <AndroidNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Toast Notification Stream */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard,
  UserCheck,
  Home,
  Award,
  KeyRound,
  ShieldAlert,
  Settings as SettingsIcon,
  CheckCircle2,
  GripVertical,
  ArrowLeftRight,
  Move,
} from 'lucide-react';
import type { ActiveTab } from '../types';

interface SidebarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  sidebarPosition?: 'left' | 'right';
  onTogglePosition?: () => void;
  onDragStartPanel?: (e: React.DragEvent) => void;
  onDragEndPanel?: () => void;
}

type ColorFamily = 'green' | 'blue' | 'navy' | 'black';

interface NavItem {
  id: ActiveTab;
  label: string;
  icon: React.ElementType;
  colorFamily: ColorFamily;
  colorTag: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  sidebarPosition = 'left',
  onTogglePosition,
  onDragStartPanel,
  onDragEndPanel,
}) => {
  const { t } = useTranslation('common');

  // 8 Nav items categorized into 4 requested color palettes:
  // Green (سبز), Blue (آبی), Navy (سرمه‌ای), Black (مشکی)
  const initialItems: NavItem[] = [
    {
      id: 'dashboard',
      label: t('nav.dashboard'),
      icon: LayoutDashboard,
      colorFamily: 'green',
      colorTag: 'LIVE',
    },
    {
      id: 'identity',
      label: t('nav.identity'),
      icon: UserCheck,
      colorFamily: 'blue',
      colorTag: 'DID',
    },
    {
      id: 'household',
      label: t('nav.household'),
      icon: Home,
      colorFamily: 'navy',
      colorTag: 'HOU',
    },
    {
      id: 'credentials',
      label: t('nav.credentials'),
      icon: Award,
      colorFamily: 'blue',
      colorTag: 'VC',
    },
    {
      id: 'verification',
      label: t('nav.verification'),
      icon: KeyRound,
      colorFamily: 'green',
      colorTag: 'ZKP',
    },
    {
      id: 'admin',
      label: t('nav.admin'),
      icon: ShieldAlert,
      colorFamily: 'black',
      colorTag: 'SEC',
    },
    {
      id: 'settings',
      label: t('nav.settings'),
      icon: SettingsIcon,
      colorFamily: 'black',
      colorTag: 'CFG',
    },
    {
      id: 'qa',
      label: t('nav.qaChecklist'),
      icon: CheckCircle2,
      colorFamily: 'navy',
      colorTag: 'i18n',
    },
  ];

  const [navItems, setNavItems] = useState<NavItem[]>(initialItems);
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Tab Item drag and drop handlers
  const handleItemDragStart = (e: React.DragEvent, index: number) => {
    e.stopPropagation();
    setDraggedItemIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', `item-${index}`);
  };

  const handleItemDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (draggedItemIndex === null || draggedItemIndex === index) return;
    setDragOverIndex(index);
  };

  const handleItemDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (draggedItemIndex === null || draggedItemIndex === targetIndex) {
      setDraggedItemIndex(null);
      setDragOverIndex(null);
      return;
    }

    const reordered = [...navItems];
    const [moved] = reordered.splice(draggedItemIndex, 1);
    reordered.splice(targetIndex, 0, moved);
    setNavItems(reordered);
    setDraggedItemIndex(null);
    setDragOverIndex(null);
  };

  // Color theme generator for active and inactive states
  const getColorStyles = (family: ColorFamily, isActive: boolean) => {
    switch (family) {
      case 'green': // سبز (Emerald / Teal)
        return {
          activeClass:
            'bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 text-white shadow-[0_6px_20px_rgba(16,185,129,0.35)] border border-emerald-400/40',
          iconContainer: isActive
            ? 'bg-white/20 text-white border-white/30'
            : 'bg-emerald-500/15 dark:bg-emerald-400/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25',
          tagClass: isActive
            ? 'bg-white/20 text-emerald-100 border-white/30'
            : 'bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20',
          subtitleColor: isActive ? 'text-emerald-100/90' : 'text-emerald-700/80 dark:text-emerald-400/80',
        };
      case 'blue': // آبی (Azure / Royal Blue / Cyan)
        return {
          activeClass:
            'bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-700 text-white shadow-[0_6px_20px_rgba(37,99,235,0.35)] border border-blue-400/40',
          iconContainer: isActive
            ? 'bg-white/20 text-white border-white/30'
            : 'bg-blue-500/15 dark:bg-blue-400/15 text-blue-600 dark:text-blue-400 border border-blue-500/25',
          tagClass: isActive
            ? 'bg-white/20 text-blue-100 border-white/30'
            : 'bg-blue-500/10 dark:bg-blue-400/10 text-blue-700 dark:text-blue-300 border border-blue-500/20',
          subtitleColor: isActive ? 'text-blue-100/90' : 'text-blue-700/80 dark:text-blue-400/80',
        };
      case 'navy': // سرمه‌ای (Deep Navy / Royal Indigo)
        return {
          activeClass:
            'bg-gradient-to-r from-indigo-800 via-blue-900 to-slate-900 text-white shadow-[0_6px_20px_rgba(30,58,138,0.4)] border border-indigo-400/40',
          iconContainer: isActive
            ? 'bg-white/20 text-white border-white/30'
            : 'bg-indigo-500/15 dark:bg-indigo-400/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/25',
          tagClass: isActive
            ? 'bg-white/20 text-indigo-100 border-white/30'
            : 'bg-indigo-500/10 dark:bg-indigo-400/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20',
          subtitleColor: isActive ? 'text-indigo-200/90' : 'text-indigo-700/80 dark:text-indigo-300/80',
        };
      case 'black': // مشکی (Obsidian / Dark Slate / Carbon)
        return {
          activeClass:
            'bg-gradient-to-r from-slate-900 via-zinc-900 to-neutral-950 text-white shadow-[0_6px_20px_rgba(15,23,42,0.5)] border border-slate-500/40',
          iconContainer: isActive
            ? 'bg-white/20 text-white border-white/30'
            : 'bg-slate-900/10 dark:bg-white/10 text-slate-800 dark:text-slate-200 border border-slate-700/20 dark:border-white/15',
          tagClass: isActive
            ? 'bg-white/20 text-slate-200 border-white/30'
            : 'bg-slate-900/10 dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-700/20 dark:border-white/15',
          subtitleColor: isActive ? 'text-slate-300/90' : 'text-slate-600 dark:text-slate-400',
        };
    }
  };

  return (
    <aside
      draggable
      onDragStart={onDragStartPanel}
      onDragEnd={onDragEndPanel}
      className="hidden md:flex md:w-64 glass-sidebar rounded-2xl border border-white/30 dark:border-white/10 shadow-xl p-3.5 shrink-0 flex-col justify-between h-full overflow-y-auto transition-all relative group select-none"
    >
      <div>
        {/* Drag Handle & Position Toolbar Header with 100% Localized Labels */}
        <div className="flex items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-slate-200/60 dark:border-white/10 text-slate-500 dark:text-slate-400">
          <div
            className="flex items-center gap-1.5 cursor-grab active:cursor-grabbing hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            title={t('sidebar.dragToDock')}
          >
            <GripVertical className="w-4 h-4 text-slate-400 dark:text-slate-500" />
            <span className="text-[11px] font-mono tracking-tight font-semibold">
              {sidebarPosition === 'left' ? t('sidebar.dockLeft') : t('sidebar.dockRight')}
            </span>
          </div>

          {onTogglePosition && (
            <button
              type="button"
              onClick={onTogglePosition}
              className="p-1 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-800/60 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
              title={t('sidebar.swapPosition')}
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Section Header with Reorder Indicator */}
        <div className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 px-1.5 flex items-center justify-between">
          <span>{t('terms.governmentOrganization')}</span>
          <span className="text-[9px] font-mono lowercase text-slate-400 dark:text-slate-600 flex items-center gap-1">
            <Move className="w-2.5 h-2.5" /> {t('sidebar.reorder')}
          </span>
        </div>

        {/* Multi-Color Categorized Navigation Items */}
        <nav className="space-y-1.5">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const isBeingDragged = draggedItemIndex === index;
            const isHoveredTarget = dragOverIndex === index;
            const styles = getColorStyles(item.colorFamily, isActive);
            const subtitleText = t(`sidebar.subtitles.${item.id}`);

            return (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleItemDragStart(e, index)}
                onDragOver={(e) => handleItemDragOver(e, index)}
                onDrop={(e) => handleItemDrop(e, index)}
                onDragEnd={() => {
                  setDraggedItemIndex(null);
                  setDragOverIndex(null);
                }}
                className={`relative transition-all rounded-xl ${
                  isBeingDragged ? 'opacity-40 scale-95' : 'opacity-100'
                } ${
                  isHoveredTarget
                    ? 'ring-2 ring-emerald-500/70 bg-emerald-500/10'
                    : ''
                }`}
              >
                <button
                  type="button"
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center justify-between gap-2.5 px-2.5 py-2 rounded-xl transition-all text-left whitespace-nowrap cursor-pointer group ${
                    isActive
                      ? styles.activeClass
                      : 'text-slate-800 dark:text-slate-200 hover:bg-white/70 dark:hover:bg-slate-800/70 border border-transparent hover:border-slate-200/60 dark:hover:border-slate-700/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    {/* Themed Icon Container */}
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-all ${styles.iconContainer}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    {/* Rich Title & Subtitle */}
                    <div className="flex flex-col min-w-0 flex-1 leading-tight">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold truncate">
                          {item.label}
                        </span>
                        <span
                          className={`text-[8px] font-mono font-bold uppercase px-1 py-0.2 rounded border shrink-0 ${styles.tagClass}`}
                        >
                          {item.colorTag}
                        </span>
                      </div>
                      <span className={`text-[10px] truncate mt-0.5 font-medium ${styles.subtitleColor}`}>
                        {subtitleText}
                      </span>
                    </div>
                  </div>

                  {/* Drag Handle on hover */}
                  <div
                    className={`cursor-grab active:cursor-grabbing p-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ${
                      isActive ? 'text-white/80' : 'text-slate-400'
                    }`}
                    title={t('sidebar.dragToReorder')}
                  >
                    <GripVertical className="w-3 h-3" />
                  </div>
                </button>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer Info */}
      <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-white/10 px-1.5">
        <div className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">
          {t('terms.publicLedger')}
        </div>
        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
          {t('footer.compliance')}
        </p>
      </div>
    </aside>
  );
};

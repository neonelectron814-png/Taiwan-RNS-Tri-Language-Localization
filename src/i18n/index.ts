import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// en locales
import enCommon from './locales/en/common.json';
import enDashboard from './locales/en/dashboard.json';
import enIdentity from './locales/en/identity.json';
import enHousehold from './locales/en/household.json';
import enCredentials from './locales/en/credentials.json';
import enVerification from './locales/en/verification.json';
import enAdmin from './locales/en/admin.json';
import enSettings from './locales/en/settings.json';
import enQa from './locales/en/qa.json';

// zh-TW locales
import zhTWCommon from './locales/zh-TW/common.json';
import zhTWDashboard from './locales/zh-TW/dashboard.json';
import zhTWIdentity from './locales/zh-TW/identity.json';
import zhTWHousehold from './locales/zh-TW/household.json';
import zhTWCredentials from './locales/zh-TW/credentials.json';
import zhTWVerification from './locales/zh-TW/verification.json';
import zhTWAdmin from './locales/zh-TW/admin.json';
import zhTWSettings from './locales/zh-TW/settings.json';
import zhTWQa from './locales/zh-TW/qa.json';

// nan-TW locales
import nanTWCommon from './locales/nan-TW/common.json';
import nanTWDashboard from './locales/nan-TW/dashboard.json';
import nanTWIdentity from './locales/nan-TW/identity.json';
import nanTWHousehold from './locales/nan-TW/household.json';
import nanTWCredentials from './locales/nan-TW/credentials.json';
import nanTWVerification from './locales/nan-TW/verification.json';
import nanTWAdmin from './locales/nan-TW/admin.json';
import nanTWSettings from './locales/nan-TW/settings.json';
import nanTWQa from './locales/nan-TW/qa.json';

export const SUPPORTED_LANGUAGES = [
  { code: 'zh-TW', label: '繁體中文', enLabel: 'Traditional Chinese', script: '漢' },
  { code: 'nan-TW', label: '台灣台語', enLabel: 'Taiwanese Hokkien', script: '台' },
  { code: 'en', label: 'English', enLabel: 'English', script: 'EN' },
] as const;

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number]['code'];

const resources = {
  'en': {
    common: enCommon,
    dashboard: enDashboard,
    identity: enIdentity,
    household: enHousehold,
    credentials: enCredentials,
    verification: enVerification,
    admin: enAdmin,
    settings: enSettings,
    qa: enQa,
  },
  'zh-TW': {
    common: zhTWCommon,
    dashboard: zhTWDashboard,
    identity: zhTWIdentity,
    household: zhTWHousehold,
    credentials: zhTWCredentials,
    verification: zhTWVerification,
    admin: zhTWAdmin,
    settings: zhTWSettings,
    qa: zhTWQa,
  },
  'nan-TW': {
    common: nanTWCommon,
    dashboard: nanTWDashboard,
    identity: nanTWIdentity,
    household: nanTWHousehold,
    credentials: nanTWCredentials,
    verification: nanTWVerification,
    admin: nanTWAdmin,
    settings: nanTWSettings,
    qa: nanTWQa,
  },
};

const STORAGE_KEY = 'taiwan_rns_lang';

function getInitialLanguage(): string {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && ['en', 'zh-TW', 'nan-TW'].includes(saved)) {
      return saved;
    }
  } catch {
    // localStorage might be blocked or fail
  }
  return 'zh-TW';
}

const initialLang = getInitialLanguage();

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLang,
    fallbackLng: 'zh-TW',
    ns: ['common', 'dashboard', 'identity', 'household', 'credentials', 'verification', 'admin', 'settings', 'qa'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

// Synchronize document lang attribute
if (typeof document !== 'undefined') {
  document.documentElement.lang = initialLang;
}

i18n.on('languageChanged', (lng) => {
  try {
    localStorage.setItem(STORAGE_KEY, lng);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lng;
    }
  } catch (err) {
    console.error('Failed to persist language to localStorage', err);
  }
});

export default i18n;

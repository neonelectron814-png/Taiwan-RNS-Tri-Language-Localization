import test from 'node:test';
import assert from 'node:assert/strict';

// Load the json files directly to verify structural parity
import enCommon from './locales/en/common.json';
import enDashboard from './locales/en/dashboard.json';
import enIdentity from './locales/en/identity.json';
import enHousehold from './locales/en/household.json';
import enCredentials from './locales/en/credentials.json';
import enVerification from './locales/en/verification.json';
import enAdmin from './locales/en/admin.json';
import enSettings from './locales/en/settings.json';
import enQa from './locales/en/qa.json';

import zhTWCommon from './locales/zh-TW/common.json';
import zhTWDashboard from './locales/zh-TW/dashboard.json';
import zhTWIdentity from './locales/zh-TW/identity.json';
import zhTWHousehold from './locales/zh-TW/household.json';
import zhTWCredentials from './locales/zh-TW/credentials.json';
import zhTWVerification from './locales/zh-TW/verification.json';
import zhTWAdmin from './locales/zh-TW/admin.json';
import zhTWSettings from './locales/zh-TW/settings.json';
import zhTWQa from './locales/zh-TW/qa.json';

import nanTWCommon from './locales/nan-TW/common.json';
import nanTWDashboard from './locales/nan-TW/dashboard.json';
import nanTWIdentity from './locales/nan-TW/identity.json';
import nanTWHousehold from './locales/nan-TW/household.json';
import nanTWCredentials from './locales/nan-TW/credentials.json';
import nanTWVerification from './locales/nan-TW/verification.json';
import nanTWAdmin from './locales/nan-TW/admin.json';
import nanTWSettings from './locales/nan-TW/settings.json';
import nanTWQa from './locales/nan-TW/qa.json';

function getNestedKeys(obj: Record<string, unknown>, prefix = ''): string[] {
  let keys: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      keys = keys.concat(getNestedKeys(value as Record<string, unknown>, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

function assertNoEmptyValues(obj: Record<string, unknown>, path = '') {
  for (const [key, value] of Object.entries(obj)) {
    const currentPath = path ? `${path}.${key}` : key;
    if (typeof value === 'string') {
      assert.ok(value.trim().length > 0, `Value at ${currentPath} must not be empty`);
    } else if (value && typeof value === 'object') {
      assertNoEmptyValues(value as Record<string, unknown>, currentPath);
    }
  }
}

test('i18n locale files key parity across en, zh-TW, and nan-TW', () => {
  const namespaces = [
    { name: 'common', en: enCommon, zhTW: zhTWCommon, nanTW: nanTWCommon },
    { name: 'dashboard', en: enDashboard, zhTW: zhTWDashboard, nanTW: nanTWDashboard },
    { name: 'identity', en: enIdentity, zhTW: zhTWIdentity, nanTW: nanTWIdentity },
    { name: 'household', en: enHousehold, zhTW: zhTWHousehold, nanTW: nanTWHousehold },
    { name: 'credentials', en: enCredentials, zhTW: zhTWCredentials, nanTW: nanTWCredentials },
    { name: 'verification', en: enVerification, zhTW: zhTWVerification, nanTW: nanTWVerification },
    { name: 'admin', en: enAdmin, zhTW: zhTWAdmin, nanTW: nanTWAdmin },
    { name: 'settings', en: enSettings, zhTW: zhTWSettings, nanTW: nanTWSettings },
    { name: 'qa', en: enQa, zhTW: zhTWQa, nanTW: nanTWQa },
  ];

  for (const ns of namespaces) {
    const enKeys = getNestedKeys(ns.en).sort();
    const zhTWKeys = getNestedKeys(ns.zhTW).sort();
    const nanTWKeys = getNestedKeys(ns.nanTW).sort();

    assert.deepEqual(zhTWKeys, enKeys, `Namespace ${ns.name} keys must match between en and zh-TW`);
    assert.deepEqual(nanTWKeys, enKeys, `Namespace ${ns.name} keys must match between en and nan-TW`);

    assertNoEmptyValues(ns.en, `${ns.name}.en`);
    assertNoEmptyValues(ns.zhTW, `${ns.name}.zh-TW`);
    assertNoEmptyValues(ns.nanTW, `${ns.name}.nan-TW`);
  }
});

test('Taiwanese Hokkien has distinct translations and does not duplicate Mandarin verbatim', () => {
  // Common terms check
  assert.notEqual(nanTWCommon.languages.selector, zhTWCommon.languages.selector);
  assert.notEqual(nanTWDashboard.welcomeSubtitle, zhTWDashboard.welcomeSubtitle);
  assert.notEqual(nanTWHousehold.householdCard.headOfHousehold, enHousehold.householdCard.headOfHousehold);
  assert.ok(nanTWCommon.terms.householdRegistration.includes('戶口登記'));
  assert.ok(nanTWCommon.terms.zeroKnowledgeProof.includes('零知識證明'));
});

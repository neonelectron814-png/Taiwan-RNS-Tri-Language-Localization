# Taiwan-RNS — Taiwan Resident Network System
### 臺灣居民身分網路系統 · Tâi-oân Kū-bîn Sin-hun Bang-lō͘ Hē-thóng

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.x-61dafb?style=flat-square)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?style=flat-square)](https://tailwindcss.com/)
[![W3C Verifiable Credentials](https://img.shields.io/badge/W3C-DID%20%26%20VC%20v1.1-green?style=flat-square)](https://www.w3.org/TR/vc-data-model/)
[![ZKP Architecture](https://img.shields.io/badge/ZKP-Groth16%20zk--SNARK-emerald?style=flat-square)](https://z.cash/technology/zksnarks/)
[![Localization](https://img.shields.io/badge/Languages-en%20%7C%20zh--TW%20%7C%20nan--TW-orange?style=flat-square)](#internationalization-tri-language-system)

---

## 1. Executive Summary

**Taiwan-RNS** (Taiwan Resident Network System) is a next-generation Sovereign Digital Identity, Household Registration, and Cryptographic Trust platform designed for citizens, residents, and government agencies of Taiwan (Republic of China). 

Built under the legal frameworks of the **Taiwan Electronic Signatures Act (電子簽章法)** and the **Personal Data Protection Act (個人資料保護法)**, Taiwan-RNS bridges decentralized identity (W3C DID), verifiable credentials (VC), and zero-knowledge cryptography (ZKP) with everyday government interactions.

It enables citizens to prove legal assertions—such as being over 18 years of age or residing in a specific municipality—**without disclosing raw personal data** like their exact birthdate, national ID number, or residential address.

---

## 2. Key Architectural Pillars

### 2.1 GlassyUI Design System
Taiwan-RNS implements a frosted glassmorphism architecture based on modern UI standards:
- **Translucent Surfaces**: Realized through `.glass-panel`, `.glass-card`, `.glass-dock`, and `.glass-header` with multi-tier Gaussian blurs (`backdrop-filter: blur(20px)`).
- **Light Physics & Ambient Mesh Orbs**: Background light orbs (Emerald Aurora, Teal Shimmer, and Indigo Ambient) produce dynamic refraction through frosted cards in both Light Mode and High-Contrast OLED Dark Mode.
- **Custom Emerald Scrollbar**: Custom rounded scrollbar (`border-radius: 9999px`) styled in translucent emerald green (`rgba(16, 185, 129, 0.45)`) with hover states that fit seamlessly with the UI.

### 2.2 Floating Island Workspace Layout
- **Strictly Pinned Top Header**: Brand wordmark, active section pill, global language selector, and dark mode toggle.
- **Fixed & Dockable Sidebar**: Pinned to the viewport height (`h-full`), ensuring it never scrolls off the screen when browsing long content. Supports **Left ⇄ Right docking** and **drag-and-drop item reordering**.
- **Independently Scrollable Main Viewport**: Equipped with flexbox constraint protection (`min-w-0` and `overflow-x-hidden`) to eliminate horizontal blowouts.

### 2.3 Mobile-First Android Navigation & "More" Sheet
- **Native Android Floating Dock**: Features 4 primary tabs (`Overview`, `Identity`, `Household`, `Credentials`) alongside a 5th **"More" (更多項目)** action button with active status indicators.
- **GlassyUI "More" Modal Sheet**: Tapping "More" opens a floating frosted glass card containing extended tools (`ZKP Verification`, `Audit & Console`, `Settings`, and `Language Testing QA`), complete with quick citizen status info.

---

## 3. Core Modules & Functional Capabilities

| Module | Identifier | Color Theme | Description & Capabilities |
| :--- | :--- | :--- | :--- |
| **System Overview** | `dashboard` | 🟢 **Green** | Real-time national trust registry status, active credentials volume (41.8M+), daily ZKP queries (1.2M+), verification throughput charts, and quick-action triggers. |
| **Digital Identity** | `identity` | 🔵 **Blue** | Self-Sovereign DID management (`did:taiwan:resident:...`), Ed25519 keypair bindings, physical chip holographic visual card, QR code viewer, and privacy disclosure shield toggles. |
| **Household Registration** | `household` | 🔷 **Navy** | Digital Certified Household Transcript (戶籍謄本), family registry records, head-of-household designation, legal remarks, and inter-district relocation applications. |
| **Verifiable Credentials** | `credentials` | 🔵 **Blue** | W3C VC digital wallet supporting National ID, National Health Insurance (NHI), Professional Licenses, and Driver's Credentials with selective cryptographic disclosure. |
| **ZKP Verification** | `verification` | 🟢 **Green** | Interactive Zero-Knowledge Proof generator using Groth16 zk-SNARK algorithms on BN254 curves. Evaluates age and residency predicates with zero raw data leakage. |
| **Audit & Console** | `admin` | ⚫ **Black** | National consensus backbone cluster health (Taipei, Taichung, Kaohsiung nodes), cryptographic latency monitors, and tamper-evident Merkle tree audit logs. |
| **System Settings** | `settings` | ⚫ **Black** | Interface language switching, OLED Dark/Light theme toggles, and cryptographic seed/key backup into hardware security enclaves. |
| **Language QA Matrix** | `qa` | 🔷 **Navy** | 8-point regulatory localization compliance checklist, live locale stress-testing, and technical terminology comparison matrix across all supported languages. |

---

## 4. Internationalization (Tri-Language System)

Taiwan-RNS implements a strict **Three-Language Localization Architecture** with 100% key parity across all system modules:

1. **English (`en`)**: International standard administrative terminology.
2. **Traditional Chinese (`zh-TW`)**: Official Republic of China legal and governmental vocabulary.
3. **Taiwanese Hokkien (`nan-TW`)**: Authentic Taiwanese Taigi terminology rendered in Taiwanese Han characters (Hàn-jī) with appropriate Tâi-lô Romanization.

```
src/i18n/
├── index.ts                     # i18next configuration & language switchers
├── i18n.test.ts                 # Automated unit tests for 100% key parity
└── locales/
    ├── en/                      # English translation bundles
    ├── zh-TW/                   # Traditional Chinese bundles
    └── nan-TW/                  # Taiwanese Hokkien bundles
```

### Core Terminology Translation Matrix

| Concept | English (`en`) | Traditional Chinese (`zh-TW`) | Taiwanese Hokkien (`nan-TW`) |
| :--- | :--- | :--- | :--- |
| **Digital Identity** | Digital Identity | 數位身分 | 數位身分 (Sò͘-ūi Sin-hun) |
| **Household Registration**| Household Registration | 戶籍登記 | 戶口登記 (Hō͘-kháu Teng-kì) |
| **Verifiable Credentials** | Verifiable Credentials | 可驗證憑證 | 可驗證憑證 (Khó Giām-chèng Pîn-chèng) |
| **Identity Verification** | Identity Verification | 身分驗證 | 身分驗證 (Sin-hun Giām-chèng) |
| **Privacy Protection** | Privacy Protection | 隱私保護 | 隱私保護 (Ín-su Pó-hō͘) |
| **Zero-Knowledge Proof** | Zero-Knowledge Proof | 零知識證明 | 零知識證明 (Lêng-ti-sek Chèng-bêng) |
| **Government Organization**| Government Organization | 政府機關 | 政府機關 (Chèng-hú Ki-koan) |
| **Decentralized Identifier**| Decentralized Identifier (DID)| 分散式身分識別碼 (DID) | 分散式身分識別碼 (Hun-sàn-sek DID) |
| **National Trust Registry**| National Trust Registry | 國家信任登錄冊 | 國家級信任登錄冊 |

---

## 5. Technology Stack

- **Runtime & Framework**: React 19, TypeScript, Vite
- **Styling & Effects**: Tailwind CSS v4, Glassmorphism, CSS Backdrop Filters
- **Icons**: Lucide React
- **Internationalization**: i18next & react-i18next
- **Testing & QA**: Node.js Test Runner (`node:test`), Playwright CLI
- **Design Inspiration**: GlassyUI Components

---

## 6. Development & Verification Commands

```bash
# Install dependencies
npm install

# Run development server (Port 3000)
npm run dev

# Execute TypeScript type checking
npm run lint

# Compile and build production bundle
npm run build

# Run automated tri-language key parity tests
npx tsx --test src/i18n/i18n.test.ts
```

---

## 7. Compliance & Standards

- **W3C Decentralized Identifiers (DIDs) v1.0**
- **W3C Verifiable Credentials Data Model v1.1 / v2.0**
- **Taiwan Electronic Signatures Act (電子簽章法)**
- **Taiwan Personal Data Protection Act (個人資料保護法)**
- **NIST SP 800-63-3 Identity Assurance Level 4 (IAL4 / AAL3)**

---

*© 2026 Taiwan Resident Network System (Taiwan-RNS). Built for sovereign cryptographic privacy and democratic digital governance.*

export type ActiveTab =
  | 'dashboard'
  | 'identity'
  | 'household'
  | 'credentials'
  | 'verification'
  | 'admin'
  | 'settings'
  | 'qa';

export interface CitizenProfile {
  name: string;
  englishName: string;
  nationalId: string;
  birthDate: string;
  gender: 'female' | 'male';
  birthPlace: string;
  address: string;
  phone: string;
  email: string;
  did: string;
  maskId: boolean;
  maskBirth: boolean;
  maskAddress: boolean;
}

export interface HouseholdMember {
  id: string;
  relationKey: string;
  name: string;
  nationalId: string;
  birthDate: string;
  statusKey: string;
}

export interface VerifiableCredentialItem {
  id: string;
  titleKey: string;
  typeKey: string;
  issuerKey: string;
  descriptionKey: string;
  claimsKey: string;
  issuerDid: string;
  subjectDid: string;
  issuanceDate: string;
  expirationDate: string;
  proofType: string;
  status: 'valid' | 'expired' | 'revoked';
  category: 'id' | 'health' | 'civil' | 'signature' | 'license';
}

export interface AuditRecord {
  id: string;
  timestamp: string;
  agencyKey: string;
  eventTypeKey: string;
  proofStandard: string;
  auditHash: string;
  statusKey: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning';
}

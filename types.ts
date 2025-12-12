// Domain models representing the Java Backend DTOs

export enum SourceSystem {
  CORE_BANKING = 'Core Banking',
  CRM = 'CRM Salesforce',
  LOS = 'Loan Originating System',
  DIGITAL_APP = 'Mobile Banking',
}

export enum RecordStatus {
  ACTIVE = 'Active',
  PENDING_REVIEW = 'Pending Review',
  MERGED = 'Merged',
  ARCHIVED = 'Archived',
}

export interface Address {
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

export interface CustomerEntity {
  id: string; // UUID
  fullName: string;
  nik?: string; // Indonesian ID
  email: string;
  phone: string;
  address: Address;
  dob: string;
  sourceSystem: SourceSystem;
  lastUpdated: string;
  confidenceScore?: number; // For match candidates
}

export interface GoldenRecord extends CustomerEntity {
  goldenId: string;
  contributingSources: string[]; // IDs of source records
  dqScore: number; // 0-100
  auditTrailId: string;
}

export interface MatchCandidate {
  id: string;
  primaryRecord: CustomerEntity;
  duplicateCandidate: CustomerEntity;
  matchScore: number; // 0-100 (AI-driven)
  matchReasons: string[]; // e.g., "Exact NIK Match", "Fuzzy Name Match"
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface DQMetric {
  name: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  description: string;
}

export interface IngestionJob {
  id: string;
  fileName: string;
  source: SourceSystem;
  status: 'COMPLETED' | 'PROCESSING' | 'FAILED';
  recordsProcessed: number;
  timestamp: string;
}

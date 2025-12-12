import { GoldenRecord, SourceSystem, RecordStatus, MatchCandidate, IngestionJob, DQMetric } from '../types';

// Mock Golden Records
export const MOCK_GOLDEN_RECORDS: GoldenRecord[] = [
  {
    id: 'GR-001',
    goldenId: 'GR-882190',
    fullName: 'Budi Santoso',
    nik: '3171000000000001',
    email: 'budi.santoso@gmail.com',
    phone: '+6281234567890',
    address: {
      street: 'Jl. Sudirman No. 45',
      city: 'Jakarta Selatan',
      province: 'DKI Jakarta',
      postalCode: '12190',
      country: 'Indonesia'
    },
    dob: '1985-05-20',
    sourceSystem: SourceSystem.CORE_BANKING,
    lastUpdated: '2023-10-25T14:30:00Z',
    contributingSources: ['SRC-CB-112', 'SRC-CRM-992'],
    dqScore: 98,
    auditTrailId: 'AUD-9921'
  },
  {
    id: 'GR-002',
    goldenId: 'GR-882191',
    fullName: 'Siti Aminah',
    nik: '3201000000000002',
    email: 'siti.aminah@yahoo.co.id',
    phone: '+6281987654321',
    address: {
      street: 'Komp. Buah Batu Regency B2',
      city: 'Bandung',
      province: 'Jawa Barat',
      postalCode: '40287',
      country: 'Indonesia'
    },
    dob: '1990-11-12',
    sourceSystem: SourceSystem.DIGITAL_APP,
    lastUpdated: '2023-10-26T09:15:00Z',
    contributingSources: ['SRC-DIGI-551'],
    dqScore: 92,
    auditTrailId: 'AUD-9922'
  },
  {
    id: 'GR-003',
    goldenId: 'GR-882192',
    fullName: 'PT. Maju Mundur Sejahtera',
    nik: 'N/A (NPWP: 01.000.111.2-333.000)',
    email: 'finance@majumundur.com',
    phone: '(021) 555-1234',
    address: {
      street: 'Kawasan Industri Pulogadung',
      city: 'Jakarta Timur',
      province: 'DKI Jakarta',
      postalCode: '13920',
      country: 'Indonesia'
    },
    dob: '2010-02-01',
    sourceSystem: SourceSystem.LOS,
    lastUpdated: '2023-10-24T16:45:00Z',
    contributingSources: ['SRC-LOS-771', 'SRC-CB-221'],
    dqScore: 100,
    auditTrailId: 'AUD-9923'
  },
];

// Mock Match Candidates for Data Steward Review
export const MOCK_MATCH_CANDIDATES: MatchCandidate[] = [
  {
    id: 'MC-101',
    primaryRecord: {
      id: 'SRC-CRM-331',
      fullName: 'Andi Pratama',
      nik: '3671000000000055',
      email: 'andi.p@gmail.com',
      phone: '0812-3333-4444',
      address: { street: 'Jl. Melati 5', city: 'Tangerang', province: 'Banten', postalCode: '15111', country: 'ID' },
      dob: '1988-01-01',
      sourceSystem: SourceSystem.CRM,
      lastUpdated: '2023-10-26T10:00:00Z'
    },
    duplicateCandidate: {
      id: 'SRC-LOS-882',
      fullName: 'Andy Pratama', // Slight spelling diff
      nik: '3671000000000055', // Exact NIK match
      email: 'andi.pratama88@gmail.com',
      phone: '+6281233334444',
      address: { street: 'Jalan Melati V No. 5', city: 'Tangerang', province: 'Banten', postalCode: '15111', country: 'Indonesia' },
      dob: '1988-01-01',
      sourceSystem: SourceSystem.LOS,
      lastUpdated: '2023-10-25T08:00:00Z'
    },
    matchScore: 95,
    matchReasons: ['Exact NIK Match', 'Fuzzy Name Match (98%)', 'Exact DOB Match'],
    status: 'PENDING'
  },
  {
    id: 'MC-102',
    primaryRecord: {
      id: 'SRC-CB-551',
      fullName: 'Dewi Sartika',
      nik: '3273000000001234',
      email: 'dewi.s@outlook.com',
      phone: '0811-1111-2222',
      address: { street: 'Jl. Asia Afrika', city: 'Bandung', province: 'Jabar', postalCode: '40111', country: 'ID' },
      dob: '1995-06-15',
      sourceSystem: SourceSystem.CORE_BANKING,
      lastUpdated: '2023-10-20T10:00:00Z'
    },
    duplicateCandidate: {
      id: 'SRC-DIGI-991',
      fullName: 'Dewi S.',
      nik: '', // Missing NIK
      email: 'dewi.sartika.work@gmail.com',
      phone: '081111112222',
      address: { street: 'Jl. Asia Afrika No 10', city: 'Bandung', province: 'Jawa Barat', postalCode: '40111', country: 'ID' },
      dob: '1995-06-15',
      sourceSystem: SourceSystem.DIGITAL_APP,
      lastUpdated: '2023-10-26T12:00:00Z'
    },
    matchScore: 78,
    matchReasons: ['Exact Phone Match', 'Fuzzy Address Match'],
    status: 'PENDING'
  }
];

export const MOCK_JOBS: IngestionJob[] = [
  { id: 'JOB-001', fileName: 'daily_customer_extract_crm.csv', source: SourceSystem.CRM, status: 'COMPLETED', recordsProcessed: 15420, timestamp: '2023-10-26 02:00 AM' },
  { id: 'JOB-002', fileName: 'los_new_applications.json', source: SourceSystem.LOS, status: 'COMPLETED', recordsProcessed: 320, timestamp: '2023-10-26 04:30 AM' },
  { id: 'JOB-003', fileName: 'core_banking_delta.xml', source: SourceSystem.CORE_BANKING, status: 'PROCESSING', recordsProcessed: 4500, timestamp: '2023-10-26 10:15 AM' },
  { id: 'JOB-004', fileName: 'partner_data_feed.csv', source: SourceSystem.DIGITAL_APP, status: 'FAILED', recordsProcessed: 0, timestamp: '2023-10-25 11:00 PM' },
];

export const DQ_METRICS: DQMetric[] = [
  { name: 'Completeness', score: 94.5, trend: 'up', description: 'Percentage of mandatory fields populated' },
  { name: 'Uniqueness', score: 88.2, trend: 'up', description: 'Freedom from duplicate records' },
  { name: 'Consistency', score: 91.0, trend: 'stable', description: 'Data consistent across systems' },
  { name: 'Validity', score: 96.8, trend: 'up', description: 'Data conforms to format (Regex/Ref)' },
];

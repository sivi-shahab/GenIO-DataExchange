import React, { useState } from 'react';
import { 
  Scale, 
  CheckCircle, 
  ShieldCheck, 
  UserCheck, 
  FileText, 
  Search, 
  Eye, 
  Download, 
  AlertTriangle, 
  Lock,
  History,
  Trash2
} from 'lucide-react';

const Compliance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'subject-rights' | 'controls'>('dashboard');
  const [subjectSearch, setSubjectSearch] = useState('');

  const COMPLIANCE_CHECKLIST = [
    { article: 'Pasal 16', title: 'Prinsip Perlindungan Data', status: 'Compliant', details: 'Data processing has specific goals, minimal data collection, and accuracy checks.' },
    { article: 'Pasal 5-13', title: 'Hak Subjek Data', status: 'Compliant', details: 'Mechanisms for Access, Correction, and Erasure are active.' },
    { article: 'Pasal 20-23', title: 'Dasar Pemrosesan', status: 'Compliant', details: 'Legal basis recorded in metadata (Consent/Contract/Legal).' },
    { article: 'Pasal 35-39', title: 'Keamanan Data', status: 'Compliant', details: 'Encryption at rest (AES-256) and RBAC enforced.' },
    { article: 'Pasal 39, 48', title: 'Audit Trail & Lineage', status: 'Compliant', details: 'Immutable logs for all PII access and modifications.' },
    { article: 'Pasal 42-44', title: 'Retensi & Pemusnahan', status: 'Warning', details: 'Retention policy defined but automated purging is pending approval.' },
  ];

  const MOCK_REQUESTS = [
    { id: 'SAR-23-001', subject: 'Budi Santoso', type: 'Right to Access', received: '2023-10-25', status: 'Completed', deadline: '2023-10-28' },
    { id: 'SAR-23-002', subject: 'Siti Aminah', type: 'Right to Correction', received: '2023-10-26', status: 'In Progress', deadline: '2023-10-29' },
    { id: 'SAR-23-003', subject: 'Andi Pratama', type: 'Right to Erasure', received: '2023-10-26', status: 'Pending Review', deadline: '2023-10-29' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">UU PDP Compliance Center</h1>
          <p className="text-slate-500 mt-1">Manage compliance with Indonesian Law No. 27 of 2022 on Personal Data Protection.</p>
        </div>
        <div className="flex bg-white rounded-lg p-1 border border-slate-200">
           <button 
             onClick={() => setActiveTab('dashboard')}
             className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'dashboard' ? 'bg-blue-100 text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
           >
             <Scale size={16} /> Overview
           </button>
           <button 
             onClick={() => setActiveTab('subject-rights')}
             className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'subject-rights' ? 'bg-blue-100 text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
           >
             <UserCheck size={16} /> Subject Rights
           </button>
           <button 
             onClick={() => setActiveTab('controls')}
             className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'controls' ? 'bg-blue-100 text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
           >
             <ShieldCheck size={16} /> Controls & Security
           </button>
        </div>
      </div>

      {/* DASHBOARD TAB */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
                <div>
                  <p className="text-slate-500 text-sm font-medium">Compliance Score</p>
                  <h3 className="text-3xl font-bold text-slate-900 mt-2">92%</h3>
                  <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded mt-2 inline-block">High Adherence</span>
                </div>
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                   <Scale size={24} />
                </div>
             </div>
             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
                <div>
                  <p className="text-slate-500 text-sm font-medium">Open Subject Requests</p>
                  <h3 className="text-3xl font-bold text-slate-900 mt-2">2</h3>
                  <span className="text-slate-500 text-xs mt-2 inline-block">Due within 72 hours (3x24h)</span>
                </div>
                <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                   <History size={24} />
                </div>
             </div>
             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
                <div>
                  <p className="text-slate-500 text-sm font-medium">Pending Incidents</p>
                  <h3 className="text-3xl font-bold text-green-600 mt-2">0</h3>
                  <span className="text-slate-500 text-xs mt-2 inline-block">No active breaches detected</span>
                </div>
                <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                   <ShieldCheck size={24} />
                </div>
             </div>
          </div>

          {/* Compliance Matrix Table */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                <h3 className="text-lg font-bold text-slate-900">UU PDP Compliance Matrix</h3>
                <button className="flex items-center gap-2 text-sm text-blue-600 font-medium hover:text-blue-800">
                   <Download size={16} /> Export Report
                </button>
             </div>
             <table className="w-full text-left text-sm">
                <thead className="bg-white text-slate-500 font-medium border-b border-slate-200">
                   <tr>
                      <th className="px-6 py-4">Article (Pasal)</th>
                      <th className="px-6 py-4">Requirement Area</th>
                      <th className="px-6 py-4">Implementation Status</th>
                      <th className="px-6 py-4">Evidence / Controls</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                   {COMPLIANCE_CHECKLIST.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                         <td className="px-6 py-4 font-medium text-slate-900">{item.article}</td>
                         <td className="px-6 py-4 text-slate-700">{item.title}</td>
                         <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                               item.status === 'Compliant' 
                               ? 'bg-green-50 text-green-700 border-green-200' 
                               : 'bg-amber-50 text-amber-700 border-amber-200'
                            }`}>
                               {item.status === 'Compliant' ? <CheckCircle size={12} /> : <AlertTriangle size={12} />}
                               {item.status}
                            </span>
                         </td>
                         <td className="px-6 py-4 text-slate-500">{item.details}</td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        </div>
      )}

      {/* SUBJECT RIGHTS TAB */}
      {activeTab === 'subject-rights' && (
         <div className="space-y-6">
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center">
               <h3 className="text-lg font-bold text-slate-900 mb-2">Find Data Subject (FR-COMP-01)</h3>
               <p className="text-slate-500 mb-6 max-w-2xl mx-auto">
                  Trace all personal data across source systems. Use this tool to fulfill Right to Access, Correction, or Erasure requests.
               </p>
               <div className="max-w-xl mx-auto relative">
                  <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
                  <input 
                     type="text"
                     placeholder="Enter NIK, Customer ID, Email, or Full Name..."
                     className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-base"
                     value={subjectSearch}
                     onChange={(e) => setSubjectSearch(e.target.value)}
                  />
                  <button className="absolute right-2 top-2 bg-slate-900 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-slate-800">
                     Search
                  </button>
               </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
               <div className="p-6 border-b border-slate-200 bg-slate-50">
                  <h3 className="text-lg font-bold text-slate-900">Active Requests</h3>
               </div>
               <table className="w-full text-left text-sm">
                  <thead className="bg-white text-slate-500 font-medium border-b border-slate-200">
                     <tr>
                        <th className="px-6 py-4">Request ID</th>
                        <th className="px-6 py-4">Data Subject</th>
                        <th className="px-6 py-4">Request Type</th>
                        <th className="px-6 py-4">Received Date</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {MOCK_REQUESTS.map((req) => (
                        <tr key={req.id} className="hover:bg-slate-50">
                           <td className="px-6 py-4 font-mono text-slate-500 text-xs">{req.id}</td>
                           <td className="px-6 py-4 font-bold text-slate-900">{req.subject}</td>
                           <td className="px-6 py-4 text-blue-600 font-medium">{req.type}</td>
                           <td className="px-6 py-4 text-slate-500">{req.received}</td>
                           <td className="px-6 py-4">
                              <span className={`px-2 py-1 rounded text-xs font-bold ${
                                 req.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                 req.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                                 'bg-amber-100 text-amber-700'
                              }`}>
                                 {req.status}
                              </span>
                           </td>
                           <td className="px-6 py-4 text-right">
                              <button className="text-slate-500 hover:text-blue-600 font-medium text-xs flex items-center justify-end gap-1 w-full">
                                 <FileText size={14} /> View Details
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      )}

      {/* CONTROLS TAB */}
      {activeTab === 'controls' && (
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
               <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Lock size={20} /></div>
                  <h3 className="text-lg font-bold text-slate-900">Sensitive Data Protection</h3>
               </div>
               <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                     <div>
                        <p className="text-sm font-medium text-slate-900">Field-Level Encryption</p>
                        <p className="text-xs text-slate-500">AES-256 for NIK, Tax ID, and Biometrics.</p>
                     </div>
                     <span className="text-green-600 text-xs font-bold flex items-center gap-1"><CheckCircle size={12}/> Active</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                     <div>
                        <p className="text-sm font-medium text-slate-900">PII Masking</p>
                        <p className="text-xs text-slate-500">Dynamic masking for non-privileged roles.</p>
                     </div>
                     <span className="text-green-600 text-xs font-bold flex items-center gap-1"><CheckCircle size={12}/> Active</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                     <div>
                        <p className="text-sm font-medium text-slate-900">Access Logging</p>
                        <p className="text-xs text-slate-500">Log all read access to sensitive fields.</p>
                     </div>
                     <span className="text-green-600 text-xs font-bold flex items-center gap-1"><CheckCircle size={12}/> Active</span>
                  </div>
               </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
               <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><Trash2 size={20} /></div>
                  <h3 className="text-lg font-bold text-slate-900">Retention & Disposal (Pasal 42)</h3>
               </div>
               <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                     <p className="text-sm font-bold text-slate-700">Customer Data Retention Policy</p>
                     <p className="text-xs text-slate-500 mt-1 mb-3">Retention Period: 10 Years after account closure (Banking Reg).</p>
                     <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                     </div>
                     <div className="flex justify-between mt-2 text-xs text-slate-500">
                        <span>Policy Active</span>
                        <span>Auto-Purge Enabled</span>
                     </div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                     <p className="text-sm font-bold text-slate-700">Marketing Leads Retention</p>
                     <p className="text-xs text-slate-500 mt-1 mb-3">Retention Period: 2 Years from last interaction.</p>
                     <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                     </div>
                     <div className="flex justify-between mt-2 text-xs text-slate-500">
                        <span>Review Pending</span>
                        <span>Manual Purge Only</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default Compliance;
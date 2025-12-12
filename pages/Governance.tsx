import React, { useState } from 'react';
import { ShieldCheck, GitCommit, FileText, ArrowRight, Activity, Search, Filter, Lock } from 'lucide-react';

const Governance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'lineage' | 'audit'>('lineage');

  // Mock Audit Logs
  const auditLogs = [
    { id: 'LOG-001', timestamp: '2023-10-26 14:30:05', user: 'System (Auto)', action: 'MERGE_RECORD', target: 'GR-882190', details: 'Merged SRC-CRM-992 into Golden Record based on Rule #4' },
    { id: 'LOG-002', timestamp: '2023-10-26 14:15:12', user: 'admin@genio.com', action: 'VIEW_PII', target: 'GR-882191', details: 'Accessed sensitive field: NIK' },
    { id: 'LOG-003', timestamp: '2023-10-26 13:45:00', user: 'DataSteward_01', action: 'REJECT_MATCH', target: 'MC-105', details: 'Rejected candidate due to mismatched DOB' },
    { id: 'LOG-004', timestamp: '2023-10-26 12:30:22', user: 'System (Ingest)', action: 'UPLOAD_BATCH', target: 'JOB-001', details: 'Ingested 15,420 records from CRM' },
    { id: 'LOG-005', timestamp: '2023-10-26 11:20:10', user: 'ComplianceOfficer', action: 'EXPORT_REPORT', target: 'RPT-Compliance-Q3', details: 'Generated GDPR/PDP compliance report' },
  ];

  const LineageNode = ({ title, type, color, icon: Icon }: any) => (
    <div className={`w-48 p-4 rounded-xl border-2 flex flex-col items-center text-center gap-2 relative bg-white transition-all hover:scale-105 hover:shadow-md ${
      color === 'blue' ? 'border-blue-200 shadow-blue-100' :
      color === 'purple' ? 'border-purple-200 shadow-purple-100' :
      color === 'green' ? 'border-green-200 shadow-green-100' :
      'border-amber-200 shadow-amber-100'
    }`}>
      <div className={`p-2 rounded-full ${
        color === 'blue' ? 'bg-blue-100 text-blue-600' :
        color === 'purple' ? 'bg-purple-100 text-purple-600' :
        color === 'green' ? 'bg-green-100 text-green-600' :
        'bg-amber-100 text-amber-600'
      }`}>
        <Icon size={20} />
      </div>
      <div>
        <h4 className="font-bold text-slate-800 text-sm">{title}</h4>
        <p className="text-xs text-slate-500 uppercase tracking-wide mt-1">{type}</p>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">Governance & Control</h1>
           <p className="text-slate-500 mt-1">Manage data lineage, audit trails, and access controls.</p>
        </div>
        <div className="flex bg-white rounded-lg p-1 border border-slate-200">
           <button 
             onClick={() => setActiveTab('lineage')}
             className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'lineage' ? 'bg-blue-100 text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
           >
             Data Lineage
           </button>
           <button 
             onClick={() => setActiveTab('audit')}
             className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'audit' ? 'bg-blue-100 text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
           >
             Audit Logs
           </button>
        </div>
      </div>

      {activeTab === 'lineage' && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 flex-1 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
            <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
              <GitCommit className="text-blue-600" />
              End-to-End Data Flow
            </h3>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full border border-green-200">
              Live Monitoring
            </span>
          </div>

          <div className="flex-1 flex items-center justify-center overflow-x-auto">
            <div className="flex items-center gap-4 min-w-max">
              
              {/* Sources */}
              <div className="flex flex-col gap-4">
                 <LineageNode title="Core Banking" type="Source System" color="blue" icon={Activity} />
                 <LineageNode title="CRM Salesforce" type="Source System" color="blue" icon={Activity} />
                 <LineageNode title="Mobile App" type="Source System" color="blue" icon={Activity} />
              </div>

              <ArrowRight size={24} className="text-slate-300" />

              {/* Ingestion */}
              <LineageNode title="Kafka Stream" type="Ingestion Layer" color="purple" icon={GitCommit} />

              <ArrowRight size={24} className="text-slate-300" />

              {/* Processing */}
              <LineageNode title="MDM Engine" type="Processing & DQ" color="amber" icon={ShieldCheck} />

              <ArrowRight size={24} className="text-slate-300" />

              {/* Storage */}
              <LineageNode title="Golden Record DB" type="Master Storage" color="green" icon={Lock} />

              <ArrowRight size={24} className="text-slate-300" />

              {/* Consumers */}
              <div className="flex flex-col gap-4">
                 <LineageNode title="Data Warehouse" type="Downstream" color="blue" icon={FileText} />
                 <LineageNode title="Reporting API" type="Downstream" color="blue" icon={Activity} />
              </div>

            </div>
          </div>
          <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-500">
             <p><strong>Note:</strong> This diagram represents the logical flow of customer data. Click on any node to view specific transformation rules and schema definitions (Feature coming in v1.2).</p>
          </div>
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex-1 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
             <div className="relative">
                <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search logs..." 
                  className="pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
             </div>
             <button className="flex items-center gap-2 px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50">
                <Filter size={16} /> Filter
             </button>
          </div>
          
          <div className="overflow-auto flex-1">
             <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                   <tr>
                      <th className="px-6 py-3">Log ID</th>
                      <th className="px-6 py-3">Timestamp</th>
                      <th className="px-6 py-3">User / System</th>
                      <th className="px-6 py-3">Action</th>
                      <th className="px-6 py-3">Target Entity</th>
                      <th className="px-6 py-3">Details</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                   {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50">
                         <td className="px-6 py-3 font-mono text-slate-500 text-xs">{log.id}</td>
                         <td className="px-6 py-3 text-slate-600">{log.timestamp}</td>
                         <td className="px-6 py-3 font-medium text-slate-900">{log.user}</td>
                         <td className="px-6 py-3">
                            <span className={`px-2 py-1 rounded text-xs font-bold border ${
                               log.action.includes('REJECT') ? 'bg-red-50 text-red-700 border-red-200' :
                               log.action.includes('MERGE') ? 'bg-blue-50 text-blue-700 border-blue-200' :
                               log.action.includes('VIEW') ? 'bg-amber-50 text-amber-700 border-amber-200' :
                               'bg-slate-100 text-slate-700 border-slate-200'
                            }`}>
                               {log.action}
                            </span>
                         </td>
                         <td className="px-6 py-3 font-mono text-blue-600">{log.target}</td>
                         <td className="px-6 py-3 text-slate-600 truncate max-w-xs" title={log.details}>{log.details}</td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center text-xs text-slate-500">
             <span>Showing 5 of 2,492 logs</span>
             <div className="flex gap-2">
                <button className="px-3 py-1 border border-slate-300 rounded bg-white disabled:opacity-50" disabled>Previous</button>
                <button className="px-3 py-1 border border-slate-300 rounded bg-white hover:bg-slate-50">Next</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Governance;
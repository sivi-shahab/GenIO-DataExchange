import React, { useState } from 'react';
import { 
  Database, 
  Upload, 
  Activity, 
  Server, 
  FileSpreadsheet, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Play, 
  Plus, 
  RefreshCw,
  HardDrive
} from 'lucide-react';
import { MOCK_JOBS } from '../services/mockData';

// Mock Sources Data
const MOCK_SOURCES = [
  { id: 'SRC-001', name: 'Core Banking System', type: 'Database (Oracle)', protocol: 'JDBC / CDC', status: 'Active', lastSync: '2 mins ago', health: 98 },
  { id: 'SRC-002', name: 'Salesforce CRM', type: 'SaaS API', protocol: 'REST API', status: 'Active', lastSync: '15 mins ago', health: 100 },
  { id: 'SRC-003', name: 'Loan Originating System', type: 'Legacy DB', protocol: 'Batch Export', status: 'Warning', lastSync: '4 hours ago', health: 85 },
  { id: 'SRC-004', name: 'Mobile App Events', type: 'Event Stream', protocol: 'Kafka', status: 'Active', lastSync: 'Live', health: 99 },
];

const Ingestion: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sources' | 'upload' | 'jobs'>('sources');
  const [isUploading, setIsUploading] = useState(false);

  // Simulate file upload
  const handleFileUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      alert("File uploaded successfully! Processing job started.");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Ingestion & Sources</h1>
          <p className="text-slate-500 mt-1">Manage data connections, manual uploads, and monitor ingestion pipelines.</p>
        </div>
        <div className="flex bg-white rounded-lg p-1 border border-slate-200">
           <button 
             onClick={() => setActiveTab('sources')}
             className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'sources' ? 'bg-blue-100 text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
           >
             <Database size={16} /> Data Sources
           </button>
           <button 
             onClick={() => setActiveTab('upload')}
             className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'upload' ? 'bg-blue-100 text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
           >
             <Upload size={16} /> File Ingestion
           </button>
           <button 
             onClick={() => setActiveTab('jobs')}
             className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'jobs' ? 'bg-blue-100 text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
           >
             <Activity size={16} /> Job History
           </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
             <Server size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase">Active Sources</p>
            <p className="text-xl font-bold text-slate-900">4/4</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
             <HardDrive size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase">Volume (24h)</p>
            <p className="text-xl font-bold text-slate-900">1.2 GB</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-lg">
             <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase">Success Rate</p>
            <p className="text-xl font-bold text-slate-900">99.8%</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
             <Clock size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase">Avg Latency</p>
            <p className="text-xl font-bold text-slate-900">120ms</p>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[400px]">
        
        {activeTab === 'sources' && (
           <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-900">Configured Data Sources</h3>
                <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors shadow-sm text-sm font-medium">
                  <Plus size={16} /> Add New Source
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {MOCK_SOURCES.map(source => (
                    <div key={source.id} className="border border-slate-200 rounded-lg p-5 hover:border-blue-300 transition-colors group">
                       <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                             <div className="p-2 bg-slate-100 rounded text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                <Database size={24} />
                             </div>
                             <div>
                                <h4 className="font-bold text-slate-900">{source.name}</h4>
                                <p className="text-xs text-slate-500">{source.type}</p>
                             </div>
                          </div>
                          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide border ${
                             source.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}>
                             {source.status}
                          </span>
                       </div>
                       
                       <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                             <span className="text-slate-500">Protocol</span>
                             <span className="font-medium text-slate-700">{source.protocol}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                             <span className="text-slate-500">Last Sync</span>
                             <span className="font-medium text-slate-700">{source.lastSync}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                             <span className="text-slate-500">Health Score</span>
                             <span className={`font-bold ${source.health > 90 ? 'text-green-600' : 'text-amber-600'}`}>{source.health}%</span>
                          </div>
                       </div>
                       
                       <div className="flex gap-2 pt-4 border-t border-slate-100">
                          <button className="flex-1 py-2 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 rounded border border-slate-200">
                             Configure
                          </button>
                          <button className="flex-1 py-2 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 flex items-center justify-center gap-1">
                             <RefreshCw size={12} /> Sync Now
                          </button>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        )}

        {activeTab === 'upload' && (
           <div className="p-8 max-w-3xl mx-auto">
              <div className="text-center mb-8">
                 <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload size={32} />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900">Manual File Ingestion</h3>
                 <p className="text-slate-500 mt-2">Upload CSV, JSON, or XML files to trigger an ad-hoc ingestion job.</p>
              </div>

              <div className="border-2 border-dashed border-slate-300 rounded-xl p-10 text-center hover:bg-slate-50 transition-colors cursor-pointer mb-8">
                 {isUploading ? (
                    <div className="flex flex-col items-center animate-pulse">
                       <RefreshCw size={48} className="text-blue-500 animate-spin mb-4" />
                       <p className="text-lg font-medium text-slate-700">Uploading and Validating...</p>
                    </div>
                 ) : (
                    <>
                       <FileSpreadsheet size={48} className="text-slate-300 mx-auto mb-4" />
                       <p className="text-lg font-medium text-slate-700 mb-2">Drag and drop files here</p>
                       <p className="text-sm text-slate-500 mb-6">or click to select from your computer</p>
                       <button 
                         onClick={(e: any) => handleFileUpload(e)}
                         className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
                       >
                          Select File
                       </button>
                    </>
                 )}
              </div>

              <div>
                 <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">Recent Uploads</h4>
                 <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-200">
                       <div className="flex items-center gap-3">
                          <FileSpreadsheet size={20} className="text-green-600" />
                          <div>
                             <p className="text-sm font-medium text-slate-900">customer_data_q3.csv</p>
                             <p className="text-xs text-slate-500">12.5 MB • Uploaded by Admin</p>
                          </div>
                       </div>
                       <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">Processed</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-200">
                       <div className="flex items-center gap-3">
                          <FileSpreadsheet size={20} className="text-red-600" />
                          <div>
                             <p className="text-sm font-medium text-slate-900">leads_import_v2.json</p>
                             <p className="text-xs text-slate-500">4.2 MB • Uploaded by Data Steward</p>
                          </div>
                       </div>
                       <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">Failed Schema</span>
                    </div>
                 </div>
              </div>
           </div>
        )}

        {activeTab === 'jobs' && (
           <div>
              <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                 <h3 className="font-bold text-sm text-slate-700 uppercase tracking-wide">Ingestion Pipeline History</h3>
                 <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All Logs</button>
              </div>
              <table className="w-full text-left text-sm">
                 <thead className="bg-white text-slate-500 font-medium border-b border-slate-200">
                    <tr>
                       <th className="px-6 py-4">Job ID</th>
                       <th className="px-6 py-4">Source System</th>
                       <th className="px-6 py-4">Status</th>
                       <th className="px-6 py-4">Records Processed</th>
                       <th className="px-6 py-4">Duration</th>
                       <th className="px-6 py-4">Timestamp</th>
                       <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    {MOCK_JOBS.map((job) => (
                       <tr key={job.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4 font-mono text-slate-500 text-xs">{job.id}</td>
                          <td className="px-6 py-4 font-medium text-slate-900">{job.source}</td>
                          <td className="px-6 py-4">
                             <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                job.status === 'COMPLETED' ? 'bg-green-50 text-green-700 border-green-200' :
                                job.status === 'PROCESSING' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                'bg-red-50 text-red-700 border-red-200'
                             }`}>
                                {job.status === 'COMPLETED' && <CheckCircle size={12} className="mr-1" />}
                                {job.status === 'PROCESSING' && <RefreshCw size={12} className="mr-1 animate-spin" />}
                                {job.status === 'FAILED' && <AlertCircle size={12} className="mr-1" />}
                                {job.status}
                             </span>
                          </td>
                          <td className="px-6 py-4 text-slate-700">{job.recordsProcessed.toLocaleString()}</td>
                          <td className="px-6 py-4 text-slate-500">
                             {job.status === 'COMPLETED' ? '4m 12s' : '-'}
                          </td>
                          <td className="px-6 py-4 text-slate-500">{job.timestamp}</td>
                          <td className="px-6 py-4 text-right">
                             <button className="text-blue-600 hover:text-blue-800 font-medium text-xs">Details</button>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        )}

      </div>
    </div>
  );
};

export default Ingestion;
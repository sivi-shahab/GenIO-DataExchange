import React, { useState } from 'react';
import { Search, Filter, Download, MoreHorizontal, User, Building2, CreditCard, Phone, MapPin } from 'lucide-react';
import { MOCK_GOLDEN_RECORDS } from '../services/mockData';
import { SourceSystem } from '../types';

const GoldenRecords: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);

  const filteredRecords = MOCK_GOLDEN_RECORDS.filter(r => 
    r.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.goldenId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedRecord = MOCK_GOLDEN_RECORDS.find(r => r.id === selectedRecordId);

  return (
    <div className="flex h-[calc(100vh-6rem)] gap-6">
      
      {/* Left Panel: List */}
      <div className="w-1/3 flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Customer Registry</h2>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by Name, NIK, or ID..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 mt-3">
             <button className="flex-1 flex items-center justify-center gap-2 px-3 py-1.5 border border-slate-300 rounded text-xs font-medium text-slate-700 hover:bg-slate-50">
                <Filter size={14} /> Filter
             </button>
             <button className="flex-1 flex items-center justify-center gap-2 px-3 py-1.5 border border-slate-300 rounded text-xs font-medium text-slate-700 hover:bg-slate-50">
                <Download size={14} /> Export
             </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredRecords.map((record) => (
            <div 
              key={record.id} 
              onClick={() => setSelectedRecordId(record.id)}
              className={`p-4 border-b border-slate-100 cursor-pointer transition-colors hover:bg-slate-50 ${selectedRecordId === record.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''}`}
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-slate-900">{record.fullName}</h3>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  record.dqScore >= 95 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                }`}>DQ: {record.dqScore}</span>
              </div>
              <p className="text-xs text-slate-500 mb-2">{record.goldenId}</p>
              <div className="flex flex-wrap gap-1">
                {record.contributingSources.map(src => {
                  const sys = src.includes('CB') ? 'Core' : src.includes('CRM') ? 'CRM' : 'Digi';
                  return (
                    <span key={src} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200">
                      {sys}
                    </span>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel: Detail View */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
        {selectedRecord ? (
          <>
            {/* Header */}
            <div className="p-6 border-b border-slate-200 flex justify-between items-start bg-slate-50">
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 border border-blue-200 shadow-sm">
                   <User size={32} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">{selectedRecord.fullName}</h1>
                  <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                    <span className="flex items-center gap-1"><CreditCard size={14} /> NIK: {selectedRecord.nik}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span>ID: {selectedRecord.goldenId}</span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                      Active Customer
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200">
                      Risk Profile: Low
                    </span>
                  </div>
                </div>
              </div>
              <button className="p-2 hover:bg-slate-200 rounded-full text-slate-500">
                <MoreHorizontal />
              </button>
            </div>

            {/* Content Tabs/Body */}
            <div className="p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-8">
                
                {/* Personal Info */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-2 mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Phone className="mt-1 text-slate-400" size={18} />
                      <div>
                        <p className="text-sm font-medium text-slate-900">{selectedRecord.phone}</p>
                        <p className="text-xs text-slate-500">Primary Mobile</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 text-slate-400 font-bold text-sm">@</div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{selectedRecord.email}</p>
                        <p className="text-xs text-slate-500">Email Address</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-1 text-slate-400" size={18} />
                      <div>
                        <p className="text-sm font-medium text-slate-900">{selectedRecord.address.street}</p>
                        <p className="text-sm text-slate-600">{selectedRecord.address.city}, {selectedRecord.address.province} {selectedRecord.address.postalCode}</p>
                        <p className="text-xs text-slate-500 mt-1">{selectedRecord.address.country}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lineage / Sources */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-2 mb-4">Data Lineage & Sources</h3>
                  <div className="space-y-3">
                     <div className="relative pl-4 border-l-2 border-slate-200 space-y-4">
                        {selectedRecord.contributingSources.map((src, idx) => (
                           <div key={src} className="relative">
                              <div className="absolute -left-[21px] top-1.5 w-3 h-3 bg-blue-500 rounded-full ring-4 ring-white"></div>
                              <div className="bg-slate-50 p-3 rounded border border-slate-200">
                                 <div className="flex justify-between">
                                    <span className="text-xs font-bold text-slate-700">{src}</span>
                                    <span className="text-[10px] text-slate-400">Synced today</span>
                                 </div>
                                 <p className="text-xs text-slate-500 mt-1">
                                    Source: {src.includes('CB') ? 'Core Banking System' : src.includes('CRM') ? 'Salesforce CRM' : 'Mobile App'}
                                 </p>
                              </div>
                           </div>
                        ))}
                     </div>
                     <div className="mt-4 pt-4 border-t border-slate-100">
                        <h4 className="text-xs font-bold text-slate-700 mb-2">Audit Trail</h4>
                        <p className="text-xs text-slate-500 font-mono">
                           Last Modified: {new Date(selectedRecord.lastUpdated).toLocaleString()}<br/>
                           Modified By: SYSTEM_MERGE_PROCESS<br/>
                           Audit ID: {selectedRecord.auditTrailId}
                        </p>
                     </div>
                  </div>
                </div>
              </div>
              
              {/* Raw JSON View Section (Developer) */}
              <div className="mt-8">
                 <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-2 mb-4">Raw Golden Record (JSON)</h3>
                 <pre className="bg-slate-900 text-slate-50 p-4 rounded-lg text-xs overflow-x-auto font-mono">
                    {JSON.stringify(selectedRecord, null, 2)}
                 </pre>
              </div>

            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
             <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Search size={40} className="text-slate-300" />
             </div>
             <p className="text-lg font-medium">Select a record to view details</p>
             <p className="text-sm">Browse the registry on the left to inspect golden records.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoldenRecords;
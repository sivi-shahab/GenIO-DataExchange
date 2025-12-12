import React, { useState } from 'react';
import { Search, Book, Tag, Database, Table, ChevronRight, ChevronDown, Info } from 'lucide-react';

// Mock Data for Catalog
const CATALOG_ITEMS = [
  {
    id: 'CAT-001',
    name: 'Customer_Master_Golden',
    domain: 'Customer Domain',
    description: 'The authoritative single version of truth for individual customers, consolidated from Core Banking and CRM.',
    owner: 'Data Steward Team',
    tags: ['PII', 'Golden Record', 'Master Data'],
    attributes: [
        { name: 'golden_id', type: 'VARCHAR(20)', desc: 'Unique MDM Identifier' },
        { name: 'full_name', type: 'VARCHAR(100)', desc: 'Legal name as per KTP' },
        { name: 'nik', type: 'CHAR(16)', desc: 'National ID Number (Encrypted)' },
        { name: 'risk_score', type: 'DECIMAL', desc: 'Calculated AML risk score' },
    ]
  },
  {
    id: 'CAT-002',
    name: 'Loan_Application_Raw',
    domain: 'Lending Domain',
    description: 'Raw staging table for incoming loan applications from the Loan Originating System (LOS).',
    owner: 'Credit Risk Dept',
    tags: ['Raw', 'Transient', 'LOS'],
    attributes: [
        { name: 'app_id', type: 'VARCHAR(50)', desc: 'Application Reference ID' },
        { name: 'app_date', type: 'TIMESTAMP', desc: 'Submission timestamp' },
        { name: 'loan_amount', type: 'DECIMAL(15,2)', desc: 'Requested amount in IDR' },
        { name: 'status', type: 'VARCHAR(20)', desc: 'Current workflow status' },
    ]
  },
   {
    id: 'CAT-003',
    name: 'Trans_History_Consolidated',
    domain: 'Transaction Domain',
    description: 'Unified view of financial transactions across savings, checking, and credit card accounts.',
    owner: 'Finance Dept',
    tags: ['High Volume', 'Financial'],
    attributes: [
        { name: 'trx_id', type: 'UUID', desc: 'Global transaction ID' },
        { name: 'account_ref', type: 'VARCHAR(50)', desc: 'Reference to Account Master' },
        { name: 'amount', type: 'DECIMAL(18,2)', desc: 'Transaction value' },
        { name: 'merchant_code', type: 'VARCHAR(10)', desc: 'ISO Merchant Category Code' },
    ]
  }
];

const DataCatalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredItems = CATALOG_ITEMS.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Data Catalog & Glossary</h1>
          <p className="text-slate-500 mt-1">Discover data assets, view schema definitions, and understand data lineage.</p>
        </div>
        <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50">
                <Book size={16} /> Documentation
            </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex gap-4">
        <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={20} />
            <input
                type="text"
                placeholder="Search data assets, definitions, or columns..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium text-sm hover:bg-slate-200">
            Filter by Domain
        </button>
      </div>

      {/* Catalog List */}
      <div className="space-y-4">
        {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:shadow-md">
                <div
                    className="p-6 cursor-pointer flex justify-between items-start"
                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                >
                    <div className="flex gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg h-fit">
                            <Table size={24} />
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h3 className="text-lg font-bold text-slate-900">{item.name}</h3>
                                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full border border-slate-200 font-medium">
                                    {item.domain}
                                </span>
                            </div>
                            <p className="text-slate-500 mt-1 max-w-2xl">{item.description}</p>
                            <div className="flex items-center gap-3 mt-3">
                                <div className="flex items-center gap-1 text-xs text-slate-500">
                                    <Tag size={12} />
                                    {item.tags.join(', ')}
                                </div>
                                <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                                <div className="text-xs text-slate-500">
                                    Owner: <span className="font-medium text-slate-700">{item.owner}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-slate-400">
                        {expandedId === item.id ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </div>
                </div>

                {/* Expanded Schema View */}
                {expandedId === item.id && (
                    <div className="bg-slate-50 border-t border-slate-200 p-6 animate-in slide-in-from-top-2 duration-200">
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                            <Database size={14} /> Schema / Data Dictionary
                        </h4>
                        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-100 text-slate-500 border-b border-slate-200">
                                    <tr>
                                        <th className="px-4 py-2 font-medium">Attribute Name</th>
                                        <th className="px-4 py-2 font-medium">Data Type</th>
                                        <th className="px-4 py-2 font-medium">Description</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {item.attributes.map((attr, idx) => (
                                        <tr key={idx} className="hover:bg-slate-50">
                                            <td className="px-4 py-2 font-mono text-slate-700">{attr.name}</td>
                                            <td className="px-4 py-2 text-blue-600 font-mono text-xs">{attr.type}</td>
                                            <td className="px-4 py-2 text-slate-600">{attr.desc}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        ))}

        {filteredItems.length === 0 && (
            <div className="text-center py-12 text-slate-500">
                <Info size={48} className="mx-auto mb-4 text-slate-300" />
                <p className="text-lg font-medium">No assets found</p>
                <p>Try adjusting your search terms.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default DataCatalog;
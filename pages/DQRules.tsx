import React, { useState } from 'react';
import { Plus, Search, Filter, CheckCircle, Shield, Settings, Ruler, AlertTriangle } from 'lucide-react';

interface DQRule {
  id: string;
  name: string;
  description: string;
  category: 'Validity' | 'Completeness' | 'Consistency' | 'Uniqueness' | 'Standardization';
  severity: 'High' | 'Medium' | 'Low';
  status: 'Active' | 'Inactive';
  lastExecuted: string;
  affectedRecords: number;
}

const MOCK_RULES: DQRule[] = [
  { id: 'DQ-001', name: 'NIK Format Validation', description: 'Ensure NIK consists of exactly 16 numeric digits.', category: 'Validity', severity: 'High', status: 'Active', lastExecuted: '10 mins ago', affectedRecords: 120 },
  { id: 'DQ-002', name: 'Phone Number Normalization', description: 'Convert local prefix (08) to international format (+628).', category: 'Standardization', severity: 'Medium', status: 'Active', lastExecuted: '15 mins ago', affectedRecords: 450 },
  { id: 'DQ-003', name: 'Mandatory Address Fields', description: 'Check presence of Street, City, and Postal Code.', category: 'Completeness', severity: 'High', status: 'Active', lastExecuted: '1 hour ago', affectedRecords: 85 },
  { id: 'DQ-004', name: 'Email Syntax Check', description: 'Validate email against standard regex pattern.', category: 'Validity', severity: 'High', status: 'Active', lastExecuted: '1 hour ago', affectedRecords: 12 },
  { id: 'DQ-005', name: 'Duplicate Name & DOB', description: 'Flag records with identical Name and Date of Birth.', category: 'Uniqueness', severity: 'High', status: 'Active', lastExecuted: '2 hours ago', affectedRecords: 45 },
  { id: 'DQ-006', name: 'Title Case Names', description: 'Capitalize first letter of each word in Full Name.', category: 'Standardization', severity: 'Low', status: 'Inactive', lastExecuted: 'Yesterday', affectedRecords: 0 },
];

const DQRules: React.FC = () => {
  const [rules] = useState(MOCK_RULES);

  const getSeverityColor = (sev: string) => {
    switch (sev) {
      case 'High': return 'text-red-700 bg-red-50 border-red-200';
      case 'Medium': return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Low': return 'text-blue-700 bg-blue-50 border-blue-200';
      default: return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch(cat) {
        case 'Validity': return <CheckCircle size={16} className="text-green-500"/>;
        case 'Uniqueness': return <Shield size={16} className="text-purple-500"/>;
        case 'Standardization': return <Ruler size={16} className="text-blue-500"/>;
        case 'Completeness': return <AlertTriangle size={16} className="text-amber-500"/>;
        default: return <Settings size={16} className="text-slate-500"/>;
    }
  };

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Data Quality Rules</h1>
          <p className="text-slate-500 mt-1">Configure and monitor automated data cleansing and validation rules.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium">
          <Plus size={18} /> Create New Rule
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Active Rules</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">5</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Total Validations</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">1.2M</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Failed Records (24h)</p>
            <p className="text-2xl font-bold text-red-600 mt-1">1,240</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Avg Quality Score</p>
            <p className="text-2xl font-bold text-green-600 mt-1">94.2%</p>
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
            <div className="relative">
                <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search rules..." 
                  className="pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
            </div>
             <div className="flex gap-2">
                <button className="flex items-center gap-2 px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50">
                    <Filter size={16} /> Filter
                </button>
             </div>
        </div>

        <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                <tr>
                    <th className="px-6 py-3">Rule Name</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Severity</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Last Executed</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                {rules.map((rule) => (
                    <tr key={rule.id} className="hover:bg-slate-50 group">
                        <td className="px-6 py-4">
                            <p className="font-semibold text-slate-900">{rule.name}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{rule.description}</p>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-slate-700">
                                {getCategoryIcon(rule.category)}
                                <span>{rule.category}</span>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getSeverityColor(rule.severity)}`}>
                                {rule.severity}
                            </span>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${rule.status === 'Active' ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                                <span className={rule.status === 'Active' ? 'text-slate-900' : 'text-slate-500'}>{rule.status}</span>
                            </div>
                        </td>
                        <td className="px-6 py-4 text-slate-500">
                            {rule.lastExecuted}
                        </td>
                        <td className="px-6 py-4 text-right">
                             <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                                <Settings size={18} />
                             </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};
export default DQRules;
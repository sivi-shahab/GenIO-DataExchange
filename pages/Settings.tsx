import React, { useState } from 'react';
import { 
  Save, 
  User, 
  Lock, 
  Globe, 
  Server, 
  Key,
  Shield,
  Mail,
  ToggleLeft,
  ToggleRight,
  Plus
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'users' | 'integrations' | 'security'>('general');

  // Mock Users
  const users = [
    { id: 1, name: 'Admin User', email: 'admin@genio.com', role: 'Super Admin', status: 'Active' },
    { id: 2, name: 'Budi Data', email: 'budi@genio.com', role: 'Data Steward', status: 'Active' },
    { id: 3, name: 'Siti Compliance', email: 'siti@genio.com', role: 'Compliance Officer', status: 'Active' },
  ];

  const integrations = [
    { id: 'kafka', name: 'Apache Kafka', type: 'Ingestion', status: 'Connected', icon: Server },
    { id: 'salesforce', name: 'Salesforce CRM', type: 'Source', status: 'Connected', icon: Globe },
    { id: 'core', name: 'Core Banking API', type: 'Source', status: 'Connected', icon: Lock },
    { id: 'email', name: 'SMTP Server', type: 'Notification', status: 'Disconnected', icon: Mail },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">System Settings</h1>
          <p className="text-slate-500 mt-1">Manage platform configuration, users, and external connections.</p>
        </div>
        <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors shadow-sm font-medium">
          <Save size={18} /> Save Changes
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[500px] flex flex-col md:flex-row">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 border-r border-slate-200 bg-slate-50 p-4">
          <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
            <button
              onClick={() => setActiveTab('general')}
              className={`flex-shrink-0 w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'general' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:bg-white/50'}`}
            >
              <Globe size={18} /> General
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`flex-shrink-0 w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'users' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:bg-white/50'}`}
            >
              <User size={18} /> Users & Roles
            </button>
            <button
              onClick={() => setActiveTab('integrations')}
              className={`flex-shrink-0 w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'integrations' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:bg-white/50'}`}
            >
              <Server size={18} /> Integrations
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`flex-shrink-0 w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'security' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:bg-white/50'}`}
            >
              <Shield size={18} /> Security & Audit
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          
          {activeTab === 'general' && (
            <div className="max-w-2xl space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Platform Configuration</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Platform Name</label>
                    <input type="text" defaultValue="GenIO DataExchange" className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Timezone</label>
                        <select className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm outline-none bg-white">
                            <option>Asia/Jakarta (GMT+7)</option>
                            <option>UTC</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Language</label>
                        <select className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm outline-none bg-white">
                            <option>English (US)</option>
                            <option>Bahasa Indonesia</option>
                        </select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 border-t border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Notification Defaults</h3>
                <div className="space-y-3">
                   <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-700">Email Alerts on High Severity Incidents</span>
                      <ToggleRight className="text-blue-600 cursor-pointer" size={28} />
                   </div>
                   <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-700">Daily Digest Report</span>
                      <ToggleRight className="text-blue-600 cursor-pointer" size={28} />
                   </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-900">User Management</h3>
                    <button className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700">
                        <Plus size={16} /> Invite User
                    </button>
                </div>
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                            <tr>
                                <th className="px-6 py-3 font-medium">Name</th>
                                <th className="px-6 py-3 font-medium">Role</th>
                                <th className="px-6 py-3 font-medium">Status</th>
                                <th className="px-6 py-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {users.map(u => (
                                <tr key={u.id} className="hover:bg-slate-50">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-slate-900">{u.name}</div>
                                        <div className="text-xs text-slate-500">{u.email}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-green-600 font-medium text-xs flex items-center gap-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> {u.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-400 hover:text-blue-600">Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900">Connected Systems</h3>
                <div className="grid grid-cols-1 gap-4">
                    {integrations.map(item => (
                        <div key={item.id} className="border border-slate-200 rounded-lg p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-slate-100 rounded-lg text-slate-600">
                                    <item.icon size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">{item.name}</h4>
                                    <p className="text-xs text-slate-500">{item.type}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`text-xs font-bold px-2 py-1 rounded ${item.status === 'Connected' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                                    {item.status}
                                </span>
                                <button className="text-sm text-blue-600 font-medium hover:underline">Configure</button>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="pt-6 border-t border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">API Keys</h3>
                    <div className="bg-slate-900 rounded-lg p-4 flex items-center justify-between">
                        <div className="overflow-hidden mr-4">
                            <p className="text-slate-400 text-xs mb-1">Production Secret Key</p>
                            <p className="text-slate-100 font-mono text-sm truncate">sk_live_51Msz...29381023</p>
                        </div>
                        <button className="p-2 text-slate-400 hover:text-white border border-slate-700 rounded bg-slate-800 transition-colors">
                            <Key size={16} />
                        </button>
                    </div>
                </div>
            </div>
          )}
          
          {activeTab === 'security' && (
             <div className="max-w-2xl space-y-6">
                <h3 className="text-lg font-bold text-slate-900">Security Policies</h3>
                
                <div className="space-y-4">
                   <div className="flex items-center justify-between py-3 border-b border-slate-100">
                      <div>
                         <p className="text-sm font-medium text-slate-900">Enforce 2FA</p>
                         <p className="text-xs text-slate-500">Require Two-Factor Authentication for all admins.</p>
                      </div>
                      <ToggleRight className="text-green-600 cursor-pointer" size={28} />
                   </div>
                   <div className="flex items-center justify-between py-3 border-b border-slate-100">
                      <div>
                         <p className="text-sm font-medium text-slate-900">SSO Login Only</p>
                         <p className="text-xs text-slate-500">Disable password login and enforce SAML/OIDC.</p>
                      </div>
                      <ToggleLeft className="text-slate-300 cursor-pointer" size={28} />
                   </div>
                   <div className="flex items-center justify-between py-3 border-b border-slate-100">
                      <div>
                         <p className="text-sm font-medium text-slate-900">Audit Log Retention</p>
                         <p className="text-xs text-slate-500">Keep audit logs for 5 years (Compliance).</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">5 Years</span>
                        <button className="text-xs text-blue-600">Change</button>
                      </div>
                   </div>
                </div>
             </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Settings;
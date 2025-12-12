import React from 'react';
import { LayoutDashboard, Database, Users, GitMerge, ShieldCheck, Settings, Activity, Book } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'golden-records', label: 'Golden Records', icon: Users },
    { id: 'stewardship', label: 'Data Stewardship', icon: GitMerge, badge: 3 },
    { id: 'ingestion', label: 'Ingestion & Sources', icon: Database },
    { id: 'data-catalog', label: 'Data Catalog', icon: Book },
    { id: 'governance', label: 'Governance & Lineage', icon: ShieldCheck },
    { id: 'dq-rules', label: 'DQ Rules', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 flex flex-col z-20">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center font-bold text-lg">G</div>
          <span className="text-lg font-bold tracking-tight">GenIO <span className="text-blue-400">MDM</span></span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition-colors group ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'} />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              {item.badge && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <img src="https://picsum.photos/40/40" alt="User" className="w-9 h-9 rounded-full border border-slate-600" />
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-white truncate">Admin User</p>
            <p className="text-xs text-slate-500 truncate">System Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
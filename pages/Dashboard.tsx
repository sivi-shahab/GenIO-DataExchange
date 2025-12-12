import React from 'react';
import { 
  Users, 
  Database, 
  Activity, 
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import StatCard from '../components/StatCard';
import { DQ_METRICS, MOCK_JOBS } from '../services/mockData';

const Dashboard: React.FC = () => {
  
  // Mock trend data
  const data = [
    { name: 'Mon', active: 4000, merged: 2400 },
    { name: 'Tue', active: 3000, merged: 1398 },
    { name: 'Wed', active: 2000, merged: 9800 },
    { name: 'Thu', active: 2780, merged: 3908 },
    { name: 'Fri', active: 1890, merged: 4800 },
    { name: 'Sat', active: 2390, merged: 3800 },
    { name: 'Sun', active: 3490, merged: 4300 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">System Overview</h1>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            System Operational
          </span>
          <span className="text-sm text-slate-500">Last Sync: Just now</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Golden Records" 
          value="1,284,932" 
          icon={Users} 
          trend="+12.5% this month" 
          trendUp={true} 
          color="blue"
        />
        <StatCard 
          title="Avg DQ Score" 
          value="94.2%" 
          icon={Activity} 
          trend="+0.8% this week" 
          trendUp={true}
          color="green" 
        />
        <StatCard 
          title="Pending Matches" 
          value="143" 
          icon={AlertTriangle} 
          trend="Requires Review" 
          trendUp={false}
          color="amber" 
        />
        <StatCard 
          title="Daily Ingestion" 
          value="854 MB" 
          icon={Database} 
          trend="Normal Volume" 
          trendUp={true}
          color="purple" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Record Consolidation Trend</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMerged" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Area type="monotone" dataKey="merged" stroke="#3b82f6" fillOpacity={1} fill="url(#colorMerged)" name="Merged Records" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Data Quality Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Data Quality Health</h2>
          <div className="space-y-6">
            {DQ_METRICS.map((metric) => (
              <div key={metric.name}>
                <div className="flex justify-between items-end mb-1">
                  <span className="text-sm font-medium text-slate-700">{metric.name}</span>
                  <span className={`text-sm font-bold ${metric.score > 90 ? 'text-green-600' : 'text-amber-600'}`}>
                    {metric.score}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${metric.score > 90 ? 'bg-green-500' : 'bg-amber-500'}`} 
                    style={{ width: `${metric.score}%` }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500 mt-1">{metric.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity / Jobs */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-900">Recent Ingestion Jobs</h2>
          <button className="text-sm text-blue-600 font-medium hover:text-blue-700">View All History</button>
        </div>
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Job ID</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Source</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Records</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {MOCK_JOBS.map((job) => (
              <tr key={job.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{job.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{job.source}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                    job.status === 'COMPLETED' ? 'bg-green-100 text-green-800 border-green-200' :
                    job.status === 'PROCESSING' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                    'bg-red-100 text-red-800 border-red-200'
                  }`}>
                    {job.status === 'COMPLETED' && <CheckCircle2 size={12} className="mr-1" />}
                    {job.status === 'PROCESSING' && <Clock size={12} className="mr-1 animate-spin" />}
                    {job.status === 'FAILED' && <AlertTriangle size={12} className="mr-1" />}
                    {job.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{job.recordsProcessed.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{job.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
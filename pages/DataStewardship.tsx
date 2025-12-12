import React, { useState } from 'react';
import { Check, X, Split, AlertCircle, ArrowRight } from 'lucide-react';
import { MOCK_MATCH_CANDIDATES } from '../services/mockData';
import { MatchCandidate, CustomerEntity } from '../types';

const DataStewardship: React.FC = () => {
  const [candidates, setCandidates] = useState<MatchCandidate[]>(MOCK_MATCH_CANDIDATES);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentMatch = candidates[currentIndex];

  const handleAction = (action: 'MERGE' | 'REJECT') => {
    // In a real app, this would call the API
    alert(`Action ${action} processed for match ID ${currentMatch.id}`);
    
    // Move to next
    if (currentIndex < candidates.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // End of queue
      alert("No more items in review queue.");
    }
  };

  if (!currentMatch) return <div className="p-10 text-center text-slate-500">Queue empty. Good job!</div>;

  const renderCard = (entity: CustomerEntity, title: string, isPrimary: boolean) => (
    <div className={`flex-1 rounded-xl border p-6 shadow-sm relative ${isPrimary ? 'bg-blue-50/50 border-blue-200' : 'bg-white border-slate-200'}`}>
      <div className={`absolute top-0 left-0 w-full h-1 ${isPrimary ? 'bg-blue-500' : 'bg-slate-300'} rounded-t-xl`}></div>
      <h3 className={`text-sm font-bold uppercase tracking-wider mb-4 ${isPrimary ? 'text-blue-700' : 'text-slate-500'}`}>
        {title}
      </h3>
      
      <div className="space-y-4">
        <div>
           <label className="text-xs text-slate-400 font-semibold uppercase">Full Name</label>
           <p className="text-lg font-medium text-slate-900">{entity.fullName}</p>
        </div>
        <div>
           <label className="text-xs text-slate-400 font-semibold uppercase">NIK / ID</label>
           <p className={`font-mono ${!entity.nik ? 'text-red-400 italic' : 'text-slate-700'}`}>
             {entity.nik || 'Missing NIK'}
           </p>
        </div>
        <div>
           <label className="text-xs text-slate-400 font-semibold uppercase">Email</label>
           <p className="text-slate-700">{entity.email}</p>
        </div>
        <div>
           <label className="text-xs text-slate-400 font-semibold uppercase">Phone</label>
           <p className="text-slate-700">{entity.phone}</p>
        </div>
        <div>
           <label className="text-xs text-slate-400 font-semibold uppercase">Address</label>
           <p className="text-sm text-slate-700 leading-snug">
             {entity.address.street}, {entity.address.city}, {entity.address.province}
           </p>
        </div>
        <div>
           <label className="text-xs text-slate-400 font-semibold uppercase">Source System</label>
           <span className="inline-block mt-1 px-2 py-1 bg-slate-100 border border-slate-200 rounded text-xs text-slate-600 font-medium">
             {entity.sourceSystem}
           </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-6rem)] flex flex-col">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Identity Resolution Queue</h1>
          <p className="text-slate-500 mt-1">Review AI-detected duplicate candidates. Current Queue: <span className="font-bold text-slate-900">{candidates.length}</span> items.</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
           <AlertCircle size={16} />
           <span>Confidence Score: <strong>{currentMatch.matchScore}%</strong></span>
        </div>
      </div>

      {/* Match Reasons */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 mb-4 flex items-center gap-3 shadow-sm">
        <span className="text-sm font-bold text-slate-700">AI Logic:</span>
        <div className="flex gap-2">
          {currentMatch.matchReasons.map((reason, i) => (
            <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded border border-slate-200">
              {reason}
            </span>
          ))}
        </div>
      </div>

      {/* Comparison Area */}
      <div className="flex-1 flex gap-8 items-stretch mb-8 relative">
        {renderCard(currentMatch.primaryRecord, "Record A (Existing Golden)", true)}
        
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg border border-slate-100 z-10 text-slate-400">
           <ArrowRight size={24} />
        </div>

        {renderCard(currentMatch.duplicateCandidate, "Record B (Incoming/Candidate)", false)}
      </div>

      {/* Action Bar */}
      <div className="bg-white border-t border-slate-200 p-6 -mx-6 -mb-6 sticky bottom-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] flex justify-between items-center">
         <button className="flex items-center gap-2 text-slate-500 hover:text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors">
            <Split size={20} /> Split / Ignore
         </button>

         <div className="flex gap-4">
            <button 
              onClick={() => handleAction('REJECT')}
              className="flex items-center gap-2 px-6 py-3 border border-red-200 text-red-700 rounded-lg font-semibold hover:bg-red-50 transition-colors"
            >
               <X size={20} /> Not a Match
            </button>
            <button 
              onClick={() => handleAction('MERGE')}
              className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all hover:shadow-xl"
            >
               <Check size={20} /> Confirm Merge
            </button>
         </div>
      </div>
    </div>
  );
};

export default DataStewardship;
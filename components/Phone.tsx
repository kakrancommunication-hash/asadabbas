
import React, { useState } from 'react';
import { Mission } from '../types';

interface PhoneProps {
  onClose: () => void;
  onGenerateMission: () => void;
  loading: boolean;
  history: string[];
}

const Phone: React.FC<PhoneProps> = ({ onClose, onGenerateMission, loading, history }) => {
  return (
    <div className="fixed bottom-0 right-10 w-80 h-[500px] bg-[#111] border-x-8 border-t-8 border-gray-700 rounded-t-[40px] shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
      {/* Speaker/Notch */}
      <div className="h-6 w-full flex justify-center items-center">
        <div className="w-16 h-1 bg-gray-600 rounded-full" />
      </div>

      {/* Screen */}
      <div className="flex-1 m-2 bg-slate-900 rounded-2xl overflow-hidden flex flex-col">
        {/* Status Bar */}
        <div className="px-4 py-1 flex justify-between text-[10px] text-white/70 font-bold">
          <span>9:42 AM</span>
          <div className="flex gap-1">
            <span>5G</span>
            <span>100%</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="text-center py-4">
            <div className="text-2xl font-bold text-white mb-1">The Fixer</div>
            <div className="text-xs text-green-400 animate-pulse">Connected</div>
          </div>

          <div className="space-y-2">
            {history.map((msg, i) => (
              <div 
                key={i} 
                className={`p-3 rounded-lg text-sm ${i % 2 === 0 ? 'bg-blue-600 text-white ml-4' : 'bg-gray-700 text-white mr-4'}`}
              >
                {msg}
              </div>
            ))}
            {loading && (
              <div className="bg-gray-700 p-3 rounded-lg mr-4 animate-pulse">
                <div className="h-2 w-12 bg-white/20 rounded" />
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 grid grid-cols-2 gap-2 bg-black/40 border-t border-white/10">
          <button 
            onClick={onGenerateMission}
            disabled={loading}
            className="bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 text-black font-bold py-3 rounded-xl transition-all active:scale-95"
          >
            GET WORK
          </button>
          <button 
            onClick={onClose}
            className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl transition-all active:scale-95"
          >
            END CALL
          </button>
        </div>
      </div>
      
      {/* Home Bar */}
      <div className="h-6 w-full flex justify-center items-center pb-2">
        <div className="w-24 h-1 bg-white/20 rounded-full" />
      </div>
    </div>
  );
};

export default Phone;

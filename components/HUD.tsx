
import React from 'react';
import { PlayerStats, Mission } from '../types';

interface HUDProps {
  stats: PlayerStats;
  mission: Mission | null;
  onPhoneClick: () => void;
  onRadioClick: () => void;
  currentStation: string;
  radioTranscript: string;
}

const HUD: React.FC<HUDProps> = ({ stats, mission, onPhoneClick, onRadioClick, currentStation, radioTranscript }) => {
  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 overflow-hidden select-none">
      {/* Top Right: Money & Wanted Level */}
      <div className="flex flex-col items-end gap-3 animate-in fade-in slide-in-from-right duration-700">
        <div className="text-5xl font-black text-green-500 gta-font drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
          ${stats.money.toLocaleString()}
        </div>
        <div className="flex gap-2">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className={`w-7 h-7 rounded-full border-4 border-black/50 shadow-lg ${i < stats.wantedLevel ? 'bg-yellow-400 animate-pulse' : 'bg-transparent'}`}
            >
              {i < stats.wantedLevel && <div className="w-full h-full text-black text-center font-bold text-xs pt-0.5">★</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Top Left: Radio Ticker (AI News) */}
      <div className="absolute top-8 left-8 max-w-sm pointer-events-auto">
        <div className="bg-black/80 backdrop-blur-md p-4 border-l-4 border-blue-500 shadow-xl">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-red-500 animate-pulse rounded-full" />
            <div className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">{currentStation} Broadcast</div>
          </div>
          <p className="text-white text-sm leading-tight italic font-medium">"{radioTranscript}"</p>
        </div>
      </div>

      {/* Center Top: Mission Header */}
      {mission && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-yellow-400 px-8 py-3 shadow-[8px_8px_0px_rgba(0,0,0,1)] border-4 border-black">
          <div className="text-[10px] text-black uppercase tracking-[0.3em] font-black mb-1">CURRENT JOB</div>
          <div className="text-2xl text-black gta-font font-bold">{mission.title}</div>
        </div>
      )}

      {/* Bottom Left: Mini Map & Status */}
      <div className="flex items-end gap-8">
        <div className="w-56 h-56 bg-zinc-900/90 border-4 border-zinc-800 rounded-xl relative overflow-hidden pointer-events-auto shadow-2xl">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,200,0,0.1)_0%,_transparent_100%)]" />
          <div className="absolute w-3 h-3 bg-white rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_white] border-2 border-black" />
          
          <div className="absolute bottom-0 left-0 right-0 h-6 flex gap-1.5 px-2 pb-2">
            <div className="flex-[2] bg-zinc-800 rounded-sm overflow-hidden border border-black/50 shadow-inner">
              <div className="h-full bg-gradient-to-r from-green-600 to-green-400 transition-all duration-500" style={{ width: `${stats.health}%` }} />
            </div>
            <div className="flex-1 bg-zinc-800 rounded-sm overflow-hidden border border-black/50 shadow-inner">
              <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-500" style={{ width: `${stats.armor}%` }} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pointer-events-auto">
          <button onClick={onRadioClick} className="group bg-black/90 hover:bg-zinc-900 p-4 border-l-4 border-blue-500 text-white flex items-center gap-4 transition-all hover:translate-x-2">
            <div className="text-2xl">📻</div>
            <div>
              <div className="text-[10px] uppercase text-blue-400 font-black tracking-widest">WAVE SELECT</div>
              <div className="text-sm font-bold truncate w-28 uppercase">{currentStation}</div>
            </div>
          </button>
          <button onClick={onPhoneClick} className="group bg-black/90 hover:bg-zinc-900 p-4 border-l-4 border-green-500 text-white flex items-center gap-4 transition-all hover:translate-x-2">
            <div className="text-2xl">📱</div>
            <div>
              <div className="text-[10px] uppercase text-green-400 font-black tracking-widest">iPROMPT AI</div>
              <div className="text-sm font-bold uppercase">Contacts</div>
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Right: Objective */}
      {mission && (
        <div className="self-end max-w-sm bg-black/60 backdrop-blur-sm p-6 border-r-8 border-yellow-400 text-right animate-in slide-in-from-bottom duration-1000 shadow-2xl">
          <div className="text-[10px] text-yellow-400 font-black uppercase mb-2 tracking-[0.2em]">GPS OBJECTIVE</div>
          <p className="text-white text-lg font-bold leading-tight uppercase tracking-tight">"{mission.objective}"</p>
        </div>
      )}
    </div>
  );
};

export default HUD;

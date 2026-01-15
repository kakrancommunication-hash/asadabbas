
import React from 'react';
import { GraphicsSettings } from '../types';

interface SettingsMenuProps {
  settings: GraphicsSettings;
  onUpdate: (settings: GraphicsSettings) => void;
  onBack: () => void;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({ settings, onUpdate, onBack }) => {
  const toggle = (key: keyof GraphicsSettings) => {
    onUpdate({ ...settings, [key]: !settings[key] });
  };

  const setVal = (key: keyof GraphicsSettings, val: number) => {
    onUpdate({ ...settings, [key]: val });
  };

  return (
    <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-300">
      <div className="w-full max-w-xl p-12 border-t-4 border-yellow-400 bg-zinc-900/50">
        <h2 className="text-4xl text-white gta-font mb-10 tracking-tight">DISPLAY SETTINGS</h2>
        
        <div className="space-y-8">
          {/* Bloom Toggle */}
          <div className="flex items-center justify-between group">
            <span className="text-white/70 gta-font text-xl group-hover:text-white transition-colors">NEON BLOOM (GLOW)</span>
            <button 
              onClick={() => toggle('bloom')}
              className={`w-16 h-8 rounded-full transition-colors relative ${settings.bloom ? 'bg-yellow-400' : 'bg-zinc-700'}`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${settings.bloom ? 'left-9' : 'left-1'}`} />
            </button>
          </div>

          {/* Reflections Toggle */}
          <div className="flex items-center justify-between group">
            <span className="text-white/70 gta-font text-xl group-hover:text-white transition-colors">REAL-TIME REFLECTIONS</span>
            <button 
              onClick={() => toggle('reflections')}
              className={`w-16 h-8 rounded-full transition-colors relative ${settings.reflections ? 'bg-yellow-400' : 'bg-zinc-700'}`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${settings.reflections ? 'left-9' : 'left-1'}`} />
            </button>
          </div>

          {/* Traffic Slider */}
          <div className="space-y-2 group">
            <div className="flex justify-between items-center">
              <span className="text-white/70 gta-font text-xl group-hover:text-white transition-colors">TRAFFIC DENSITY</span>
              <span className="text-yellow-400 font-bold">{Math.round(settings.trafficDensity * 100)}%</span>
            </div>
            <input 
              type="range" 
              min="0" max="1" step="0.1" 
              value={settings.trafficDensity}
              onChange={(e) => setVal('trafficDensity', parseFloat(e.target.value))}
              className="w-full h-1 bg-zinc-700 appearance-none cursor-pointer accent-yellow-400"
            />
          </div>

          {/* Vignette Slider */}
          <div className="space-y-2 group">
            <div className="flex justify-between items-center">
              <span className="text-white/70 gta-font text-xl group-hover:text-white transition-colors">CINEMATIC VIGNETTE</span>
              <span className="text-yellow-400 font-bold">{Math.round(settings.vignette * 100)}%</span>
            </div>
            <input 
              type="range" 
              min="0" max="2" step="0.1" 
              value={settings.vignette}
              onChange={(e) => setVal('vignette', parseFloat(e.target.value))}
              className="w-full h-1 bg-zinc-700 appearance-none cursor-pointer accent-yellow-400"
            />
          </div>
        </div>

        <button 
          onClick={onBack}
          className="mt-12 w-full py-4 bg-white text-black font-black uppercase tracking-widest hover:bg-yellow-400 transition-colors active:scale-95"
        >
          APPLY & RETURN
        </button>
      </div>
    </div>
  );
};

export default SettingsMenu;

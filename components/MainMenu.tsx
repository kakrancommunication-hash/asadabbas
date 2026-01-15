
import React from 'react';

interface MainMenuProps {
  onStart: () => void;
  onSettings: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStart, onSettings }) => {
  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-center px-24 bg-gradient-to-r from-black via-black/40 to-transparent animate-in fade-in duration-1000">
      <div className="max-w-3xl">
        <h1 className="text-[10rem] text-white gta-font mb-0 leading-none tracking-tighter drop-shadow-[8px_8px_0px_rgba(0,0,0,1)]">
          LOS <span className="text-yellow-400">GEMINI</span>
        </h1>
        <div className="flex items-center gap-6 mb-16 pl-4">
          <div className="h-1 w-24 bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
          <p className="text-white/50 gta-font text-2xl tracking-[0.5em] font-light">
            CITY OF PROMPT ANGELS
          </p>
        </div>

        <nav className="flex flex-col gap-8 pl-4">
          <button 
            onClick={onStart}
            className="group text-left outline-none"
          >
            <div className="text-6xl text-white gta-font transition-all duration-300 group-hover:pl-10 group-hover:text-yellow-400 flex items-center gap-6">
              <span className="w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-3xl">▶</span>
              START ADVENTURE
            </div>
          </button>

          <button 
            onClick={onSettings}
            className="group text-left outline-none"
          >
            <div className="text-6xl text-white gta-font transition-all duration-300 group-hover:pl-10 group-hover:text-yellow-400 flex items-center gap-6">
              <span className="w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-3xl">⚙</span>
              DISPLAY CONFIG
            </div>
          </button>

          <button className="group text-left opacity-20 cursor-not-allowed">
            <div className="text-6xl text-white gta-font flex items-center gap-6 pl-10">
              SOCIAL CLUB (OFFLINE)
            </div>
          </button>
        </nav>
      </div>

      <div className="absolute bottom-12 left-24 flex items-center gap-10">
        <div className="text-white/20 text-xs tracking-[0.3em] font-black uppercase">
          V3.0.0-PROMPT-LA // POWERED BY GOOGLE VEO & GEMINI 3
        </div>
        <div className="text-yellow-400/30 text-xs tracking-widest font-black uppercase">
          7 LANDMARKS DETECTED IN SECTOR
        </div>
      </div>
    </div>
  );
};

export default MainMenu;

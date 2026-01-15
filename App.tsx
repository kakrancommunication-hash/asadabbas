
import React, { useState, useEffect, useCallback } from 'react';
import World from './components/World';
import HUD from './components/HUD';
import Phone from './components/Phone';
import MainMenu from './components/MainMenu';
import SettingsMenu from './components/SettingsMenu';
import { PlayerStats, Mission, GameState, RadioStation, GraphicsSettings } from './types';
import { generateMission, generateRadioBroadcast } from './geminiService';

const App: React.FC = () => {
  const [stats, setStats] = useState<PlayerStats>({
    health: 100,
    armor: 100,
    money: 250000, // Starting high for "Best Graphics" showcase vibe
    wantedLevel: 0,
    reputation: 50
  });

  const [gameState, setGameState] = useState<GameState>({
    currentMission: null,
    isMissionActive: false,
    isPhoneOpen: false,
    isRadioOn: true,
    currentStation: RadioStation.LOS_GEMINI_NEWS,
    radioTranscript: "Waking up in Los Gemini... checking the feed.",
    inventory: ['Pistol', 'Phone'],
    screen: 'loading',
    graphics: {
      bloom: true,
      reflections: true,
      trafficDensity: 0.8,
      vignette: 1.0
    }
  });

  const [dialogueHistory, setDialogueHistory] = useState<string[]>([]);
  const [isLoadingMission, setIsLoadingMission] = useState(false);

  // Transition from loading to menu
  useEffect(() => {
    const timer = setTimeout(() => {
      setGameState(prev => ({ ...prev, screen: 'menu' }));
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const updateRadioContent = useCallback(async () => {
    if (!gameState.isRadioOn) return;
    try {
      const news = await generateRadioBroadcast(stats.wantedLevel, gameState.currentMission?.title || null);
      setGameState(prev => ({ ...prev, radioTranscript: news }));
    } catch (e) {
      console.error("Radio AI feed error:", e);
    }
  }, [stats.wantedLevel, gameState.currentMission, gameState.isRadioOn]);

  // Initial radio hit when game starts
  useEffect(() => {
    if (gameState.screen === 'game') {
      updateRadioContent();
    }
  }, [gameState.screen]);

  // Periodic AI Radio Broadcast updates
  useEffect(() => {
    if (gameState.screen !== 'game' || !gameState.isRadioOn) return;
    const interval = setInterval(updateRadioContent, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [gameState.screen, updateRadioContent, gameState.isRadioOn]);

  const handlePhoneToggle = () => {
    setGameState(prev => ({ ...prev, isPhoneOpen: !prev.isPhoneOpen }));
    if (!gameState.isPhoneOpen && dialogueHistory.length === 0) {
      setDialogueHistory(["The city is yours for the taking. Call me when you want to make some noise."]);
    }
  };

  const handleRadioCycle = () => {
    const stations = Object.values(RadioStation);
    const currentIndex = stations.indexOf(gameState.currentStation as RadioStation);
    const nextIndex = (currentIndex + 1) % stations.length;
    const nextStation = stations[nextIndex];
    
    setGameState(prev => ({ 
      ...prev, 
      currentStation: nextStation,
      radioTranscript: nextStation === RadioStation.LOS_GEMINI_NEWS ? "Tuning to live AI news..." : "Switching waves..."
    }));

    if (nextStation === RadioStation.LOS_GEMINI_NEWS) {
      updateRadioContent();
    }
  };

  const handleRequestMission = async () => {
    setIsLoadingMission(true);
    try {
      const mission = await generateMission(stats.reputation);
      setGameState(prev => ({
        ...prev,
        currentMission: mission,
        isMissionActive: true
      }));
      setDialogueHistory(prev => [...prev, `Job's live. Head to ${mission.objective.split(' ').slice(-2).join(' ')}. Be fast.`]);
      
      // Slight increase in tension
      setStats(prev => ({
        ...prev,
        wantedLevel: Math.min(prev.wantedLevel + 1, 5)
      }));
    } catch (error) {
      console.error("Failed to generate mission:", error);
      setDialogueHistory(prev => [...prev, "Signal's dropping. Try again in a minute."]);
    } finally {
      setIsLoadingMission(false);
    }
  };

  const updateGraphics = (newSettings: GraphicsSettings) => {
    setGameState(prev => ({ ...prev, graphics: newSettings }));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState.screen !== 'game') return;
      if (e.key.toLowerCase() === 'p') handlePhoneToggle();
      if (e.key.toLowerCase() === 'r') handleRadioCycle();
      if (e.key === 'Escape') {
        if (gameState.isPhoneOpen) {
          setGameState(prev => ({ ...prev, isPhoneOpen: false }));
        } else {
          setGameState(prev => ({ ...prev, screen: 'menu' }));
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState.screen, gameState.isPhoneOpen, gameState.currentStation]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black select-none font-sans">
      <World graphics={gameState.graphics} />

      {/* Loading Screen */}
      {gameState.screen === 'loading' && (
        <div className="absolute inset-0 bg-black z-[100] flex flex-col items-center justify-center p-12 text-center">
          <div className="relative group">
            <h1 className="text-9xl text-white gta-font mb-2 tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_50px_rgba(250,204,21,0.5)] transition-all">
              LOS <span className="text-yellow-400">GEMINI</span>
            </h1>
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-yellow-400/50 text-[10px] tracking-[1em] font-black uppercase">
              AI WORLD SIMULATION
            </div>
          </div>
          
          <div className="mt-12 w-full max-w-md">
            <div className="h-1 bg-zinc-900 rounded-full overflow-hidden mb-4 border border-white/5">
              <div className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 animate-loading" />
            </div>
            <div className="flex justify-between items-center px-1">
              <p className="text-white/20 text-[10px] tracking-[0.5em] font-bold uppercase">Streaming Assets</p>
              <p className="text-yellow-400/40 text-[10px] tracking-[0.3em] font-black italic uppercase">Gemini 3 Pro Active</p>
            </div>
          </div>

          <div className="absolute bottom-12 text-white/10 text-[8px] uppercase tracking-[0.4em] max-w-xs leading-relaxed">
            Legal: This is a procedural simulation. All AI responses are generated in real-time. Unauthorized redistribution of Los Gemini binaries is prohibited.
          </div>
        </div>
      )}

      {/* Main Menu */}
      {gameState.screen === 'menu' && (
        <MainMenu 
          onStart={() => setGameState(prev => ({ ...prev, screen: 'game' }))}
          onSettings={() => setGameState(prev => ({ ...prev, screen: 'settings' }))}
        />
      )}

      {/* Settings */}
      {gameState.screen === 'settings' && (
        <SettingsMenu 
          settings={gameState.graphics}
          onUpdate={updateGraphics}
          onBack={() => setGameState(prev => ({ ...prev, screen: 'menu' }))}
        />
      )}

      {/* Game HUD */}
      {gameState.screen === 'game' && (
        <>
          <HUD 
            stats={stats} 
            mission={gameState.currentMission}
            onPhoneClick={handlePhoneToggle}
            onRadioClick={handleRadioCycle}
            currentStation={gameState.currentStation}
            radioTranscript={gameState.radioTranscript}
          />

          {gameState.isPhoneOpen && (
            <Phone 
              onClose={handlePhoneToggle} 
              onGenerateMission={handleRequestMission}
              loading={isLoadingMission}
              history={dialogueHistory}
            />
          )}

          <div className="absolute bottom-6 right-6 text-white/20 text-[9px] uppercase font-bold tracking-[0.4em] pointer-events-none text-right flex flex-col gap-1 items-end">
            <div className="flex gap-4">
              <span>[P] PROMPT PHONE</span>
              <span>[R] NEXT STATION</span>
              <span>[ESC] MENU</span>
            </div>
            <span className="text-yellow-400/10">LOS GEMINI OPEN WORLD v4.2 // SECTOR 7 AJUBE</span>
          </div>
        </>
      )}
    </div>
  );
};

export default App;

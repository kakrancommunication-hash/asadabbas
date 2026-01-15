
export interface Mission {
  title: string;
  description: string;
  objective: string;
  reward: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Extreme';
  giver: string;
}

export interface PlayerStats {
  health: number;
  armor: number;
  money: number;
  wantedLevel: number;
  reputation: number;
}

export interface GraphicsSettings {
  bloom: boolean;
  reflections: boolean;
  trafficDensity: number;
  vignette: number;
}

export interface GameState {
  currentMission: Mission | null;
  isMissionActive: boolean;
  isPhoneOpen: boolean;
  isRadioOn: boolean;
  currentStation: string;
  radioTranscript: string;
  inventory: string[];
  screen: 'loading' | 'menu' | 'settings' | 'game';
  graphics: GraphicsSettings;
}

export enum RadioStation {
  LOS_GEMINI_NEWS = 'Los Gemini News (AI)',
  PROMPT_PUNK = 'Prompt Punk',
  LLM_LOFI = 'LLM Lofi',
  FLASH_CORE = 'Flash Core'
}

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { IntroScreen } from './components/IntroScreen';
import { ProgressTracker } from './components/ProgressTracker';
import { SablesInvaders } from './components/minigames/SablesInvaders';
import { RitmoLuminoso } from './components/minigames/RitmoLuminoso';
import { HolocronTrivia } from './components/minigames/HolocronTrivia';
import { SimonTXOR } from './components/minigames/SimonTXOR';
import { TresDroids } from './components/minigames/TresDroids';
import { NotaKaelor } from './components/minigames/NotaKaelor';
import { CamaraDelNucleo } from './components/minigames/CamaraDelNucleo';
import { FinalScreen } from './components/FinalScreen';
export default function App() {
    const [gameState, setGameState] = useState('intro');
    const [currentMission, setCurrentMission] = useState(0);
    const [collectedClues, setCollectedClues] = useState([]);
    const missions = [
        { id: 'invaders', name: 'Sables Invaders', component: SablesInvaders },
        { id: 'ritmo', name: 'Ritmo del Lado Luminoso', component: RitmoLuminoso },
        { id: 'holocron', name: 'Holocron Trivia', component: HolocronTrivia },
        { id: 'simon', name: 'Secuencia de Blindaje TX-0R', component: SimonTXOR },
        { id: 'droids', name: 'Enigma de los Tres Droids', component: TresDroids },
        { id: 'nota', name: 'La Nota del Oficial Kaelor', component: NotaKaelor },
    ];
    const handleStart = () => {
        setGameState('playing');
        setCurrentMission(0);
    };
    const handleClueCollected = (clue) => {
        setCollectedClues(prev => [...prev, clue]);
    };
    const handleNextMission = () => {
        if (currentMission < missions.length - 1) {
            setCurrentMission(prev => prev + 1);
        }
        else {
            // Todas las misiones completadas, ir al puzzle final
            setGameState('final');
        }
    };
    const handleVictory = () => {
        setGameState('victory');
    };
    const handleRestart = () => {
        setGameState('intro');
        setCurrentMission(0);
        setCollectedClues([]);
    };
    if (gameState === 'intro') {
        return _jsx(IntroScreen, { onStart: handleStart });
    }
    if (gameState === 'victory') {
        return _jsx(FinalScreen, { onRestart: handleRestart });
    }
    if (gameState === 'final') {
        return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900", children: [_jsx(ProgressTracker, { clues: collectedClues, totalRequired: 5 }), _jsx(CamaraDelNucleo, { collectedClues: collectedClues, onVictory: handleVictory })] }));
    }
    const CurrentMissionComponent = missions[currentMission].component;
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900", children: [_jsx(ProgressTracker, { clues: collectedClues, totalRequired: 5 }), _jsx(CurrentMissionComponent, { onClueCollected: handleClueCollected, onComplete: handleNextMission })] }));
}

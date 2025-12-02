import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Cpu, Languages } from 'lucide-react';
const colors = ['purple', 'blue', 'cyan', 'white'];
export function SimonTXOR({ onClueCollected, onComplete }) {
    const [gameStarted, setGameStarted] = useState(false);
    const [sequence, setSequence] = useState([]);
    const [playerSequence, setPlayerSequence] = useState([]);
    const [isShowing, setIsShowing] = useState(false);
    const [currentRound, setCurrentRound] = useState(0);
    const [showingIndex, setShowingIndex] = useState(-1);
    const [gameOver, setGameOver] = useState(false);
    const [showBinary, setShowBinary] = useState(false);
    const [showTranslation, setShowTranslation] = useState(false);
    const maxRounds = 3;
    const binaryCode = '01010010'; // Represents 'R' for REACTOR
    const translatedWord = 'REACTOR';
    useEffect(() => {
        if (!gameStarted || gameOver)
            return;
        if (sequence.length === 0) {
            // Start first round
            addToSequence();
        }
    }, [gameStarted, gameOver]);
    const addToSequence = () => {
        const newColor = colors[Math.floor(Math.random() * colors.length)];
        setSequence(prev => [...prev, newColor]);
        setPlayerSequence([]);
        setCurrentRound(prev => prev + 1);
        // Show sequence after a brief delay
        setTimeout(() => {
            showSequence([...sequence, newColor]);
        }, 500);
    };
    const showSequence = (seq) => {
        setIsShowing(true);
        let index = 0;
        const interval = setInterval(() => {
            if (index < seq.length) {
                setShowingIndex(index);
                setTimeout(() => setShowingIndex(-1), 400);
                index++;
            }
            else {
                clearInterval(interval);
                setIsShowing(false);
                setShowingIndex(-1);
            }
        }, 700);
    };
    const handleColorClick = (color) => {
        if (isShowing || gameOver)
            return;
        const newPlayerSequence = [...playerSequence, color];
        setPlayerSequence(newPlayerSequence);
        // Check if correct
        const currentIndex = newPlayerSequence.length - 1;
        if (newPlayerSequence[currentIndex] !== sequence[currentIndex]) {
            // Wrong!
            setGameOver(true);
            return;
        }
        // Check if sequence complete
        if (newPlayerSequence.length === sequence.length) {
            if (currentRound >= maxRounds) {
                // Victory!
                setTimeout(() => {
                    setShowBinary(true);
                }, 500);
            }
            else {
                // Next round
                setTimeout(() => {
                    addToSequence();
                }, 1000);
            }
        }
    };
    const handleTranslate = () => {
        setShowTranslation(true);
        const clue = {
            id: 'binary',
            value: translatedWord,
            type: 'binary',
            label: 'BINARIO'
        };
        onClueCollected(clue);
    };
    const handleContinue = () => {
        onComplete();
    };
    const handleStart = () => {
        setGameStarted(true);
    };
    const getColorClasses = (color, isActive) => {
        const baseClasses = 'w-full h-full rounded-lg border-4 transition-all duration-200';
        const colorMap = {
            purple: isActive
                ? 'bg-purple-500 border-purple-300 shadow-[0_0_40px_rgba(168,85,247,1)]'
                : 'bg-purple-900/50 border-purple-700 hover:bg-purple-800/60',
            blue: isActive
                ? 'bg-blue-500 border-blue-300 shadow-[0_0_40px_rgba(59,130,246,1)]'
                : 'bg-blue-900/50 border-blue-700 hover:bg-blue-800/60',
            cyan: isActive
                ? 'bg-cyan-400 border-cyan-200 shadow-[0_0_40px_rgba(34,211,238,1)]'
                : 'bg-cyan-900/50 border-cyan-700 hover:bg-cyan-800/60',
            white: isActive
                ? 'bg-white border-gray-200 shadow-[0_0_40px_rgba(255,255,255,1)]'
                : 'bg-gray-600/50 border-gray-500 hover:bg-gray-500/60'
        };
        return `${baseClasses} ${colorMap[color]}`;
    };
    if (!gameStarted) {
        return (_jsx("div", { className: "min-h-screen flex flex-col items-center justify-center p-4 pt-24", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, className: "bg-slate-950/80 backdrop-blur-sm border-2 border-purple-500/50 rounded-lg p-8 max-w-2xl\n                     shadow-[0_0_30px_rgba(168,85,247,0.3)]", children: [_jsxs("div", { className: "flex items-center gap-3 mb-6 justify-center", children: [_jsx(Cpu, { className: "w-8 h-8 text-purple-400" }), _jsx("h2", { className: "text-3xl text-purple-300 font-mono", children: "SECUENCIA DE BLINDAJE TX-0R" })] }), _jsxs("div", { className: "text-purple-100 space-y-4 mb-6", children: [_jsx("p", { children: "El droide TX-0R protege su n\u00FAcleo con un sistema de secuencias luminosas." }), _jsx("p", { className: "text-purple-400", children: "OBJETIVO: Memoriza y repite las secuencias de colores. Completa 3 rondas para obtener el c\u00F3digo binario." }), _jsxs("div", { className: "bg-purple-900/30 border border-purple-500/50 rounded p-4 mt-4", children: [_jsx("p", { className: "text-sm", children: "MEC\u00C1NICA:" }), _jsx("p", { className: "text-sm", children: "\u2022 Observa la secuencia de luces" }), _jsx("p", { className: "text-sm", children: "\u2022 Repite la secuencia en el mismo orden" }), _jsx("p", { className: "text-sm", children: "\u2022 Cada ronda agrega una luz m\u00E1s" })] })] }), _jsx("button", { onClick: handleStart, className: "w-full bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded\n                       border-2 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]\n                       transition-all font-mono", children: "INICIAR PROTOCOLO" })] }) }));
    }
    if (showBinary) {
        return (_jsx("div", { className: "min-h-screen flex flex-col items-center justify-center p-4 pt-24", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, className: "bg-slate-950/80 backdrop-blur-sm border-2 border-green-500/50 rounded-lg p-8 max-w-2xl\n                     shadow-[0_0_30px_rgba(34,197,94,0.3)] text-center", children: [_jsx(motion.div, { animate: { scale: [1, 1.2, 1] }, transition: { duration: 0.5 }, className: "text-6xl mb-4", children: "\u2713" }), _jsx("h2", { className: "text-3xl text-green-400 font-mono mb-4", children: "SECUENCIA COMPLETADA" }), _jsx("p", { className: "text-green-300 mb-6", children: "Blindaje TX-0R desactivado" }), _jsxs("div", { className: "bg-purple-900/30 border-2 border-purple-400 rounded-lg p-6 mb-6", children: [_jsxs("div", { className: "flex items-center justify-center gap-2 mb-4", children: [_jsx(Languages, { className: "w-6 h-6 text-purple-400" }), _jsx("div", { className: "text-purple-400 text-sm font-mono", children: "C\u00D3DIGO BINARIO OBTENIDO:" })] }), _jsx("div", { className: "text-4xl text-purple-200 font-mono tracking-widest mb-4", children: binaryCode }), !showTranslation ? (_jsx("button", { onClick: handleTranslate, className: "bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded\n                           border-2 border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.5)]\n                           transition-all font-mono text-sm", children: "TRADUCIR" })) : (_jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, className: "mt-4", children: [_jsx("div", { className: "text-sm text-purple-400 mb-2", children: "TRADUCCI\u00D3N:" }), _jsx("div", { className: "text-3xl text-green-400 font-mono tracking-widest", children: translatedWord })] }))] }), showTranslation && (_jsx("button", { onClick: handleContinue, className: "w-full bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded\n                         border-2 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]\n                         transition-all font-mono", children: "CONTINUAR \u2192" }))] }) }));
    }
    if (gameOver) {
        return (_jsx("div", { className: "min-h-screen flex flex-col items-center justify-center p-4 pt-24", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, className: "bg-slate-950/80 backdrop-blur-sm border-2 border-red-500/50 rounded-lg p-8 max-w-2xl\n                     shadow-[0_0_30px_rgba(239,68,68,0.3)] text-center", children: [_jsx("div", { className: "text-6xl mb-4", children: "\u2717" }), _jsx("h2", { className: "text-3xl text-red-400 font-mono mb-4", children: "SECUENCIA INCORRECTA" }), _jsx("p", { className: "text-red-300 mb-6", children: "Sistema de seguridad activado" }), _jsx("button", { onClick: handleContinue, className: "w-full bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded\n                       border-2 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]\n                       transition-all font-mono", children: "CONTINUAR \u2192" })] }) }));
    }
    return (_jsx("div", { className: "min-h-screen flex flex-col items-center justify-center p-4 pt-24", children: _jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "w-full max-w-2xl", children: [_jsx("div", { className: "bg-purple-900/30 border border-purple-500/50 rounded p-4 mb-4", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "text-purple-300 font-mono", children: ["RONDA: ", currentRound, "/", maxRounds] }), _jsx("div", { className: "text-purple-300 font-mono", children: isShowing ? 'OBSERVA LA SECUENCIA' : `REPITE: ${playerSequence.length}/${sequence.length}` })] }) }), _jsx("div", { className: "grid grid-cols-2 gap-4 aspect-square max-w-lg mx-auto", children: colors.map((color, index) => (_jsx(motion.button, { whileHover: !isShowing ? { scale: 1.05 } : {}, whileTap: !isShowing ? { scale: 0.95 } : {}, onClick: () => handleColorClick(color), disabled: isShowing, className: getColorClasses(color, showingIndex !== -1 && sequence[showingIndex] === color), children: _jsx("div", { className: "w-full h-full flex items-center justify-center", children: showingIndex !== -1 && sequence[showingIndex] === color && (_jsx(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, className: "w-16 h-16 rounded-full bg-white/20" })) }) }, color))) }), _jsx("div", { className: "mt-6 text-center", children: isShowing ? (_jsx(motion.div, { animate: { opacity: [0.5, 1, 0.5] }, transition: { duration: 1.5, repeat: Infinity }, className: "text-purple-400 font-mono", children: "MEMORIZANDO SECUENCIA..." })) : (_jsx("div", { className: "text-purple-400 font-mono", children: "HAZ CLIC EN LOS COLORES EN EL ORDEN CORRECTO" })) })] }) }));
}

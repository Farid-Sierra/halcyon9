import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Music, Circle } from 'lucide-react';
export function RitmoLuminoso({ onClueCollected, onComplete }) {
    const [gameStarted, setGameStarted] = useState(false);
    const [circles, setCircles] = useState([]);
    const [currentTime, setCurrentTime] = useState(0);
    const [hits, setHits] = useState(0);
    const [misses, setMisses] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [gameEnded, setGameEnded] = useState(false);
    const totalCircles = 20;
    const successThreshold = 0.85; // 85%
    useEffect(() => {
        if (!gameStarted)
            return;
        // Generate rhythm pattern
        const pattern = [];
        const beats = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5];
        beats.forEach((beat, index) => {
            pattern.push({
                id: index,
                x: 20 + Math.random() * 60,
                y: 20 + Math.random() * 60,
                targetTime: beat,
                hit: null
            });
        });
        setCircles(pattern);
    }, [gameStarted]);
    useEffect(() => {
        if (!gameStarted || gameEnded)
            return;
        const interval = setInterval(() => {
            setCurrentTime(prev => {
                const newTime = prev + 0.05;
                // Check for missed circles
                setCircles(prevCircles => {
                    return prevCircles.map(circle => {
                        if (circle.hit === null && newTime > circle.targetTime + 0.3) {
                            setMisses(m => m + 1);
                            return { ...circle, hit: false };
                        }
                        return circle;
                    });
                });
                if (newTime > 10) {
                    setGameEnded(true);
                }
                return newTime;
            });
        }, 50);
        return () => clearInterval(interval);
    }, [gameStarted, gameEnded]);
    useEffect(() => {
        if (gameEnded && !showResult) {
            const totalAttempts = hits + misses;
            const accuracy = totalAttempts > 0 ? hits / totalAttempts : 0;
            if (accuracy >= successThreshold) {
                const clue = {
                    id: 'aurebesh',
                    value: 'RELAY',
                    type: 'aurebesh',
                    label: 'AUREBESH'
                };
                onClueCollected(clue);
            }
            setShowResult(true);
        }
    }, [gameEnded, showResult, hits, misses, onClueCollected]);
    const handleCircleClick = (circleId) => {
        setCircles(prev => {
            return prev.map(circle => {
                if (circle.id === circleId && circle.hit === null) {
                    const timeDiff = Math.abs(currentTime - circle.targetTime);
                    if (timeDiff < 0.3) {
                        setHits(h => h + 1);
                        return { ...circle, hit: true };
                    }
                    else {
                        setMisses(m => m + 1);
                        return { ...circle, hit: false };
                    }
                }
                return circle;
            });
        });
    };
    const handleStart = () => {
        setGameStarted(true);
    };
    const handleContinue = () => {
        onComplete();
    };
    const accuracy = (hits + misses) > 0 ? (hits / (hits + misses) * 100) : 0;
    const success = accuracy >= successThreshold * 100;
    if (!gameStarted) {
        return (_jsx("div", { className: "min-h-screen flex flex-col items-center justify-center p-4 pt-24", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, className: "bg-slate-950/80 backdrop-blur-sm border-2 border-purple-500/50 rounded-lg p-8 max-w-2xl\n                     shadow-[0_0_30px_rgba(168,85,247,0.3)]", children: [_jsxs("div", { className: "flex items-center gap-3 mb-6 justify-center", children: [_jsx(Music, { className: "w-8 h-8 text-purple-400" }), _jsx("h2", { className: "text-3xl text-purple-300 font-mono", children: "RITMO DEL LADO LUMINOSO" })] }), _jsxs("div", { className: "text-purple-100 space-y-4 mb-6", children: [_jsx("p", { children: "El firewall imperial responde a patrones r\u00EDtmicos de la Marcha Imperial." }), _jsx("p", { className: "text-purple-400", children: "OBJETIVO: Toca los c\u00EDrculos hologr\u00E1ficos cuando brillen. Precisi\u00F3n m\u00EDnima: 85%" }), _jsxs("div", { className: "bg-purple-900/30 border border-purple-500/50 rounded p-4 mt-4", children: [_jsx("p", { className: "text-sm", children: "INSTRUCCIONES:" }), _jsx("p", { className: "text-sm", children: "\u2022 Los c\u00EDrculos aparecer\u00E1n en el \u00E1rea de juego" }), _jsx("p", { className: "text-sm", children: "\u2022 Haz clic cuando el c\u00EDrculo est\u00E9 m\u00E1s brillante" }), _jsx("p", { className: "text-sm", children: "\u2022 El timing es crucial" })] })] }), _jsx("button", { onClick: handleStart, className: "w-full bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded\n                       border-2 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]\n                       transition-all font-mono", children: "INICIAR SECUENCIA" })] }) }));
    }
    if (showResult) {
        return (_jsx("div", { className: "min-h-screen flex flex-col items-center justify-center p-4 pt-24", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, className: `bg-slate-950/80 backdrop-blur-sm border-2 rounded-lg p-8 max-w-2xl text-center
                     ${success ? 'border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)]' : 'border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.3)]'}`, children: [_jsx(motion.div, { animate: { scale: [1, 1.2, 1] }, transition: { duration: 0.5 }, className: "text-6xl mb-4", children: success ? '✓' : '✗' }), _jsx("h2", { className: `text-3xl font-mono mb-4 ${success ? 'text-green-400' : 'text-red-400'}`, children: success ? 'SECUENCIA COMPLETADA' : 'SECUENCIA FALLIDA' }), _jsxs("div", { className: "text-purple-300 mb-6", children: [_jsxs("p", { children: ["Precisi\u00F3n: ", accuracy.toFixed(1), "%"] }), _jsxs("p", { children: ["Aciertos: ", hits, " / Fallos: ", misses] })] }), success && (_jsxs("div", { className: "bg-purple-900/30 border-2 border-purple-400 rounded-lg p-6 mb-6", children: [_jsx("div", { className: "text-purple-400 text-sm font-mono mb-2", children: "PALABRA EN AUREBESH OBTENIDA:" }), _jsx("div", { className: "text-3xl text-purple-200 font-mono tracking-widest mb-2", children: "RELAY" }), _jsx("div", { className: "text-sm text-purple-400", children: "(Texto en alfabeto Aurebesh: Sistema de Rel\u00E9)" })] })), _jsx("button", { onClick: handleContinue, className: "w-full bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded\n                       border-2 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]\n                       transition-all font-mono", children: "CONTINUAR \u2192" })] }) }));
    }
    return (_jsx("div", { className: "min-h-screen flex flex-col items-center justify-center p-4 pt-24", children: _jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "w-full max-w-4xl", children: [_jsx("div", { className: "bg-purple-900/30 border border-purple-500/50 rounded p-4 mb-4", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "text-purple-300 font-mono", children: ["ACIERTOS: ", hits, " | FALLOS: ", misses] }), _jsxs("div", { className: "text-purple-300 font-mono", children: ["PRECISI\u00D3N: ", accuracy.toFixed(0), "%"] })] }) }), _jsx("div", { className: "relative w-full aspect-square bg-slate-950 border-2 border-purple-500 rounded-lg\n                     overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.4)]", style: {
                        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 1px, transparent 1px)',
                        backgroundSize: '30px 30px'
                    }, children: circles.map(circle => {
                        const isActive = currentTime >= circle.targetTime - 0.5 && currentTime <= circle.targetTime + 0.5;
                        const isPerfectTiming = Math.abs(currentTime - circle.targetTime) < 0.1;
                        const shouldShow = currentTime >= circle.targetTime - 0.5 && circle.hit === null;
                        if (!shouldShow && circle.hit === null)
                            return null;
                        return (_jsxs(motion.div, { initial: { scale: 0, opacity: 0 }, animate: {
                                scale: circle.hit === null ? (isPerfectTiming ? 1.2 : 1) : 0,
                                opacity: circle.hit === null ? 1 : 0
                            }, style: {
                                left: `${circle.x}%`,
                                top: `${circle.y}%`
                            }, className: "absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer", onClick: () => handleCircleClick(circle.id), children: [_jsx("div", { className: `w-16 h-16 rounded-full border-4 flex items-center justify-center
                               ${isActive ? 'border-purple-400 bg-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.8)]' : 'border-purple-700 bg-purple-900/20'}
                               ${circle.hit === true ? 'border-green-400' : circle.hit === false ? 'border-red-400' : ''}`, children: _jsx(Circle, { className: `w-8 h-8 ${isActive ? 'text-purple-300' : 'text-purple-700'}` }) }), isPerfectTiming && circle.hit === null && (_jsx(motion.div, { animate: { scale: [1, 1.5], opacity: [1, 0] }, transition: { duration: 0.5, repeat: Infinity }, className: "absolute inset-0 rounded-full border-2 border-purple-400" })), circle.hit !== null && (_jsx(motion.div, { initial: { scale: 1, opacity: 1 }, animate: { scale: 2, opacity: 0 }, transition: { duration: 0.3 }, className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none", children: _jsx("div", { className: `text-2xl ${circle.hit ? 'text-green-400' : 'text-red-400'}`, children: circle.hit ? '✓' : '✗' }) }))] }, circle.id));
                    }) }), _jsxs("div", { className: "mt-4 text-center", children: [_jsx("div", { className: "text-purple-400 text-sm font-mono", children: "HAZ CLIC EN LOS C\u00CDRCULOS CUANDO BRILLEN" }), _jsxs(motion.div, { animate: { opacity: [0.5, 1, 0.5] }, transition: { duration: 1, repeat: Infinity }, className: "mt-2 text-purple-300 text-xs font-mono", children: ["SINCRONIZACI\u00D3N: ", currentTime.toFixed(1), "s / 10.0s"] })] })] }) }));
}

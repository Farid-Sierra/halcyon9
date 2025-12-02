import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Target, Zap } from 'lucide-react';
export function SablesInvaders({ onClueCollected, onComplete }) {
    const [playerX, setPlayerX] = useState(50);
    const [enemies, setEnemies] = useState([]);
    const [bullets, setBullets] = useState([]);
    const [score, setScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const bulletIdRef = useRef(0);
    const gameAreaRef = useRef(null);
    const enemyMoveDirection = useRef(1); // 1 = right, -1 = left
    useEffect(() => {
        if (!gameStarted)
            return;
        // Initialize enemies - more enemies and different formation
        const initialEnemies = [];
        for (let i = 0; i < 24; i++) { // Increased from 15 to 24
            initialEnemies.push({
                id: i,
                x: (i % 6) * 14 + 15, // 6 columns instead of 5
                y: Math.floor(i / 6) * 12 + 8, // 4 rows
                destroyed: false
            });
        }
        setEnemies(initialEnemies);
    }, [gameStarted]);
    useEffect(() => {
        if (!gameStarted || showResult)
            return;
        const handleKeyPress = (e) => {
            if (e.key === 'ArrowLeft') {
                setPlayerX(prev => Math.max(5, prev - 5));
            }
            else if (e.key === 'ArrowRight') {
                setPlayerX(prev => Math.min(95, prev + 5));
            }
            else if (e.key === ' ') {
                e.preventDefault();
                shoot();
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [gameStarted, showResult, playerX]); // Added playerX to dependencies
    useEffect(() => {
        if (!gameStarted || showResult)
            return;
        const interval = setInterval(() => {
            setBullets(prev => {
                return prev
                    .map(bullet => ({ ...bullet, y: bullet.y - 3 }))
                    .filter(bullet => bullet.y > 0);
            });
            setEnemies(prev => {
                const activeEnemies = prev.filter(e => !e.destroyed);
                if (activeEnemies.length === 0)
                    return prev;
                // Find boundaries
                const leftMost = Math.min(...activeEnemies.map(e => e.x));
                const rightMost = Math.max(...activeEnemies.map(e => e.x));
                // Change direction if hitting edges
                let newDirection = enemyMoveDirection.current;
                if (rightMost >= 95 && enemyMoveDirection.current > 0) {
                    newDirection = -1;
                }
                else if (leftMost <= 5 && enemyMoveDirection.current < 0) {
                    newDirection = 1;
                }
                enemyMoveDirection.current = newDirection;
                return prev.map(enemy => ({
                    ...enemy,
                    x: enemy.destroyed ? enemy.x : enemy.x + newDirection * 0.3, // Move horizontally
                    y: enemy.destroyed ? enemy.y : enemy.y + 0.05 // Slower vertical movement
                }));
            });
        }, 50);
        return () => clearInterval(interval);
    }, [gameStarted, showResult]);
    useEffect(() => {
        if (!gameStarted || showResult)
            return;
        // Collision detection
        bullets.forEach(bullet => {
            enemies.forEach(enemy => {
                if (!enemy.destroyed) {
                    const distance = Math.sqrt(Math.pow(bullet.x - enemy.x, 2) + Math.pow(bullet.y - enemy.y, 2));
                    if (distance < 3) {
                        setEnemies(prev => prev.map(e => e.id === enemy.id ? { ...e, destroyed: true } : e));
                        setBullets(prev => prev.filter(b => b.id !== bullet.id));
                        setScore(prev => prev + 1);
                    }
                }
            });
        });
    }, [bullets, enemies, gameStarted, showResult]);
    useEffect(() => {
        if (score >= 10 && !showResult) {
            setShowResult(true);
            const clue = {
                id: 'coordinates',
                value: '12-7-3-9',
                type: 'coordinate',
                label: 'COORD'
            };
            onClueCollected(clue);
        }
    }, [score, showResult, onClueCollected]);
    const shoot = () => {
        const newBullet = {
            id: bulletIdRef.current++,
            x: playerX,
            y: 85
        };
        setBullets(prev => [...prev, newBullet]);
    };
    const handleStart = () => {
        setGameStarted(true);
    };
    const handleContinue = () => {
        onComplete();
    };
    if (!gameStarted) {
        return (_jsx("div", { className: "min-h-screen flex flex-col items-center justify-center p-4 pt-24", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, className: "bg-slate-950/80 backdrop-blur-sm border-2 border-purple-500/50 rounded-lg p-8 max-w-2xl\n                     shadow-[0_0_30px_rgba(168,85,247,0.3)]", children: [_jsxs("div", { className: "flex items-center gap-3 mb-6 justify-center", children: [_jsx(Target, { className: "w-8 h-8 text-purple-400" }), _jsx("h2", { className: "text-3xl text-purple-300 font-mono", children: "SABLES INVADERS" })] }), _jsxs("div", { className: "text-purple-100 space-y-4 mb-6", children: [_jsx("p", { children: "Naves TIE imperiales se aproximan a la estaci\u00F3n." }), _jsx("p", { className: "text-purple-400", children: "OBJETIVO: Destruir 10 naves para obtener las coordenadas de acceso." }), _jsxs("div", { className: "bg-purple-900/30 border border-purple-500/50 rounded p-4 mt-4", children: [_jsx("p", { className: "text-sm", children: "CONTROLES:" }), _jsx("p", { className: "text-sm", children: "\u2190 \u2192 : Mover nave" }), _jsx("p", { className: "text-sm", children: "ESPACIO : Disparar" })] })] }), _jsx("button", { onClick: handleStart, className: "w-full bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded\n                       border-2 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]\n                       transition-all font-mono", children: "INICIAR MISI\u00D3N" })] }) }));
    }
    if (showResult) {
        return (_jsx("div", { className: "min-h-screen flex flex-col items-center justify-center p-4 pt-24", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, className: "bg-slate-950/80 backdrop-blur-sm border-2 border-green-500/50 rounded-lg p-8 max-w-2xl\n                     shadow-[0_0_30px_rgba(34,197,94,0.3)] text-center", children: [_jsx(motion.div, { animate: { scale: [1, 1.2, 1] }, transition: { duration: 0.5 }, className: "text-6xl mb-4", children: "\u2713" }), _jsx("h2", { className: "text-3xl text-green-400 font-mono mb-4", children: "MISI\u00D3N COMPLETADA" }), _jsx("p", { className: "text-green-300 mb-6", children: "Naves TIE neutralizadas" }), _jsxs("div", { className: "bg-purple-900/30 border-2 border-purple-400 rounded-lg p-6 mb-6", children: [_jsx("div", { className: "text-purple-400 text-sm font-mono mb-2", children: "COORDENADAS OBTENIDAS:" }), _jsx("div", { className: "text-3xl text-purple-200 font-mono tracking-widest", children: "12-7-3-9" })] }), _jsx("button", { onClick: handleContinue, className: "w-full bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded\n                       border-2 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]\n                       transition-all font-mono", children: "CONTINUAR \u2192" })] }) }));
    }
    return (_jsxs("div", { className: "min-h-screen flex flex-col items-center justify-center p-4 pt-24", children: [_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "w-full max-w-4xl", children: [_jsx("div", { className: "bg-purple-900/30 border border-purple-500/50 rounded p-4 mb-4", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "text-purple-300 font-mono", children: ["NAVES DESTRUIDAS: ", score, "/10"] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Zap, { className: "w-5 h-5 text-purple-400" }), _jsx("span", { className: "text-purple-300 font-mono", children: "ENERG\u00CDA: 100%" })] })] }) }), _jsxs("div", { ref: gameAreaRef, className: "relative w-full aspect-[4/3] bg-slate-950 border-2 border-purple-500 rounded-lg\n                     overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.4)]", style: {
                            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 1px, transparent 1px)',
                            backgroundSize: '20px 20px'
                        }, children: [_jsx(motion.div, { style: { left: `${playerX}%` }, className: "absolute bottom-2 -translate-x-1/2 transition-all duration-100", children: _jsxs("svg", { width: "40", height: "40", viewBox: "0 0 40 40", className: "drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]", children: [_jsx("path", { d: "M20 20 L10 10 L8 12 L18 22 Z", fill: "#a78bfa" }), _jsx("path", { d: "M20 20 L30 10 L32 12 L22 22 Z", fill: "#a78bfa" }), _jsx("path", { d: "M20 20 L10 30 L8 28 L18 18 Z", fill: "#a78bfa" }), _jsx("path", { d: "M20 20 L30 30 L32 28 L22 18 Z", fill: "#a78bfa" }), _jsx("ellipse", { cx: "20", cy: "20", rx: "4", ry: "8", fill: "#c4b5fd" }), _jsx("rect", { x: "18", y: "12", width: "4", height: "16", fill: "#e9d5ff" }), _jsx("circle", { cx: "20", cy: "18", r: "2", fill: "#60a5fa", opacity: "0.8" }), _jsx("ellipse", { cx: "20", cy: "32", rx: "3", ry: "2", fill: "#3b82f6", opacity: "0.6" })] }) }), bullets.map(bullet => (_jsx("div", { style: {
                                    left: `${bullet.x}%`,
                                    top: `${bullet.y}%`
                                }, className: "absolute -translate-x-1/2", children: _jsxs("div", { className: "relative", children: [_jsx("div", { className: "w-2 h-6 bg-gradient-to-t from-purple-400 to-purple-200 rounded-full \n                              shadow-[0_0_15px_rgba(168,85,247,1)]" }), _jsx("div", { className: "absolute inset-0 w-1 h-6 bg-white opacity-60 rounded-full mx-auto" })] }) }, bullet.id))), enemies.map(enemy => (!enemy.destroyed && (_jsx(motion.div, { style: {
                                    left: `${enemy.x}%`,
                                    top: `${enemy.y}%`
                                }, animate: enemy.destroyed ? { scale: 0, opacity: 0 } : {}, className: "absolute -translate-x-1/2 -translate-y-1/2", children: _jsxs("svg", { width: "32", height: "32", viewBox: "0 0 32 32", className: "drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]", children: [_jsx("rect", { x: "2", y: "8", width: "8", height: "16", fill: "#ef4444", opacity: "0.8" }), _jsx("rect", { x: "22", y: "8", width: "8", height: "16", fill: "#ef4444", opacity: "0.8" }), _jsx("line", { x1: "2", y1: "12", x2: "10", y2: "12", stroke: "#dc2626", strokeWidth: "0.5" }), _jsx("line", { x1: "2", y1: "16", x2: "10", y2: "16", stroke: "#dc2626", strokeWidth: "0.5" }), _jsx("line", { x1: "2", y1: "20", x2: "10", y2: "20", stroke: "#dc2626", strokeWidth: "0.5" }), _jsx("line", { x1: "22", y1: "12", x2: "30", y2: "12", stroke: "#dc2626", strokeWidth: "0.5" }), _jsx("line", { x1: "22", y1: "16", x2: "30", y2: "16", stroke: "#dc2626", strokeWidth: "0.5" }), _jsx("line", { x1: "22", y1: "20", x2: "30", y2: "20", stroke: "#dc2626", strokeWidth: "0.5" }), _jsx("circle", { cx: "16", cy: "16", r: "6", fill: "#7f1d1d", stroke: "#ef4444", strokeWidth: "1" }), _jsx("circle", { cx: "16", cy: "16", r: "4", fill: "#991b1b" }), _jsx("circle", { cx: "16", cy: "15", r: "2", fill: "#fca5a5", opacity: "0.6" }), _jsx("rect", { x: "10", y: "14", width: "4", height: "4", fill: "#7f1d1d" }), _jsx("rect", { x: "18", y: "14", width: "4", height: "4", fill: "#7f1d1d" })] }) }, enemy.id))))] }), _jsx("div", { className: "mt-4 text-center text-purple-400 text-sm font-mono", children: "USA \u2190 \u2192 PARA MOVER Y ESPACIO PARA DISPARAR" })] }), _jsx("style", { children: `
        .clip-triangle {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
        .clip-hexagon {
          clip-path: polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%);
        }
      ` })] }));
}

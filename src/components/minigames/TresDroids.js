import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'motion/react';
import { Bot, HelpCircle } from 'lucide-react';
const droids = [
    {
        name: 'R-Truth',
        statement: 'El código está en el droide a mi derecha.',
        description: 'Siempre dice la verdad'
    },
    {
        name: 'L-∞',
        statement: 'Yo nunca mentiría sobre un código.',
        description: 'Siempre miente'
    },
    {
        name: 'Q-Glitch',
        statement: 'El de la izquierda está defectuoso.',
        description: 'Comportamiento aleatorio'
    }
];
export function TresDroids({ onClueCollected, onComplete }) {
    const [gameStarted, setGameStarted] = useState(false);
    const [selectedDroid, setSelectedDroid] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [showHint, setShowHint] = useState(false);
    // Solution: R-Truth is telling the truth, so the code is with L-∞ (to his right)
    // L-∞ always lies, so when he says he wouldn't lie, he's lying
    // Q-Glitch's statement is random, but doesn't affect the logic
    const correctAnswer = 'L-∞';
    const handleStart = () => {
        setGameStarted(true);
    };
    const handleDroidSelect = (droidName) => {
        setSelectedDroid(droidName);
        setShowResult(true);
        if (droidName === correctAnswer) {
            const clue = {
                id: 'logic',
                value: 'VECTOR',
                type: 'final',
                label: 'LÓGICA'
            };
            onClueCollected(clue);
        }
    };
    const handleContinue = () => {
        onComplete();
    };
    const handleToggleHint = () => {
        setShowHint(!showHint);
    };
    const isCorrect = selectedDroid === correctAnswer;
    if (!gameStarted) {
        return (_jsx("div", { className: "min-h-screen flex flex-col items-center justify-center p-4 pt-24", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, className: "bg-slate-950/80 backdrop-blur-sm border-2 border-purple-500/50 rounded-lg p-8 max-w-3xl\n                     shadow-[0_0_30px_rgba(168,85,247,0.3)]", children: [_jsxs("div", { className: "flex items-center gap-3 mb-6 justify-center", children: [_jsx(Bot, { className: "w-8 h-8 text-purple-400" }), _jsx("h2", { className: "text-3xl text-purple-300 font-mono", children: "ENIGMA DE LOS TRES DROIDS" })] }), _jsxs("div", { className: "text-purple-100 space-y-4 mb-6", children: [_jsx("p", { children: "Tres droides hologr\u00E1ficos custodian fragmentos del c\u00F3digo maestro. Cada uno tiene una caracter\u00EDstica \u00FAnica:" }), _jsxs("div", { className: "bg-purple-900/30 border border-purple-500/50 rounded p-4 space-y-2", children: [_jsxs("p", { className: "text-purple-300", children: [_jsx("strong", { children: "R-Truth:" }), " Siempre dice la verdad"] }), _jsxs("p", { className: "text-purple-300", children: [_jsx("strong", { children: "L-\u221E:" }), " Siempre miente"] }), _jsxs("p", { className: "text-purple-300", children: [_jsx("strong", { children: "Q-Glitch:" }), " Su comportamiento es aleatorio (puede mentir o decir la verdad)"] })] }), _jsx("p", { className: "text-purple-400", children: "OBJETIVO: Deduce cu\u00E1l droide tiene el c\u00F3digo analizando sus declaraciones." })] }), _jsx("button", { onClick: handleStart, className: "w-full bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded\n                       border-2 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]\n                       transition-all font-mono", children: "INICIAR INTERROGATORIO" })] }) }));
    }
    if (showResult) {
        return (_jsx("div", { className: "min-h-screen flex flex-col items-center justify-center p-4 pt-24", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, className: `bg-slate-950/80 backdrop-blur-sm border-2 rounded-lg p-8 max-w-2xl text-center
                     ${isCorrect ? 'border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)]' : 'border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.3)]'}`, children: [_jsx(motion.div, { animate: { scale: [1, 1.2, 1] }, transition: { duration: 0.5 }, className: "text-6xl mb-4", children: isCorrect ? '✓' : '✗' }), _jsx("h2", { className: `text-3xl font-mono mb-4 ${isCorrect ? 'text-green-400' : 'text-red-400'}`, children: isCorrect ? 'LÓGICA CORRECTA' : 'DEDUCCIÓN INCORRECTA' }), isCorrect ? (_jsxs(_Fragment, { children: [_jsxs("p", { className: "text-green-300 mb-6", children: ["Has identificado correctamente que ", _jsx("strong", { children: correctAnswer }), " posee el c\u00F3digo."] }), _jsxs("div", { className: "bg-purple-900/30 border border-purple-500/50 rounded p-4 mb-4 text-left", children: [_jsx("p", { className: "text-sm text-purple-300 mb-2", children: "EXPLICACI\u00D3N:" }), _jsxs("p", { className: "text-sm text-purple-200", children: ["\u2022 ", _jsx("strong", { children: "R-Truth" }), " siempre dice la verdad. Dice \"El c\u00F3digo est\u00E1 en el droide a mi derecha\" (que es L-\u221E), por lo tanto es cierto."] }), _jsxs("p", { className: "text-sm text-purple-200 mt-2", children: ["\u2022 ", _jsx("strong", { children: "L-\u221E" }), " siempre miente. Cuando dice \"Yo nunca mentir\u00EDa sobre un c\u00F3digo\", est\u00E1 mintiendo, confirmando que \u00E9l tiene el c\u00F3digo."] }), _jsxs("p", { className: "text-sm text-purple-200 mt-2", children: ["\u2022 ", _jsx("strong", { children: "Q-Glitch" }), " es aleatorio, su declaraci\u00F3n no es fiable para la deducci\u00F3n."] })] }), _jsxs("div", { className: "bg-purple-900/30 border-2 border-purple-400 rounded-lg p-6 mb-6", children: [_jsx("div", { className: "text-purple-400 text-sm font-mono mb-2", children: "PALABRA CLAVE OBTENIDA:" }), _jsx("div", { className: "text-3xl text-purple-200 font-mono tracking-widest", children: "VECTOR" })] })] })) : (_jsxs(_Fragment, { children: [_jsxs("p", { className: "text-red-300 mb-6", children: ["El droide ", _jsx("strong", { children: selectedDroid }), " no contiene el c\u00F3digo. La respuesta correcta era ", _jsx("strong", { children: correctAnswer }), "."] }), _jsxs("div", { className: "bg-purple-900/30 border border-purple-500/50 rounded p-4 mb-4 text-left", children: [_jsx("p", { className: "text-sm text-purple-300 mb-2", children: "PISTA:" }), _jsx("p", { className: "text-sm text-purple-200", children: "Considera que R-Truth siempre dice la verdad. Si dice que el c\u00F3digo est\u00E1 a su derecha (L-\u221E), entonces debe ser cierto. L-\u221E siempre miente, as\u00ED que cuando niega que mentir\u00EDa, est\u00E1 confirmando que \u00E9l es el portador." })] })] })), _jsx("button", { onClick: handleContinue, className: "w-full bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded\n                       border-2 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]\n                       transition-all font-mono", children: "CONTINUAR \u2192" })] }) }));
    }
    return (_jsx("div", { className: "min-h-screen flex flex-col items-center justify-center p-4 pt-24", children: _jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "w-full max-w-5xl", children: [_jsx("div", { className: "bg-purple-900/30 border border-purple-500/50 rounded p-4 mb-6", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("div", { className: "text-purple-300 font-mono", children: "AN\u00C1LISIS DE PROTOCOLOS L\u00D3GICOS" }), _jsxs("button", { onClick: handleToggleHint, className: "flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors", children: [_jsx(HelpCircle, { className: "w-5 h-5" }), _jsx("span", { className: "text-sm font-mono", children: "PISTA" })] })] }) }), showHint && (_jsx(motion.div, { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, className: "bg-purple-900/30 border border-purple-400/50 rounded p-4 mb-6", children: _jsx("p", { className: "text-sm text-purple-300", children: "\uD83D\uDCA1 Empieza por la declaraci\u00F3n de R-Truth. Si siempre dice la verdad, su afirmaci\u00F3n debe ser correcta. Luego verifica las declaraciones de los otros droides." }) })), _jsx("div", { className: "grid md:grid-cols-3 gap-6", children: droids.map((droid, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.2 }, whileHover: { y: -5 }, className: "bg-slate-950/80 backdrop-blur-sm border-2 border-purple-500/50 rounded-lg p-6\n                         shadow-[0_0_20px_rgba(168,85,247,0.3)] cursor-pointer hover:border-purple-400\n                         transition-all", onClick: () => handleDroidSelect(droid.name), children: _jsxs("div", { className: "flex flex-col items-center", children: [_jsx(motion.div, { animate: {
                                        rotate: [0, 10, -10, 0],
                                        scale: [1, 1.1, 1]
                                    }, transition: { duration: 2, repeat: Infinity }, className: "mb-4", children: _jsx(Bot, { className: "w-16 h-16 text-purple-400" }) }), _jsx("h3", { className: "text-2xl text-purple-200 font-mono mb-2", children: droid.name }), _jsxs("div", { className: "text-xs text-purple-400 mb-4 font-mono", children: ["[", droid.description, "]"] }), _jsx("div", { className: "bg-purple-900/30 border border-purple-500/50 rounded p-3 mb-4 min-h-[100px] flex items-center", children: _jsxs("p", { className: "text-sm text-purple-100 italic text-center", children: ["\"", droid.statement, "\""] }) }), _jsx("button", { className: "w-full bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded\n                             border border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.5)]\n                             transition-all font-mono text-sm", children: "SELECCIONAR" })] }) }, droid.name))) }), _jsx("div", { className: "mt-6 text-center text-purple-400 text-sm font-mono", children: "\u00BFCU\u00C1L DROIDE POSEE EL C\u00D3DIGO?" })] }) }));
}

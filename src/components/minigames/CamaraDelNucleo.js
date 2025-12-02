import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, Lock, CheckCircle2, X } from 'lucide-react';
export function CamaraDelNucleo({ collectedClues, onVictory }) {
    const [slots, setSlots] = useState([
        { id: 1, label: 'COORDENADAS TÁCTICAS', expectedType: 'coordinate', filledWith: null },
        { id: 2, label: 'CÓDIGO AUREBESH', expectedType: 'aurebesh', filledWith: null },
        { id: 3, label: 'PALABRA VISUAL', expectedType: 'visual', filledWith: null },
        { id: 4, label: 'TRADUCCIÓN BINARIA', expectedType: 'binary', filledWith: null },
        { id: 5, label: 'CLAVE FINAL', expectedType: 'final', filledWith: null },
    ]);
    const [draggedClue, setDraggedClue] = useState(null);
    const [attemptResult, setAttemptResult] = useState(null);
    const [showHint, setShowHint] = useState(false);
    const handleDragStart = (clue) => {
        setDraggedClue(clue);
    };
    const handleDragOver = (e) => {
        e.preventDefault();
    };
    const handleDrop = (slotId) => {
        if (!draggedClue)
            return;
        setSlots(prev => prev.map(slot => {
            if (slot.id === slotId) {
                // Remove the clue from any other slot first
                const otherSlots = prev.filter(s => s.id !== slotId);
                const alreadyPlaced = otherSlots.some(s => s.filledWith?.id === draggedClue.id);
                if (!alreadyPlaced) {
                    return { ...slot, filledWith: draggedClue };
                }
            }
            return slot;
        }));
        setDraggedClue(null);
    };
    const handleRemoveFromSlot = (slotId) => {
        setSlots(prev => prev.map(slot => slot.id === slotId ? { ...slot, filledWith: null } : slot));
    };
    const handleVerify = () => {
        // Check if all slots are filled correctly
        const allCorrect = slots.every(slot => slot.filledWith?.type === slot.expectedType);
        const allFilled = slots.every(slot => slot.filledWith !== null);
        if (allFilled && allCorrect) {
            setAttemptResult('success');
            setTimeout(() => {
                onVictory();
            }, 2000);
        }
        else {
            setAttemptResult('fail');
            setTimeout(() => {
                setAttemptResult(null);
                setShowHint(true);
            }, 2000);
        }
    };
    const allSlotsFilled = slots.every(slot => slot.filledWith !== null);
    const availableClues = collectedClues.filter(clue => !slots.some(slot => slot.filledWith?.id === clue.id));
    return (_jsx("div", { className: "min-h-screen flex flex-col items-center justify-center p-4 pt-24", children: _jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "w-full max-w-6xl", children: [_jsxs(motion.div, { initial: { y: -20, opacity: 0 }, animate: { y: 0, opacity: 1 }, className: "text-center mb-8", children: [_jsxs("div", { className: "flex items-center justify-center gap-3 mb-4", children: [_jsx(AlertTriangle, { className: "w-10 h-10 text-red-500 animate-pulse" }), _jsx("h1", { className: "text-4xl text-purple-300 font-mono", children: "C\u00C1MARA DEL N\u00DACLEO" }), _jsx(AlertTriangle, { className: "w-10 h-10 text-red-500 animate-pulse" })] }), _jsx("p", { className: "text-purple-400 font-mono", children: "Inserta las claves en el orden correcto para desactivar el Protocolo de Purga" })] }), attemptResult && (_jsx(motion.div, { initial: { scale: 0.8, opacity: 0 }, animate: { scale: 1, opacity: 1 }, className: `mb-6 p-4 rounded-lg border-2 text-center ${attemptResult === 'success'
                        ? 'bg-green-900/30 border-green-500 text-green-400'
                        : 'bg-red-900/30 border-red-500 text-red-400'}`, children: _jsx("div", { className: "flex items-center justify-center gap-2 text-xl font-mono", children: attemptResult === 'success' ? (_jsxs(_Fragment, { children: [_jsx(CheckCircle2, { className: "w-6 h-6" }), _jsx("span", { children: "N\u00DACLEO DESACTIVADO - PROTOCOLO CANCELADO" })] })) : (_jsxs(_Fragment, { children: [_jsx(X, { className: "w-6 h-6" }), _jsx("span", { children: "CONFIGURACI\u00D3N INCORRECTA - ALARMA ACTIVADA" })] })) }) })), showHint && attemptResult !== 'success' && (_jsx(motion.div, { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, className: "mb-6 bg-purple-900/30 border border-purple-500/50 rounded p-4", children: _jsx("p", { className: "text-sm text-purple-300 text-center", children: "\uD83D\uDCA1 PISTA: Cada ranura espera un tipo espec\u00EDfico de clave. Lee las etiquetas cuidadosamente y asocia cada clave obtenida con su ranura correspondiente." }) })), _jsxs("div", { className: "grid lg:grid-cols-2 gap-8", children: [_jsxs("div", { children: [_jsxs("h2", { className: "text-xl text-purple-300 font-mono mb-4 flex items-center gap-2", children: [_jsx(Lock, { className: "w-5 h-5" }), "CONSOLA DE N\u00DACLEO"] }), _jsxs("div", { className: "bg-slate-950/80 backdrop-blur-sm border-2 border-purple-500/50 rounded-lg p-6\n                           shadow-[0_0_30px_rgba(168,85,247,0.3)]", children: [_jsx("div", { className: "space-y-4", children: slots.map((slot, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: index * 0.1 }, onDragOver: handleDragOver, onDrop: () => handleDrop(slot.id), className: `relative p-4 rounded border-2 min-h-[80px] transition-all ${slot.filledWith
                                                    ? slot.filledWith.type === slot.expectedType
                                                        ? 'border-green-500 bg-green-900/20'
                                                        : 'border-yellow-500 bg-yellow-900/20'
                                                    : 'border-purple-600 bg-purple-900/20 border-dashed'}`, children: [_jsxs("div", { className: "flex items-start justify-between mb-2", children: [_jsxs("div", { children: [_jsxs("div", { className: "text-xs text-purple-400 font-mono mb-1", children: ["RANURA ", slot.id] }), _jsx("div", { className: "text-sm text-purple-200 font-mono", children: slot.label })] }), slot.filledWith && (_jsx("button", { onClick: () => handleRemoveFromSlot(slot.id), className: "text-red-400 hover:text-red-300 transition-colors", children: _jsx(X, { className: "w-4 h-4" }) }))] }), slot.filledWith ? (_jsx(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, className: "bg-purple-700/50 border border-purple-400 rounded px-3 py-2", children: _jsx("div", { className: "text-purple-100 font-mono", children: slot.filledWith.value }) })) : (_jsx("div", { className: "text-center text-purple-700 text-sm font-mono py-2", children: "[VAC\u00CDO - ARRASTRA AQU\u00CD]" }))] }, slot.id))) }), allSlotsFilled && (_jsx(motion.button, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: handleVerify, disabled: attemptResult !== null, className: "w-full mt-6 bg-red-600 hover:bg-red-500 disabled:bg-gray-600 \n                           text-white px-6 py-4 rounded-lg\n                           border-2 border-red-400 disabled:border-gray-500\n                           shadow-[0_0_20px_rgba(239,68,68,0.6)] disabled:shadow-none\n                           transition-all font-mono text-lg", children: attemptResult === null ? 'DESACTIVAR NÚCLEO' : 'PROCESANDO...' }))] })] }), _jsxs("div", { children: [_jsx("h2", { className: "text-xl text-purple-300 font-mono mb-4 flex items-center gap-2", children: "CLAVES DISPONIBLES" }), _jsxs("div", { className: "bg-slate-950/80 backdrop-blur-sm border-2 border-purple-500/50 rounded-lg p-6\n                           shadow-[0_0_30px_rgba(168,85,247,0.3)]", children: [availableClues.length > 0 ? (_jsx("div", { className: "space-y-3", children: availableClues.map((clue, index) => (_jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: index * 0.1 }, draggable: true, onDragStart: () => handleDragStart(clue), className: "bg-purple-900/40 border-2 border-purple-500 rounded-lg p-4 cursor-move\n                               hover:border-purple-400 hover:bg-purple-800/40 transition-all\n                               shadow-[0_0_15px_rgba(168,85,247,0.4)]", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "text-xs text-purple-400 font-mono mb-1", children: clue.label }), _jsx("div", { className: "text-lg text-purple-100 font-mono", children: clue.value })] }), _jsx("div", { className: "text-purple-400", children: _jsx("svg", { className: "w-6 h-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 7h12M8 12h12M8 17h12M3 7h.01M3 12h.01M3 17h.01" }) }) })] }) }, clue.id))) })) : (_jsxs("div", { className: "text-center text-purple-500 py-8", children: [_jsx(Lock, { className: "w-12 h-12 mx-auto mb-3 opacity-50" }), _jsx("p", { className: "font-mono text-sm", children: "Todas las claves han sido asignadas" })] })), _jsx("div", { className: "mt-6 pt-6 border-t border-purple-700", children: _jsx("p", { className: "text-xs text-purple-400 text-center font-mono", children: "Arrastra y suelta las claves en las ranuras correspondientes" }) })] }), _jsxs(motion.div, { animate: {
                                        boxShadow: attemptResult === 'success'
                                            ? ['0 0 20px rgba(34,197,94,0.3)', '0 0 40px rgba(34,197,94,0.6)', '0 0 20px rgba(34,197,94,0.3)']
                                            : attemptResult === 'fail'
                                                ? ['0 0 20px rgba(239,68,68,0.3)', '0 0 40px rgba(239,68,68,0.6)', '0 0 20px rgba(239,68,68,0.3)']
                                                : ['0 0 20px rgba(168,85,247,0.3)', '0 0 30px rgba(168,85,247,0.4)', '0 0 20px rgba(168,85,247,0.3)']
                                    }, transition: { duration: 1.5, repeat: Infinity }, className: "mt-6 bg-slate-950/80 backdrop-blur-sm border-2 border-purple-500/50 rounded-lg p-6\n                       text-center", children: [_jsx("div", { className: "text-sm text-purple-400 font-mono mb-3", children: "ESTADO DEL N\u00DACLEO" }), _jsxs(motion.div, { animate: { rotate: attemptResult === 'success' ? 0 : 360 }, transition: { duration: 3, repeat: attemptResult === 'success' ? 0 : Infinity, ease: 'linear' }, className: "w-24 h-24 mx-auto rounded-full border-4 border-purple-500 \n                         bg-gradient-to-br from-purple-600/30 to-blue-600/30 relative", children: [_jsx("div", { className: "absolute inset-2 rounded-full border-2 border-purple-400 \n                              bg-gradient-to-br from-purple-500/20 to-blue-500/20" }), _jsx("div", { className: "absolute inset-4 rounded-full border border-purple-300 \n                              bg-gradient-to-br from-purple-400/10 to-blue-400/10" })] }), _jsx("div", { className: `mt-3 text-xs font-mono ${attemptResult === 'success' ? 'text-green-400' :
                                                attemptResult === 'fail' ? 'text-red-400' :
                                                    'text-purple-400'}`, children: attemptResult === 'success' ? 'DESACTIVADO' :
                                                attemptResult === 'fail' ? 'ALARMA' :
                                                    allSlotsFilled ? 'LISTO PARA DESACTIVAR' : 'ACTIVO' })] })] })] })] }) }));
}

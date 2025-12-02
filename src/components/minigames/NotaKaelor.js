import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Search } from 'lucide-react';
const report = `
INFORME CLASIFICADO IMPERIAL
ESTACIÓN HALCYON-9
FECHA: 19 ABY - DÍA 247
OFICIAL: CAPITÁN KAELOR VANTIS

SECCIÓN 1: ESTADO DE SISTEMAS
Los sistemas de energía primarios están operando al 94% de capacidad. El módulo de comunicaciones fue reparado el día 245, tras el incidente con el módulo de refrigeración. El droide táctico TX-0R ha completado sus diagnósticos rutinarios. BYPASS de seguridad completado en el sector 7.

SECCIÓN 2: PERSONAL
La tripulación cuenta con 47 efectivos. El Teniente Ordinal fue ascendido a Comandante el día 243. Todos los protocolos de seguridad han sido revisados por el Mayor Thex. INTEGRITY verificada en todos los niveles. El droide TX-0R requiere mantenimiento preventivo.

SECCIÓN 3: SEGURIDAD
Se detectaron tres intentos de acceso no autorizado esta semana. Los códigos de acceso fueron cambiados el día 246, un día antes del incidente. La puerta del hangar principal permanece OVERLOAD tras la tormenta solar. Todos los sistemas críticos están bajo vigilancia constante.

SECCIÓN 4: RECOMENDACIONES
Se recomienda incrementar la seguridad en el sector 7. El Comandante Ordinal ha solicitado refuerzos adicionales. Es imperativo mantener los protocolos CORE durante las próximas 72 horas. Se sugiere una inspección completa del droide TX-0R antes del día 250.
`;
// The three suspicious words are: BYPASS, INTEGRITY, OVERLOAD, CORE
// But we only need 3 words, so let's use: BYPASS, OVERLOAD, CORE
// Hidden word when combined: This is a puzzle, the answer we want is a single word
// Let's make it simpler: The word hidden is "PROTOCOL" but broken across the text
// Actually, let's have specific words that are capitalized incorrectly: BYPASS, OVERLOAD, CORE
// When combined or rearranged: We'll say the answer is "PROTOCOL"
const suspiciousWords = ['BYPASS', 'OVERLOAD', 'CORE'];
const hiddenWord = 'PROTOCOL';
export function NotaKaelor({ onClueCollected, onComplete }) {
    const [gameStarted, setGameStarted] = useState(false);
    const [selectedWords, setSelectedWords] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const handleStart = () => {
        setGameStarted(true);
    };
    const handleWordClick = (word) => {
        if (selectedWords.includes(word)) {
            setSelectedWords(selectedWords.filter(w => w !== word));
        }
        else if (selectedWords.length < 3) {
            setSelectedWords([...selectedWords, word]);
        }
    };
    const handleSubmit = () => {
        const isCorrect = suspiciousWords.every(word => selectedWords.includes(word))
            && selectedWords.length === 3;
        if (isCorrect) {
            const clue = {
                id: 'observation',
                value: hiddenWord,
                type: 'final',
                label: 'OBSERVACIÓN'
            };
            onClueCollected(clue);
        }
        setShowResult(true);
    };
    const handleContinue = () => {
        onComplete();
    };
    const handleToggleHint = () => {
        setShowHint(!showHint);
    };
    const isCorrect = suspiciousWords.every(word => selectedWords.includes(word))
        && selectedWords.length === 3;
    // Highlight the report with clickable words
    const renderReport = () => {
        const words = ['BYPASS', 'INTEGRITY', 'OVERLOAD', 'CORE'];
        let processedReport = report;
        return processedReport.split('\n').map((line, lineIndex) => {
            let processedLine = line;
            const lineWords = [];
            words.forEach(word => {
                if (line.includes(word)) {
                    const parts = processedLine.split(word);
                    processedLine = parts.join(`<WORD>${word}</WORD>`);
                }
            });
            const segments = processedLine.split(/<WORD>|<\/WORD>/);
            return (_jsx("div", { className: "mb-2", children: segments.map((segment, segIndex) => {
                    const isWord = words.includes(segment);
                    if (isWord) {
                        const isSelected = selectedWords.includes(segment);
                        return (_jsx("button", { onClick: () => handleWordClick(segment), className: `inline font-mono transition-all ${isSelected
                                ? 'bg-purple-500 text-white px-1 rounded shadow-[0_0_10px_rgba(168,85,247,0.8)]'
                                : 'text-purple-400 hover:text-purple-300 underline cursor-pointer'}`, children: segment }, segIndex));
                    }
                    return _jsx("span", { children: segment }, segIndex);
                }) }, lineIndex));
        });
    };
    if (!gameStarted) {
        return (_jsx("div", { className: "min-h-screen flex flex-col items-center justify-center p-4 pt-24", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, className: "bg-slate-950/80 backdrop-blur-sm border-2 border-purple-500/50 rounded-lg p-8 max-w-3xl\n                     shadow-[0_0_30px_rgba(168,85,247,0.3)]", children: [_jsxs("div", { className: "flex items-center gap-3 mb-6 justify-center", children: [_jsx(FileText, { className: "w-8 h-8 text-purple-400" }), _jsx("h2", { className: "text-3xl text-purple-300 font-mono", children: "LA NOTA DEL OFICIAL KAELOR" })] }), _jsxs("div", { className: "text-purple-100 space-y-4 mb-6", children: [_jsx("p", { children: "Has interceptado un informe imperial del Capit\u00E1n Kaelor Vantis. El documento contiene informaci\u00F3n sobre la estaci\u00F3n Halcyon-9." }), _jsx("p", { className: "text-purple-400", children: "OBJETIVO: Encuentra las 3 palabras sospechosas que est\u00E1n mal colocadas o son inconsistentes en el texto." }), _jsxs("div", { className: "bg-purple-900/30 border border-purple-500/50 rounded p-4 mt-4", children: [_jsx("p", { className: "text-sm", children: "BUSCA:" }), _jsx("p", { className: "text-sm", children: "\u2022 Palabras con formato extra\u00F1o (may\u00FAsculas inusuales)" }), _jsx("p", { className: "text-sm", children: "\u2022 T\u00E9rminos que no encajan en el contexto" }), _jsx("p", { className: "text-sm", children: "\u2022 Inconsistencias en el texto" })] })] }), _jsx("button", { onClick: handleStart, className: "w-full bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded\n                       border-2 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]\n                       transition-all font-mono", children: "ANALIZAR DOCUMENTO" })] }) }));
    }
    if (showResult) {
        return (_jsx("div", { className: "min-h-screen flex flex-col items-center justify-center p-4 pt-24", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, className: `bg-slate-950/80 backdrop-blur-sm border-2 rounded-lg p-8 max-w-2xl text-center
                     ${isCorrect ? 'border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)]' : 'border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.3)]'}`, children: [_jsx(motion.div, { animate: { scale: [1, 1.2, 1] }, transition: { duration: 0.5 }, className: "text-6xl mb-4", children: isCorrect ? '✓' : '✗' }), _jsx("h2", { className: `text-3xl font-mono mb-4 ${isCorrect ? 'text-green-400' : 'text-red-400'}`, children: isCorrect ? 'ANÁLISIS CORRECTO' : 'ANÁLISIS INCOMPLETO' }), isCorrect ? (_jsxs(_Fragment, { children: [_jsx("p", { className: "text-green-300 mb-6", children: "Has identificado las palabras sospechosas correctamente." }), _jsxs("div", { className: "bg-purple-900/30 border border-purple-500/50 rounded p-4 mb-4 text-left", children: [_jsx("p", { className: "text-sm text-purple-300 mb-2", children: "PALABRAS IDENTIFICADAS:" }), _jsx("div", { className: "flex flex-wrap gap-2 justify-center", children: suspiciousWords.map(word => (_jsx("span", { className: "bg-purple-600 text-white px-3 py-1 rounded font-mono text-sm", children: word }, word))) })] }), _jsxs("div", { className: "bg-purple-900/30 border-2 border-purple-400 rounded-lg p-6 mb-6", children: [_jsx("div", { className: "text-purple-400 text-sm font-mono mb-2", children: "PALABRA CLAVE DESCUBIERTA:" }), _jsx("div", { className: "text-3xl text-purple-200 font-mono tracking-widest", children: hiddenWord }), _jsx("p", { className: "text-xs text-purple-400 mt-2", children: "(Las palabras en may\u00FAsculas revelaban un protocolo oculto)" })] })] })) : (_jsxs(_Fragment, { children: [_jsx("p", { className: "text-red-300 mb-6", children: "Las palabras seleccionadas no son correctas. Las palabras sospechosas eran:" }), _jsx("div", { className: "bg-purple-900/30 border border-purple-500/50 rounded p-4 mb-4", children: _jsx("div", { className: "flex flex-wrap gap-2 justify-center", children: suspiciousWords.map(word => (_jsx("span", { className: "bg-purple-600 text-white px-3 py-1 rounded font-mono text-sm", children: word }, word))) }) }), _jsx("p", { className: "text-sm text-purple-300 mb-4", children: "Todas est\u00E1n escritas en MAY\u00DASCULAS completas en medio de oraciones normales, lo cual es inusual en un informe formal imperial." })] })), _jsx("button", { onClick: handleContinue, className: "w-full bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded\n                       border-2 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]\n                       transition-all font-mono", children: "CONTINUAR \u2192" })] }) }));
    }
    return (_jsx("div", { className: "min-h-screen flex flex-col items-center justify-center p-4 pt-24", children: _jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "w-full max-w-4xl", children: [_jsx("div", { className: "bg-purple-900/30 border border-purple-500/50 rounded p-4 mb-6", children: _jsxs("div", { className: "flex justify-between items-center flex-wrap gap-2", children: [_jsxs("div", { className: "text-purple-300 font-mono text-sm", children: ["PALABRAS SELECCIONADAS: ", selectedWords.length, "/3"] }), _jsxs("div", { className: "flex gap-2 items-center", children: [_jsxs("button", { onClick: handleToggleHint, className: "flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm", children: [_jsx(Search, { className: "w-4 h-4" }), _jsx("span", { className: "font-mono", children: "PISTA" })] }), selectedWords.length === 3 && (_jsx("button", { onClick: handleSubmit, className: "bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded\n                             border border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.5)]\n                             transition-all font-mono text-sm", children: "ANALIZAR" }))] })] }) }), showHint && (_jsx(motion.div, { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, className: "bg-purple-900/30 border border-purple-400/50 rounded p-4 mb-6", children: _jsx("p", { className: "text-sm text-purple-300", children: "\uD83D\uDCA1 Busca palabras que est\u00E9n completamente en MAY\u00DASCULAS dentro de oraciones normales. En un informe formal imperial, esto ser\u00EDa inusual y podr\u00EDa indicar un c\u00F3digo oculto." }) })), selectedWords.length > 0 && (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "bg-purple-900/30 border border-purple-500/50 rounded p-4 mb-6", children: [_jsx("p", { className: "text-sm text-purple-400 mb-2", children: "Palabras seleccionadas:" }), _jsx("div", { className: "flex flex-wrap gap-2", children: selectedWords.map(word => (_jsx("span", { className: "bg-purple-600 text-white px-3 py-1 rounded font-mono text-sm", children: word }, word))) })] })), _jsx("div", { className: "bg-slate-950/80 backdrop-blur-sm border-2 border-purple-500/50 rounded-lg p-6\n                       shadow-[0_0_30px_rgba(168,85,247,0.3)] max-h-[60vh] overflow-y-auto", children: _jsx("div", { className: "text-purple-100 text-sm leading-relaxed", children: renderReport() }) }), _jsx("div", { className: "mt-4 text-center text-purple-400 text-sm font-mono", children: "HAZ CLIC EN LAS PALABRAS SOSPECHOSAS (3 EN TOTAL)" })] }) }));
}

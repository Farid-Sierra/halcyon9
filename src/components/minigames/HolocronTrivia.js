import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, ZoomIn } from 'lucide-react';
const questions = [
    {
        id: 1,
        question: "¿Cuál es el cristal primario del sable de Mace Windu?",
        options: ["Cristal Kyber azul", "Cristal Kyber púrpura", "Cristal Kyber verde", "Cristal Kyber rojo"],
        correct: 1
    },
    {
        id: 2,
        question: "¿Qué planeta aloja el Primer Templo Jedi?",
        options: ["Coruscant", "Dagobah", "Ahch-To", "Jedha"],
        correct: 2
    },
    {
        id: 3,
        question: "¿Quién fue el maestro de Qui-Gon Jinn?",
        options: ["Yoda", "Mace Windu", "Conde Dooku", "Obi-Wan Kenobi"],
        correct: 2
    },
    {
        id: 4,
        question: "¿Qué especie es el Gran Almirante Thrawn?",
        options: ["Twi'lek", "Chiss", "Rodiano", "Togruta"],
        correct: 1
    },
    {
        id: 5,
        question: "¿Cuál es el nombre real del Emperador Palpatine?",
        options: ["Darth Sidious", "Sheev Palpatine", "Darth Plagueis", "Cosinga Palpatine"],
        correct: 1
    }
];
export function HolocronTrivia({ onClueCollected, onComplete }) {
    const [gameStarted, setGameStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState(new Array(questions.length).fill(null));
    const [showResults, setShowResults] = useState(false);
    const [showHologram, setShowHologram] = useState(false);
    const [hologramRevealed, setHologramRevealed] = useState(false);
    const handleStart = () => {
        setGameStarted(true);
    };
    const handleAnswer = (answerIndex) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = answerIndex;
        setAnswers(newAnswers);
        if (currentQuestion < questions.length - 1) {
            setTimeout(() => {
                setCurrentQuestion(prev => prev + 1);
            }, 500);
        }
        else {
            setTimeout(() => {
                checkResults();
            }, 500);
        }
    };
    const checkResults = () => {
        const correctCount = answers.filter((answer, index) => answer === questions[index].correct).length;
        if (correctCount >= 3) {
            setShowHologram(true);
        }
        setShowResults(true);
    };
    const handleHologramReveal = () => {
        setHologramRevealed(true);
        const clue = {
            id: 'visual',
            value: 'NEXUS',
            type: 'visual',
            label: 'VISUAL'
        };
        onClueCollected(clue);
    };
    const handleContinue = () => {
        onComplete();
    };
    const correctCount = answers.filter((answer, index) => answer === questions[index].correct).length;
    const success = correctCount >= 3;
    if (!gameStarted) {
        return (_jsx("div", { className: "min-h-screen flex flex-col items-center justify-center p-4 pt-24", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, className: "bg-slate-950/80 backdrop-blur-sm border-2 border-purple-500/50 rounded-lg p-8 max-w-2xl\n                     shadow-[0_0_30px_rgba(168,85,247,0.3)]", children: [_jsxs("div", { className: "flex items-center gap-3 mb-6 justify-center", children: [_jsx(BookOpen, { className: "w-8 h-8 text-purple-400" }), _jsx("h2", { className: "text-3xl text-purple-300 font-mono", children: "HOLOCRON TRIVIA" })] }), _jsxs("div", { className: "text-purple-100 space-y-4 mb-6", children: [_jsx("p", { children: "El Holocron imperial contiene conocimiento ancestral protegido por preguntas de seguridad." }), _jsx("p", { className: "text-purple-400", children: "OBJETIVO: Responde correctamente al menos 3 de 5 preguntas para acceder al holograma secreto." }), _jsxs("div", { className: "bg-purple-900/30 border border-purple-500/50 rounded p-4 mt-4", children: [_jsx("p", { className: "text-sm", children: "ADVERTENCIA:" }), _jsx("p", { className: "text-sm", children: "\u2022 Las preguntas requieren conocimiento profundo de Star Wars" }), _jsx("p", { className: "text-sm", children: "\u2022 Cada pregunta se muestra una sola vez" }), _jsx("p", { className: "text-sm", children: "\u2022 El holograma revelar\u00E1 una palabra clave oculta" })] })] }), _jsx("button", { onClick: handleStart, className: "w-full bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded\n                       border-2 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]\n                       transition-all font-mono", children: "ACCEDER AL HOLOCRON" })] }) }));
    }
    if (showResults) {
        return (_jsx("div", { className: "min-h-screen flex flex-col items-center justify-center p-4 pt-24", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, className: `bg-slate-950/80 backdrop-blur-sm border-2 rounded-lg p-8 max-w-2xl text-center
                     ${success ? 'border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)]' : 'border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.3)]'}`, children: [_jsx(motion.div, { animate: { scale: [1, 1.2, 1] }, transition: { duration: 0.5 }, className: "text-6xl mb-4", children: success ? '✓' : '✗' }), _jsx("h2", { className: `text-3xl font-mono mb-4 ${success ? 'text-green-400' : 'text-red-400'}`, children: success ? 'HOLOCRON DESBLOQUEADO' : 'ACCESO DENEGADO' }), _jsxs("p", { className: "text-purple-300 mb-6", children: ["Respuestas correctas: ", correctCount, "/5"] }), showHologram && (_jsx("div", { className: "mb-6", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, className: "bg-purple-900/30 border-2 border-purple-400 rounded-lg p-6 relative", children: [_jsx("div", { className: "text-purple-400 text-sm font-mono mb-4", children: "HOLOGRAMA IMPERIAL DETECTADO" }), _jsx(motion.div, { animate: {
                                        opacity: hologramRevealed ? 1 : [0.3, 0.7, 0.3],
                                        filter: hologramRevealed ? 'blur(0px)' : 'blur(4px)'
                                    }, transition: { duration: 2, repeat: hologramRevealed ? 0 : Infinity }, className: "relative aspect-square max-w-xs mx-auto bg-gradient-to-br from-purple-600/20 to-blue-600/20 \n                             border border-purple-500/50 rounded flex items-center justify-center cursor-pointer", onClick: handleHologramReveal, children: !hologramRevealed ? (_jsxs("div", { className: "text-center", children: [_jsx(ZoomIn, { className: "w-12 h-12 text-purple-400 mx-auto mb-2" }), _jsx("p", { className: "text-purple-300 text-sm font-mono", children: "HAZ CLIC PARA REVELAR" })] })) : (_jsxs(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, className: "text-center", children: [_jsx("div", { className: "text-6xl text-purple-200 font-mono tracking-widest mb-2", children: "NEXUS" }), _jsx("div", { className: "text-sm text-purple-400", children: "PALABRA CLAVE VISUAL" })] })) }), !hologramRevealed && (_jsx("div", { className: "mt-4 text-xs text-purple-400 font-mono", children: "Pasa el cursor y haz clic para enfocar el holograma" }))] }) })), hologramRevealed && (_jsx("button", { onClick: handleContinue, className: "w-full bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded\n                         border-2 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]\n                         transition-all font-mono", children: "CONTINUAR \u2192" })), !success && (_jsx("button", { onClick: handleContinue, className: "w-full bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded\n                         border-2 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]\n                         transition-all font-mono", children: "CONTINUAR \u2192" }))] }) }));
    }
    const question = questions[currentQuestion];
    const selectedAnswer = answers[currentQuestion];
    return (_jsx("div", { className: "min-h-screen flex flex-col items-center justify-center p-4 pt-24", children: _jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "w-full max-w-3xl", children: [_jsx("div", { className: "bg-purple-900/30 border border-purple-500/50 rounded p-4 mb-4", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "text-purple-300 font-mono", children: ["PREGUNTA ", currentQuestion + 1, " DE ", questions.length] }), _jsxs("div", { className: "text-purple-300 font-mono", children: [answers.filter(a => a !== null).length, " RESPONDIDAS"] })] }) }), _jsxs(motion.div, { initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 }, className: "bg-slate-950/80 backdrop-blur-sm border-2 border-purple-500/50 rounded-lg p-8\n                     shadow-[0_0_30px_rgba(168,85,247,0.3)]", children: [_jsx("h3", { className: "text-2xl text-purple-200 mb-8 text-center", children: question.question }), _jsx("div", { className: "space-y-4", children: question.options.map((option, index) => (_jsx(motion.button, { whileHover: { scale: 1.02, x: 10 }, whileTap: { scale: 0.98 }, onClick: () => handleAnswer(index), disabled: selectedAnswer !== null, className: `w-full p-4 rounded border-2 text-left transition-all
                          ${selectedAnswer === index
                                    ? 'border-purple-400 bg-purple-600/50 shadow-[0_0_20px_rgba(168,85,247,0.5)]'
                                    : 'border-purple-700/50 bg-purple-900/20 hover:border-purple-500 hover:bg-purple-800/30'}
                          ${selectedAnswer !== null ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`, children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: `w-8 h-8 rounded-full border-2 flex items-center justify-center
                                 ${selectedAnswer === index ? 'border-purple-300 bg-purple-500' : 'border-purple-600'}`, children: _jsx("span", { className: "text-purple-200 font-mono", children: String.fromCharCode(65 + index) }) }), _jsx("span", { className: "text-purple-100", children: option })] }) }, index))) })] }, currentQuestion), _jsx("div", { className: "mt-4 text-center text-purple-400 text-sm font-mono", children: "SELECCIONA UNA RESPUESTA" })] }) }));
}

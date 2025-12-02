import { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, ZoomIn } from 'lucide-react';
import type { CollectedClue } from '../../App';

type Props = {
  onClueCollected: (clue: CollectedClue) => void;
  onComplete: () => void;
};

type Question = {
  id: number;
  question: string;
  options: string[];
  correct: number;
};

const questions: Question[] = [
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

export function HolocronTrivia({ onClueCollected, onComplete }: Props) {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);
  const [showHologram, setShowHologram] = useState(false);
  const [hologramRevealed, setHologramRevealed] = useState(false);

  const handleStart = () => {
    setGameStarted(true);
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
      }, 500);
    } else {
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
    const clue: CollectedClue = {
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
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 pt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-950/80 backdrop-blur-sm border-2 border-purple-500/50 rounded-lg p-8 max-w-2xl
                     shadow-[0_0_30px_rgba(168,85,247,0.3)]"
        >
          <div className="flex items-center gap-3 mb-6 justify-center">
            <BookOpen className="w-8 h-8 text-purple-400" />
            <h2 className="text-3xl text-purple-300 font-mono">HOLOCRON TRIVIA</h2>
          </div>

          <div className="text-purple-100 space-y-4 mb-6">
            <p>El Holocron imperial contiene conocimiento ancestral protegido por preguntas de seguridad.</p>
            <p className="text-purple-400">
              OBJETIVO: Responde correctamente al menos 3 de 5 preguntas para acceder al holograma secreto.
            </p>
            <div className="bg-purple-900/30 border border-purple-500/50 rounded p-4 mt-4">
              <p className="text-sm">ADVERTENCIA:</p>
              <p className="text-sm">• Las preguntas requieren conocimiento profundo de Star Wars</p>
              <p className="text-sm">• Cada pregunta se muestra una sola vez</p>
              <p className="text-sm">• El holograma revelará una palabra clave oculta</p>
            </div>
          </div>

          <button
            onClick={handleStart}
            className="w-full bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded
                       border-2 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]
                       transition-all font-mono"
          >
            ACCEDER AL HOLOCRON
          </button>
        </motion.div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 pt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`bg-slate-950/80 backdrop-blur-sm border-2 rounded-lg p-8 max-w-2xl text-center
                     ${success ? 'border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)]' : 'border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.3)]'}`}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5 }}
            className="text-6xl mb-4"
          >
            {success ? '✓' : '✗'}
          </motion.div>
          <h2 className={`text-3xl font-mono mb-4 ${success ? 'text-green-400' : 'text-red-400'}`}>
            {success ? 'HOLOCRON DESBLOQUEADO' : 'ACCESO DENEGADO'}
          </h2>
          <p className="text-purple-300 mb-6">
            Respuestas correctas: {correctCount}/5
          </p>

          {showHologram && (
            <div className="mb-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-purple-900/30 border-2 border-purple-400 rounded-lg p-6 relative"
              >
                <div className="text-purple-400 text-sm font-mono mb-4">
                  HOLOGRAMA IMPERIAL DETECTADO
                </div>
                
                <motion.div
                  animate={{ 
                    opacity: hologramRevealed ? 1 : [0.3, 0.7, 0.3],
                    filter: hologramRevealed ? 'blur(0px)' : 'blur(4px)'
                  }}
                  transition={{ duration: 2, repeat: hologramRevealed ? 0 : Infinity }}
                  className="relative aspect-square max-w-xs mx-auto bg-gradient-to-br from-purple-600/20 to-blue-600/20 
                             border border-purple-500/50 rounded flex items-center justify-center cursor-pointer"
                  onClick={handleHologramReveal}
                >
                  {!hologramRevealed ? (
                    <div className="text-center">
                      <ZoomIn className="w-12 h-12 text-purple-400 mx-auto mb-2" />
                      <p className="text-purple-300 text-sm font-mono">HAZ CLIC PARA REVELAR</p>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-center"
                    >
                      <div className="text-6xl text-purple-200 font-mono tracking-widest mb-2">
                        NEXUS
                      </div>
                      <div className="text-sm text-purple-400">PALABRA CLAVE VISUAL</div>
                    </motion.div>
                  )}
                </motion.div>

                {!hologramRevealed && (
                  <div className="mt-4 text-xs text-purple-400 font-mono">
                    Pasa el cursor y haz clic para enfocar el holograma
                  </div>
                )}
              </motion.div>
            </div>
          )}

          {hologramRevealed && (
            <button
              onClick={handleContinue}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded
                         border-2 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]
                         transition-all font-mono"
            >
              CONTINUAR →
            </button>
          )}

          {!success && (
            <button
              onClick={handleContinue}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded
                         border-2 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]
                         transition-all font-mono"
            >
              CONTINUAR →
            </button>
          )}
        </motion.div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const selectedAnswer = answers[currentQuestion];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 pt-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-3xl"
      >
        <div className="bg-purple-900/30 border border-purple-500/50 rounded p-4 mb-4">
          <div className="flex justify-between items-center">
            <div className="text-purple-300 font-mono">
              PREGUNTA {currentQuestion + 1} DE {questions.length}
            </div>
            <div className="text-purple-300 font-mono">
              {answers.filter(a => a !== null).length} RESPONDIDAS
            </div>
          </div>
        </div>

        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-slate-950/80 backdrop-blur-sm border-2 border-purple-500/50 rounded-lg p-8
                     shadow-[0_0_30px_rgba(168,85,247,0.3)]"
        >
          <h3 className="text-2xl text-purple-200 mb-8 text-center">
            {question.question}
          </h3>

          <div className="space-y-4">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02, x: 10 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`w-full p-4 rounded border-2 text-left transition-all
                          ${selectedAnswer === index 
                            ? 'border-purple-400 bg-purple-600/50 shadow-[0_0_20px_rgba(168,85,247,0.5)]'
                            : 'border-purple-700/50 bg-purple-900/20 hover:border-purple-500 hover:bg-purple-800/30'
                          }
                          ${selectedAnswer !== null ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center
                                 ${selectedAnswer === index ? 'border-purple-300 bg-purple-500' : 'border-purple-600'}`}>
                    <span className="text-purple-200 font-mono">{String.fromCharCode(65 + index)}</span>
                  </div>
                  <span className="text-purple-100">{option}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="mt-4 text-center text-purple-400 text-sm font-mono">
          SELECCIONA UNA RESPUESTA
        </div>
      </motion.div>
    </div>
  );
}

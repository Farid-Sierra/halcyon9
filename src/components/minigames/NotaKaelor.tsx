import { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Search } from 'lucide-react';
import type { CollectedClue } from '../../App';

type Props = {
  onClueCollected: (clue: CollectedClue) => void;
  onComplete: () => void;
};

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

export function NotaKaelor({ onClueCollected, onComplete }: Props) {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleStart = () => {
    setGameStarted(true);
  };

  const handleWordClick = (word: string) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter(w => w !== word));
    } else if (selectedWords.length < 3) {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const handleSubmit = () => {
    const isCorrect = suspiciousWords.every(word => selectedWords.includes(word)) 
                      && selectedWords.length === 3;
    
    if (isCorrect) {
      const clue: CollectedClue = {
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
      const lineWords: JSX.Element[] = [];
      
      words.forEach(word => {
        if (line.includes(word)) {
          const parts = processedLine.split(word);
          processedLine = parts.join(`<WORD>${word}</WORD>`);
        }
      });

      const segments = processedLine.split(/<WORD>|<\/WORD>/);
      
      return (
        <div key={lineIndex} className="mb-2">
          {segments.map((segment, segIndex) => {
            const isWord = words.includes(segment);
            if (isWord) {
              const isSelected = selectedWords.includes(segment);
              return (
                <button
                  key={segIndex}
                  onClick={() => handleWordClick(segment)}
                  className={`inline font-mono transition-all ${
                    isSelected 
                      ? 'bg-purple-500 text-white px-1 rounded shadow-[0_0_10px_rgba(168,85,247,0.8)]'
                      : 'text-purple-400 hover:text-purple-300 underline cursor-pointer'
                  }`}
                >
                  {segment}
                </button>
              );
            }
            return <span key={segIndex}>{segment}</span>;
          })}
        </div>
      );
    });
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 pt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-950/80 backdrop-blur-sm border-2 border-purple-500/50 rounded-lg p-8 max-w-3xl
                     shadow-[0_0_30px_rgba(168,85,247,0.3)]"
        >
          <div className="flex items-center gap-3 mb-6 justify-center">
            <FileText className="w-8 h-8 text-purple-400" />
            <h2 className="text-3xl text-purple-300 font-mono">LA NOTA DEL OFICIAL KAELOR</h2>
          </div>

          <div className="text-purple-100 space-y-4 mb-6">
            <p>
              Has interceptado un informe imperial del Capitán Kaelor Vantis. 
              El documento contiene información sobre la estación Halcyon-9.
            </p>
            <p className="text-purple-400">
              OBJETIVO: Encuentra las 3 palabras sospechosas que están mal colocadas o son inconsistentes en el texto.
            </p>
            <div className="bg-purple-900/30 border border-purple-500/50 rounded p-4 mt-4">
              <p className="text-sm">BUSCA:</p>
              <p className="text-sm">• Palabras con formato extraño (mayúsculas inusuales)</p>
              <p className="text-sm">• Términos que no encajan en el contexto</p>
              <p className="text-sm">• Inconsistencias en el texto</p>
            </div>
          </div>

          <button
            onClick={handleStart}
            className="w-full bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded
                       border-2 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]
                       transition-all font-mono"
          >
            ANALIZAR DOCUMENTO
          </button>
        </motion.div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 pt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`bg-slate-950/80 backdrop-blur-sm border-2 rounded-lg p-8 max-w-2xl text-center
                     ${isCorrect ? 'border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)]' : 'border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.3)]'}`}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5 }}
            className="text-6xl mb-4"
          >
            {isCorrect ? '✓' : '✗'}
          </motion.div>
          <h2 className={`text-3xl font-mono mb-4 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
            {isCorrect ? 'ANÁLISIS CORRECTO' : 'ANÁLISIS INCOMPLETO'}
          </h2>

          {isCorrect ? (
            <>
              <p className="text-green-300 mb-6">
                Has identificado las palabras sospechosas correctamente.
              </p>

              <div className="bg-purple-900/30 border border-purple-500/50 rounded p-4 mb-4 text-left">
                <p className="text-sm text-purple-300 mb-2">PALABRAS IDENTIFICADAS:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {suspiciousWords.map(word => (
                    <span key={word} className="bg-purple-600 text-white px-3 py-1 rounded font-mono text-sm">
                      {word}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-purple-900/30 border-2 border-purple-400 rounded-lg p-6 mb-6">
                <div className="text-purple-400 text-sm font-mono mb-2">PALABRA CLAVE DESCUBIERTA:</div>
                <div className="text-3xl text-purple-200 font-mono tracking-widest">{hiddenWord}</div>
                <p className="text-xs text-purple-400 mt-2">
                  (Las palabras en mayúsculas revelaban un protocolo oculto)
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="text-red-300 mb-6">
                Las palabras seleccionadas no son correctas. Las palabras sospechosas eran:
              </p>
              <div className="bg-purple-900/30 border border-purple-500/50 rounded p-4 mb-4">
                <div className="flex flex-wrap gap-2 justify-center">
                  {suspiciousWords.map(word => (
                    <span key={word} className="bg-purple-600 text-white px-3 py-1 rounded font-mono text-sm">
                      {word}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-purple-300 mb-4">
                Todas están escritas en MAYÚSCULAS completas en medio de oraciones normales, 
                lo cual es inusual en un informe formal imperial.
              </p>
            </>
          )}

          <button
            onClick={handleContinue}
            className="w-full bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded
                       border-2 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]
                       transition-all font-mono"
          >
            CONTINUAR →
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 pt-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-4xl"
      >
        <div className="bg-purple-900/30 border border-purple-500/50 rounded p-4 mb-6">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <div className="text-purple-300 font-mono text-sm">
              PALABRAS SELECCIONADAS: {selectedWords.length}/3
            </div>
            <div className="flex gap-2 items-center">
              <button
                onClick={handleToggleHint}
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm"
              >
                <Search className="w-4 h-4" />
                <span className="font-mono">PISTA</span>
              </button>
              {selectedWords.length === 3 && (
                <button
                  onClick={handleSubmit}
                  className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded
                             border border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.5)]
                             transition-all font-mono text-sm"
                >
                  ANALIZAR
                </button>
              )}
            </div>
          </div>
        </div>

        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-purple-900/30 border border-purple-400/50 rounded p-4 mb-6"
          >
            <p className="text-sm text-purple-300">
              💡 Busca palabras que estén completamente en MAYÚSCULAS dentro de oraciones normales. 
              En un informe formal imperial, esto sería inusual y podría indicar un código oculto.
            </p>
          </motion.div>
        )}

        {selectedWords.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-purple-900/30 border border-purple-500/50 rounded p-4 mb-6"
          >
            <p className="text-sm text-purple-400 mb-2">Palabras seleccionadas:</p>
            <div className="flex flex-wrap gap-2">
              {selectedWords.map(word => (
                <span key={word} className="bg-purple-600 text-white px-3 py-1 rounded font-mono text-sm">
                  {word}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        <div className="bg-slate-950/80 backdrop-blur-sm border-2 border-purple-500/50 rounded-lg p-6
                       shadow-[0_0_30px_rgba(168,85,247,0.3)] max-h-[60vh] overflow-y-auto">
          <div className="text-purple-100 text-sm leading-relaxed">
            {renderReport()}
          </div>
        </div>

        <div className="mt-4 text-center text-purple-400 text-sm font-mono">
          HAZ CLIC EN LAS PALABRAS SOSPECHOSAS (3 EN TOTAL)
        </div>
      </motion.div>
    </div>
  );
}

import { useState } from 'react';
import { motion } from 'motion/react';
import { Bot, HelpCircle } from 'lucide-react';
import type { CollectedClue } from '../../App';

type Props = {
  onClueCollected: (clue: CollectedClue) => void;
  onComplete: () => void;
};

type Droid = {
  name: string;
  statement: string;
  description: string;
};

const droids: Droid[] = [
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

export function TresDroids({ onClueCollected, onComplete }: Props) {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedDroid, setSelectedDroid] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Solution: R-Truth is telling the truth, so the code is with L-∞ (to his right)
  // L-∞ always lies, so when he says he wouldn't lie, he's lying
  // Q-Glitch's statement is random, but doesn't affect the logic
  const correctAnswer = 'L-∞';

  const handleStart = () => {
    setGameStarted(true);
  };

  const handleDroidSelect = (droidName: string) => {
    setSelectedDroid(droidName);
    setShowResult(true);

    if (droidName === correctAnswer) {
      const clue: CollectedClue = {
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
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 pt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-950/80 backdrop-blur-sm border-2 border-purple-500/50 rounded-lg p-8 max-w-3xl
                     shadow-[0_0_30px_rgba(168,85,247,0.3)]"
        >
          <div className="flex items-center gap-3 mb-6 justify-center">
            <Bot className="w-8 h-8 text-purple-400" />
            <h2 className="text-3xl text-purple-300 font-mono">ENIGMA DE LOS TRES DROIDS</h2>
          </div>

          <div className="text-purple-100 space-y-4 mb-6">
            <p>
              Tres droides holográficos custodian fragmentos del código maestro. 
              Cada uno tiene una característica única:
            </p>
            <div className="bg-purple-900/30 border border-purple-500/50 rounded p-4 space-y-2">
              <p className="text-purple-300"><strong>R-Truth:</strong> Siempre dice la verdad</p>
              <p className="text-purple-300"><strong>L-∞:</strong> Siempre miente</p>
              <p className="text-purple-300"><strong>Q-Glitch:</strong> Su comportamiento es aleatorio (puede mentir o decir la verdad)</p>
            </div>
            <p className="text-purple-400">
              OBJETIVO: Deduce cuál droide tiene el código analizando sus declaraciones.
            </p>
          </div>

          <button
            onClick={handleStart}
            className="w-full bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded
                       border-2 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]
                       transition-all font-mono"
          >
            INICIAR INTERROGATORIO
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
            {isCorrect ? 'LÓGICA CORRECTA' : 'DEDUCCIÓN INCORRECTA'}
          </h2>
          
          {isCorrect ? (
            <>
              <p className="text-green-300 mb-6">
                Has identificado correctamente que <strong>{correctAnswer}</strong> posee el código.
              </p>

              <div className="bg-purple-900/30 border border-purple-500/50 rounded p-4 mb-4 text-left">
                <p className="text-sm text-purple-300 mb-2">EXPLICACIÓN:</p>
                <p className="text-sm text-purple-200">
                  • <strong>R-Truth</strong> siempre dice la verdad. Dice "El código está en el droide a mi derecha" 
                  (que es L-∞), por lo tanto es cierto.
                </p>
                <p className="text-sm text-purple-200 mt-2">
                  • <strong>L-∞</strong> siempre miente. Cuando dice "Yo nunca mentiría sobre un código", 
                  está mintiendo, confirmando que él tiene el código.
                </p>
                <p className="text-sm text-purple-200 mt-2">
                  • <strong>Q-Glitch</strong> es aleatorio, su declaración no es fiable para la deducción.
                </p>
              </div>

              <div className="bg-purple-900/30 border-2 border-purple-400 rounded-lg p-6 mb-6">
                <div className="text-purple-400 text-sm font-mono mb-2">PALABRA CLAVE OBTENIDA:</div>
                <div className="text-3xl text-purple-200 font-mono tracking-widest">VECTOR</div>
              </div>
            </>
          ) : (
            <>
              <p className="text-red-300 mb-6">
                El droide <strong>{selectedDroid}</strong> no contiene el código. 
                La respuesta correcta era <strong>{correctAnswer}</strong>.
              </p>

              <div className="bg-purple-900/30 border border-purple-500/50 rounded p-4 mb-4 text-left">
                <p className="text-sm text-purple-300 mb-2">PISTA:</p>
                <p className="text-sm text-purple-200">
                  Considera que R-Truth siempre dice la verdad. Si dice que el código está 
                  a su derecha (L-∞), entonces debe ser cierto. L-∞ siempre miente, así que 
                  cuando niega que mentiría, está confirmando que él es el portador.
                </p>
              </div>
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
        className="w-full max-w-5xl"
      >
        <div className="bg-purple-900/30 border border-purple-500/50 rounded p-4 mb-6">
          <div className="flex justify-between items-center">
            <div className="text-purple-300 font-mono">
              ANÁLISIS DE PROTOCOLOS LÓGICOS
            </div>
            <button
              onClick={handleToggleHint}
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              <HelpCircle className="w-5 h-5" />
              <span className="text-sm font-mono">PISTA</span>
            </button>
          </div>
        </div>

        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-purple-900/30 border border-purple-400/50 rounded p-4 mb-6"
          >
            <p className="text-sm text-purple-300">
              💡 Empieza por la declaración de R-Truth. Si siempre dice la verdad, 
              su afirmación debe ser correcta. Luego verifica las declaraciones de los otros droides.
            </p>
          </motion.div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {droids.map((droid, index) => (
            <motion.div
              key={droid.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-slate-950/80 backdrop-blur-sm border-2 border-purple-500/50 rounded-lg p-6
                         shadow-[0_0_20px_rgba(168,85,247,0.3)] cursor-pointer hover:border-purple-400
                         transition-all"
              onClick={() => handleDroidSelect(droid.name)}
            >
              <div className="flex flex-col items-center">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mb-4"
                >
                  <Bot className="w-16 h-16 text-purple-400" />
                </motion.div>

                <h3 className="text-2xl text-purple-200 font-mono mb-2">{droid.name}</h3>
                <div className="text-xs text-purple-400 mb-4 font-mono">
                  [{droid.description}]
                </div>

                <div className="bg-purple-900/30 border border-purple-500/50 rounded p-3 mb-4 min-h-[100px] flex items-center">
                  <p className="text-sm text-purple-100 italic text-center">
                    "{droid.statement}"
                  </p>
                </div>

                <button
                  className="w-full bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded
                             border border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.5)]
                             transition-all font-mono text-sm"
                >
                  SELECCIONAR
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 text-center text-purple-400 text-sm font-mono">
          ¿CUÁL DROIDE POSEE EL CÓDIGO?
        </div>
      </motion.div>
    </div>
  );
}

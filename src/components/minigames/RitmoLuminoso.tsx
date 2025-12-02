import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Music, Circle } from 'lucide-react';
import type { CollectedClue } from '../../App';

type Props = {
  onClueCollected: (clue: CollectedClue) => void;
  onComplete: () => void;
};

type RhythmCircle = {
  id: number;
  x: number;
  y: number;
  targetTime: number;
  hit: boolean | null; // null = not hit yet, true = hit, false = missed
};

export function RitmoLuminoso({ onClueCollected, onComplete }: Props) {
  const [gameStarted, setGameStarted] = useState(false);
  const [circles, setCircles] = useState<RhythmCircle[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  const totalCircles = 20;
  const successThreshold = 0.85; // 85%

  useEffect(() => {
    if (!gameStarted) return;

    // Generate rhythm pattern
    const pattern: RhythmCircle[] = [];
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
    if (!gameStarted || gameEnded) return;

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
        const clue: CollectedClue = {
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

  const handleCircleClick = (circleId: number) => {
    setCircles(prev => {
      return prev.map(circle => {
        if (circle.id === circleId && circle.hit === null) {
          const timeDiff = Math.abs(currentTime - circle.targetTime);
          if (timeDiff < 0.3) {
            setHits(h => h + 1);
            return { ...circle, hit: true };
          } else {
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
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 pt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-950/80 backdrop-blur-sm border-2 border-purple-500/50 rounded-lg p-8 max-w-2xl
                     shadow-[0_0_30px_rgba(168,85,247,0.3)]"
        >
          <div className="flex items-center gap-3 mb-6 justify-center">
            <Music className="w-8 h-8 text-purple-400" />
            <h2 className="text-3xl text-purple-300 font-mono">RITMO DEL LADO LUMINOSO</h2>
          </div>

          <div className="text-purple-100 space-y-4 mb-6">
            <p>El firewall imperial responde a patrones rítmicos de la Marcha Imperial.</p>
            <p className="text-purple-400">
              OBJETIVO: Toca los círculos holográficos cuando brillen. Precisión mínima: 85%
            </p>
            <div className="bg-purple-900/30 border border-purple-500/50 rounded p-4 mt-4">
              <p className="text-sm">INSTRUCCIONES:</p>
              <p className="text-sm">• Los círculos aparecerán en el área de juego</p>
              <p className="text-sm">• Haz clic cuando el círculo esté más brillante</p>
              <p className="text-sm">• El timing es crucial</p>
            </div>
          </div>

          <button
            onClick={handleStart}
            className="w-full bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded
                       border-2 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]
                       transition-all font-mono"
          >
            INICIAR SECUENCIA
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
            {success ? 'SECUENCIA COMPLETADA' : 'SECUENCIA FALLIDA'}
          </h2>
          <div className="text-purple-300 mb-6">
            <p>Precisión: {accuracy.toFixed(1)}%</p>
            <p>Aciertos: {hits} / Fallos: {misses}</p>
          </div>

          {success && (
            <div className="bg-purple-900/30 border-2 border-purple-400 rounded-lg p-6 mb-6">
              <div className="text-purple-400 text-sm font-mono mb-2">PALABRA EN AUREBESH OBTENIDA:</div>
              <div className="text-3xl text-purple-200 font-mono tracking-widest mb-2">RELAY</div>
              <div className="text-sm text-purple-400">
                (Texto en alfabeto Aurebesh: Sistema de Relé)
              </div>
            </div>
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
        <div className="bg-purple-900/30 border border-purple-500/50 rounded p-4 mb-4">
          <div className="flex justify-between items-center">
            <div className="text-purple-300 font-mono">
              ACIERTOS: {hits} | FALLOS: {misses}
            </div>
            <div className="text-purple-300 font-mono">
              PRECISIÓN: {accuracy.toFixed(0)}%
            </div>
          </div>
        </div>

        <div
          className="relative w-full aspect-square bg-slate-950 border-2 border-purple-500 rounded-lg
                     overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.4)]"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        >
          {circles.map(circle => {
            const isActive = currentTime >= circle.targetTime - 0.5 && currentTime <= circle.targetTime + 0.5;
            const isPerfectTiming = Math.abs(currentTime - circle.targetTime) < 0.1;
            const shouldShow = currentTime >= circle.targetTime - 0.5 && circle.hit === null;

            if (!shouldShow && circle.hit === null) return null;

            return (
              <motion.div
                key={circle.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: circle.hit === null ? (isPerfectTiming ? 1.2 : 1) : 0,
                  opacity: circle.hit === null ? 1 : 0
                }}
                style={{
                  left: `${circle.x}%`,
                  top: `${circle.y}%`
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => handleCircleClick(circle.id)}
              >
                <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center
                               ${isActive ? 'border-purple-400 bg-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.8)]' : 'border-purple-700 bg-purple-900/20'}
                               ${circle.hit === true ? 'border-green-400' : circle.hit === false ? 'border-red-400' : ''}`}>
                  <Circle className={`w-8 h-8 ${isActive ? 'text-purple-300' : 'text-purple-700'}`} />
                </div>
                
                {isPerfectTiming && circle.hit === null && (
                  <motion.div
                    animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="absolute inset-0 rounded-full border-2 border-purple-400"
                  />
                )}

                {circle.hit !== null && (
                  <motion.div
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  >
                    <div className={`text-2xl ${circle.hit ? 'text-green-400' : 'text-red-400'}`}>
                      {circle.hit ? '✓' : '✗'}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="mt-4 text-center">
          <div className="text-purple-400 text-sm font-mono">
            HAZ CLIC EN LOS CÍRCULOS CUANDO BRILLEN
          </div>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="mt-2 text-purple-300 text-xs font-mono"
          >
            SINCRONIZACIÓN: {currentTime.toFixed(1)}s / 10.0s
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
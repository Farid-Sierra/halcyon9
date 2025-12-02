import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Target, Zap } from 'lucide-react';
import type { CollectedClue } from '../../App';

type Props = {
  onClueCollected: (clue: CollectedClue) => void;
  onComplete: () => void;
};

type Enemy = {
  id: number;
  x: number;
  y: number;
  destroyed: boolean;
  isBoss?: boolean;
};

type Bullet = {
  id: number;
  x: number;
  y: number;
  fromEnemy?: boolean;
};

export function SablesInvaders({ onClueCollected, onComplete }: Props) {
  const [playerX, setPlayerX] = useState(50);
  const [playerLives, setPlayerLives] = useState(3);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [explosions, setExplosions] = useState<{ x: number; y: number; id: number }[]>([]);
  const bulletIdRef = useRef(0);
  const enemyMoveDirection = useRef(1);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const [wave, setWave] = useState(1);

  // Inicializa enemigos y oleadas
  const initEnemies = (waveNumber: number) => {
    const initialEnemies: Enemy[] = [];
    const baseCount = 4 + waveNumber; // Cada wave aumenta enemigos
    const rows = Math.min(4, baseCount);
    const cols = Math.min(6, baseCount + 2);

    for (let i = 0; i < rows * cols; i++) {
      initialEnemies.push({
        id: i,
        x: (i % cols) * 14 + 10,
        y: Math.floor(i / cols) * 12 + 8,
        destroyed: false,
      });
    }

    // Boss en la última oleada
    if (waveNumber === 5) {
      initialEnemies.push({
        id: 999,
        x: 50,
        y: 5,
        destroyed: false,
        isBoss: true,
      });
    }

    setEnemies(initialEnemies);
  };

  useEffect(() => {
    if (gameStarted) {
      initEnemies(1);
    }
  }, [gameStarted]);

  // Controles del jugador
  useEffect(() => {
    if (!gameStarted || showResult) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setPlayerX(prev => Math.max(5, prev - 5));
      } else if (e.key === 'ArrowRight') {
        setPlayerX(prev => Math.min(95, prev + 5));
      } else if (e.key === ' ') {
        e.preventDefault();
        shoot(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted, showResult, playerX]);

  // Movimiento de enemigos y disparos enemigos
  useEffect(() => {
    if (!gameStarted || showResult) return;

    const interval = setInterval(() => {
      setBullets(prev =>
        prev
          .map(b => ({ ...b, y: b.fromEnemy ? b.y + (b.fromEnemy ? 2 : 3) : b.y - 3 }))
          .filter(b => b.y > 0 && b.y < 100)
      );

      setEnemies(prev => {
        const active = prev.filter(e => !e.destroyed);
        if (active.length === 0) return prev;

        const leftMost = Math.min(...active.map(e => e.x));
        const rightMost = Math.max(...active.map(e => e.x));

        let newDir = enemyMoveDirection.current;
        if (rightMost >= 95 && enemyMoveDirection.current > 0) newDir = -1;
        if (leftMost <= 5 && enemyMoveDirection.current < 0) newDir = 1;
        enemyMoveDirection.current = newDir;

        // Disparo enemigo aleatorio
        active.forEach(enemy => {
          if (Math.random() < 0.005 * (enemy.isBoss ? 3 : 1)) {
            shoot(true, enemy.x, enemy.y);
          }
        });

        return prev.map(e => ({
          ...e,
          x: e.destroyed ? e.x : e.x + newDir * 0.3,
          y: e.destroyed ? e.y : e.y + (e.isBoss ? 0 : 0.05),
        }));
      });
    }, 50);

    return () => clearInterval(interval);
  }, [gameStarted, showResult]);

  // Detectar colisiones
  useEffect(() => {
    if (!gameStarted || showResult) return;

    // Balas del jugador vs enemigos
    bullets.forEach(bullet => {
      if (bullet.fromEnemy) return;
      enemies.forEach(enemy => {
        if (!enemy.destroyed) {
          const dist = Math.sqrt(Math.pow(bullet.x - enemy.x, 2) + Math.pow(bullet.y - enemy.y, 2));
          if (dist < (enemy.isBoss ? 5 : 3)) {
            setEnemies(prev => prev.map(e => e.id === enemy.id ? { ...e, destroyed: true } : e));
            setBullets(prev => prev.filter(b => b.id !== bullet.id));
            setScore(prev => prev + 1);
            setExplosions(prev => [...prev, { x: enemy.x, y: enemy.y, id: Date.now() }]);
          }
        }
      });
    });

    // Balas enemigas vs jugador
    bullets.forEach(bullet => {
      if (!bullet.fromEnemy) return;
      const dist = Math.abs(bullet.x - playerX);
      if (bullet.y >= 80 && dist < 5) {
        setBullets(prev => prev.filter(b => b.id !== bullet.id));
        setPlayerLives(prev => prev - 1);
        setExplosions(prev => [...prev, { x: playerX, y: 85, id: Date.now() }]);
      }
    });
  }, [bullets, enemies, playerX]);

  // Explosiones temporales
  useEffect(() => {
    if (explosions.length === 0) return;
    const timeout = setTimeout(() => {
      setExplosions(prev => prev.slice(1));
    }, 300);
    return () => clearTimeout(timeout);
  }, [explosions]);

  // Cambiar oleada o terminar juego
  useEffect(() => {
    if (score >= wave * 10 && wave < 5) {
      setWave(prev => prev + 1);
      initEnemies(wave + 1);
    } else if (score >= 50 && !showResult) {
      setShowResult(true);
      const clue: CollectedClue = {
        id: 'coordinates',
        value: '12-7-3-9',
        type: 'coordinate',
        label: 'COORD'
      };
      onClueCollected(clue);
    }
  }, [score, wave, showResult, onClueCollected]);

  // Muerte del jugador
  useEffect(() => {
    if (playerLives <= 0) setShowResult(true);
  }, [playerLives]);

  const shoot = (fromEnemy = false, x?: number, y?: number) => {
    const newBullet: Bullet = {
      id: bulletIdRef.current++,
      x: x ?? playerX,
      y: y ?? 85,
      fromEnemy
    };
    setBullets(prev => [...prev, newBullet]);
  };

  const handleStart = () => {
    setGameStarted(true);
  };

  const handleContinue = () => {
    onComplete();
  };

  // --- SCREENS START & RESULT OMITIDAS, las mantienes igual ---

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 pt-24">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-4xl">
        {/* HUD */}
        <div className="bg-purple-900/30 border border-purple-500/50 rounded p-4 mb-4 flex justify-between items-center">
          <div className="text-purple-300 font-mono">
            NAVES DESTRUIDAS: {score}/50
          </div>
          <div className="flex gap-2">
            <Zap className="w-5 h-5 text-purple-400" />
            <span className="text-purple-300 font-mono">VIDAS: {playerLives}</span>
          </div>
        </div>

        {/* GAME AREA */}
        <div
          ref={gameAreaRef}
          className="relative w-full aspect-[4/3] bg-slate-950 border-2 border-purple-500 rounded-lg overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.4)]"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        >
          {/* Player */}
          <motion.div
            style={{ left: `${playerX}%` }}
            className="absolute bottom-2 -translate-x-1/2 transition-all duration-100"
          >
            <svg width="40" height="40" viewBox="0 0 40 40" className="drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">
              <path d="M20 20 L10 10 L8 12 L18 22 Z" fill="#a78bfa" />
              <path d="M20 20 L30 10 L32 12 L22 22 Z" fill="#a78bfa" />
              <path d="M20 20 L10 30 L8 28 L18 18 Z" fill="#a78bfa" />
              <path d="M20 20 L30 30 L32 28 L22 18 Z" fill="#a78bfa" />
              <ellipse cx="20" cy="20" rx="4" ry="8" fill="#c4b5fd" />
              <rect x="18" y="12" width="4" height="16" fill="#e9d5ff" />
              <circle cx="20" cy="18" r="2" fill="#60a5fa" opacity="0.8" />
              <ellipse cx="20" cy="32" rx="3" ry="2" fill="#3b82f6" opacity="0.6" />
            </svg>
          </motion.div>

          {/* Bullets */}
          {bullets.map(b => (
            <div key={b.id} style={{ left: `${b.x}%`, top: `${b.y}%` }} className="absolute -translate-x-1/2">
              <div className="relative">
                <div
                  className={`w-2 h-6 rounded-full shadow-[0_0_15px_rgba(168,85,247,1)] ${
                    b.fromEnemy
                      ? 'bg-red-500'
                      : 'bg-gradient-to-t from-purple-400 to-purple-200'
                  }`}
                />
                <div className="absolute inset-0 w-1 h-6 bg-white opacity-60 rounded-full mx-auto" />
              </div>
            </div>
          ))}

          {/* Enemies */}
          {enemies.map(enemy => !enemy.destroyed && (
            <motion.div
              key={enemy.id}
              style={{ left: `${enemy.x}%`, top: `${enemy.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
            >
              <svg width={enemy.isBoss ? "48" : "32"} height={enemy.isBoss ? "48" : "32"} viewBox="0 0 32 32" className="drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">
                <rect x="2" y="8" width="8" height="16" fill={enemy.isBoss ? "#f87171" : "#ef4444"} opacity="0.8" />
                <rect x="22" y="8" width="8" height="16" fill={enemy.isBoss ? "#f87171" : "#ef4444"} opacity="0.8" />
                <circle cx="16" cy="16" r={enemy.isBoss ? 6 : 4} fill="#991b1b" stroke={enemy.isBoss ? "#f87171" : "#ef4444"} strokeWidth="1" />
                <circle cx="16" cy="16" r={enemy.isBoss ? 3 : 2} fill="#7f1d1d" />
              </svg>
            </motion.div>
          ))}

          {/* Explosions */}
          {explosions.map(exp => (
            <motion.div
              key={exp.id}
              style={{ left: `${exp.x}%`, top: `${exp.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.8, 0] }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-6 h-6 rounded-full bg-yellow-400/80 shadow-[0_0_15px_rgba(251,191,36,0.8)]" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Target, Zap } from 'lucide-react';

export function SablesInvaders({ onClueCollected, onComplete }) {
  const [playerX, setPlayerX] = useState(50);
  const [playerLives, setPlayerLives] = useState(3);
  const [enemies, setEnemies] = useState([]);
  const [bullets, setBullets] = useState([]);
  const [enemyBullets, setEnemyBullets] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [wave, setWave] = useState(1);
  const [explosions, setExplosions] = useState([]);
  const bulletIdRef = useRef(0);
  const enemyBulletIdRef = useRef(0);
  const enemyMoveDirection = useRef(1);
  const gameAreaRef = useRef(null);

  // Initialize enemies for each wave
  const initWave = (waveNumber) => {
    const initialEnemies = [];
    if (waveNumber < 5) {
      for (let i = 0; i < 24; i++) {
        initialEnemies.push({
          id: i,
          x: (i % 6) * 14 + 15,
          y: Math.floor(i / 6) * 12 + 8,
          destroyed: false,
        });
      }
    } else {
      // Boss wave
      initialEnemies.push({
        id: 999,
        x: 50,
        y: 10,
        destroyed: false,
        boss: true,
      });
    }
    setEnemies(initialEnemies);
  };

  useEffect(() => {
    if (gameStarted) initWave(wave);
  }, [gameStarted, wave]);

  // Player movement and shooting
  useEffect(() => {
    if (!gameStarted || showResult) return;
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') setPlayerX(prev => Math.max(5, prev - 5));
      else if (e.key === 'ArrowRight') setPlayerX(prev => Math.min(95, prev + 5));
      else if (e.key === ' ') {
        e.preventDefault();
        shoot();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted, showResult]);

  // Main game loop
  useEffect(() => {
    if (!gameStarted || showResult) return;

    const loop = setInterval(() => {
      // Move player bullets
      setBullets(prev => prev.map(b => ({ ...b, y: b.y - 3 })).filter(b => b.y > 0));

      // Move enemy bullets
      setEnemyBullets(prev => prev.map(b => ({ ...b, y: b.y + 2 })).filter(b => b.y < 100));

      // Move enemies
      setEnemies(prev => {
        const active = prev.filter(e => !e.destroyed);
        if (active.length === 0) return prev;

        const leftMost = Math.min(...active.map(e => e.x));
        const rightMost = Math.max(...active.map(e => e.x));
        let dir = enemyMoveDirection.current;
        if (rightMost >= 95 && dir > 0) dir = -1;
        else if (leftMost <= 5 && dir < 0) dir = 1;
        enemyMoveDirection.current = dir;

        return prev.map(e => ({
          ...e,
          x: e.destroyed ? e.x : e.x + dir * 0.3,
          y: e.destroyed ? e.y : e.y + (e.boss ? 0 : 0.05),
        }));
      });

      // Enemy shooting
      setEnemies(prev => {
        prev.forEach(enemy => {
          if (!enemy.destroyed && Math.random() < 0.02) {
            setEnemyBullets(ePrev => [
              ...ePrev,
              { id: enemyBulletIdRef.current++, x: enemy.x, y: enemy.y + 5 }
            ]);
          }
        });
        return prev;
      });

      // Collision detection
      // Player bullets hitting enemies
      setEnemies(prevEnemies => {
        let updated = [...prevEnemies];
        bullets.forEach(bullet => {
          updated.forEach(enemy => {
            if (!enemy.destroyed) {
              const distance = Math.hypot(bullet.x - enemy.x, bullet.y - enemy.y);
              if (distance < 3) {
                updated = updated.map(e => e.id === enemy.id ? { ...e, destroyed: true } : e);
                setBullets(prev => prev.filter(b => b.id !== bullet.id));
                setScore(prev => prev + (enemy.boss ? 5 : 1));
                addExplosion(enemy.x, enemy.y);
              }
            }
          });
        });
        return updated;
      });

      // Enemy bullets hitting player
      setEnemyBullets(prev => {
        let updated = [...prev];
        updated.forEach(bullet => {
          if (Math.abs(bullet.x - playerX) < 3 && bullet.y > 80) {
            updated = updated.filter(b => b.id !== bullet.id);
            setPlayerLives(prev => Math.max(0, prev - 1));
            addExplosion(playerX, 90);
          }
        });
        return updated;
      });

      // Check wave completion
      const remaining = enemies.filter(e => !e.destroyed);
      if (remaining.length === 0 && wave < 5) setWave(prev => prev + 1);
      if (remaining.length === 0 && wave >= 5) completeGame();

      // Check for player defeat
      if (playerLives <= 0) setShowResult(true);
    }, 50);

    return () => clearInterval(loop);
  }, [gameStarted, showResult, bullets, enemies, playerX, playerLives, wave]);

  const addExplosion = (x, y) => {
    const id = Date.now() + Math.random();
    setExplosions(prev => [...prev, { id, x, y }]);
    setTimeout(() => setExplosions(prev => prev.filter(e => e.id !== id)), 300);
  };

  const shoot = () => {
    if (!gameAreaRef.current) return;
    const gameHeight = gameAreaRef.current.clientHeight;
    const startY = (gameHeight - 40) / gameHeight * 100;
    setBullets(prev => [...prev, { id: bulletIdRef.current++, x: playerX, y: startY }]);
  };

  const handleStart = () => setGameStarted(true);
  const completeGame = () => {
    setShowResult(true);
    const clue = { id: 'coordinates', value: '12-7-3-9', type: 'coordinate', label: 'COORD' };
    onClueCollected(clue);
  };
  const handleContinue = () => onComplete();

  // Render
  if (!gameStarted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 pt-24">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-slate-950/80 backdrop-blur-sm border-2 border-purple-500/50 rounded-lg p-8 max-w-2xl shadow-[0_0_30px_rgba(168,85,247,0.3)]">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <Target className="w-8 h-8 text-purple-400" />
            <h2 className="text-3xl text-purple-300 font-mono">SABLES INVADERS</h2>
          </div>
          <div className="text-purple-100 space-y-4 mb-6">
            <p>Naves TIE imperiales se aproximan a la estación.</p>
            <p className="text-purple-400">OBJETIVO: Destruir 10 naves para obtener las coordenadas de acceso.</p>
            <div className="bg-purple-900/30 border border-purple-500/50 rounded p-4 mt-4">
              <p className="text-sm">CONTROLES:</p>
              <p className="text-sm">← → : Mover nave</p>
              <p className="text-sm">ESPACIO : Disparar</p>
            </div>
          </div>
          <button onClick={handleStart} className="w-full bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded border-2 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all font-mono">INICIAR MISIÓN</button>
        </motion.div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 pt-24">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-slate-950/80 backdrop-blur-sm border-2 border-green-500/50 rounded-lg p-8 max-w-2xl shadow-[0_0_30px_rgba(34,197,94,0.3)] text-center">
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5 }} className="text-6xl mb-4">✓</motion.div>
          <h2 className="text-3xl text-green-400 font-mono mb-4">MISIÓN COMPLETADA</h2>
          <p className="text-green-300 mb-6">Naves TIE neutralizadas</p>
          <div className="bg-purple-900/30 border-2 border-purple-400 rounded-lg p-6 mb-6">
            <div className="text-purple-400 text-sm font-mono mb-2">COORDENADAS OBTENIDAS:</div>
            <div className="text-3xl text-purple-200 font-mono tracking-widest">12-7-3-9</div>
          </div>
          <button onClick={handleContinue} className="w-full bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded border-2 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all font-mono">CONTINUAR →</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 pt-24">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-4xl">
        {/* HUD */}
        <div className="bg-purple-900/30 border border-purple-500/50 rounded p-4 mb-4">
          <div className="flex justify-between items-center">
            <div className="text-purple-300 font-mono">NAVES DESTRUIDAS: {score}/10</div>
            <div className="flex gap-4">
              <div className="flex gap-1 items-center text-purple-300 font-mono">
                <Zap className="w-5 h-5 text-purple-400" /> ENERGÍA: 100%
              </div>
              <div className="text-purple-300 font-mono">VIDAS: {playerLives}</div>
            </div>
          </div>
        </div>

        {/* Game Area */}
        <div ref={gameAreaRef} className="relative w-full aspect-[4/3] bg-slate-950 border-2 border-purple-500 rounded-lg overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.4)]"
          style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
        >
          {/* Player */}
          <motion.div style={{ left: `${playerX}%` }} className="absolute bottom-2 -translate-x-1/2 transition-all duration-100">
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

          {/* Player bullets */}
          {bullets.map(bullet => (
            <div key={bullet.id} style={{ left: `${bullet.x}%`, top: `${bullet.y}%` }} className="absolute -translate-x-1/2">
              <div className="relative">
                <div className="w-2 h-6 bg-gradient-to-t from-purple-400 to-purple-200 rounded-full shadow-[0_0_15px_rgba(168,85,247,1)]" />
                <div className="absolute inset-0 w-1 h-6 bg-white opacity-60 rounded-full mx-auto" />
              </div>
            </div>
          ))}

          {/* Enemy bullets */}
          {enemyBullets.map(bullet => (
            <div key={bullet.id} style={{ left: `${bullet.x}%`, top: `${bullet.y}%` }} className="absolute -translate-x-1/2">
              <div className="w-2 h-6 bg-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,1)]" />
            </div>
          ))}

          {/* Enemies */}
          {enemies.map(enemy => (!enemy.destroyed && (
            <motion.div key={enemy.id} style={{ left: `${enemy.x}%`, top: `${enemy.y}%` }} animate={enemy.destroyed ? { scale: 0, opacity: 0 } : {}} className="absolute -translate-x-1/2 -translate-y-1/2">
              <svg width={enemy.boss ? 64 : 32} height={enemy.boss ? 64 : 32} viewBox="0 0 32 32" className="drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">
                <rect x="2" y="8" width="8" height="16" fill="#ef4444" opacity="0.8" />
                <rect x="22" y="8" width="8" height="16" fill="#ef4444" opacity="0.8" />
                <line x1="2" y1="12" x2="10" y2="12" stroke="#dc2626" strokeWidth="0.5" />
                <line x1="2" y1="16" x2="10" y2="16" stroke="#dc2626" strokeWidth="0.5" />
                <line x1="2" y1="20" x2="10" y2="20" stroke="#dc2626" strokeWidth="0.5" />
                <line x1="22" y1="12" x2="30" y2="12" stroke="#dc2626" strokeWidth="0.5" />
                <line x1="22" y1="16" x2="30" y2="16" stroke="#dc2626" strokeWidth="0.5" />
                <line x1="22" y1="20" x2="30" y2="20" stroke="#dc2626" strokeWidth="0.5" />
                <circle cx="16" cy="16" r="6" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1" />
                <circle cx="16" cy="16" r="4" fill="#991b1b" />
                <circle cx="16" cy="15" r="2" fill="#fca5a5" opacity="0.6" />
                <rect x="10" y="14" width="4" height="4" fill="#7f1d1d" />
                <rect x="18" y="14" width="4" height="4" fill="#7f1d1d" />
              </svg>
            </motion.div>
          )))}

          {/* Explosions */}
          {explosions.map(exp => (
            <motion.div key={exp.id} style={{ left: `${exp.x}%`, top: `${exp.y}%` }} animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 0] }} transition={{ duration: 0.3 }} className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 bg-yellow-400 rounded-full" />
          ))}
        </div>

        <div className="mt-4 text-center text-purple-400 text-sm font-mono">USA ← → PARA MOVER Y ESPACIO PARA DISPARAR</div>
      </motion.div>
    </div>
  );
}

import { motion } from 'motion/react';
import { Lock, Activity, AlertTriangle, Wifi, Shield } from 'lucide-react';
import logoImage from "../assets/logo.png";

export function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/80 to-slate-900 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Perspective floor grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute bottom-0 left-0 right-0 h-[60%] opacity-20"
          style={{
            background: 'linear-gradient(to top, transparent, rgba(139, 92, 246, 0.1))',
            transform: 'perspective(800px) rotateX(60deg)',
            transformOrigin: 'bottom',
          }}
        >
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(139, 92, 246, 0.4) 2px, transparent 2px),
                linear-gradient(90deg, rgba(139, 92, 246, 0.4) 2px, transparent 2px)
              `,
              backgroundSize: '80px 80px',
            }}
          />
        </div>
      </div>

      {/* Side panels with consoles */}
      <div className="absolute left-4 top-1/4 bottom-1/4 w-32 opacity-30 pointer-events-none hidden lg:block">
        <div className="w-full h-full bg-gradient-to-r from-purple-900/50 to-transparent border-l-2 border-cyan-500/30 p-3">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="mb-2 h-8 bg-cyan-900/20 border border-cyan-500/30 rounded" />
          ))}
        </div>
      </div>
      <div className="absolute right-4 top-1/4 bottom-1/4 w-32 opacity-30 pointer-events-none hidden lg:block">
        <div className="w-full h-full bg-gradient-to-l from-purple-900/50 to-transparent border-r-2 border-cyan-500/30 p-3">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="mb-2 h-8 bg-cyan-900/20 border border-cyan-500/30 rounded" />
          ))}
        </div>
      </div>

      {/* Purple neon lights */}
      <div className="absolute top-10 left-10 w-2 h-64 bg-gradient-to-b from-purple-500 to-transparent opacity-40 blur-sm" />
      <div className="absolute top-10 right-10 w-2 h-64 bg-gradient-to-b from-purple-500 to-transparent opacity-40 blur-sm" />
      <div className="absolute bottom-20 left-20 w-2 h-48 bg-gradient-to-t from-cyan-400 to-transparent opacity-40 blur-sm" />
      <div className="absolute bottom-20 right-20 w-2 h-48 bg-gradient-to-t from-cyan-400 to-transparent opacity-40 blur-sm" />

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight,
            opacity: 0 
          }}
          animate={{ 
            opacity: [0, 1, 0],
            y: [null, Math.random() * window.innerHeight]
          }}
          transition={{ 
            duration: 3 + Math.random() * 3, 
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center z-10 max-w-6xl w-full"
      >
        {/* Top header with corner accents */}
        <div className="relative mb-8">
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-400/50" />
          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-cyan-400/50" />
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-cyan-400 font-mono mb-2"
          >
            Escuadrón Sable Púppra – Acceso restringido / Nivel Omega
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl mb-2 text-white tracking-wider"
            style={{ 
              textShadow: '0 0 20px rgba(168, 85, 247, 0.8), 0 0 40px rgba(168, 85, 247, 0.4)'
            }}
          >
            ENIGMA ROOM:
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-3xl md:text-5xl lg:text-6xl text-white tracking-widest"
            style={{ 
              textShadow: '0 0 20px rgba(168, 85, 247, 0.8), 0 0 40px rgba(168, 85, 247, 0.4)'
            }}
          >
            PROTOCOLO HALCYON-9
          </motion.h2>
        </div>

        {/* 3D Hologram Platform */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="relative mb-12 mx-auto max-w-2xl"
        >
          {/* Hologram platform base */}
          <div className="relative h-80 flex items-center justify-center">
            {/* Platform ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute bottom-0 w-80 h-12 rounded-full border-2 border-cyan-400/30"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(34, 211, 238, 0.2) 0%, transparent 70%)',
                boxShadow: '0 0 40px rgba(34, 211, 238, 0.3), inset 0 0 20px rgba(34, 211, 238, 0.2)'
              }}
            />

            {/* Holographic station - simplified 3D representation */}
            <motion.div
              animate={{ 
                rotateY: 360,
                y: [0, -10, 0]
              }}
              transition={{ 
                rotateY: { duration: 20, repeat: Infinity, ease: 'linear' },
                y: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
              }}
              className="relative"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Central core */}
              <div className="relative w-32 h-40">
                <div 
                  className="absolute inset-0 bg-gradient-to-b from-cyan-400/40 to-cyan-600/40 rounded-lg"
                  style={{
                    boxShadow: '0 0 40px rgba(34, 211, 238, 0.6), inset 0 0 20px rgba(34, 211, 238, 0.3)',
                    border: '2px solid rgba(34, 211, 238, 0.5)'
                  }}
                />
                {/* Core details */}
                {[...Array(6)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute left-0 right-0 h-1 bg-cyan-300/50"
                    style={{ top: `${20 + i * 12}%` }}
                  />
                ))}
              </div>

              {/* Station arms/wings */}
              {[0, 90, 180, 270].map((rotation, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-32 h-4"
                  style={{
                    transform: `translate(-50%, -50%) rotateZ(${rotation}deg) translateX(60px)`,
                    transformOrigin: 'left center'
                  }}
                >
                  <div 
                    className="w-full h-full bg-gradient-to-r from-cyan-500/60 to-transparent rounded"
                    style={{
                      boxShadow: '0 0 20px rgba(34, 211, 238, 0.6)'
                    }}
                  />
                </div>
              ))}
            </motion.div>

            {/* Floating info tags */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 }}
              className="absolute left-0 top-20 bg-red-900/80 border border-red-500 px-3 py-1 rounded text-xs font-mono"
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-3 h-3 text-red-400" />
                <span className="text-red-200">FIREWALL QU-37</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.7 }}
              className="absolute right-0 top-32 bg-red-900/80 border border-red-500 px-3 py-1 rounded text-xs font-mono"
            >
              <div className="flex items-center gap-2">
                <Lock className="w-3 h-3 text-red-400" />
                <span className="text-red-200">LOCKDOWN</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9 }}
              className="absolute left-8 bottom-24 bg-cyan-900/80 border border-cyan-400 px-3 py-1 rounded text-xs font-mono"
            >
              <div className="flex items-center gap-2">
                <Activity className="w-3 h-3 text-cyan-400" />
                <span className="text-cyan-200">STATION 9-H</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.1 }}
              className="absolute top-8 left-1/2 -translate-x-1/2 text-red-400 text-xs font-mono"
            >
              ⚠ FIREWALL QU-37 DETECTED ⚠
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.3 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 text-red-400 text-xs font-mono"
            >
              IMPACTO EN: 18:41
            </motion.div>
          </div>
        </motion.div>

        {/* Infiltrarse button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.5 }}
          className="mb-8"
        >
          <button
            onClick={onStart}
            className="relative group"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-xl 
                          group-hover:blur-2xl transition-all" />
            <div className="relative">
              {/* Outer ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full"
                style={{
                  padding: '4px',
                  background: 'linear-gradient(45deg, #06b6d4, #a855f7, #06b6d4)',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                }}
              />
              
              <div className="relative bg-slate-950/90 backdrop-blur-sm rounded-full p-8 border-2 border-cyan-400/50
                            group-hover:border-cyan-400 transition-all duration-300
                            shadow-[0_0_30px_rgba(6,182,212,0.3)] group-hover:shadow-[0_0_50px_rgba(6,182,212,0.6)]">
                <div className="text-2xl md:text-3xl font-mono text-cyan-400 tracking-widest">
                  INFILTRARSE
                </div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
                />
              </div>
            </div>
          </button>
        </motion.div>

        {/* Bottom slots for clues */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.7 }}
          className="flex justify-center gap-3 md:gap-4"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.8 + i * 0.1 }}
              className="w-16 h-16 md:w-20 md:h-20 rounded-lg border-2 border-cyan-500/30 bg-cyan-900/10
                       flex items-center justify-center relative overflow-hidden group"
            >
              <Lock className="w-6 h-6 md:w-8 md:h-8 text-cyan-700/50 group-hover:text-cyan-600/70 transition-colors" />
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500/20" />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom corner decorations */}
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-cyan-400/50" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-cyan-400/50" />
      </motion.div>
    </div>
  );
}

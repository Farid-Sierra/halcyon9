import { motion } from "framer-motion";
import { CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import enigmaImage from "../assets/enigma.png";


export function FinalScreen({ onRestart }: { onRestart: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Success particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-green-400 rounded-full"
          initial={{ 
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            opacity: 1 
          }}
          animate={{ 
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
            scale: [1, 2, 0]
          }}
          transition={{ 
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 1,
            repeat: Infinity
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 max-w-4xl"
      >
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
          className="mb-6 flex justify-center"
        >
          <div className="relative">
            <CheckCircle2 className="w-32 h-32 text-green-400" />
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full border-4 border-green-400"
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl mb-4 text-green-400 tracking-widest font-mono">
            MISIÓN COMPLETADA
          </h1>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl md:text-3xl text-purple-300 tracking-wider font-mono">
              PROTOCOLO HALCYON-9 DESACTIVADO
            </h2>
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>
        </motion.div>

        {/* Story reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="bg-slate-950/60 backdrop-blur-sm border-2 border-green-500/50 rounded-lg p-8 mb-8 
                     shadow-[0_0_30px_rgba(34,197,94,0.3)]"
        >
          <div className="flex items-center gap-3 mb-6 justify-center">
            <div className="w-12 h-12 rounded-full border-2 border-purple-400 flex items-center justify-center
                          bg-purple-900/30">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="text-2xl text-purple-300 font-mono">
              TRANSMISIÓN DE TX-0R
            </h3>
          </div>
          
          <div className="text-purple-100 space-y-4 text-sm md:text-base">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <span className="text-green-400 font-mono">[SEÑAL ESTABLECIDA]</span>
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              "Escuadrón Sable Púrpura... gracias. La transmisión no era una amenaza... 
              era un <span className="text-green-400">SOS</span>."
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
            >
              "Un virus imperial infectó mi núcleo, forzándome a activar el Protocolo de Purga. 
              No podía detenerlo por mí mismo. Necesitaba que alguien desde fuera... 
              alguien con <span className="text-purple-400">inteligencia</span> y <span className="text-purple-400">valor</span>... 
              me liberara."
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.1 }}
            >
              "Las colonias están a salvo. La Estación Halcyon-9 está a salvo. 
              Mis protocolos han sido restaurados."
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.4 }}
              className="bg-green-900/30 border border-green-500/50 rounded p-4 mt-6"
            >
              <p className="text-green-400 font-mono">
                PROTOCOLOS RESTAURADOS. GRACIAS, ESCUADRÓN SABLE PÚRPURA.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6 }}
          className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-6 mb-8"
        >
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl text-purple-400 font-mono mb-1">6</div>
              <div className="text-sm text-purple-300">Misiones Completadas</div>
            </div>
            <div>
              <div className="text-3xl text-green-400 font-mono mb-1">5</div>
              <div className="text-sm text-purple-300">Claves Obtenidas</div>
            </div>
            <div>
              <div className="text-3xl text-blue-400 font-mono mb-1">100%</div>
              <div className="text-sm text-purple-300">Éxito de Misión</div>
            </div>
          </div>
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8 }}
          className="mb-6 flex justify-center"
        >
          <img src={enigmaImage} alt="Enigma Rooms" className="h-12 md:h-16 opacity-80" />
        </motion.div>

        {/* Restart button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3 }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(168,85,247,0.6)' }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
          className="bg-purple-600 hover:bg-purple-500 text-white px-12 py-4 rounded-lg
                     border-2 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.5)]
                     transition-all duration-300 text-lg md:text-xl font-mono tracking-wider
                     flex items-center gap-3 mx-auto"
        >
          <RotateCcw className="w-6 h-6" />
          REINICIAR MISIÓN
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2 }}
          className="mt-8 text-purple-400 text-sm font-mono"
        >
          Gracias por jugar ENIGMA ROOM: PROTOCOLO HALCYON-9
        </motion.div>
      </motion.div>
    </div>
  );
}

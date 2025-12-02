import { motion } from 'motion/react';
import { Lock, CheckCircle2, KeyRound } from 'lucide-react';
import type { CollectedClue } from '../App';

type Props = {
  clues: CollectedClue[];
  totalRequired: number;
};

export function ProgressTracker({ clues, totalRequired }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div className="bg-slate-950/80 backdrop-blur-md border-2 border-purple-500/50 rounded-lg 
                      shadow-[0_0_20px_rgba(168,85,247,0.3)] p-4 max-w-4xl w-full">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-purple-400" />
            <span className="text-purple-300 font-mono text-sm">
              CLAVES RECOLECTADAS: {clues.length}/{totalRequired}
            </span>
          </div>

          <div className="flex gap-2 flex-wrap">
            {clues.map((clue, index) => (
              <motion.div
                key={clue.id}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="group relative"
              >
                <div className="bg-purple-900/50 border border-purple-400/50 rounded px-3 py-1
                              flex items-center gap-2 shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-purple-200 text-xs font-mono">{clue.label}</span>
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 
                              group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-slate-900 border border-purple-400 rounded px-3 py-2 
                                whitespace-nowrap shadow-lg">
                    <div className="text-purple-300 text-xs font-mono">{clue.value}</div>
                  </div>
                </div>
              </motion.div>
            ))}

            {[...Array(totalRequired - clues.length)].map((_, index) => (
              <div
                key={`empty-${index}`}
                className="bg-slate-900/50 border border-purple-800/30 rounded px-3 py-1
                          flex items-center gap-2"
              >
                <Lock className="w-4 h-4 text-purple-800" />
                <span className="text-purple-800 text-xs font-mono">???</span>
              </div>
            ))}
          </div>
        </div>

        {clues.length === totalRequired && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 text-center text-green-400 text-sm font-mono"
          >
            ✓ TODAS LAS CLAVES OBTENIDAS - PROCEDER AL NÚCLEO
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

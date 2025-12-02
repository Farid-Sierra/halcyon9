import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, Lock, CheckCircle2, X } from 'lucide-react';
import type { CollectedClue } from '../../App';

type Props = {
  collectedClues: CollectedClue[];
  onVictory: () => void;
};

type Slot = {
  id: number;
  label: string;
  expectedType: CollectedClue['type'];
  filledWith: CollectedClue | null;
};

export function CamaraDelNucleo({ collectedClues, onVictory }: Props) {
  const [slots, setSlots] = useState<Slot[]>([
    { id: 1, label: 'COORDENADAS TÁCTICAS', expectedType: 'coordinate', filledWith: null },
    { id: 2, label: 'CÓDIGO AUREBESH', expectedType: 'aurebesh', filledWith: null },
    { id: 3, label: 'PALABRA VISUAL', expectedType: 'visual', filledWith: null },
    { id: 4, label: 'TRADUCCIÓN BINARIA', expectedType: 'binary', filledWith: null },
    { id: 5, label: 'CLAVE FINAL', expectedType: 'final', filledWith: null },
  ]);
  const [draggedClue, setDraggedClue] = useState<CollectedClue | null>(null);
  const [attemptResult, setAttemptResult] = useState<'success' | 'fail' | null>(null);
  const [showHint, setShowHint] = useState(false);

  const handleDragStart = (clue: CollectedClue) => {
    setDraggedClue(clue);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (slotId: number) => {
    if (!draggedClue) return;

    setSlots(prev => prev.map(slot => {
      if (slot.id === slotId) {
        // Remove the clue from any other slot first
        const otherSlots = prev.filter(s => s.id !== slotId);
        const alreadyPlaced = otherSlots.some(s => s.filledWith?.id === draggedClue.id);
        
        if (!alreadyPlaced) {
          return { ...slot, filledWith: draggedClue };
        }
      }
      return slot;
    }));

    setDraggedClue(null);
  };

  const handleRemoveFromSlot = (slotId: number) => {
    setSlots(prev => prev.map(slot => 
      slot.id === slotId ? { ...slot, filledWith: null } : slot
    ));
  };

  const handleVerify = () => {
    // Check if all slots are filled correctly
    const allCorrect = slots.every(slot => slot.filledWith?.type === slot.expectedType);
    const allFilled = slots.every(slot => slot.filledWith !== null);

    if (allFilled && allCorrect) {
      setAttemptResult('success');
      setTimeout(() => {
        onVictory();
      }, 2000);
    } else {
      setAttemptResult('fail');
      setTimeout(() => {
        setAttemptResult(null);
        setShowHint(true);
      }, 2000);
    }
  };

  const allSlotsFilled = slots.every(slot => slot.filledWith !== null);
  const availableClues = collectedClues.filter(clue => 
    !slots.some(slot => slot.filledWith?.id === clue.id)
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 pt-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-6xl"
      >
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <AlertTriangle className="w-10 h-10 text-red-500 animate-pulse" />
            <h1 className="text-4xl text-purple-300 font-mono">CÁMARA DEL NÚCLEO</h1>
            <AlertTriangle className="w-10 h-10 text-red-500 animate-pulse" />
          </div>
          <p className="text-purple-400 font-mono">
            Inserta las claves en el orden correcto para desactivar el Protocolo de Purga
          </p>
        </motion.div>

        {/* Result feedback */}
        {attemptResult && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`mb-6 p-4 rounded-lg border-2 text-center ${
              attemptResult === 'success'
                ? 'bg-green-900/30 border-green-500 text-green-400'
                : 'bg-red-900/30 border-red-500 text-red-400'
            }`}
          >
            <div className="flex items-center justify-center gap-2 text-xl font-mono">
              {attemptResult === 'success' ? (
                <>
                  <CheckCircle2 className="w-6 h-6" />
                  <span>NÚCLEO DESACTIVADO - PROTOCOLO CANCELADO</span>
                </>
              ) : (
                <>
                  <X className="w-6 h-6" />
                  <span>CONFIGURACIÓN INCORRECTA - ALARMA ACTIVADA</span>
                </>
              )}
            </div>
          </motion.div>
        )}

        {/* Hint */}
        {showHint && attemptResult !== 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-purple-900/30 border border-purple-500/50 rounded p-4"
          >
            <p className="text-sm text-purple-300 text-center">
              💡 PISTA: Cada ranura espera un tipo específico de clave. Lee las etiquetas 
              cuidadosamente y asocia cada clave obtenida con su ranura correspondiente.
            </p>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Core Console - Slots */}
          <div>
            <h2 className="text-xl text-purple-300 font-mono mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5" />
              CONSOLA DE NÚCLEO
            </h2>
            
            <div className="bg-slate-950/80 backdrop-blur-sm border-2 border-purple-500/50 rounded-lg p-6
                           shadow-[0_0_30px_rgba(168,85,247,0.3)]">
              <div className="space-y-4">
                {slots.map((slot, index) => (
                  <motion.div
                    key={slot.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(slot.id)}
                    className={`relative p-4 rounded border-2 min-h-[80px] transition-all ${
                      slot.filledWith
                        ? slot.filledWith.type === slot.expectedType
                          ? 'border-green-500 bg-green-900/20'
                          : 'border-yellow-500 bg-yellow-900/20'
                        : 'border-purple-600 bg-purple-900/20 border-dashed'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-xs text-purple-400 font-mono mb-1">
                          RANURA {slot.id}
                        </div>
                        <div className="text-sm text-purple-200 font-mono">
                          {slot.label}
                        </div>
                      </div>
                      {slot.filledWith && (
                        <button
                          onClick={() => handleRemoveFromSlot(slot.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {slot.filledWith ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-purple-700/50 border border-purple-400 rounded px-3 py-2"
                      >
                        <div className="text-purple-100 font-mono">
                          {slot.filledWith.value}
                        </div>
                      </motion.div>
                    ) : (
                      <div className="text-center text-purple-700 text-sm font-mono py-2">
                        [VACÍO - ARRASTRA AQUÍ]
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {allSlotsFilled && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleVerify}
                  disabled={attemptResult !== null}
                  className="w-full mt-6 bg-red-600 hover:bg-red-500 disabled:bg-gray-600 
                           text-white px-6 py-4 rounded-lg
                           border-2 border-red-400 disabled:border-gray-500
                           shadow-[0_0_20px_rgba(239,68,68,0.6)] disabled:shadow-none
                           transition-all font-mono text-lg"
                >
                  {attemptResult === null ? 'DESACTIVAR NÚCLEO' : 'PROCESANDO...'}
                </motion.button>
              )}
            </div>
          </div>

          {/* Available Clues */}
          <div>
            <h2 className="text-xl text-purple-300 font-mono mb-4 flex items-center gap-2">
              CLAVES DISPONIBLES
            </h2>
            
            <div className="bg-slate-950/80 backdrop-blur-sm border-2 border-purple-500/50 rounded-lg p-6
                           shadow-[0_0_30px_rgba(168,85,247,0.3)]">
              {availableClues.length > 0 ? (
                <div className="space-y-3">
                  {availableClues.map((clue, index) => (
                    <motion.div
                      key={clue.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      draggable
                      onDragStart={() => handleDragStart(clue)}
                      className="bg-purple-900/40 border-2 border-purple-500 rounded-lg p-4 cursor-move
                               hover:border-purple-400 hover:bg-purple-800/40 transition-all
                               shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-purple-400 font-mono mb-1">
                            {clue.label}
                          </div>
                          <div className="text-lg text-purple-100 font-mono">
                            {clue.value}
                          </div>
                        </div>
                        <div className="text-purple-400">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12M8 12h12M8 17h12M3 7h.01M3 12h.01M3 17h.01" />
                          </svg>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-purple-500 py-8">
                  <Lock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="font-mono text-sm">Todas las claves han sido asignadas</p>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-purple-700">
                <p className="text-xs text-purple-400 text-center font-mono">
                  Arrastra y suelta las claves en las ranuras correspondientes
                </p>
              </div>
            </div>

            {/* Visual representation of core */}
            <motion.div
              animate={{ 
                boxShadow: attemptResult === 'success' 
                  ? ['0 0 20px rgba(34,197,94,0.3)', '0 0 40px rgba(34,197,94,0.6)', '0 0 20px rgba(34,197,94,0.3)']
                  : attemptResult === 'fail'
                  ? ['0 0 20px rgba(239,68,68,0.3)', '0 0 40px rgba(239,68,68,0.6)', '0 0 20px rgba(239,68,68,0.3)']
                  : ['0 0 20px rgba(168,85,247,0.3)', '0 0 30px rgba(168,85,247,0.4)', '0 0 20px rgba(168,85,247,0.3)']
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="mt-6 bg-slate-950/80 backdrop-blur-sm border-2 border-purple-500/50 rounded-lg p-6
                       text-center"
            >
              <div className="text-sm text-purple-400 font-mono mb-3">ESTADO DEL NÚCLEO</div>
              <motion.div
                animate={{ rotate: attemptResult === 'success' ? 0 : 360 }}
                transition={{ duration: 3, repeat: attemptResult === 'success' ? 0 : Infinity, ease: 'linear' }}
                className="w-24 h-24 mx-auto rounded-full border-4 border-purple-500 
                         bg-gradient-to-br from-purple-600/30 to-blue-600/30 relative"
              >
                <div className="absolute inset-2 rounded-full border-2 border-purple-400 
                              bg-gradient-to-br from-purple-500/20 to-blue-500/20" />
                <div className="absolute inset-4 rounded-full border border-purple-300 
                              bg-gradient-to-br from-purple-400/10 to-blue-400/10" />
              </motion.div>
              <div className={`mt-3 text-xs font-mono ${
                attemptResult === 'success' ? 'text-green-400' :
                attemptResult === 'fail' ? 'text-red-400' :
                'text-purple-400'
              }`}>
                {attemptResult === 'success' ? 'DESACTIVADO' :
                 attemptResult === 'fail' ? 'ALARMA' :
                 allSlotsFilled ? 'LISTO PARA DESACTIVAR' : 'ACTIVO'}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

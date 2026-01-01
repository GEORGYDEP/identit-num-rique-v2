
import React, { useState } from 'react';
import { Shield, Trash2, Edit3, Search, Share2, Hand } from 'lucide-react';

interface Props {
  onComplete: (score: number) => void;
}

const RIGHTS = [
  { id: 'acces', icon: Search, label: "Droit d'accès", desc: "Demander quelles données l'entreprise possède sur moi." },
  { id: 'rectification', icon: Edit3, label: "Droit de rectification", desc: "Faire corriger des informations inexactes." },
  { id: 'effacement', icon: Trash2, label: "Droit à l'effacement", desc: "Demander la suppression de mes données (Droit à l'oubli)." },
  { id: 'portabilite', icon: Share2, label: "Droit à la portabilité", desc: "Récupérer mes données dans un format réutilisable." },
  { id: 'opposition', icon: Hand, label: "Droit d'opposition", desc: "Refuser que mes données soient utilisées pour du marketing." },
];

const RgpdLevel: React.FC<Props> = ({ onComplete }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [completed, setCompleted] = useState<string[]>([]);
  const [attempts, setAttempts] = useState(0);

  const handleClick = (id: string) => {
    if (completed.includes(id)) return;
    
    if (selected === null) {
        setSelected(id);
    } else if (selected === id) {
        setSelected(null);
    } else {
        // Simple selection toggle logic
        setSelected(id);
    }
    setAttempts(a => a + 1);
  };

  const handleConfirm = (id: string) => {
    setCompleted(prev => {
        const next = [...prev, id];
        if (next.length === RIGHTS.length) {
            setTimeout(() => onComplete(100), 1000);
        }
        return next;
    });
    setSelected(null);
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-stone-800 mb-2">Mission 4 : Le Bouclier RGPD</h2>
        <p className="text-stone-500">Depuis mai 2018, le Règlement Général sur la Protection des Données te protège. Connais-tu tes droits ?</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {RIGHTS.map(right => (
          <button
            key={right.id}
            onClick={() => handleClick(right.id)}
            className={`group relative p-8 rounded-3xl border-2 transition-all duration-300 text-left flex flex-col items-center text-center ${
              completed.includes(right.id) 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                : selected === right.id 
                    ? 'bg-orange-50 border-orange-500 shadow-xl ring-4 ring-orange-100' 
                    : 'bg-white border-stone-100 hover:border-orange-200 hover:shadow-lg'
            }`}
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
              completed.includes(right.id) ? 'bg-emerald-100' : 'bg-stone-50 group-hover:bg-orange-100'
            }`}>
                <right.icon className={`w-8 h-8 ${completed.includes(right.id) ? 'text-emerald-600' : 'text-stone-400 group-hover:text-orange-600'}`} />
            </div>
            
            <h3 className="font-bold text-lg mb-2">{right.label}</h3>
            
            {selected === right.id && (
                <div className="animate-in fade-in slide-in-from-bottom-2">
                    <p className="text-sm text-stone-600 mb-4 leading-relaxed">{right.desc}</p>
                    <button 
                        onClick={(e) => { e.stopPropagation(); handleConfirm(right.id); }}
                        className="w-full py-2 bg-orange-600 text-white rounded-xl font-bold text-sm hover:bg-orange-700 shadow-lg"
                    >
                        J'ai compris !
                    </button>
                </div>
            )}
            
            {!selected && !completed.includes(right.id) && (
                <span className="text-xs text-stone-400 mt-2 flex items-center gap-1">
                   Cliquer pour découvrir
                </span>
            )}
          </button>
        ))}

        <div className="bg-emerald-500 p-8 rounded-3xl text-white flex flex-col justify-center items-center text-center shadow-lg transform hover:rotate-1 transition-transform">
            <Shield className="w-12 h-12 mb-4" />
            <h3 className="font-bold text-xl mb-2">Protection</h3>
            <p className="text-xs opacity-90">En Belgique, l'Autorité de Protection des Données (APD) veille sur toi.</p>
        </div>
      </div>

      <div className="mt-12 p-6 bg-stone-900 rounded-3xl text-stone-400 text-sm text-center">
        <span className="text-orange-500 font-bold">Le savais-tu ?</span> En Belgique, l'âge minimum pour consentir seul au traitement de tes données est fixé à <span className="text-white font-bold">13 ans</span>.
      </div>
    </div>
  );
};

export default RgpdLevel;

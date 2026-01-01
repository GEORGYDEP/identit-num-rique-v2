
import React, { useState } from 'react';
import { CheckCircle2, XCircle, Info, HelpCircle } from 'lucide-react';

interface Props {
  onComplete: (score: number) => void;
}

const ITEMS = [
  { id: '1', text: "La famille", type: 'primaire' },
  { id: '2', text: "File d'attente au bus", type: 'agregat' },
  { id: '3', text: "Les 18-25 ans", type: 'statistique' },
  { id: '4', text: "Le groupe d'amis proches", type: 'primaire' },
  { id: '5', text: "Un club de sport", type: 'secondaire' },
  { id: '6', text: "Spectateurs d'un concert", type: 'agregat' },
  { id: '7', text: "Les habitants de Mons", type: 'statistique' },
  { id: '8', text: "Une classe de 6e année", type: 'secondaire' },
];

const CATEGORIES = [
  { id: 'agregat', label: 'Agrégat', desc: 'Même endroit, sans relations.' },
  { id: 'statistique', label: 'Catégorie Statistique', desc: 'Critère commun (âge, lieu).' },
  { id: 'primaire', label: 'G. Social Primaire', desc: 'Relations directes et intimes.' },
  { id: 'secondaire', label: 'G. Social Secondaire', desc: 'Relations moins personnelles, but commun.' },
];

const GroupsLevel: React.FC<Props> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState<boolean | null>(null);

  const currentItem = ITEMS[currentIndex];

  const handleSelect = (categoryId: string) => {
    const isCorrect = currentItem.type === categoryId;
    setSelections(prev => ({ ...prev, [currentItem.id]: categoryId }));
    setShowFeedback(isCorrect);
    
    setTimeout(() => {
      setShowFeedback(null);
      if (currentIndex < ITEMS.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        const correctCount = Object.entries({ ...selections, [currentItem.id]: categoryId })
          .filter(([id, cat]) => ITEMS.find(i => i.id === id)?.type === cat).length;
        onComplete(correctCount * 10);
      }
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-stone-800 mb-2">Mission 1 : Le Grand Tri</h2>
          <p className="text-stone-500">Classe chaque exemple dans le bon type de regroupement social.</p>
        </div>
        <div className="text-stone-400 font-medium">
          {currentIndex + 1} / {ITEMS.length}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="bg-white p-12 rounded-3xl shadow-xl border-4 border-dashed border-stone-100 flex flex-col items-center justify-center text-center h-64 transform transition-all hover:scale-[1.02]">
            {showFeedback === true && <div className="absolute inset-0 bg-emerald-500/10 rounded-3xl flex items-center justify-center animate-in zoom-in duration-300"><CheckCircle2 className="w-20 h-20 text-emerald-500" /></div>}
            {showFeedback === false && <div className="absolute inset-0 bg-red-500/10 rounded-3xl flex items-center justify-center animate-in zoom-in duration-300"><XCircle className="w-20 h-20 text-red-500" /></div>}
            
            <HelpCircle className="w-12 h-12 text-orange-200 mb-4" />
            <span className="text-2xl font-bold text-stone-800">{currentItem.text}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              disabled={showFeedback !== null}
              className="group flex flex-col p-4 bg-white rounded-2xl border border-stone-200 text-left hover:border-orange-500 hover:shadow-md transition-all disabled:opacity-50"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-stone-800 group-hover:text-orange-600">{cat.label}</span>
                <Info className="w-4 h-4 text-stone-300" />
              </div>
              <span className="text-xs text-stone-500 leading-tight">{cat.desc}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-12 bg-orange-50 p-6 rounded-2xl border border-orange-100">
          <h4 className="font-bold text-orange-800 mb-2 flex items-center gap-2">
            <Info className="w-5 h-5" /> Rappel
          </h4>
          <p className="text-sm text-orange-700 leading-relaxed">
            Pour distinguer les groupes, demande-toi : Les échanges sont-ils forts ? Le groupe est-il durable ? Peut-on lui donner un nom précis ?
          </p>
      </div>
    </div>
  );
};

export default GroupsLevel;

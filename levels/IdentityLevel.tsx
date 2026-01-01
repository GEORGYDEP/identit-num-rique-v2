
import React, { useState } from 'react';
import { User, Users, CheckCircle2 } from 'lucide-react';

interface Props {
  onComplete: (score: number) => void;
}

const ELEMENTS = [
  { id: '1', text: "Mon groupe sanguin", category: 'personnelle' },
  { id: '2', text: "Mon club de scouts", category: 'collective' },
  { id: '3', text: "Ma photo de profil", category: 'personnelle' },
  { id: '4', text: "Ma nationalité belge", category: 'collective' },
  { id: '5', text: "Mon mot de passe", category: 'personnelle' },
  { id: '6', text: "Ma passion pour le gaming", category: 'collective' },
  { id: '7', text: "Mon école (Saint-Luc)", category: 'collective' },
  { id: '8', text: "Ma taille et mon poids", category: 'personnelle' },
];

const IdentityLevel: React.FC<Props> = ({ onComplete }) => {
  const [items, setItems] = useState(ELEMENTS);
  const [placed, setPlaced] = useState<Record<string, { category: 'personnelle' | 'collective', isCorrect: boolean }>>({});
  const [completionTimer, setCompletionTimer] = useState<NodeJS.Timeout | null>(null);

  const handlePlace = (id: string, category: 'personnelle' | 'collective') => {
    const item = items.find(i => i.id === id);
    if (!item) return;

    // Cancel any pending completion timer to allow corrections
    if (completionTimer) {
      clearTimeout(completionTimer);
      setCompletionTimer(null);
    }

    // Allow re-placing an item (removing the check for placed[id])
    const isCorrect = item.category === category;
    setPlaced(prev => {
      const newPlaced = { ...prev, [id]: { category, isCorrect } };

      // Check if all items are placed
      if (Object.keys(newPlaced).length === ELEMENTS.length) {
        // Calculate score based on correct answers
        const correctCount = Object.values(newPlaced).filter(p => p.isCorrect).length;
        const score = Math.round((correctCount / ELEMENTS.length) * 100);
        const timer = setTimeout(() => onComplete(score), 1500);
        setCompletionTimer(timer);
      }

      return newPlaced;
    });
  };

  const handleRemove = (id: string) => {
    // Cancel any pending completion timer when removing an item
    if (completionTimer) {
      clearTimeout(completionTimer);
      setCompletionTimer(null);
    }

    setPlaced(prev => {
      const newPlaced = { ...prev };
      delete newPlaced[id];
      return newPlaced;
    });
  };

  const currentItems = items.filter(i => !placed[i.id]);

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-stone-800 mb-2">Mission 2 : Ton Portrait Chinois</h2>
        <p className="text-stone-500 mb-2">L'identité sociale est la combinaison de qui tu es (personnel) et à quoi tu appartiens (collectif).</p>
        <p className="text-sm text-orange-600 font-medium">💡 Tu peux essayer et te tromper ! Clique sur un élément placé pour le retirer ou sur l'autre catégorie pour le déplacer.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Personnelle Zone */}
        <div className="bg-blue-50/50 p-8 rounded-[2.5rem] border-2 border-dashed border-blue-200 min-h-[300px] flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 text-blue-600">
                <User className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-blue-800 mb-6 uppercase tracking-wider">Identité Personnelle</h3>
            <div className="flex flex-wrap gap-3 justify-center">
                {ELEMENTS.filter(i => placed[i.id]?.category === 'personnelle').map(i => {
                    const isCorrect = placed[i.id]?.isCorrect;
                    return (
                        <button
                            key={i.id}
                            onClick={() => handleRemove(i.id)}
                            className={`px-4 py-2 rounded-xl shadow-sm border flex items-center gap-2 text-sm font-medium animate-in zoom-in transition-all hover:scale-105 ${
                                isCorrect
                                    ? 'bg-white border-emerald-300 hover:border-emerald-400'
                                    : 'bg-red-50 border-red-300 hover:border-red-400'
                            }`}
                            title="Cliquer pour retirer"
                        >
                            <CheckCircle2 className={`w-4 h-4 ${isCorrect ? 'text-emerald-500' : 'text-red-500'}`} />
                            {i.text}
                        </button>
                    );
                })}
            </div>
        </div>

        {/* Collective Zone */}
        <div className="bg-orange-50/50 p-8 rounded-[2.5rem] border-2 border-dashed border-orange-200 min-h-[300px] flex flex-col items-center">
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-4 text-orange-600">
                <Users className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-orange-800 mb-6 uppercase tracking-wider">Identité Collective</h3>
            <div className="flex flex-wrap gap-3 justify-center">
                {ELEMENTS.filter(i => placed[i.id]?.category === 'collective').map(i => {
                    const isCorrect = placed[i.id]?.isCorrect;
                    return (
                        <button
                            key={i.id}
                            onClick={() => handleRemove(i.id)}
                            className={`px-4 py-2 rounded-xl shadow-sm border flex items-center gap-2 text-sm font-medium animate-in zoom-in transition-all hover:scale-105 ${
                                isCorrect
                                    ? 'bg-white border-emerald-300 hover:border-emerald-400'
                                    : 'bg-red-50 border-red-300 hover:border-red-400'
                            }`}
                            title="Cliquer pour retirer"
                        >
                            <CheckCircle2 className={`w-4 h-4 ${isCorrect ? 'text-emerald-500' : 'text-red-500'}`} />
                            {i.text}
                        </button>
                    );
                })}
            </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-lg border border-stone-100">
        <h4 className="text-center font-semibold text-stone-400 mb-8 uppercase text-xs tracking-[0.2em]">À Classer</h4>
        <div className="flex flex-wrap gap-4 justify-center">
          {currentItems.map(item => (
            <div key={item.id} className="flex gap-2">
                <button 
                  onClick={() => handlePlace(item.id, 'personnelle')}
                  className="p-3 bg-stone-50 hover:bg-blue-100 text-blue-600 rounded-l-2xl border border-stone-200 transition-colors"
                >
                    <User className="w-5 h-5" />
                </button>
                <div className="px-6 py-3 bg-white border-y border-stone-200 flex items-center font-bold text-stone-700 min-w-[120px] justify-center">
                    {item.text}
                </div>
                <button 
                  onClick={() => handlePlace(item.id, 'collective')}
                  className="p-3 bg-stone-50 hover:bg-orange-100 text-orange-600 rounded-r-2xl border border-stone-200 transition-colors"
                >
                    <Users className="w-5 h-5" />
                </button>
            </div>
          ))}
          {currentItems.length === 0 && (
            <div className="text-emerald-500 font-bold text-xl py-4 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8" />
                Bravo ! Tu as défini ton identité sociale.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IdentityLevel;

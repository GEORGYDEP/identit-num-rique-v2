
import React, { useState } from 'react';
import { Eye, MousePointer2, Info, ArrowRight } from 'lucide-react';

interface Props {
  onComplete: (score: number) => void;
}

const TRACES = [
  { id: '1', text: "Mon adresse IP", type: 'involontaire', desc: "Identifiant unique de ton appareil, traçable par les sites." },
  { id: '2', text: "Publier une story Instagram", type: 'volontaire', desc: "Contenu que tu décides activement de partager." },
  { id: '3', text: "Les cookies publicitaires", type: 'involontaire', desc: "Fichiers stockés par ton navigateur pour cibler tes goûts." },
  { id: '4', text: "Écrire un avis sur un restaurant", type: 'volontaire', desc: "Contribution directe et intentionnelle en ligne." },
  { id: '5', text: "Ma géolocalisation GPS", type: 'involontaire', desc: "Souvent collectée en arrière-plan par tes applications." },
  { id: '6', text: "Un ami qui me tague sur une photo", type: 'involontaire', desc: "Une trace humaine laissée par quelqu'un d'autre sur toi." },
  { id: '7', text: "Remplir un formulaire d'inscription", type: 'volontaire', desc: "Données fournies consciemment pour accéder à un service." },
];

const TracesLevel: React.FC<Props> = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [reveal, setReveal] = useState(false);

  const current = TRACES[index];

  const handleChoice = (type: 'volontaire' | 'involontaire') => {
    if (type === current.type) setScore(s => s + 15);
    setReveal(true);
  };

  const next = () => {
    if (index < TRACES.length - 1) {
      setIndex(prev => prev + 1);
      setReveal(false);
    } else {
      onComplete(score);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-stone-800 mb-2">Mission 3 : Le Double Numérique</h2>
          <p className="text-stone-500">Distingue les traces <span className="text-emerald-600 font-bold">actives</span> (volontaires) des traces <span className="text-red-500 font-bold">passives</span> (involontaires).</p>
      </div>

      <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-stone-100">
        <div className="p-12 text-center bg-stone-50 border-b border-stone-100">
            <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-stone-400">
                    <MousePointer2 className="w-8 h-8" />
                </div>
            </div>
            <h3 className="text-4xl font-bold text-stone-800 mb-4">{current.text}</h3>
            {!reveal && (
                <div className="flex gap-4 justify-center mt-8">
                    <button 
                        onClick={() => handleChoice('volontaire')}
                        className="px-8 py-3 bg-emerald-500 text-white rounded-full font-bold hover:bg-emerald-600 transition-all shadow-lg hover:shadow-emerald-200"
                    >
                        Volontaire (Actif)
                    </button>
                    <button 
                        onClick={() => handleChoice('involontaire')}
                        className="px-8 py-3 bg-red-500 text-white rounded-full font-bold hover:bg-red-600 transition-all shadow-lg hover:shadow-red-200"
                    >
                        Involontaire (Passif)
                    </button>
                </div>
            )}
        </div>

        {reveal && (
            <div className="p-12 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="flex gap-6 items-start">
                    <div className={`p-4 rounded-2xl ${current.type === 'volontaire' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                        <Info className="w-8 h-8" />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-stone-800 mb-2">
                            C'est une trace {current.type} !
                        </h4>
                        <p className="text-stone-600 leading-relaxed mb-8">
                            {current.desc}
                        </p>
                        <button 
                            onClick={next}
                            className="flex items-center gap-2 text-orange-600 font-bold hover:gap-3 transition-all"
                        >
                            Trace suivante <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        )}
      </div>

      <div className="mt-12 text-center text-stone-400 text-sm italic">
        "Rien ne s'efface vraiment sur Internet. Tes traces constituent ton identité numérique."
      </div>
    </div>
  );
};

export default TracesLevel;

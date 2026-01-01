
import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, XCircle, ChevronRight, Lock, Mail, AlertTriangle } from 'lucide-react';

interface Props {
  onComplete: (score: number) => void;
}

const QUESTIONS = [
  {
    text: "Quel est le meilleur mot de passe parmi ceux-ci ?",
    options: ["123456", "MaDateDeNaissance2008", "J@m2f@F!2024", "princesse_bella"],
    correct: 2,
    explanation: "Un bon mot de passe fait au moins 12 caractères, contient des chiffres, majuscules et caractères spéciaux, sans données personnelles."
  },
  {
    text: "Tu reçois un mail de ta banque disant : 'Action requise : Votre compte est bloqué, cliquez ici.' C'est probablement...",
    options: ["Une urgence réelle", "Du Phishing (Hameçonnage)", "Un cadeau", "Une erreur technique"],
    correct: 1,
    explanation: "Ne clique jamais sur les liens suspects imitant des organismes officiels. Les banques ne demandent jamais tes codes par mail."
  },
  {
    text: "Sur les réseaux sociaux, avant de publier une photo, tu devrais te demander :",
    options: ["Sera-t-elle aimée ?", "Est-ce que je suis beau dessus ?", "Pourrait-elle me nuire dans 10 ans ?", "Ai-je mis assez de filtres ?"],
    correct: 2,
    explanation: "Réfléchis aux conséquences futures. Un futur employeur pourrait voir ce que tu publies aujourd'hui."
  },
  {
    text: "Pour sécuriser ton compte, l'étape la plus efficace est :",
    options: ["Changer de pseudo", "Mettre mon compte en privé", "Activer la 2FA (Double Authentification)", "Supprimer mes anciens messages"],
    correct: 2,
    explanation: "La 2FA ajoute une couche de sécurité cruciale en demandant un code envoyé sur ton téléphone."
  }
];

const SecurityLevel: React.FC<Props> = ({ onComplete }) => {
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (idx: number) => {
    if (showExplanation) return;
    setSelected(idx);
    setShowExplanation(true);
    if (idx === QUESTIONS[qIndex].correct) {
      setScore(s => s + 25);
    }
  };

  const next = () => {
    if (qIndex < QUESTIONS.length - 1) {
      setQIndex(prev => prev + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      onComplete(score);
    }
  };

  const current = QUESTIONS[qIndex];

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-stone-800 mb-2">Mission Finale : Gardien du Web</h2>
        <p className="text-stone-500">Teste ta vigilance face aux dangers et apprends les règles d'or.</p>
      </div>

      <div className="bg-white rounded-[2rem] shadow-xl border border-stone-100 p-8 md:p-12">
        <div className="flex items-center gap-3 mb-8">
            <div className="bg-orange-100 p-2 rounded-lg">
                <ShieldAlert className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-stone-400 font-bold uppercase tracking-widest text-xs">Question {qIndex + 1} / {QUESTIONS.length}</span>
        </div>

        <h3 className="text-2xl font-bold text-stone-800 mb-8 leading-tight">{current.text}</h3>

        <div className="grid gap-4 mb-10">
          {current.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={showExplanation}
              className={`p-5 rounded-2xl text-left font-semibold transition-all flex justify-between items-center ${
                showExplanation 
                  ? i === current.correct 
                    ? 'bg-emerald-50 border-2 border-emerald-500 text-emerald-700' 
                    : selected === i 
                        ? 'bg-red-50 border-2 border-red-500 text-red-700' 
                        : 'bg-stone-50 border-2 border-transparent text-stone-400'
                  : 'bg-white border-2 border-stone-100 hover:border-orange-300 hover:bg-orange-50/30 text-stone-700'
              }`}
            >
              <span>{opt}</span>
              {showExplanation && i === current.correct && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
              {showExplanation && selected === i && i !== current.correct && <XCircle className="w-6 h-6 text-red-500" />}
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 animate-in slide-in-from-bottom-2 duration-300">
            <div className="flex gap-4">
                <div className="mt-1">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                    <p className="text-stone-600 text-sm leading-relaxed mb-6">{current.explanation}</p>
                    <button 
                        onClick={next}
                        className="flex items-center gap-2 bg-stone-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-orange-600 transition-colors ml-auto"
                    >
                        {qIndex === QUESTIONS.length - 1 ? "Terminer l'aventure" : "Question suivante"}
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-900 p-6 rounded-3xl text-white flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-xl">
                <Lock className="w-8 h-8 text-blue-300" />
            </div>
            <div>
                <h4 className="font-bold">2FA Activée ?</h4>
                <p className="text-xs opacity-70">C'est ton bouclier le plus puissant contre les hackeurs.</p>
            </div>
        </div>
        <div className="bg-emerald-900 p-6 rounded-3xl text-white flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-xl">
                <Mail className="w-8 h-8 text-emerald-300" />
            </div>
            <div>
                <h4 className="font-bold">Zéro Phishing</h4>
                <p className="text-xs opacity-70">Apprends à ne jamais cliquer sur l'inconnu.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityLevel;

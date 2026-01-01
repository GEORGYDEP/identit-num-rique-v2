
import React, { useEffect } from 'react';
import { LevelProgress } from '../types';
import { Award, Trophy, RefreshCcw, Heart, Share2, ShieldCheck } from 'lucide-react';

interface Props {
  progress: LevelProgress[];
  onRestart: () => void;
}

const FinalSummary: React.FC<Props> = ({ progress, onRestart }) => {
  const totalScore = progress.reduce((acc, curr) => acc + curr.score, 0);
  const maxScore = 425; // Approximate max score

  return (
    <div className="max-w-4xl mx-auto py-12 text-center">
      <div className="mb-12 animate-in zoom-in duration-700">
        <div className="inline-flex items-center justify-center w-32 h-32 bg-orange-100 rounded-full mb-8 relative">
            <Trophy className="w-16 h-16 text-orange-600" />
            <div className="absolute -top-2 -right-2 bg-emerald-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 border-white">
                ✓
            </div>
        </div>
        <h2 className="text-5xl font-bold text-stone-900 mb-4">Bravo, Explorateur !</h2>
        <p className="text-xl text-stone-600">Tu as complété toutes les missions de l'unité UAA4.</p>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-stone-100 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="text-left">
                <span className="text-stone-400 font-bold uppercase text-xs tracking-widest block mb-1">Score Global</span>
                <span className="text-5xl font-black text-stone-900">{totalScore} <span className="text-2xl text-stone-300 font-normal">pts</span></span>
            </div>
            <div className="flex gap-4">
                <button 
                  onClick={() => window.print()} 
                  className="flex items-center gap-2 px-6 py-3 bg-stone-100 text-stone-700 rounded-2xl font-bold hover:bg-stone-200 transition-colors"
                >
                    <Share2 className="w-5 h-5" /> Certifier mon score
                </button>
                <button 
                  onClick={onRestart}
                  className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-2xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-200"
                >
                    <RefreshCcw className="w-5 h-5" /> Rejouer
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 bg-stone-50 rounded-3xl border border-stone-100">
                <ShieldCheck className="w-8 h-8 text-emerald-500 mb-4" />
                <h4 className="font-bold text-stone-800 mb-2">Identité Maîtrisée</h4>
                <p className="text-xs text-stone-500 leading-relaxed">Tu sais désormais distinguer qui tu es de ce que tu laisses comme traces.</p>
            </div>
            <div className="p-6 bg-stone-50 rounded-3xl border border-stone-100">
                <Award className="w-8 h-8 text-blue-500 mb-4" />
                <h4 className="font-bold text-stone-800 mb-2">Citoyen Numérique</h4>
                <p className="text-xs text-stone-500 leading-relaxed">Tu connais tes droits RGPD et tu peux les faire valoir auprès des géants du web.</p>
            </div>
            <div className="p-6 bg-stone-50 rounded-3xl border border-stone-100">
                <Heart className="w-8 h-8 text-orange-500 mb-4" />
                <h4 className="font-bold text-stone-800 mb-2">Sécurité Renforcée</h4>
                <p className="text-xs text-stone-500 leading-relaxed">Tes mots de passe et ta vigilance face au phishing feront de toi un utilisateur serein.</p>
            </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <blockquote className="text-2xl font-medium text-stone-400 italic mb-8">
            "Sur Internet, rien ne s'efface vraiment. Construis ton identité numérique comme tu construirais ta réputation dans la vie réelle."
        </blockquote>
        <p className="text-stone-400 text-sm">UAA4 Quest • Institut Saint-Luc Frameries 2024-2025</p>
      </div>
    </div>
  );
};

export default FinalSummary;

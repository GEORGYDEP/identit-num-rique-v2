
import React from 'react';
import { ChevronRight, ShieldCheck, Users, Globe } from 'lucide-react';

interface Props {
  onStart: () => void;
}

const IntroScreen: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center text-center py-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="inline-block px-4 py-1.5 mb-6 bg-orange-50 text-orange-700 rounded-full text-sm font-semibold tracking-wide border border-orange-100">
        BIENVENUE DANS L'AVENTURE UAA4
      </div>
      
      <h1 className="text-5xl md:text-7xl font-bold text-stone-900 mb-8 max-w-3xl leading-tight">
        L'Identité à l'Ère <span className="text-orange-600">Numérique</span>
      </h1>
      
      <p className="text-lg md:text-xl text-stone-600 mb-12 max-w-2xl leading-relaxed">
        Découvre qui tu es socialement, comment tes traces en ligne te définissent et quels sont tes droits pour protéger ta vie privée.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 w-full max-w-4xl">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col items-center">
            <Users className="w-10 h-10 text-orange-500 mb-4" />
            <h3 className="font-bold text-stone-800 mb-2">Social</h3>
            <p className="text-sm text-stone-500">Distingue les groupes et ton identité collective.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col items-center">
            <Globe className="w-10 h-10 text-blue-500 mb-4" />
            <h3 className="font-bold text-stone-800 mb-2">Numérique</h3>
            <p className="text-sm text-stone-500">Comprends tes traces volontaires et involontaires.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col items-center">
            <ShieldCheck className="w-10 h-10 text-emerald-500 mb-4" />
            <h3 className="font-bold text-stone-800 mb-2">RGPD</h3>
            <p className="text-sm text-stone-500">Maîtrise tes droits et sécurise tes accès.</p>
        </div>
      </div>

      <button 
        onClick={onStart}
        className="group relative inline-flex items-center gap-3 bg-stone-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition-all transform hover:scale-105 shadow-xl"
      >
        Commencer la quête
        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>

      <div className="mt-16 text-stone-400 text-sm">
        Institut Saint-Luc Frameries • 6e Technique
      </div>
    </div>
  );
};

export default IntroScreen;

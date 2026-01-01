
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  ChevronRight, Award, Map, RefreshCcw, ShieldCheck, Users, Globe, 
  CheckCircle2, XCircle, Info, HelpCircle, User, MousePointer2, 
  ArrowRight, Shield, Trash2, Edit3, Search, Share2, Hand, 
  ShieldAlert, Lock, Mail, AlertTriangle, Trophy, Heart 
} from 'lucide-react';

// --- TYPES ---

enum LevelId {
  INTRO = 'intro',
  GROUPS = 'groups',
  IDENTITY = 'identity',
  TRACES = 'traces',
  RGPD = 'rgpd',
  SECURITY = 'security',
  CONCLUSION = 'conclusion'
}

interface LevelProgress {
  id: LevelId;
  completed: boolean;
  score: number;
}

// --- COMPOSANTS DE NIVEAU ---

const IntroScreen = ({ onStart }) => (
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
    <button onClick={onStart} className="group relative inline-flex items-center gap-3 bg-stone-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition-all transform hover:scale-105 shadow-xl">
      Commencer la quête <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </button>
  </div>
);

const GroupsLevel = ({ onComplete }) => {
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

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selections, setSelections] = useState({});
  const [showFeedback, setShowFeedback] = useState(null);

  const handleSelect = (categoryId) => {
    const isCorrect = ITEMS[currentIndex].type === categoryId;
    setSelections(prev => ({ ...prev, [ITEMS[currentIndex].id]: categoryId }));
    setShowFeedback(isCorrect);
    
    setTimeout(() => {
      setShowFeedback(null);
      if (currentIndex < ITEMS.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        const correctCount = Object.entries({ ...selections, [ITEMS[currentIndex].id]: categoryId })
          .filter(([id, cat]) => ITEMS.find(i => i.id === id)?.type === cat).length;
        onComplete(correctCount * 10);
      }
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-end mb-8">
        <div><h2 className="text-3xl font-bold text-stone-800 mb-2">Mission 1 : Le Grand Tri</h2><p className="text-stone-500">Classe chaque exemple dans le bon type de regroupement social.</p></div>
        <div className="text-stone-400 font-medium">{currentIndex + 1} / {ITEMS.length}</div>
      </div>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="bg-white p-12 rounded-3xl shadow-xl border-4 border-dashed border-stone-100 flex flex-col items-center justify-center text-center h-64">
            {showFeedback === true && <div className="absolute inset-0 bg-emerald-500/10 rounded-3xl flex items-center justify-center animate-in zoom-in"><CheckCircle2 className="w-20 h-20 text-emerald-500" /></div>}
            {showFeedback === false && <div className="absolute inset-0 bg-red-500/10 rounded-3xl flex items-center justify-center animate-in zoom-in"><XCircle className="w-20 h-20 text-red-500" /></div>}
            <HelpCircle className="w-12 h-12 text-orange-200 mb-4" />
            <span className="text-2xl font-bold text-stone-800">{ITEMS[currentIndex].text}</span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => handleSelect(cat.id)} disabled={showFeedback !== null} className="group flex flex-col p-4 bg-white rounded-2xl border border-stone-200 text-left hover:border-orange-500 hover:shadow-md transition-all">
              <span className="font-bold text-stone-800 group-hover:text-orange-600">{cat.label}</span>
              <span className="text-xs text-stone-500 leading-tight">{cat.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const IdentityLevel = ({ onComplete }) => {
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
  const [placed, setPlaced] = useState({});
  const [completedCount, setCompletedCount] = useState(0);

  const handlePlace = (id, category) => {
    const item = ELEMENTS.find(i => i.id === id);
    if (!item || placed[id]) return;
    if (item.category === category) {
      setPlaced(prev => ({ ...prev, [id]: category }));
      setCompletedCount(prev => {
        const newVal = prev + 1;
        if (newVal === ELEMENTS.length) setTimeout(() => onComplete(100), 1500);
        return newVal;
      });
    }
  };

  const currentItems = ELEMENTS.filter(i => !placed[i.id]);

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="text-center mb-12"><h2 className="text-3xl font-bold text-stone-800 mb-2">Mission 2 : Ton Portrait Chinois</h2><p className="text-stone-500">L'identité sociale est personnelle et collective.</p></div>
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-blue-50/50 p-8 rounded-[2.5rem] border-2 border-dashed border-blue-200 min-h-[300px] flex flex-col items-center">
            <User className="w-8 h-8 text-blue-600 mb-4" /><h3 className="font-bold text-blue-800 mb-6">Identité Personnelle</h3>
            <div className="flex flex-wrap gap-3 justify-center">{ELEMENTS.filter(i => placed[i.id] === 'personnelle').map(i => <div key={i.id} className="bg-white px-4 py-2 rounded-xl shadow-sm border border-blue-100 flex items-center gap-2 text-sm font-medium animate-in zoom-in"><CheckCircle2 className="w-4 h-4 text-emerald-500" />{i.text}</div>)}</div>
        </div>
        <div className="bg-orange-50/50 p-8 rounded-[2.5rem] border-2 border-dashed border-orange-200 min-h-[300px] flex flex-col items-center">
            <Users className="w-8 h-8 text-orange-600 mb-4" /><h3 className="font-bold text-orange-800 mb-6">Identité Collective</h3>
            <div className="flex flex-wrap gap-3 justify-center">{ELEMENTS.filter(i => placed[i.id] === 'collective').map(i => <div key={i.id} className="bg-white px-4 py-2 rounded-xl shadow-sm border border-orange-100 flex items-center gap-2 text-sm font-medium animate-in zoom-in"><CheckCircle2 className="w-4 h-4 text-emerald-500" />{i.text}</div>)}</div>
        </div>
      </div>
      <div className="bg-white p-8 rounded-3xl shadow-lg border border-stone-100 flex flex-wrap gap-4 justify-center">
          {currentItems.map(item => (
            <div key={item.id} className="flex gap-2">
                <button onClick={() => handlePlace(item.id, 'personnelle')} className="p-3 bg-stone-50 hover:bg-blue-100 text-blue-600 rounded-l-2xl border border-stone-200"><User className="w-5 h-5" /></button>
                <div className="px-6 py-3 bg-white border-y border-stone-200 flex items-center font-bold text-stone-700 min-w-[120px] justify-center">{item.text}</div>
                <button onClick={() => handlePlace(item.id, 'collective')} className="p-3 bg-stone-50 hover:bg-orange-100 text-orange-600 rounded-r-2xl border border-stone-200"><Users className="w-5 h-5" /></button>
            </div>
          ))}
          {currentItems.length === 0 && <div className="text-emerald-500 font-bold text-xl flex items-center gap-3"><CheckCircle2 className="w-8 h-8" /> Bravo !</div>}
      </div>
    </div>
  );
};

const TracesLevel = ({ onComplete }) => {
  const TRACES = [
    { id: '1', text: "Mon adresse IP", type: 'involontaire', desc: "Identifiant unique de ton appareil." },
    { id: '2', text: "Publier une story Instagram", type: 'volontaire', desc: "Contenu partagé activement." },
    { id: '3', text: "Les cookies publicitaires", type: 'involontaire', desc: "Fichiers de ciblage." },
    { id: '4', text: "Écrire un avis restaurant", type: 'volontaire', desc: "Contribution intentionnelle." },
  ];
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [reveal, setReveal] = useState(false);

  const handleChoice = (type) => {
    if (type === TRACES[index].type) setScore(s => s + 25);
    setReveal(true);
  };

  const next = () => {
    if (index < TRACES.length - 1) { setIndex(prev => prev + 1); setReveal(false); }
    else onComplete(score);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-10">Mission 3 : Le Double Numérique</h2>
      <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-stone-100">
        <div className="p-12 text-center bg-stone-50 border-b border-stone-100">
            <MousePointer2 className="w-12 h-12 text-stone-400 mx-auto mb-6" />
            <h3 className="text-4xl font-bold text-stone-800 mb-8">{TRACES[index].text}</h3>
            {!reveal && (
              <div className="flex gap-4 justify-center">
                <button onClick={() => handleChoice('volontaire')} className="px-8 py-3 bg-emerald-500 text-white rounded-full font-bold">Volontaire</button>
                <button onClick={() => handleChoice('involontaire')} className="px-8 py-3 bg-red-500 text-white rounded-full font-bold">Involontaire</button>
              </div>
            )}
        </div>
        {reveal && (
          <div className="p-12 animate-in fade-in slide-in-from-top-4">
            <h4 className="text-xl font-bold mb-2">C'est une trace {TRACES[index].type} !</h4>
            <p className="mb-8">{TRACES[index].desc}</p>
            <button onClick={next} className="flex items-center gap-2 text-orange-600 font-bold ml-auto">Suivant <ArrowRight className="w-5 h-5" /></button>
          </div>
        )}
      </div>
    </div>
  );
};

const RgpdLevel = ({ onComplete }) => {
  const RIGHTS = [
    { id: 'acces', icon: Search, label: "Droit d'accès", desc: "Savoir ce qu'on sait sur moi." },
    { id: 'rectification', icon: Edit3, label: "Droit de rectification", desc: "Corriger l'inexact." },
    { id: 'effacement', icon: Trash2, label: "Droit à l'effacement", desc: "Être oublié." },
    { id: 'opposition', icon: Hand, label: "Droit d'opposition", desc: "Refuser l'usage marketing." },
  ];
  const [completed, setCompleted] = useState([]);
  const [selected, setSelected] = useState(null);

  const handleConfirm = (id) => {
    const next = [...completed, id];
    setCompleted(next);
    setSelected(null);
    if (next.length === RIGHTS.length) setTimeout(() => onComplete(100), 1000);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 text-center">
      <h2 className="text-3xl font-bold mb-12">Mission 4 : Le Bouclier RGPD</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {RIGHTS.map(right => (
          <button key={right.id} onClick={() => setSelected(right.id)} className={`p-8 rounded-3xl border-2 transition-all ${completed.includes(right.id) ? 'bg-emerald-50 border-emerald-200' : selected === right.id ? 'bg-orange-50 border-orange-500' : 'bg-white border-stone-100'}`}>
            <right.icon className="w-8 h-8 mx-auto mb-4 text-stone-400" />
            <h3 className="font-bold">{right.label}</h3>
            {selected === right.id && !completed.includes(right.id) && (
              <div className="mt-4 animate-in fade-in">
                <p className="text-xs mb-4">{right.desc}</p>
                <button onClick={(e) => { e.stopPropagation(); handleConfirm(right.id); }} className="w-full py-2 bg-orange-600 text-white rounded-xl text-xs font-bold">Compris !</button>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

const SecurityLevel = ({ onComplete }) => {
  const QUESTIONS = [
    { text: "Le meilleur mot de passe ?", options: ["123456", "DateNaissance", "J@m2f@F!2024"], correct: 2, explanation: "Complexe et sans données perso." },
    { text: "Compte bloqué, cliquez ici ! ?", options: ["Urgence", "Phishing", "Erreur"], correct: 1, explanation: "C'est de l'hameçonnage." },
  ];
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (idx) => {
    if (showExplanation) return;
    setSelected(idx); setShowExplanation(true);
    if (idx === QUESTIONS[qIndex].correct) setScore(s => s + 50);
  };

  const next = () => {
    if (qIndex < QUESTIONS.length - 1) { setQIndex(prev => prev + 1); setSelected(null); setShowExplanation(false); }
    else onComplete(score);
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-12">Mission Finale : Gardien du Web</h2>
      <div className="bg-white rounded-3xl p-10 shadow-xl border border-stone-100">
        <h3 className="text-2xl font-bold mb-8">{QUESTIONS[qIndex].text}</h3>
        <div className="grid gap-4 mb-8">
          {QUESTIONS[qIndex].options.map((opt, i) => (
            <button key={i} onClick={() => handleSelect(i)} disabled={showExplanation} className={`p-5 rounded-2xl text-left font-semibold border-2 ${showExplanation ? (i === QUESTIONS[qIndex].correct ? 'bg-emerald-50 border-emerald-500' : (selected === i ? 'bg-red-50 border-red-500' : 'opacity-40')) : 'hover:border-orange-500'}`}>
              {opt}
            </button>
          ))}
        </div>
        {showExplanation && (
          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
            <p className="text-sm mb-6 italic">{QUESTIONS[qIndex].explanation}</p>
            <button onClick={next} className="bg-stone-900 text-white px-8 py-2 rounded-xl font-bold ml-auto block">Suivant</button>
          </div>
        )}
      </div>
    </div>
  );
};

const FinalSummary = ({ progress, onRestart }) => {
  const totalScore = progress.reduce((acc, curr) => acc + curr.score, 0);
  return (
    <div className="max-w-4xl mx-auto py-12 text-center">
      <div className="mb-12 animate-in zoom-in duration-700">
        <div className="inline-flex items-center justify-center w-32 h-32 bg-orange-100 rounded-full mb-8 relative"><Trophy className="w-16 h-16 text-orange-600" /></div>
        <h2 className="text-5xl font-bold mb-4">Bravo, Explorateur !</h2>
        <p className="text-xl text-stone-600">Tu as complété toutes les missions UAA4.</p>
      </div>
      <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-stone-100 mb-12 flex flex-col items-center">
          <span className="text-stone-400 font-bold uppercase text-xs tracking-widest block mb-1">Score Global</span>
          <span className="text-6xl font-black text-stone-900 mb-8">{totalScore} <span className="text-2xl text-stone-300 font-normal">pts</span></span>
          <button onClick={onRestart} className="flex items-center gap-2 px-8 py-4 bg-orange-600 text-white rounded-2xl font-bold shadow-lg shadow-orange-200">
              <RefreshCcw className="w-5 h-5" /> Rejouer
          </button>
      </div>
    </div>
  );
};

// --- APPLICATION PRINCIPALE ---

const App = () => {
  const [currentLevel, setCurrentLevel] = useState(LevelId.INTRO);
  const [progress, setProgress] = useState([
    { id: LevelId.INTRO, completed: true, score: 0 },
    { id: LevelId.GROUPS, completed: false, score: 0 },
    { id: LevelId.IDENTITY, completed: false, score: 0 },
    { id: LevelId.TRACES, completed: false, score: 0 },
    { id: LevelId.RGPD, completed: false, score: 0 },
    { id: LevelId.SECURITY, completed: false, score: 0 },
  ]);

  const updateProgress = (levelId, score) => {
    setProgress(prev => prev.map(p => p.id === levelId ? { ...p, completed: true, score } : p));
  };

  const nextLevel = () => {
    const seq = [LevelId.INTRO, LevelId.GROUPS, LevelId.IDENTITY, LevelId.TRACES, LevelId.RGPD, LevelId.SECURITY, LevelId.CONCLUSION];
    const currentIndex = seq.indexOf(currentLevel);
    if (currentIndex < seq.length - 1) setCurrentLevel(seq[currentIndex + 1]);
  };

  const renderLevel = () => {
    switch (currentLevel) {
      case LevelId.INTRO: return <IntroScreen onStart={nextLevel} />;
      case LevelId.GROUPS: return <GroupsLevel onComplete={(s) => { updateProgress(LevelId.GROUPS, s); nextLevel(); }} />;
      case LevelId.IDENTITY: return <IdentityLevel onComplete={(s) => { updateProgress(LevelId.IDENTITY, s); nextLevel(); }} />;
      case LevelId.TRACES: return <TracesLevel onComplete={(s) => { updateProgress(LevelId.TRACES, s); nextLevel(); }} />;
      case LevelId.RGPD: return <RgpdLevel onComplete={(s) => { updateProgress(LevelId.RGPD, s); nextLevel(); }} />;
      case LevelId.SECURITY: return <SecurityLevel onComplete={(s) => { updateProgress(LevelId.SECURITY, s); nextLevel(); }} />;
      case LevelId.CONCLUSION: return <FinalSummary progress={progress} onRestart={() => window.location.reload()} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500">
      <header className="bg-white border-b border-stone-200 px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center"><Map className="text-orange-600 w-6 h-6" /></div>
            <div><h1 className="text-xl font-bold text-stone-800 leading-tight">UAA4 Quest</h1><p className="text-xs text-stone-500 uppercase tracking-widest">Identité Numérique</p></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-orange-600 font-semibold"><Award className="w-5 h-5" /><span>{progress.reduce((a, c) => a + c.score, 0)}</span></div>
        </div>
      </header>
      <main className="flex-grow flex flex-col max-w-5xl mx-auto w-full p-6 pb-24">{renderLevel()}</main>
      <footer className="fixed bottom-4 left-0 right-0 flex justify-center pointer-events-none">
        <div className="bg-stone-900/80 backdrop-blur-md px-6 py-3 rounded-full flex gap-2 pointer-events-auto shadow-2xl">
          {progress.slice(1).map(p => <div key={p.id} className={`w-3 h-3 rounded-full ${p.completed ? 'bg-orange-500' : currentLevel === p.id ? 'bg-orange-300' : 'bg-stone-700'}`} />)}
        </div>
      </footer>
    </div>
  );
};

// Initialisation via React 19 createRoot
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}

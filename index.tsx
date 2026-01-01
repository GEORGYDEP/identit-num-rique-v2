
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  ChevronRight, Award, Map, RefreshCcw, ShieldCheck, Users, Globe, 
  CheckCircle2, XCircle, Info, HelpCircle, User, MousePointer2, 
  ArrowRight, Shield, Trash2, Edit3, Search, Share2, Hand, 
  ShieldAlert, Lock, Mail, AlertTriangle, Trophy, Heart 
} from 'lucide-react';

// --- DOMAIN TYPES ---
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

// --- GAME COMPONENTS ---

const IntroScreen = ({ onStart }) => (
  <div className="flex flex-col items-center text-center py-12 animate-fade-up">
    <div className="inline-block px-4 py-1.5 mb-6 bg-orange-50 text-orange-700 rounded-full text-sm font-semibold tracking-wide border border-orange-100">
      MISSION ÉDUCATIVE : UAA4
    </div>
    <h1 className="text-5xl md:text-7xl font-bold text-stone-900 mb-8 max-w-4xl leading-tight">
      L'Identité à l'Ère <span className="text-orange-600">Numérique</span>
    </h1>
    <p className="text-lg md:text-xl text-stone-600 mb-12 max-w-2xl leading-relaxed">
      Un voyage interactif pour les élèves de 5e et 6e technique. Apprends à maîtriser ton image sociale et tes droits numériques.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 w-full max-w-4xl">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 flex flex-col items-center hover:shadow-md transition-shadow">
          <Users className="w-10 h-10 text-orange-500 mb-4" />
          <h3 className="font-bold text-stone-800 mb-2">Social</h3>
          <p className="text-sm text-stone-500">Comprends tes appartenances aux groupes.</p>
      </div>
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 flex flex-col items-center hover:shadow-md transition-shadow">
          <Globe className="w-10 h-10 text-blue-500 mb-4" />
          <h3 className="font-bold text-stone-800 mb-2">Traces</h3>
          <p className="text-sm text-stone-500">Gère tes empreintes volontaires et passives.</p>
      </div>
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 flex flex-col items-center hover:shadow-md transition-shadow">
          <ShieldCheck className="w-10 h-10 text-emerald-500 mb-4" />
          <h3 className="font-bold text-stone-800 mb-2">Défense</h3>
          <p className="text-sm text-stone-500">Maîtrise le RGPD et tes droits citoyens.</p>
      </div>
    </div>
    <button onClick={onStart} className="group relative inline-flex items-center gap-3 bg-stone-900 text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-orange-600 transition-all transform hover:scale-105 shadow-2xl">
      Démarrer la Quête <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
    </button>
  </div>
);

const GroupsLevel = ({ onComplete }) => {
  const ITEMS = [
    { id: '1', text: "Ma famille", type: 'primaire' },
    { id: '2', text: "File d'attente à la gare", type: 'agregat' },
    { id: '3', text: "Les 17-18 ans de Belgique", type: 'statistique' },
    { id: '4', text: "Mes meilleurs amis", type: 'primaire' },
    { id: '5', text: "Le club de judo", type: 'secondaire' },
    { id: '6', text: "Foule dans un centre commercial", type: 'agregat' },
    { id: '7', text: "Les utilisateurs de TikTok", type: 'statistique' },
    { id: '8', text: "Ma classe de 6e Technique", type: 'secondaire' },
  ];
  const CATEGORIES = [
    { id: 'agregat', label: 'Agrégat', desc: 'Simple proximité physique.' },
    { id: 'statistique', label: 'Catégorie', desc: 'Critère commun sans liens.' },
    { id: 'primaire', label: 'G. Primaire', desc: 'Liens affectifs intenses.' },
    { id: 'secondaire', label: 'G. Secondaire', desc: 'But commun, plus formel.' },
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
        onComplete(correctCount * 12);
      }
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 animate-fade-up">
      <div className="flex justify-between items-end mb-12">
        <div><h2 className="text-4xl font-bold text-stone-800 mb-2">Mission 1 : Le Grand Tri Social</h2><p className="text-stone-500">Identifie la nature de ces regroupements humains.</p></div>
        <div className="text-stone-400 font-bold bg-white px-4 py-2 rounded-full shadow-sm border border-stone-100">{currentIndex + 1} / {ITEMS.length}</div>
      </div>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl border-4 border-dashed border-stone-100 flex flex-col items-center justify-center text-center h-80 transition-all transform">
            {showFeedback === true && <div className="absolute inset-0 bg-emerald-500/10 rounded-[2.5rem] flex items-center justify-center animate-in zoom-in duration-300"><CheckCircle2 className="w-24 h-24 text-emerald-500" /></div>}
            {showFeedback === false && <div className="absolute inset-0 bg-red-500/10 rounded-[2.5rem] flex items-center justify-center animate-in zoom-in duration-300"><XCircle className="w-24 h-24 text-red-500" /></div>}
            <HelpCircle className="w-16 h-16 text-orange-200 mb-6" />
            <span className="text-3xl font-bold text-stone-800 leading-tight">{ITEMS[currentIndex].text}</span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => handleSelect(cat.id)} disabled={showFeedback !== null} className="group flex flex-col p-5 bg-white rounded-2xl border-2 border-transparent hover:border-orange-500 hover:shadow-xl transition-all text-left shadow-sm">
              <span className="font-bold text-xl text-stone-800 group-hover:text-orange-600 mb-1">{cat.label}</span>
              <span className="text-sm text-stone-500 leading-tight">{cat.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const IdentityLevel = ({ onComplete }) => {
  const ELEMENTS = [
    { id: '1', text: "Mon ADN", category: 'personnelle' },
    { id: '2', text: "Mon club de sport", category: 'collective' },
    { id: '3', text: "Mon style vestimentaire", category: 'personnelle' },
    { id: '4', text: "Ma culture d'origine", category: 'collective' },
    { id: '5', text: "Mon empreinte digitale", category: 'personnelle' },
    { id: '6', text: "Mes groupes WhatsApp", category: 'collective' },
    { id: '7', text: "Mon école technique", category: 'collective' },
    { id: '8', text: "Mon orientation sexuelle", category: 'personnelle' },
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
    <div className="max-w-5xl mx-auto py-8 animate-fade-up">
      <div className="text-center mb-16"><h2 className="text-4xl font-bold text-stone-800 mb-3">Mission 2 : Ton Équilibre Identitaire</h2><p className="text-stone-500 text-lg">L'identité sociale oscille entre ce qui te rend unique et ce qui te lie aux autres.</p></div>
      <div className="grid md:grid-cols-2 gap-10 mb-16">
        <div className="bg-blue-50/50 p-10 rounded-[3rem] border-2 border-dashed border-blue-200 min-h-[350px] flex flex-col items-center shadow-inner">
            <User className="w-12 h-12 text-blue-600 mb-6" /><h3 className="text-2xl font-bold text-blue-800 mb-8 tracking-wide">Identité Personnelle</h3>
            <div className="flex flex-wrap gap-3 justify-center">{ELEMENTS.filter(i => placed[i.id] === 'personnelle').map(i => <div key={i.id} className="bg-white px-5 py-2.5 rounded-2xl shadow-sm border border-blue-100 flex items-center gap-2 text-sm font-bold animate-in zoom-in text-blue-700"><CheckCircle2 className="w-4 h-4 text-emerald-500" />{i.text}</div>)}</div>
        </div>
        <div className="bg-orange-50/50 p-10 rounded-[3rem] border-2 border-dashed border-orange-200 min-h-[350px] flex flex-col items-center shadow-inner">
            <Users className="w-12 h-12 text-orange-600 mb-6" /><h3 className="text-2xl font-bold text-orange-800 mb-8 tracking-wide">Identité Collective</h3>
            <div className="flex flex-wrap gap-3 justify-center">{ELEMENTS.filter(i => placed[i.id] === 'collective').map(i => <div key={i.id} className="bg-white px-5 py-2.5 rounded-2xl shadow-sm border border-orange-100 flex items-center gap-2 text-sm font-bold animate-in zoom-in text-orange-700"><CheckCircle2 className="w-4 h-4 text-emerald-500" />{i.text}</div>)}</div>
        </div>
      </div>
      <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-stone-100 flex flex-wrap gap-6 justify-center">
          {currentItems.map(item => (
            <div key={item.id} className="flex gap-2 group transform transition-all hover:scale-105">
                <button onClick={() => handlePlace(item.id, 'personnelle')} className="p-4 bg-stone-50 hover:bg-blue-100 text-blue-600 rounded-2xl border border-stone-200"><User className="w-6 h-6" /></button>
                <div className="px-8 py-4 bg-white border border-stone-200 rounded-2xl flex items-center font-bold text-stone-800 min-w-[150px] justify-center shadow-sm">{item.text}</div>
                <button onClick={() => handlePlace(item.id, 'collective')} className="p-4 bg-stone-50 hover:bg-orange-100 text-orange-600 rounded-2xl border border-stone-200"><Users className="w-6 h-6" /></button>
            </div>
          ))}
          {currentItems.length === 0 && <div className="text-emerald-600 font-black text-2xl flex items-center gap-4 py-4 animate-bounce"><CheckCircle2 className="w-10 h-10" /> Mission Accomplie !</div>}
      </div>
    </div>
  );
};

const TracesLevel = ({ onComplete }) => {
  const TRACES = [
    { id: '1', text: "Mon historique de navigation", type: 'involontaire', desc: "Géré par ton navigateur et ton FAI." },
    { id: '2', text: "Post d'un commentaire sur un blog", type: 'volontaire', desc: "Une action consciente de partage." },
    { id: '3', text: "Pixels espions dans les mails", type: 'involontaire', desc: "Sachent si tu as ouvert le mail." },
    { id: '4', text: "Remplir un profil LinkedIn", type: 'volontaire', desc: "Mise en avant choisie de ton parcours." },
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
    <div className="max-w-4xl mx-auto py-8 animate-fade-up">
      <h2 className="text-4xl font-bold text-center mb-12">Mission 3 : Ombre et Lumière Numérique</h2>
      <div className="bg-white rounded-[3.5rem] shadow-2xl overflow-hidden border border-stone-100">
        <div className="p-16 text-center bg-stone-50 border-b border-stone-100">
            <MousePointer2 className="w-16 h-16 text-orange-400 mx-auto mb-8 animate-pulse" />
            <h3 className="text-4xl font-extrabold text-stone-800 mb-10 leading-snug">{TRACES[index].text}</h3>
            {!reveal && (
              <div className="flex gap-6 justify-center">
                <button onClick={() => handleChoice('volontaire')} className="px-10 py-4 bg-emerald-600 text-white rounded-full font-bold shadow-lg hover:bg-emerald-700 transition-all">Trace Volontaire</button>
                <button onClick={() => handleChoice('involontaire')} className="px-10 py-4 bg-rose-600 text-white rounded-full font-bold shadow-lg hover:bg-rose-700 transition-all">Trace Involontaire</button>
              </div>
            )}
        </div>
        {reveal && (
          <div className="p-16 animate-in fade-in slide-in-from-top-6 bg-white">
            <h4 className="text-2xl font-bold mb-4 text-orange-600">Résultat : Trace {TRACES[index].type}</h4>
            <p className="text-lg text-stone-600 mb-10 leading-relaxed">{TRACES[index].desc}</p>
            <button onClick={next} className="flex items-center gap-3 bg-stone-900 text-white px-8 py-3 rounded-full font-bold ml-auto hover:bg-orange-600 transition-colors">Trace Suivante <ArrowRight className="w-5 h-5" /></button>
          </div>
        )}
      </div>
    </div>
  );
};

const FinalSummary = ({ progress, onRestart }) => {
  const totalScore = progress.reduce((acc, curr) => acc + curr.score, 0);
  return (
    <div className="max-w-4xl mx-auto py-16 text-center animate-fade-up">
      <div className="mb-12">
        <div className="inline-flex items-center justify-center w-40 h-40 bg-orange-100 rounded-full mb-10 relative shadow-inner">
          <Trophy className="w-20 h-20 text-orange-600" />
          <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold border-4 border-white shadow-lg">✓</div>
        </div>
        <h2 className="text-6xl font-black text-stone-900 mb-6">Félicitations !</h2>
        <p className="text-2xl text-stone-500 max-w-2xl mx-auto leading-relaxed">Tu maîtrises désormais les enjeux de l'UAA4. Prêt pour ton examen ?</p>
      </div>
      <div className="bg-white p-16 rounded-[4rem] shadow-2xl border border-stone-100 mb-16 flex flex-col items-center">
          <span className="text-stone-400 font-black uppercase text-sm tracking-[0.3em] block mb-4">Total Points Récoltés</span>
          <span className="text-8xl font-black text-stone-900 mb-12 tracking-tight">{totalScore} <span className="text-3xl text-stone-200 font-normal">pts</span></span>
          <div className="flex gap-4">
             <button onClick={onRestart} className="flex items-center gap-3 px-10 py-5 bg-orange-600 text-white rounded-[2rem] font-black text-lg shadow-xl shadow-orange-200 hover:bg-orange-700 transition-all transform hover:scale-105 active:scale-95">
                <RefreshCcw className="w-6 h-6" /> Recommencer l'Aventure
             </button>
             <button onClick={() => window.print()} className="flex items-center gap-3 px-10 py-5 bg-stone-100 text-stone-700 rounded-[2rem] font-black text-lg hover:bg-stone-200 transition-all">
                <Share2 className="w-6 h-6" /> Partager mon Score
             </button>
          </div>
      </div>
      <p className="text-stone-400 font-serif italic text-xl">"Ta vie numérique est le reflet de tes choix."</p>
    </div>
  );
};

// --- MAIN APP LOGIC ---

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
      case LevelId.RGPD: return <FinalSummary progress={progress} onRestart={() => window.location.reload()} />;
      default: return <IntroScreen onStart={nextLevel} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col transition-all duration-700">
      <header className="bg-white/80 backdrop-blur-md border-b border-stone-200 px-8 py-6 flex justify-between items-center shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200 transform -rotate-3 hover:rotate-0 transition-transform"><Map className="text-white w-7 h-7" /></div>
            <div><h1 className="text-2xl font-black text-stone-900 tracking-tight leading-none mb-1">UAA4 Quest</h1><p className="text-xs text-stone-400 font-bold uppercase tracking-widest">Technique Secondaire • Belgique</p></div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-stone-50 px-5 py-2.5 rounded-2xl border border-stone-100 shadow-inner">
            <Award className="w-5 h-5 text-orange-600" />
            <span className="font-black text-stone-900 text-lg leading-none">{progress.reduce((a, c) => a + c.score, 0)}</span>
          </div>
        </div>
      </header>
      <main className="flex-grow flex flex-col max-w-6xl mx-auto w-full p-8 md:p-12">{renderLevel()}</main>
      <footer className="fixed bottom-8 left-0 right-0 flex justify-center pointer-events-none z-40">
        <div className="bg-stone-900/90 backdrop-blur-xl px-10 py-5 rounded-[2.5rem] flex gap-4 pointer-events-auto shadow-2xl border border-white/10">
          {progress.slice(1).map(p => <div key={p.id} className={`w-4 h-4 rounded-full transition-all duration-500 ${p.completed ? 'bg-orange-500 shadow-[0_0_15px_rgba(234,88,12,0.5)]' : currentLevel === p.id ? 'bg-orange-300 w-10' : 'bg-stone-800'}`} />)}
        </div>
      </footer>
    </div>
  );
};

// --- BOOTSTRAP REACT 19 ---
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}


import React, { useState } from 'react';
import { LevelId, LevelProgress } from './types';
import IntroScreen from './components/IntroScreen';
import GroupsLevel from './levels/GroupsLevel';
import IdentityLevel from './levels/IdentityLevel';
import TracesLevel from './levels/TracesLevel';
import RgpdLevel from './levels/RgpdLevel';
import SecurityLevel from './levels/SecurityLevel';
import FinalSummary from './components/FinalSummary';
import { ChevronRight, Award, Map, RefreshCcw } from 'lucide-react';

const App: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState<LevelId>(LevelId.INTRO);
  const [progress, setProgress] = useState<LevelProgress[]>([
    { id: LevelId.INTRO, completed: true, score: 0 },
    { id: LevelId.GROUPS, completed: false, score: 0 },
    { id: LevelId.IDENTITY, completed: false, score: 0 },
    { id: LevelId.TRACES, completed: false, score: 0 },
    { id: LevelId.RGPD, completed: false, score: 0 },
    { id: LevelId.SECURITY, completed: false, score: 0 },
  ]);

  const updateProgress = (levelId: LevelId, score: number) => {
    setProgress(prev => prev.map(p => 
      p.id === levelId ? { ...p, completed: true, score } : p
    ));
  };

  const nextLevel = () => {
    const sequence = [
      LevelId.INTRO, 
      LevelId.GROUPS, 
      LevelId.IDENTITY, 
      LevelId.TRACES, 
      LevelId.RGPD, 
      LevelId.SECURITY, 
      LevelId.CONCLUSION
    ];
    const currentIndex = sequence.indexOf(currentLevel);
    if (currentIndex < sequence.length - 1) {
      setCurrentLevel(sequence[currentIndex + 1]);
    }
  };

  const resetGame = () => {
    setCurrentLevel(LevelId.INTRO);
    setProgress(prev => prev.map(p => ({ ...p, completed: p.id === LevelId.INTRO, score: 0 })));
  };

  const renderLevel = () => {
    switch (currentLevel) {
      case LevelId.INTRO:
        return <IntroScreen onStart={nextLevel} />;
      case LevelId.GROUPS:
        return <GroupsLevel onComplete={(score) => { updateProgress(LevelId.GROUPS, score); nextLevel(); }} />;
      case LevelId.IDENTITY:
        return <IdentityLevel onComplete={(score) => { updateProgress(LevelId.IDENTITY, score); nextLevel(); }} />;
      case LevelId.TRACES:
        return <TracesLevel onComplete={(score) => { updateProgress(LevelId.TRACES, score); nextLevel(); }} />;
      case LevelId.RGPD:
        return <RgpdLevel onComplete={(score) => { updateProgress(LevelId.RGPD, score); nextLevel(); }} />;
      case LevelId.SECURITY:
        return <SecurityLevel onComplete={(score) => { updateProgress(LevelId.SECURITY, score); nextLevel(); }} />;
      case LevelId.CONCLUSION:
        return <FinalSummary progress={progress} onRestart={resetGame} />;
      default:
        return <IntroScreen onStart={nextLevel} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500">
      {/* Elegant Italian-inspired Header */}
      <header className="bg-white border-b border-stone-200 px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Map className="text-orange-600 w-6 h-6" />
            </div>
            <div>
                <h1 className="text-xl font-bold text-stone-800 leading-tight">UAA4 Quest</h1>
                <p className="text-xs text-stone-500 uppercase tracking-widest">Formation Sociale & Économique</p>
            </div>
        </div>
        
        <nav className="hidden md:flex gap-1">
          {progress.slice(1).map((p, idx) => (
            <div 
              key={p.id}
              className={`w-8 h-2 rounded-full transition-all duration-300 ${
                p.completed ? 'bg-orange-500' : currentLevel === p.id ? 'bg-orange-300 w-12' : 'bg-stone-200'
              }`}
            />
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-orange-600 font-semibold">
            <Award className="w-5 h-5" />
            <span>{progress.reduce((acc, curr) => acc + curr.score, 0)}</span>
          </div>
          <button 
            onClick={resetGame}
            className="p-2 hover:bg-stone-100 rounded-full text-stone-400 transition-colors"
            title="Recommencer"
          >
            <RefreshCcw className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="flex-grow flex flex-col max-w-5xl mx-auto w-full p-6 pb-24">
        {renderLevel()}
      </main>

      {/* Footer Navigation (Mobile Sticky) */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-stone-200 p-4 flex justify-center z-40 md:hidden">
         <div className="flex gap-2">
            {progress.slice(1).map((p) => (
              <div 
                key={p.id}
                className={`w-3 h-3 rounded-full ${
                  p.completed ? 'bg-orange-500' : currentLevel === p.id ? 'bg-orange-300' : 'bg-stone-200'
                }`}
              />
            ))}
         </div>
      </footer>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import QuizScreen from './screens/QuizScreen';
import InventoryScreen from './screens/InventoryScreen';
import EnigmaScreen from './screens/EnigmaScreen';
import VictoryScreen from './screens/VictoryScreen';
import { treasuresData } from './data/treasures';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [activeTreasure, setActiveTreasure] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  const [treasures, setTreasures] = useState(() => {
    const saved = localStorage.getItem('mlp_treasures_status');
    return saved ? JSON.parse(saved) : treasuresData.map(t => ({ ...t, status: 'locked' }));
  });

  const [inventoryOrder, setInventoryOrder] = useState(() => {
    const saved = localStorage.getItem('mlp_inventory_order');
    return saved ? JSON.parse(saved) : treasuresData.map(t => t.id);
  });

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('mlp_treasures_status', JSON.stringify(treasures));
  }, [treasures]);

  useEffect(() => {
    localStorage.setItem('mlp_inventory_order', JSON.stringify(inventoryOrder));
  }, [inventoryOrder]);

  const handleAnswerQuiz = (selectedOptionIndex) => {
    const isCorrect = selectedOptionIndex === activeTreasure.quiz.correctAnswerIndex;
    setTreasures(prev => prev.map(t => {
      if (t.id === activeTreasure.id) {
        return { ...t, status: isCorrect ? 'complete' : 'incomplete' };
      }
      return t;
    }));
    setCurrentScreen('inventory');
    setActiveTreasure(null);
  };

  const handleValidateEnigma = (textInput) => {
    const cleanInput = textInput.trim().toUpperCase();
    if (cleanInput === "AMIZADE É MÁGICA" || cleanInput === "AMIZADE E MAGICA") {
      setCurrentScreen('victory');
    } else {
      alert("Oops! A palavra secreta não está certa. Vamos tentar de novo!");
    }
  };

  const showBottomNav = currentScreen === 'map' || currentScreen === 'inventory';

  return (
    <div className={`app-container ${showBottomNav ? 'with-bottom-nav' : ''}`}>
      {!isOnline && <div className="offline-banner">⚠️ Estás a jogar sem internet. O teu jogo está guardado!</div>}

      {currentScreen === 'welcome' && (
        <WelcomeScreen onStart={() => setCurrentScreen('map')} />
      )}
      
      {currentScreen === 'map' && (
        <MapScreen 
          treasuresState={treasures}
          onOpenQuiz={(treasure) => {
            setActiveTreasure(treasure);
            setCurrentScreen('quiz');
          }} 
        />
      )}
      
      {currentScreen === 'quiz' && activeTreasure && (
        <QuizScreen 
          guardianName={activeTreasure.guardian}
          question={activeTreasure.quiz.question}
          options={activeTreasure.quiz.options}
          onAnswer={handleAnswerQuiz}
          onBack={() => {
            setActiveTreasure(null);
            setCurrentScreen('map');
          }}
        />
      )}
      
      {currentScreen === 'inventory' && (
        <InventoryScreen 
          clues={inventoryOrder.map(id => treasures.find(t => t.id === id))}
          onUpdateOrder={setInventoryOrder}
          onCheckEnigma={() => setCurrentScreen('enigma')}
        />
      )}
      
      {currentScreen === 'enigma' && (
        <EnigmaScreen 
          onValidate={handleValidateEnigma} 
          onBack={() => setCurrentScreen('inventory')}
        />
      )}
      
      {currentScreen === 'victory' && (
        <VictoryScreen onRestart={() => {
          localStorage.clear();
          setTreasures(treasuresData.map(t => ({ ...t, status: 'locked' })));
          setInventoryOrder(treasuresData.map(t => t.id));
          setCurrentScreen('welcome');
        }} />
      )}

      {showBottomNav && (
        <nav className="bottom-nav">
          <button 
            className={`nav-btn ${currentScreen === 'map' ? 'active' : ''}`}
            onClick={() => setCurrentScreen('map')}
          >
            <span className="nav-icon">🗺️</span>
            <span>Mapa</span>
          </button>
          
          <button 
            className={`nav-btn ${currentScreen === 'inventory' ? 'active' : ''}`}
            onClick={() => setCurrentScreen('inventory')}
          >
            <span className="nav-icon">🎒</span>
            <span>Mochila</span>
          </button>
        </nav>
      )}
    </div>
  );
}
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
    if (saved) return JSON.parse(saved);

    const shuffledIds = treasuresData.map(t => t.id);
    for (let i = shuffledIds.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledIds[i], shuffledIds[j]] = [shuffledIds[j], shuffledIds[i]];
    }
    return shuffledIds;
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

  const handleResetGame = () => {
    if (window.confirm("Você quer mesmo reiniciar o jogo do zero e embaralhar tudo de novo? 🌟")) {
      localStorage.clear();
      
      const resetTreasures = treasuresData.map(t => ({ ...t, status: 'locked' }));
      const resetOrder = treasuresData.map(t => t.id);
      
      for (let i = resetOrder.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [resetOrder[i], resetOrder[j]] = [resetOrder[j], resetOrder[i]];
      }

      setTreasures(resetTreasures);
      setInventoryOrder(resetOrder);
      setCurrentScreen('welcome');
    }
  };

  const handleAnswerQuiz = (selectedOptionIndex) => {
    const isCorrect = selectedOptionIndex === activeTreasure.quiz.correctAnswerIndex;
    
    setTreasures(prev => prev.map(t => {
      if (t.id === activeTreasure.id) {
        return { ...t, status: isCorrect ? 'complete' : 'incomplete' };
      }
      return t;
    }));

    if (isCorrect) {
      setCurrentScreen('inventory');
    } else {
      alert("Resposta incorreta! Tente falar com a guardiã no mapa novamente. 🌟");
      setCurrentScreen('map');
    }
    
    setActiveTreasure(null);
  };

  const handleValidateEnigma = (textInput) => {
    const cleanInput = textInput.trim().toUpperCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (cleanInput === "PONEIS DO PONAI SAO PONEIS DE TI") {
      setCurrentScreen('victory');
    } else {
      alert("A frase secreta está errada heinn, verifique a ordem na mochila e tente novamente!");
    }
  };

  const showBottomNav = currentScreen === 'map' || currentScreen === 'inventory';

  return (
    <div className={`app-container ${showBottomNav ? 'with-bottom-nav' : ''}`}>
      {!isOnline && <div className="offline-banner">Sua internet foi de base, mas seu joguinho tá guardado!</div>}

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
          onResetGame={handleResetGame} // Passando a ação pro botão do mapa
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
          onCheckEnigma={() => {
            const todosCompletos = treasures.every(t => t.status === 'complete');
            if (todosCompletos) {
              setCurrentScreen('enigma');
            } else {
              alert("Você precisa coletar e acertar todas as pistas mágicas no mapa antes de tentar decifrar o enigma! 🌟");
            }
          }}
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
          
          const resetTreasures = treasuresData.map(t => ({ ...t, status: 'locked' }));
          const resetOrder = treasuresData.map(t => t.id);
          for (let i = resetOrder.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [resetOrder[i], resetOrder[j]] = [resetOrder[j], resetOrder[i]];
          }

          setTreasures(resetTreasures);
          setInventoryOrder(resetOrder);
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
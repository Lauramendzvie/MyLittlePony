import { useState, useEffect } from 'react';

const STORAGE_KEYS = {
  TREASURES_STATUS: 'mlp_treasures_status',
  GAME_PROGRESS: 'mlp_game_progress',
  QUIZ_HISTORY: 'mlp_quiz_history'
};

export const usePersistence = () => {
  const [treasureStatus, setTreasureStatus] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TREASURES_STATUS);
    return saved ? JSON.parse(saved) : {}; 
  });

  const [gameProgress, setGameProgress] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.GAME_PROGRESS);
    return saved ? JSON.parse(saved) : { currentPoints: 0, unlockedPoints: [1], inventoryOrder: [1, 2, 3, 4, 5, 6] };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TREASURES_STATUS, JSON.stringify(treasureStatus));
  }, [treasureStatus]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GAME_PROGRESS, JSON.stringify(gameProgress));
  }, [gameProgress]);

  return { treasureStatus, setTreasureStatus, gameProgress, setGameProgress };
};
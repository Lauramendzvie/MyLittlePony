import React, { useState } from 'react';

export default function InventoryScreen({ clues, onUpdateOrder, onCheckEnigma }) {
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleKeyDown = (e, index) => {
    if (e.key === 'ArrowUp' && index > 0) {
      e.preventDefault();
      swapItems(index, index - 1);
    } else if (e.key === 'ArrowDown' && index < clues.length - 1) {
      e.preventDefault();
      swapItems(index, index + 1);
    }
  };

  const swapItems = (fromIndex, toIndex) => {
    const newOrder = [...clues.map(c => c.id)];
    const temp = newOrder[fromIndex];
    newOrder[fromIndex] = newOrder[toIndex];
    newOrder[toIndex] = temp;
    onUpdateOrder(newOrder);
  };

  return (
    <div className="screen-layout">
      <header className="screen-header">
        <div className="header-title">
          🎒 A Tua Mochila
        </div>
      </header>

      <div className="inventory-stack">
        <p style={{ textAlign: 'center', color: 'var(--text-soft)', fontSize: '16px', fontWeight: '600' }}>
          Pressiona e arrasta os blocos para formar a frase!
        </p>
        
        {clues.map((clue, index) => {
          const isUnlocked = clue.status && clue.status !== 'locked';
          const textToShow = clue.status === 'complete' ? clue.reward.complete : clue.reward.incomplete;

          return (
            <div
              key={clue.id}
              tabIndex={isUnlocked ? "0" : "-1"}
              draggable={isUnlocked}
              onDragStart={() => setDraggedIndex(index)}
              onDragOver={(e) => {
                e.preventDefault();
                if (draggedIndex === null || draggedIndex === index) return;
                swapItems(draggedIndex, index);
                setDraggedIndex(index);
              }}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`clue-slot ${!isUnlocked ? 'locked' : ''}`}
            >
              {isUnlocked ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '24px' }}>⭐</span>
                    <span className="clue-text">{textToShow}</span>
                  </div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '24px' }}>↕️</span>
                </>
              ) : (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '24px' }}>🔒</span>
                    <span style={{ fontSize: '16px', color: 'var(--text-soft)' }}>Pista Trancada</span>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
        <button onClick={onCheckEnigma} className="btn-primary-warm" style={{ background: 'linear-gradient(135deg, var(--color-sun) 0%, #f59e0b 100%)', color: '#78350f' }}>
          Abrir o Segredo Final 🗝️
        </button>
      </div>
    </div>
  );
}
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
          Sua mochila
        </div>
      </header>

      <div className="inventory-stack">
        <p style={{ textAlign: 'center', color: 'var(--text-soft)', fontSize: '16px', fontWeight: '600' }}>
          Arraste os bloquinhos pra formar a frase mágica do PONAI
        </p>
        
        {clues.map((clue, index) => {
          const isUnlocked = clue.status && clue.status !== 'locked';
          const textToShow = clue.status === 'complete' ? clue.clue : "Pista Trancada";

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
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px',
                textAlign: 'center',
                cursor: isUnlocked ? 'grab' : 'not-allowed'
              }}
            >
              {isUnlocked ? (
                <span className="clue-text" style={{ fontSize: '18px', fontWeight: '700' }}>
                  {textToShow}
                </span>
              ) : (
                <span style={{ fontSize: '16px', color: 'var(--text-soft)', opacity: 0.6 }}>
                  🔒 Trancado
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
        <button onClick={onCheckEnigma} className="btn-primary-warm" style={{ background: 'linear-gradient(135deg, var(--color-sun) 0%, #f59e0b 100%)', color: '#78350f' }}>
          Abrir o Segredoca Final 
        </button>
      </div>
    </div>
  );
}
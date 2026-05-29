import React from 'react';

export default function MapScreen({ treasuresState, onOpenQuiz, onResetGame }) {
  const ponyColors = {
    'Twilight Sparkle': { glow: 'var(--color-magic)', border: '#c084fc' },
    'Fluttershy': { glow: 'var(--color-sun)', border: '#fef08a' },
    'Applejack': { glow: '#f97316', border: '#fde047' },
    'Rarity': { glow: '#e9d5ff', border: 'var(--color-loyalty)' },
    'Rainbow Dash': { glow: 'var(--color-loyalty)', border: '#38bdf8' },
    'Pinkie Pie': { glow: 'var(--color-love)', border: '#f472b6' },
    'Spike': { glow: '#22c55e', border: '#86efac' }
  };

  return (
    <div className="screen-layout">
      <header 
        className="screen-header" 
        style={{ 
          border: '2px solid var(--color-love)', 
          boxShadow: 'var(--glow-warm)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 24px'
        }}
      >
        <h2 className="header-title" style={{ margin: 0 }}>🗺️ Mapa de Equestria do PONAI</h2>
        
        <button 
          onClick={onResetGame}
          style={{
            background: 'rgba(244, 114, 182, 0.2)',
            border: '1px solid var(--color-love)',
            color: 'var(--text-pure)',
            padding: '6px 14px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => e.target.style.background = 'var(--color-love)'}
          onMouseLeave={(e) => e.target.style.background = 'rgba(244, 114, 182, 0.2)'}
        >
          🔄 Reiniciar
        </button>
      </header>

      <div 
        style={{
          position: 'relative',
          width: '100%',
          height: '650px', 
          background: 'linear-gradient(180deg, #2b1b54 0%, #16102b 100%)',
          border: '2px solid var(--glass-border)',
          borderRadius: '32px',
          boxShadow: 'var(--shadow-soft)',
          overflow: 'hidden',
          margin: 'auto 0'
        }}
      >
        {treasuresState.map((treasure, index) => {
          const positions = [
            { top: '20%', left: '25%' }, 
            { top: '20%', left: '75%' }, 
            { top: '45%', left: '20%' }, 
            { top: '45%', left: '50%' }, 
            { top: '45%', left: '80%' }, 
            { top: '75%', left: '30%' }, 
            { top: '75%', left: '70%' }, 
          ];

          const pos = positions[index] || { top: '50%', left: '50%' };
          const config = ponyColors[treasure.guardian] || { glow: 'var(--color-love)', border: 'var(--color-love)' };

          let icon = '🔒';
          let isClickable = false;
          let glowStyle = { border: '2px dashed var(--glass-border)', opacity: 0.4 };

          if (treasure.status === 'complete') {
            icon = '✨';
            glowStyle = { 
              boxShadow: '0 0 20px var(--color-success)', 
              border: '3px solid var(--color-success)',
              background: 'rgba(52, 211, 153, 0.15)'
            };
          } else if (treasure.status === 'incomplete') {
            icon = '❌';
            isClickable = true;
            glowStyle = { 
              boxShadow: '0 0 15px var(--color-love)',
              border: '3px solid var(--color-love)',
              background: 'rgba(244, 114, 182, 0.15)'
            };
          } else {
            icon = '💎';
            isClickable = true;
            glowStyle = { 
              boxShadow: `0 0 25px ${config.glow}`, 
              border: `3px solid ${config.border}`,
              background: 'rgba(255, 255, 255, 0.1)'
            };
          }

          return (
            <div
              key={treasure.id}
              style={{
                position: 'absolute',
                top: pos.top,
                left: pos.left,
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                zIndex: 10
              }}
            >
              <button
                onClick={() => isClickable && onOpenQuiz(treasure)}
                disabled={!isClickable}
                style={{
                  background: 'var(--glass-bg)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '50%',
                  width: '68px',
                  height: '68px',
                  fontSize: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: isClickable ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s ease',
                  ...glowStyle
                }}
              >
                {icon}
              </button>
              
              <span style={{
                background: 'rgba(22, 16, 43, 0.9)',
                border: `1px solid ${isClickable ? config.border : 'var(--glass-border)'}`,
                padding: '5px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '800',
                whiteSpace: 'nowrap',
                color: 'var(--text-pure)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
              }}>
                {treasure.guardian}
              </span>
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: 'center', fontSize: '14px', color: 'var(--color-magic)', fontWeight: '600' }}>
        Encontre tudo que seja mágico para poder avançar e descobrir o segredo do PONAAAI 
      </div>
    </div>
  );
}
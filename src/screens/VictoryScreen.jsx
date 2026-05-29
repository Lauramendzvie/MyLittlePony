import React from 'react';

export default function VictoryScreen({ onRestart }) {
  return (
    <div className="screen-layout" style={{ justifyContent: 'center', textAlign: 'center' }}>
      <div className="cozy-card">
        <p style={{ fontSize: '80px', marginBottom: '20px', margin: '0' }}>IUPI</p>
        
        <h1 style={{ 
          fontSize: '40px', 
          fontWeight: '800', 
          background: 'linear-gradient(90deg, var(--color-love) 0%, var(--color-loyalty) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '24px'
        }}>
          PARABÉNS!
        </h1>

        <p style={{ fontSize: '18px', color: 'var(--text-soft)', margin: '0 0 40px 0', lineHeight: '1.6', fontWeight: '600' }}>
          Conseguiuuuu! Você pegou tooodas as pistas, reuniu e descobriu o segredo do PONAI!!!
        </p>
        
        <button onClick={onRestart} className="btn-primary-warm">
          Jogar Outra Vez! 🔄
        </button>
      </div>
    </div>
  );
}
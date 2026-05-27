import React from 'react';

export default function WelcomeScreen({ onStart }) {
  const handleStart = () => {
    console.log("A preparar a viagem...");
    if (onStart) {
      onStart();
    } else {
      console.error("Erro: A função onStart não foi passada pelo App.jsx!");
    }
  };

  return (
    <div className="screen-layout" style={{ justifyContent: 'center' }}>
      <div className="cozy-card">
        <span className="guardian-tag">✨ Jogo dos Tesouros</span>
        
        <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '20px', lineHeight: '1.2' }}>
          Bem-vindo à <span style={{ color: 'var(--color-love)' }}>Aventura!</span>
        </h1>
        
        <p style={{ fontSize: '18px', color: 'var(--text-soft)', marginBottom: '40px', lineHeight: '1.6' }}>
          Vamos passear pelo SENAI, procurar tesouros mágicos escondidos e descobrir um grande segredo das póneis piticas!
        </p>
        
        <button 
          onClick={handleStart} 
          className="btn-primary-warm"
          style={{ position: 'relative', zIndex: 50, cursor: 'pointer' }}
        >
          Começar a Jogar 🚀
        </button>
      </div>
    </div>
  );
}
import React from 'react';

export default function WelcomeScreen({ onStart }) {
  return (
    <div className="screen-layout" style={{ justifyContent: 'center' }}>
      <div className="cozy-card">
        <span className="guardian-tag">✨ Jogo dos Tesouros</span>
        <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '20px', lineHeight: '1.2' }}>
          Bem-vindo à <span style={{ color: 'var(--color-love)' }}>Aventura!</span>
        </h1>
        <p style={{ fontSize: '18px', color: 'var(--text-soft)', marginBottom: '40px', lineHeight: '1.6' }}>
          Vamos passear pelo SENAI, procurar tesouros mágicos escondidos e descobrir um grande segredo!
        </p>
        <button onClick={onStart} className="btn-primary-warm">
          Começar a Brincar 🚀
        </button>
      </div>
    </div>
  );
}
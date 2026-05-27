import React, { useState } from 'react';

export default function EnigmaScreen({ onValidate, onBack }) {
  const [input, setInput] = useState('');

  return (
    <div className="screen-layout" style={{ justifyContent: 'center' }}>
      <div className="cozy-card">
        <p style={{ fontSize: '60px', marginBottom: '16px' }}>🏰</p>
        <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '16px' }}>O Grande Segredo</h2>
        <p style={{ fontSize: '18px', color: 'var(--text-soft)', marginBottom: '32px', lineHeight: '1.5' }}>
          Junta as palavras da tua mochila e escreve a frase mágica aqui!
        </p>
        
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escreve aqui..."
          className="friendly-input"
          style={{ marginBottom: '32px' }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <button onClick={() => onValidate(input)} className="btn-primary-warm">
            Verificar Magia ✨
          </button>
          <button onClick={onBack} className="btn-secondary-warm">
            Voltar à Mochila
          </button>
        </div>
      </div>
    </div>
  );
}
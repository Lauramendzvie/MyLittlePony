import React from 'react';

export default function QuizScreen({ guardianName, question, options, onAnswer, onBack }) {
  return (
    <div className="screen-layout" style={{ justifyContent: 'center' }}>
      <div className="cozy-card">
        <span className="guardian-tag">
          Pergunta da {guardianName}
        </span>
        <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '32px', lineHeight: '1.4' }}>
          {question}
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswer(index)}
              className="btn-secondary-warm"
              style={{ textAlign: 'left', padding: '24px', fontSize: '18px' }}
            >
              {option}
            </button>
          ))}
        </div>

        <button onClick={onBack} className="btn-secondary-warm" style={{ border: 'none', background: 'transparent', fontSize: '16px' }}>
          Quero fazer depois
        </button>
      </div>
    </div>
  );
}
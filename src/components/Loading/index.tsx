import React from 'react';
import './index.scss';

/**
 * @component Loading
 * Componente de carregamento simples.
 */
const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Carregando...</p>
    </div>
  );
};

export default Loading;

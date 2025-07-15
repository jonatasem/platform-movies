import React from 'react';
import './index.scss';

/**
 * @component Header
 * Componente de cabeçalho simples.
 */
const Header: React.FC = () => {
  return (
    <header className='container-header'>
      <ul>
        <li>icon</li>
        <li>icon</li>
        <li>icon</li>
        <li>icon</li>
      </ul>
    </header>
  );
};

export default Header;

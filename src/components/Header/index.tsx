import React from 'react';

/**
 * @component Header
 * Componente de cabeçalho simples.
 */
const Header: React.FC = () => {
  return (
    <header className="container-header bg-blue-600 text-white p-4 text-center">
      <p className="text-xl font-bold">CineFlix</p>
    </header>
  );
};

export default Header;

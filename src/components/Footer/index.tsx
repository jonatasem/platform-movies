import React from 'react';

/**
 * @component Footer
 * Componente de rodapé simples.
 */
const Footer: React.FC = () => {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} CineFlix. Todos os direitos reservados.</p>
    </footer>
  );
};

export default Footer;
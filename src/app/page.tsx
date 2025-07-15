import Header from '../components/Header';
import Home from './home/page';
import Footer from '../components/Footer';

/**
 * @component App
 * Componente principal da aplicação que integra o cabeçalho, conteúdo da página Home e rodapé.
 */
export default function App() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {' '}
        <Home />
      </main>
      <Footer />
    </>
  );
}

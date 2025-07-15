import Header from '../components/Header';
import Home from './home/page';
import Footer from '../components/Footer';
import '../styles/page.module.css'

/**
 * @component App
 * Componente principal da aplicação que integra o cabeçalho, conteúdo da página Home e rodapé.
 */
export default function App() {
  return (
    <>
      <main className='container-app'>
        <Header />
        <Home />
      </main>
      <Footer />
    </>
  );
}

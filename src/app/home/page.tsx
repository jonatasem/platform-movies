'use client';

import React, { useState } from 'react';
import MovieList from '../../components/MovieList';
import { Movie } from '../../types'; // Caminho atualizado para types

/**
 * @component Home
 * Página principal que exibe a lista de filmes e os detalhes do filme selecionado.
 */
const Home: React.FC = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // Validar a variável de ambiente no ponto de uso para a imagem.
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  if (!API_BASE_URL) {
    // Isso deve ser tratado no service, mas é bom ter uma redundância visual.
    console.error('Erro de configuração: NEXT_PUBLIC_API_URL não definida para imagens.');
    // Poderia renderizar um componente de erro aqui.
  }

  return (
    <section className="container-home p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-indigo-700">Catálogo de Filmes</h1>

      {selectedMovie ? (
        <div className="p-6 bg-white rounded-lg shadow-xl text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Detalhes do Filme: {selectedMovie.title}</h2>
          {API_BASE_URL && ( // Renderiza a imagem somente se a URL base estiver disponível
            <img
              src={`${API_BASE_URL}/${selectedMovie.img}`}
              alt={`Imagem do filme ${selectedMovie.title}`}
              className="max-w-xs h-auto rounded-lg shadow-md mx-auto mb-6 border border-gray-200"
            />
          )}
          {!API_BASE_URL && (
            <p className="text-red-500 mb-4">Erro: URL da API não configurada para exibir a imagem.</p>
          )}
          <button
            onClick={() => setSelectedMovie(null)}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          >
            Voltar para a lista
          </button>
        </div>
      ) : (
        // O div extra em seu código original foi removido para simplificar a estrutura
        <MovieList setSelectedMovie={setSelectedMovie} />
      )}
    </section>
  );
};

export default Home;
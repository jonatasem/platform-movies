'use client';

import React, { useState } from 'react';
import MovieList from '../../components/MovieList';
import { Movie } from '../../types';

/**
 * @component Home
 * Página principal que exibe a lista de filmes e os detalhes do filme selecionado.
 */
const Home: React.FC = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // Validar a variável de ambiente no ponto de uso para a imagem.
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  return (
    <section>
      <h1>Catálogo de Filmes</h1>

      {selectedMovie ? (
        <div >
          <h2>Detalhes do Filme: {selectedMovie.title}</h2>
          {API_BASE_URL && (
            <img
              src={`${API_BASE_URL}/${selectedMovie.img}`}
              alt={`Imagem do filme ${selectedMovie.title}`}
            />
          )}
          {!API_BASE_URL && (
            <p>Erro: URL da API não configurada para exibir a imagem.</p>
          )}
          <button
            onClick={() => setSelectedMovie(null)}>
            Voltar para a lista
          </button>
        </div>
      ) : (
        <MovieList setSelectedMovie={setSelectedMovie} />
      )}
    </section>
  );
};

export default Home;
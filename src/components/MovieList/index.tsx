'use client';

import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../../services/movieService';
import { FaRegHeart, FaHeart } from 'react-icons/fa6';
import useMovieStore from '../../store/movieStore';
import { Movie } from '../../types'; // Caminho atualizado para types

/**
 * @interface MovieListProps
 * Propriedades para o componente MovieList.
 */
interface MovieListProps {
  setSelectedMovie: (movie: Movie) => void;
}

/**
 * @component MovieList
 * Exibe uma lista de filmes e permite selecionar um filme para ver detalhes,
 * além de gerenciar filmes "curtidos" através de um store.
 */
const MovieList: React.FC<MovieListProps> = ({ setSelectedMovie }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // A variável baseURL não está sendo usada aqui, pode ser removida se não for necessária para outras funcionalidades visuais.
  // const baseURL = process.env.NEXT_PUBLIC_API_URL;

  const { likedMovies, toggleLike } = useMovieStore();

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      setError(null); // Reseta o erro ao iniciar uma nova busca.
      try {
        const data = await fetchMovies();
        setMovies(data);
      } catch (err: unknown) {
        // Tipagem mais segura para o erro.
        const errorMessage =
          err instanceof Error ? err.message : 'Falha ao carregar filmes. Por favor, tente novamente mais tarde.';
        setError(errorMessage);
        console.error('Erro ao carregar filmes:', err);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []); // Array de dependências vazio para executar apenas uma vez na montagem do componente.

  if (loading) {
    return <p className="text-center text-gray-600">Carregando filmes...</p>;
  }

  if (error) {
    return <div className="error-message text-red-600 text-center">Erro: {error}</div>;
  }

  return (
    <section className="movie-list p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Filmes</h1>
      {movies.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum filme encontrado.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <li key={movie.id} className="relative bg-white rounded-lg shadow-md overflow-hidden">
              <div
                className="movie-item-content relative"
                onMouseEnter={(e) => e.currentTarget.classList.add('show-heart')}
                onMouseLeave={(e) => e.currentTarget.classList.remove('show-heart')}
              >
                {/* Usar a variável de ambiente para a URL da imagem de forma consistente */}
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${movie.img}`}
                  alt={`Capa do filme ${movie.title}`}
                  onClick={() => setSelectedMovie(movie)}
                  className="w-full h-auto cursor-pointer transform hover:scale-105 transition-transform duration-300"
                />
                {likedMovies[movie.id] ? (
                  <FaHeart
                    className="heart-icon liked absolute top-2 right-2 text-red-500 text-2xl cursor-pointer"
                    onClick={() => toggleLike(movie.id)}
                  />
                ) : (
                  <FaRegHeart
                    className="heart-icon absolute top-2 right-2 text-gray-300 text-2xl cursor-pointer opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    onClick={() => toggleLike(movie.id)}
                  />
                )}
              </div>
              <h2 className="text-lg font-semibold text-center py-3">{movie.title}</h2>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default MovieList;
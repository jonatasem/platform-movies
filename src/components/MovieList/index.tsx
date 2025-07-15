'use client';

import './index.scss';

import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../../services/movieService';
import { FaRegHeart, FaHeart } from 'react-icons/fa6';
import useMovieStore from '../../store/movieStore';
import { Movie } from '../../types';
import Loading from '../Loading';

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
  }, []); // Array vazio para executar apenas uma vez na montagem do componente.

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <section>
      <h1>Filmes</h1>
      {movies.length === 0 ? (
        <p>Nenhum filme encontrado.</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id} >
              <div
                className="movie-item-content relative"
                onMouseEnter={(e) => e.currentTarget.classList.add('show-heart')}
                onMouseLeave={(e) => e.currentTarget.classList.remove('show-heart')}
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${movie.img}`}
                  alt={`Capa do filme ${movie.title}`}
                  onClick={() => setSelectedMovie(movie)}
                />
                {likedMovies[movie.id] ? (
                  <FaRegHeart
                    onClick={() => toggleLike(movie.id)}
                  />
                ) : (
                  <FaRegHeart
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
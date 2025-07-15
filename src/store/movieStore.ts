import { create } from 'zustand';
import { MovieStoreState } from '../types'; // Caminho atualizado para types

/**
 * @hook useMovieStore
 * Gerenciador de estado com Zustand para gerenciar filmes curtidos.
 */
const useMovieStore = create<MovieStoreState>((set) => ({
  likedMovies: {},
  toggleLike: (movieId: string) =>
    set((state) => ({
      likedMovies: {
        ...state.likedMovies,
        [movieId]: !state.likedMovies[movieId],
      },
    })),
}));

export default useMovieStore;
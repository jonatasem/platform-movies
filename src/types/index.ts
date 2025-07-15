/**
 * @interface Movie
 * Define a estrutura de um objeto de filme.
 */
export interface Movie {
  id: string;
  title: string;
  img: string;
}

/**
 * @interface MovieStoreState
 * Define o estado e as ações disponíveis no gerenciador de estado de filmes (Zustand).
 */
export interface MovieStoreState {
  likedMovies: { [key: string]: boolean }; // Mapeia o ID do filme para um booleano (curtido/não curtido)
  toggleLike: (movieId: string) => void;
}

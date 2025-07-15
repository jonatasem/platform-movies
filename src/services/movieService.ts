import { Movie } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  throw new Error('Erro de configuração: NEXT_PUBLIC_API_URL não foi definida.');
}

const API_MOVIES_URL = `${API_BASE_URL}/api/movies`;

/**
 * Busca todos os filmes da API.
 * @returns Uma Promise que resolve para um array de objetos Movie.
 * Retorna um array vazio em caso de erro, mas loga o erro para depuração.
 */
export const fetchMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(API_MOVIES_URL);

    if (!response.ok) {
      throw new Error(`Falha ao buscar filmes: ${response.status} ${response.statusText}`);
    }

    const data: Movie[] = await response.json();
    return data;
  } catch (error) {
    console.error('Erro em fetchMovies:', error instanceof Error ? error.message : error);
    return [];
  }
};

/**
 * Busca detalhes de um filme específico pelo ID.
 * @param id O ID do filme.
 * @returns Uma Promise que resolve para um objeto Movie ou null se não for encontrado/houver erro.
 */
export const fetchMovieDetails = async (id: string): Promise<Movie | null> => {
  try {
    const response = await fetch(`${API_MOVIES_URL}/${id}`);

    if (!response.ok) {
      // Lançar um erro específico para falhas na busca do filme.
      if (response.status === 404) {
        console.warn(`Filme com ID ${id} não encontrado.`);
        return null;
      }
      throw new Error(`Falha ao buscar detalhes do filme ${id}: ${response.status} ${response.statusText}`);
    }

    const data: Movie = await response.json();
    return data;
  } catch (error) {
    console.error(`Erro em fetchMovieDetails para ID ${id}:, error instanceof Error ? error.message : error`);
    return null; 
  }
};

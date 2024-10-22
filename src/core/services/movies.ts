import {
  Movie,
  MultipleWinner,
  MultipleWinnersResponse,
  ProducerInterval,
  ProducersResponse,
  TopStudios,
  TopStudiosResponse,
} from "@/@types/movies";

import api from "./api";

export const fetchMovies = async (
  page: number,
  size: number,
  year?: string,
  winner?: string
): Promise<{ movies: Movie[]; totalPages: number }> => {
  try {
    const response = await api.get<{ content: Movie[]; totalPages: number }>(
      "/movies",
      {
        params: { page, size, year, winner },
      }
    );

    return {
      movies: response.data.content,
      totalPages: response.data.totalPages,
    };
  } catch (error) {
    console.error("Erro ao buscar a lista de filmes:", error);
    throw error;
  }
};

export const fetchMultipleWinners = async (): Promise<MultipleWinner[]> => {
  try {
    const response = await api.get<MultipleWinnersResponse>(
      "/movies?projection=years-with-multiple-winners"
    );

    return response.data.years;
  } catch (error) {
    console.error("Erro ao buscar anos com múltiplos vencedores:", error);
    throw error;
  }
};

export const fetchTopStudios = async (): Promise<TopStudios[]> => {
  try {
    const response = await api.get<TopStudiosResponse>(
      "/movies?projection=studios-with-win-count"
    );

    return response.data.studios;
  } catch (error) {
    console.error("Erro ao buscar anos com múltiplos vencedores:", error);
    throw error;
  }
};

export const fetchProducers = async (): Promise<ProducersResponse> => {
  try {
    const response = await api.get<{
      min: ProducerInterval[];
      max: ProducerInterval[];
    }>("/movies?projection=max-min-win-interval-for-producers");

    const { min, max } = response.data;

    return {
      min: min.map((item) => ({
        producer: item.producer,
        interval: item.interval,
        previousWin: item.previousWin,
        followingWin: item.followingWin,
      })),
      max: max.map((item) => ({
        producer: item.producer,
        interval: item.interval,
        previousWin: item.previousWin,
        followingWin: item.followingWin,
      })),
    };
  } catch (error) {
    console.error(
      "Erro ao buscar intervalos de vitórias dos produtores:",
      error
    );
    throw error;
  }
};

export const fetchMoviesByYear = async (year: number): Promise<Movie[]> => {
  try {
    const response = await api.get<Movie[]>("/movies", {
      params: {
        winner: true,
        year,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar filmes vencedores pelo ano:", error);
    throw error;
  }
};

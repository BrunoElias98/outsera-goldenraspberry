import api from "./api";

export const fetchMovies = async (
  page: number,
  size: number,
  year?: string,
  winner?: boolean
) => {
  try {
    const response = await api.get("/movies", {
      params: { page, size, year, winner },
    });

    return {
      movies: response.data._embedded.movies,
      totalPages: response.data.page.totalPages,
    };
  } catch (error) {
    console.error("Erro ao buscar a lista de filmes:", error);
    throw error;
  }
};

export const fetchMultipleWinners = async () => {
  try {
    const response = await api.get(
      "/api/movies?projection=years-with-multiple-winners"
    );
    return response.data.years;
  } catch (error) {
    console.error("Erro ao buscar anos com múltiplos vencedores:", error);
    throw error;
  }
};

export const fetchTopStudios = async () => {
  try {
    const response = await api.get(
      "/api/movies?projection=studios-with-win-count"
    );
    return response.data.studios;
  } catch (error) {
    console.error("Erro ao buscar anos com múltiplos vencedores:", error);
    throw error;
  }
};

export const fetchProducers = async () => {
  try {
    const response = await api.get(
      "/api/movies?projection=max-min-win-interval-for-producers"
    );

    const { min, max } = response.data;

    return {
      min: min.map((item: any) => ({
        producer: item.producer,
        interval: item.interval,
        previousWin: item.previousWin,
        followingWin: item.followingWin,
      })),
      max: max.map((item: any) => ({
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

export const fetchMoviesByYear = async (year: number) => {
  try {
    const response = await api.get("/api/movies", {
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
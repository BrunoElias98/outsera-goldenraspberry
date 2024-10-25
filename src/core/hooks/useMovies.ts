import { useState, useEffect } from "react";

import MovieService from "@Services/movies";

import { Movie } from "@/@types/movies";

export function useMovies(
  pageSize: number,
  filters: { yearFilter?: string; winnerFilter?: string }
) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [debouncedYear, setDebouncedYear] = useState(filters.yearFilter);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedYear(filters.yearFilter);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [filters.yearFilter]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { movies: fetchedMovies, totalPages } =
          await MovieService.fetchMovies(
            currentPage,
            pageSize,
            debouncedYear,
            filters.winnerFilter
          );

        setMovies(fetchedMovies);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Erro ao carregar filmes:", error);
      }
    };

    fetchData();
  }, [currentPage, pageSize, debouncedYear, filters.winnerFilter]);

  return {
    movies,
    totalPages,
    currentPage,
    setCurrentPage,
  };
}

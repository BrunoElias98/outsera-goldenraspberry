import { useState, useEffect } from "react";

import { fetchMovies } from "@/core/services/movies";

type Movie = {
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
};

export function useMovies(pageSize: number) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { movies, totalPages } = await fetchMovies(currentPage, pageSize);
        setMovies(movies);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Erro ao carregar filmes:", error);
      }
    };

    fetchData();
  }, [currentPage, pageSize]);

  return {
    movies,
    totalPages,
    currentPage,
    setCurrentPage,
  };
}
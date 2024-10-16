import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import TableComponent from "@Components/ui/Table";
import { Input } from "@Components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@Components/ui/Select";

import { useMovies } from "@/core/hooks/useMovies";

import { useMainLayout } from "@/pages/Main";

type Movie = {
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
};

const ListMoviesPage: React.FC = () => {
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  const { setModuleName } = useMainLayout();

  const { register, watch, setValue, reset } = useForm({
    defaultValues: {
      yearFilter: "",
      winnerFilter: "default",
    },
  });

  const yearFilter = watch("yearFilter");
  const winnerFilter = watch("winnerFilter");

  const pageSize = 10;

  const {
    movies: originalMovies,
    currentPage,
    totalPages,
    setCurrentPage,
  } = useMovies(pageSize);

  const columns = [
    {
      accessorKey: "year",
      header: () => (
        <div>
          <span>Ano</span>
          <Input
            type="text"
            placeholder="Filtrar por ano"
            className="mt-1"
            {...register("yearFilter")}
          />
        </div>
      ),
    },
    {
      accessorKey: "title",
      header: "Título",
    },
    {
      accessorKey: "studios",
      header: "Estúdios",
      cell: (info: any) => (info.getValue() as string[]).join(", "),
    },
    {
      accessorKey: "producers",
      header: "Produtores",
      cell: (info: any) => (info.getValue() as string[]).join(", "),
    },
    {
      accessorKey: "winner",
      header: () => (
        <div>
          <span>Ganhador</span>
          <Select
            value={winnerFilter}
            onValueChange={(value) => setValue("winnerFilter", value)}
          >
            <SelectTrigger className="mt-1 w-full">
              <SelectValue placeholder="Yes/No" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Yes/No</SelectItem>
              <SelectItem value="true">Yes</SelectItem>
              <SelectItem value="false">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ),
      cell: (info: any) => ((info.getValue() as boolean) ? "Yes" : "No"),
    },
  ];

  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...originalMovies];

      if (yearFilter) {
        filtered = filtered.filter((movie) =>
          movie.year.toString().includes(yearFilter)
        );
      }

      if (winnerFilter !== "default") {
        const isWinner = winnerFilter === "true";
        filtered = filtered.filter((movie) => movie.winner === isWinner);
      }

      setFilteredMovies(filtered);
    };

    applyFilters();
  }, [yearFilter, winnerFilter, originalMovies]);

  useEffect(() => {
    reset({
      yearFilter: "",
      winnerFilter: "default",
    });
  }, [currentPage, reset]);

  useEffect(() => {
    setModuleName("Lista de Filmes");
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Lista de Piores Filmes</h1>
      <TableComponent
        columns={columns}
        data={filteredMovies}
        caption="Tabela de Filmes"
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ListMoviesPage;
import React, { useEffect, useMemo } from "react";
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
import { useMainLayout } from "@Pages/Main";

const options = [
  { id: "default", label: "Yes/No" },
  { id: "true", label: "Yes" },
  { id: "false", label: "No" },
];

const ListMoviesPage: React.FC = () => {
  const { setModuleName } = useMainLayout();

  const { register, watch, setValue, reset, setFocus } = useForm({
    defaultValues: {
      yearFilter: "",
      winnerFilter: "default",
    },
    mode: "onChange",
  });

  const yearFilter = watch("yearFilter");
  const winnerFilter = watch("winnerFilter");

  const pageSize = 10;

  const filters = useMemo(() => {
    return {
      yearFilter: yearFilter || undefined,
      winnerFilter: winnerFilter !== "default" ? winnerFilter : undefined,
    };
  }, [yearFilter, winnerFilter]);

  const {
    movies: filteredMovies,
    currentPage,
    totalPages,
    setCurrentPage,
  } = useMovies(pageSize, filters);

  useEffect(() => {
    setFocus("yearFilter");
  }, [yearFilter]);

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "year",
      header: () => (
        <div>
          <span>Year</span>
          <Input
            type="text"
            placeholder="Filter By Year"
            data-testid="year-filter"
            className="mt-1"
            {...register("yearFilter")}
          />
        </div>
      ),
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "winner",
      header: () => (
        <div>
          <span>Winner?</span>
          <Select
            value={winnerFilter}
            onValueChange={(value) => setValue("winnerFilter", value)}
          >
            <SelectTrigger className="mt-1 w-full" data-testid="winner-filter">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ),
      cell: (info: any) => ((info.getValue() as boolean) ? "Yes" : "No"),
    },
  ];

  useEffect(() => {
    reset({
      yearFilter: "",
      winnerFilter: "default",
    });
  }, [currentPage, reset]);

  useEffect(() => {
    setModuleName("List Movies");
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow-md" data-testid="movies-page">
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

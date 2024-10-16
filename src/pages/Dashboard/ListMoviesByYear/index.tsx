import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

import TableComponent from "@Components/ui/Table";
import { Input } from "@Components/ui/Input";
import { Button } from "@/components/ui/Button";

import { fetchMoviesByYear } from "@Services/movies";

type Movie = {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
};

const ListMoviesByYear: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [year, setYear] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!year) return;

    setLoading(true);
    try {
      const data = await fetchMoviesByYear(Number(year));
      setMovies(data);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      accessorKey: "id",
      header: "Id",
    },
    {
      accessorKey: "year",
      header: "Year",
    },
    {
      accessorKey: "title",
      header: "Title",
    },
  ];

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h3 className="text-lg font-semibold mb-4">List movie winners by year</h3>
      <div className="flex items-center mb-4 space-x-2">
        <Input
          type="text"
          placeholder="Search by year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full"
        />
        <Button
          onClick={handleSearch}
          className="p-2 max-w-[40px] bg-blue-500 text-white rounded"
          disabled={loading}
        >
          <FaSearch />
        </Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <TableComponent
          columns={columns}
          data={movies}
          caption="Filmes vencedores por ano"
          currentPage={0}
          totalPages={1}
          onPageChange={() => {}}
        />
      )}
    </div>
  );
};

export default ListMoviesByYear;
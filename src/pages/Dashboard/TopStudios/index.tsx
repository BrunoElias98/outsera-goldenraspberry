import React, { useEffect, useState } from "react";

import TableComponent from "@Components/ui/Table";

import { fetchTopStudios } from "@Services/movies";

import { TopStudios } from "@/@types/movies";

const TopStudiosComponent: React.FC = () => {
  const [topStudios, setTopStudios] = useState<TopStudios[]>([]);

  useEffect(() => {
    const getTopStudios = async () => {
      try {
        const data = await fetchTopStudios();

        setTopStudios(data.slice(0, 3));
      } catch (error) {
        console.error("Erro ao carregar estúdios com mais vitórias:", error);
      }
    };

    getTopStudios();
  }, []);

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "winCount",
      header: "Win Count",
    },
  ];

  return (
    <div
      className="p-4 bg-white rounded shadow-md"
      data-testid="top-studios-page"
    >
      <h3 className="text-lg font-semibold mb-4">Top 3 studios with winners</h3>
      <TableComponent
        columns={columns}
        data={topStudios}
        caption="Estúdios com mais vitórias"
        currentPage={0}
        totalPages={1}
        onPageChange={() => {}}
      />
    </div>
  );
};

export default TopStudiosComponent;

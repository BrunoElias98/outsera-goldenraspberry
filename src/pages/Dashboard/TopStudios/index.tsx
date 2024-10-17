import React, { useEffect, useState } from "react";

import TableComponent from "@Components/ui/Table";

import { fetchTopStudios } from "@Services/movies";

type TopStudio = {
  name: string;
  winCount: number;
};

const TopStudios: React.FC = () => {
  const [topStudios, setTopStudios] = useState<TopStudio[]>([]);

  useEffect(() => {
    const getTopStudios = async () => {
      try {
        const data = await fetchTopStudios();

        setTopStudios(data);
      } catch (error) {
        console.error("Erro ao carregar estúdios com mais vitórias:", error);
      }
    };

    getTopStudios();
  }, []);

  const columns = [
    {
      accessorKey: "name",
      header: "Studio",
    },
    {
      accessorKey: "winCount",
      header: "Win Count",
    },
  ];

  return (
    <div className="p-4 bg-white rounded shadow-md">
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

export default TopStudios;

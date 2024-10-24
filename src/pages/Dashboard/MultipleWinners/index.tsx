import React, { useEffect, useState } from "react";

import TableComponent from "@Components/ui/Table";

import { fetchMultipleWinners } from "@Services/movies";

import { MultipleWinner } from "@/@types/movies";

const MultipleWinners: React.FC = () => {
  const [multipleWinners, setMultipleWinners] = useState<MultipleWinner[]>([]);

  useEffect(() => {
    const getMultipleWinners = async () => {
      try {
        const data = await fetchMultipleWinners();
        setMultipleWinners(data);
      } catch (error) {
        console.error("Erro ao carregar anos com múltiplos vencedores:", error);
      }
    };

    getMultipleWinners();
  }, []);

  const columns = [
    {
      accessorKey: "year",
      header: "Year",
    },
    {
      accessorKey: "winnerCount",
      header: "Win Count",
    },
  ];

  return (
    <div
      className="p-4 bg-white rounded shadow-md"
      data-testid="multiple-winners-page"
    >
      <h3 className="text-lg font-semibold mb-4">
        List years with multiple winners
      </h3>
      <TableComponent
        columns={columns}
        data={multipleWinners}
        caption="Anos com múltiplos vencedores"
        currentPage={0}
        totalPages={1}
        onPageChange={() => {}}
      />
    </div>
  );
};

export default MultipleWinners;

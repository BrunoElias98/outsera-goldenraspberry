import React, { useEffect, useState } from "react";

import TableComponent from "@Components/ui/Table";

import { fetchProducers } from "@Services/movies";

type ProducerInterval = {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
};

type ProducersData = {
  min: ProducerInterval[];
  max: ProducerInterval[];
};

const Producers: React.FC = () => {
  const [producersData, setProducersData] = useState<ProducersData | null>(
    null
  );

  useEffect(() => {
    const getProducersData = async () => {
      try {
        const data = await fetchProducers();
        setProducersData(data);
      } catch (error) {
        console.error(
          "Erro ao carregar os intervalos de vitórias dos produtores:",
          error
        );
      }
    };

    getProducersData();
  }, []);

  const columns = [
    {
      accessorKey: "producer",
      header: "Producer",
    },
    {
      accessorKey: "interval",
      header: "Interval",
    },
    {
      accessorKey: "previousWin",
      header: "Previous Year",
    },
    {
      accessorKey: "followingWin",
      header: "Following Year",
    },
  ];

  if (!producersData) return <>Loading...</>;

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h3 className="text-lg font-semibold mb-4">
        Producers with longest and shortest interval between wins
      </h3>
      <>
        <h4 className="text-md font-semibold mt-4 mb-2">Maximum</h4>
        <TableComponent
          columns={columns}
          data={producersData.max}
          caption="Maximum Interval"
          currentPage={0}
          totalPages={1}
          onPageChange={() => {}}
        />

        <h4 className="text-md font-semibold mt-4 mb-2">Minimum</h4>
        <TableComponent
          columns={columns}
          data={producersData.min}
          caption="Minimum Interval"
          currentPage={0}
          totalPages={1}
          onPageChange={() => {}}
        />
      </>
    </div>
  );
};

export default Producers;
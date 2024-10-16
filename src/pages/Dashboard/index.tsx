import { useEffect } from "react";

import { useMainLayout } from "@Pages/Main";

import MultipleWinnvers from "@Pages/Dashboard/MultipleWinners";
import ListMoviesByYear from "@Pages/Dashboard/ListMoviesByYear";
import Producers from "@Pages/Dashboard/Producers";
import TopStudios from "@Pages/Dashboard/TopStudios";

const DashboardPage: React.FC = () => {
  const { setModuleName } = useMainLayout();

  useEffect(() => {
    setModuleName("Dashboard");
  }, [setModuleName]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <MultipleWinnvers />
      <TopStudios />
      <Producers />
      <ListMoviesByYear />
    </div>
  );
};

export default DashboardPage;

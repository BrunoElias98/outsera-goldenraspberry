import { useEffect } from "react";

import { useMainLayout } from "@Pages/Main";

import MultipleWinnvers from "./MultipleWinners";
import ListMoviesByYear from "./ListMoviesByYear";
import Producers from "./Producers";
import TopStudios from "./TopStudios";

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

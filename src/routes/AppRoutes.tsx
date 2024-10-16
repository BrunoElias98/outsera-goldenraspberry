import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { MainLayoutProvider } from "@/pages/Main";

const DashboardPage = lazy(() => import("@/pages/Dashboard"));
const ListMoviesPage = lazy(() => import("@/pages/ListMovies"));

const AppRoutes = () => (
  <Router>
    <Suspense fallback={<div>Carregando...</div>}>
      <Routes>
        <Route
          path="*"
          element={
            <MainLayoutProvider>
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/lista-filmes" element={<ListMoviesPage />} />
              </Routes>
            </MainLayoutProvider>
          }
        />
      </Routes>
    </Suspense>
  </Router>
);

export default AppRoutes;

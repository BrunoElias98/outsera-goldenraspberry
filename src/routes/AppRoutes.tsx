import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { MainLayoutProvider } from "@Pages/Main";

const DashboardPage = lazy(() => import("@Pages/Dashboard"));
const ListMoviesPage = lazy(() => import("@Pages/ListMovies"));

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

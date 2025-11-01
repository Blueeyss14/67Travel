import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from 'react';
import DestinationPage from "../features/Destionation/views/DestinationPage";

const HomePage = lazy(() => import("../features/home/view/Home"));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="w-12 h-12 border-4 border-black border-dashed rounded-full animate-spin"></div>
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/destination-page" element={<DestinationPage />} />
      </Routes>
    </Suspense>
  );
};
export default AppRoutes;
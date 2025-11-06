import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import("../features/home/view/Home"));
const DestinationView = lazy(() => import("../features/Destionation/views/DestinationPage"));
const BookingPage = lazy(() => import("../features/Booking/views/BookingPage"));
const OnTheWay = lazy(() => import("../features/Booking/views/OnTheWay"));

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
        <Route path="/destination-page" element={<DestinationView />} />
        <Route path="/booking-page" element={<BookingPage />} />
        <Route path="/on-the-way" element={<OnTheWay />} />
      </Routes>
    </Suspense>
  );
};
export default AppRoutes;
import { Navigate, Route, Routes } from "react-router-dom";
import {
  Home,
  About,
  Projects
} from "@/pages";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

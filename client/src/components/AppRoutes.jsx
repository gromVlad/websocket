import { Route, Routes } from "react-router-dom";
import { Main } from "./Main";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  );
};

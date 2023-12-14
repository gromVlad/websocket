import { Route, Routes } from "react-router-dom";
import { Main } from "./Main";
import { Chat } from "./Chat";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};
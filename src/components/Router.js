import React from "react";
import { BrowserRouter, Link, Route, Routes, Navigate } from "react-router-dom";
import publicRoutes from "../router/Router";
import Navbar from "./Navbar/Navbar";

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {publicRoutes.map((item) => (
          <Route
            key={item.path}
            path={item.path}
            element={<item.component />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
export default Router;

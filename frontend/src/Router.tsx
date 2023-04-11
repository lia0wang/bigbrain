import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/login";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

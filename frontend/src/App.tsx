import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from ".";
import Signin from "./signin";
import Signup from "./signup";
import Tiptap from "./editor/editor";
import Blog from "./blog";
import Navbar from "./components/navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import EditBlog from "./editBlog";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Index />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new"
          element={
            <ProtectedRoute>
              <Tiptap />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditBlog />
            </ProtectedRoute>
          }
        />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/blog/:id"
          element={
            <ProtectedRoute>
              <Blog />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

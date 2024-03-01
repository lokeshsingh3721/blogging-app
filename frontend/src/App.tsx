import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from ".";
import Signin from "./signin";
import Signup from "./signup";
import Tiptap from "./editor/editor";
import Blog from "./blog";
import Navbar from "./components/navbar";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/editor" element={<Tiptap />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blog/:id" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

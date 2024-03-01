import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from ".";
import Signin from "./signin";
import Signup from "./signup";
import Tiptap from "./editor/editor";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/editor" element={<Tiptap />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

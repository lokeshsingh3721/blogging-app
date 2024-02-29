import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signin from "./signin";
import Signup from "./signup";
import Index from ".";
import Navbar from "./components/navbar";
import Editor from "./components/editor/Editor";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element=<Index /> />
        <Route path="/editor" element=<Editor /> />
        <Route path="/signup" element=<Signup /> />
        <Route path="/signin" element=<Signin /> />
        <Route path="/blog/:id" element={<></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

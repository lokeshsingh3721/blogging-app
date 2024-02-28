import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signin from "./signin";
import Signup from "./signup";
import Index from ".";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element=<Index /> />
        <Route path="/signup" element=<Signup /> />
        <Route path="/signin" element=<Signin /> />
        <Route path="/blog/:id" element={<></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

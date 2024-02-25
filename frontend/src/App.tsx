import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<></>} />
        <Route path="/signin" element={<></>} />
        <Route path="/blog/:id" element={<></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

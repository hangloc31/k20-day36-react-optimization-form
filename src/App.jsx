import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import Excercise1 from "./pages/Excercise1";
import Excercise2 from "./pages/Excercise2";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/bai-1" element={<Excercise1 />} />
      <Route path="/bai-2" element={<Excercise2 />} />
    </Routes>
  );
}

export default App;

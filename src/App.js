import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Layout/Header";
import Country from "./pages/Country";

function App() {
  return (
    <>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:name" element={<Country />} />
      </Routes>
    </>
  );
}

export default App;

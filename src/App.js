import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Layout/Header";
import Country from "./pages/Country";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const theme = localStorage.getItem('theme')
    if (!theme) {
      localStorage.setItem('theme', 'light')
    }
    else if (theme === 'dark') {
      document.body.classList.add('dark')
    }
  }, [])
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

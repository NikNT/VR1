import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./webpages/Homepage/Home";
import Navigation from "./components/shared/Navigation/Navigation";
import Register from "./webpages/Register/Register";
import Login from "./webpages/Login/Login";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

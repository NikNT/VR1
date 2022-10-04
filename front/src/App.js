import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./webpages/Homepage/Home";
import Navigation from "./components/shared/Navigation/Navigation";
import Authenticate from "./webpages/Authenticate/Authenticate";
import Activate from "./webpages/Activate/Activate";
import Rooms from "./webpages/Rooms/Rooms";

const isAuth = false;

const user = {
  activated: false,
};

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            <GuestRoute>
              <Home />
            </GuestRoute>
          }
        />
        <Route
          path="/authenticate/*"
          element={
            <GuestRoute>
              <Authenticate />
            </GuestRoute>
          }
        />
        <Route
          path="/activate"
          element={
            <SemiProtected>
              <Activate />
            </SemiProtected>
          }
        />
        <Route
          path="/rooms"
          element={
            <Protected>
              <Rooms />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

const GuestRoute = ({ children }) => {
  return isAuth ? <Navigate to="/rooms" /> : children;
};

const SemiProtected = ({ children }) => {
  return !isAuth ? (
    <Navigate to="/" />
  ) : isAuth && !user.activated ? (
    children
  ) : (
    <Navigate to="/rooms" />
  );
};

const Protected = ({ children }) => {
  return !isAuth ? (
    <Navigate to="/" />
  ) : isAuth && !user.activated ? (
    <Navigate to="/activate" />
  ) : (
    children
  );
};

export default App;

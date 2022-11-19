import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./webpages/Homepage/Home";
import Navigation from "./components/shared/Navigation/Navigation";
import Authenticate from "./webpages/Authenticate/Authenticate";
import Activate from "./webpages/Activate/Activate";
import Rooms from "./webpages/Rooms/Rooms";
import { useSelector } from "react-redux";
import { useLoadingWithRefresh } from "./hooks/useLoadingWithRefresh";
import Loader from "./components/shared/Loader/Loader";
import Room from "./webpages/Room/Room";

function App() {
  const { loading } = useLoadingWithRefresh();
  return loading ? (
    <Loader message="Loading, Please Wait" />
  ) : (
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
        <Route
          path="/room/:id"
          element={
            <Protected>
              <Room />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

const GuestRoute = ({ children }) => {
  const { isAuth } = useSelector((state) => state.auth);
  return isAuth ? <Navigate to="/rooms" /> : children;
};

const SemiProtected = ({ children }) => {
  const { user, isAuth } = useSelector((state) => state.auth);
  return !isAuth ? (
    <Navigate to="/" />
  ) : isAuth && !user.activated ? (
    children
  ) : (
    <Navigate to="/rooms" />
  );
};

const Protected = ({ children }) => {
  const { user, isAuth } = useSelector((state) => state.auth);
  return !isAuth ? (
    <Navigate to="/" />
  ) : isAuth && !user.activated ? (
    <Navigate to="/activate" />
  ) : (
    children
  );
};

export default App;

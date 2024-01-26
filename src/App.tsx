import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import MainPage from "./pages/MainPage/MainPage";
import RoutePage from "./pages/RoutePage/RoutePage";
import Breadcrumps from "./components/Breadcrumps/Breadcrumps";
import RegPage from "./pages/RegPage/RegPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import { useDispatch } from "react-redux";
import axios from "axios";
import RoutesList from "./pages/RoutesList/RoutesList"
import RouteAdminPanel from "./pages/RouteAdminPanel/RouteAdminPanel"
import Cookies from "universal-cookie";
import { Response, cardInfoProps } from "./types";
import { updateUser } from "./store/userSlice";
import React, { useState } from "react";
import CartPage from "./pages/CartPage/CartPage";
import { setRoutes } from "./store/filtersSlices";
import { RouteMock } from "./consts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApplicationsHistoryPage from "./pages/ApplicationsHistoryPage/ApplicationsHistoryPage";
const cookies = new Cookies();
function App() {
  const url = window.location.pathname.split("/").pop();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  

  const login = async () => {
    try {
      const response: Response = await axios(
        "http://localhost:8000/user_info/",
        {
          method: "GET",
          withCredentials: true,
        }
      );
      console.log(response.data);
      dispatch(
        updateUser({
          is_authenticated: true,
          is_moderator: response.data["is_moderator"],
          user_id: response.data["user_id"],
          user_email: response.data["email"],
          current_cart: response.data["current_cart"],
        })
      );
    } catch {
      console.log("Пользоатель не авторизован!!!");
    }
  };

  

  React.useEffect(() => {
    if (cookies.get("access_token")) {
      login();
    }
  });


  const createMock = () => {
    let filteredRoutes: cardInfoProps[] = RouteMock.filter(
      (route) => route.status == true
    );

    const [isLoading, setIsLoading] = useState(true);
 
    dispatch(setRoutes(filteredRoutes));
  };
  return (
    <>
      <Header />
      <Breadcrumps />
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/Bmstu-navigator/" replace />}
        />
        <Route
          path="/Bmstu-navigator/"
          element={<MainPage loading={isLoading} />}
        />
        <Route path="/Bmstu-navigator/:id" element={<RoutePage />} />
        <Route
          path="/Bmstu-navigator/registration"
          element={<RegPage />}
        />
        <Route path="/Bmstu-navigator/auth" element={<AuthPage />} />
        <Route
          path="/Bmstu-navigator/history"
          element={<ApplicationsHistoryPage />}
        />
        <Route path="/Bmstu-navigator/cart" element={<CartPage />} />
        <Route
          path="/Bmstu-navigator/Requests/:id"
          element={<CartPage />}
        />
        <Route
          path="/Bmstu-navigator/routes-list"
          element={<RoutesList />}
        />
        <Route
          path="/Bmstu-navigator/routes-list/:id"
          element={<RouteAdminPanel />}
        />
      </Routes>
      <ToastContainer autoClose={1000} pauseOnHover={false} />
    </>
  );
}

export default App;

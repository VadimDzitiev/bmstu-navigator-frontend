import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import MainPage from "./pages/MainPage/MainPage";
import PlanePage from "./pages/PlanePage/PlanePage";
import Breadcrumps from "./components/Breadcrumps/Breadcrumps";
import RegPage from "./pages/RegPage/RegPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import ApplicationsHistoryTable from "./components/ApplicationsHistoryTable/ApplicationsHistoryTable";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// import store from "./store/store";
import Cookies from "universal-cookie";
import { Response, cardInfoProps } from "./types";
import { updateCart, updateUser } from "./store/userSlice";
import React, { useState } from "react";
import Cart from "./components/Cart/Cart";
import CartPage from "./pages/CartPage/CartPage";
import ApplicationsHistoryPage from "./pages/ApplicationsHistoryPage/ApplicationsHistoryPage";
import { RootState } from "./store/store";
import { setOptions } from "./store/filtersSlices";
import { OptionsMock } from "./consts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sas from "./pages/sas";
import loading from "./pages/MainPage/MainPage";
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
          // headers: {
          //   "Content-type": "application/json; charset=UTF-8",
          //   Authorization: `Bearer ${cookies.get("access_token")}`,
          // },
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
    let filteredOptions: cardInfoProps[] = OptionsMock.filter(
      (option) => option.status == true
    );

    const [isLoading, setIsLoading] = useState(true);
 
    dispatch(setOptions(filteredOptions));
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
        <Route path="/Bmstu-navigator/:id" element={<PlanePage />} />
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
      </Routes>
      <ToastContainer autoClose={1000} pauseOnHover={false} />
    </>
  );
}

export default App;
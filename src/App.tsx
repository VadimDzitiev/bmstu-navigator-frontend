import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import MainPage from "./pages/MainPage/MainPage";
import RoutPage from "./pages/RoutePage/RoutePage";
import Breadcrumps from "./components/Breadcrumps/Breadcrumps";
import RegPage from "./pages/RegPage/RegPage";
import AuthPage from "./pages/AuthPage/AuthPage";

function App() {
  return (
    <>
      <Header />
      <Breadcrumps />
      <Routes>
      <Route path="/Bmstu-navigator-frontend/auth" element={<AuthPage />} />
        <Route
          path="/" element={<Navigate to="/Bmstu-navigator-frontend/" replace />}
        />
        <Route path="/Bmstu-navigator-frontend/" element={<MainPage />} />
        <Route path="/Bmstu-navigator-frontend/:id" element={<RoutPage />} />
        <Route
          path="/Bmstu-navigator-frontend/registration"
          element={<RegPage />}
        />
        <Route path="/Bmstu-navigator-frontend/auth" element={<AuthPage />} />
      </Routes>
    </>
  );
}

export default App;

import Optpng from "../../assets/icons/options.png"
import Routpng from "../../assets/icons/route.png";
import Hispng from "/src/assets/icons/history.png";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom"
import { useState } from "react"
import styles from "./header.module.scss";
import Cookies from "universal-cookie";
import { RootState } from "../../store/store"; 
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { cleanUser } from "../../store/userSlice";
import { toast } from "react-toastify";


const cookies = new Cookies();
const Header = () => {
  const location = useLocation()
  const [v, sV] = useState(false)
  const user = useSelector((state: RootState) => state.user);
  const isAuth = useSelector((state: RootState) => state.user.is_authenticated)
  const isModerator = useSelector((state: RootState) => state.user.is_moderator)
  const isCartEmpty = useSelector((state: RootState) => state.user.current_cart)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response: Response = await axios(`http://localhost:8000/logout/`, {
        method: "POST",
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${cookies.get("access_token")}`,
        },
      });
      cookies.remove("access_token", { path: "/" });
      dispatch(cleanUser());
      toast.success("Выход выполнен успешно",);

      navigate("/Bmstu-navigator");
    } catch {}
  };
  const handleSubmit = async () => {
    await logout()
  }
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.header__logo}>
          <Link to={""} style={{ textDecoration: "none", color: "white" }}>
            <div>Навигация МГТУ</div>
          </Link>
        </div>

        <div className={styles.header__profile}>
          {isAuth && (
            <Link
              style={{ height: 27 }}
              to="/Bmstu-navigator/history"
            >
              <div className={styles.cart}>
                <img style={{ width: 50 }} src={Hispng} alt="History" />
              </div>
            </Link>
          )}

          {location.pathname === "/Bmstu-navigator/" &&
            isAuth &&
            !isModerator &&
            (isCartEmpty != -1 ? (
              <Link to="/Bmstu-navigator/cart">
                <div className={styles.cart}>
                  <img src={Routpng} alt="Cart" />
                  
                </div>
              </Link>
            ) : (
              <div className={styles.cart}>
                <img src={Routpng} alt="Cart" style={{ opacity: "0.5" }} />
              </div>
            ))}
          {isModerator && (
            <Link to="/Bmstu-navigator/">
              <div className={styles.cart}>
                <img style={{ width: 30 }} src={Optpng} alt="Cart" />
              </div>
            </Link>
          )}
          
          {user.is_authenticated ? (
        <div>
          <div style={{ fontSize: "20px" }}> {user.user_email}</div>
          <div
            style={{
              fontSize: "20px",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={handleSubmit}
          >
            Выйти
          </div>
        </div>
      ) : (
        <Link to="Bmstu-navigator/auth">
          <span
            style={{
              color: "white",
              fontSize: "20px",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Авторизоваться
          </span>
        </Link>
      )}
        </div>
      </div>
    </div>
  )
};

export default Header;

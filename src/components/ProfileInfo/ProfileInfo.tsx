import { useDispatch, useSelector } from "react-redux";
import styles from "./ProfileInfo.module.scss";
import Cookies from "universal-cookie";
import { RootState } from "../../store/store";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { cleanUser,} from "../../store/userSlice";
import { toast } from "react-toastify";

const cookies = new Cookies();
const ProfileInfo = () => {
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
    } catch {
      console.log("kaka");
    }
  };

  const handleSubmit = async () => {
    await logout();
  };

  const user = useSelector((state: RootState) => state.user);
  if (!user.is_authenticated) {
    return (
      <div className={styles.menu}>
        <span>Упс...Кажется, Вы забыли&nbsp;</span>
        <Link to="/Bmstu-navigator/auth">
          <span className={styles.menu__login}>авторизоваться</span>
        </Link>
      </div>
    );
  }

  return (
    <div className={`${styles.menu} ${styles.menu__info}`}>
      <div>Логин: {user.user_email}</div>
      <div className={styles.menu__login} onClick={handleSubmit}>
        Выйти
      </div>
    </div>
  );
};

export default ProfileInfo;

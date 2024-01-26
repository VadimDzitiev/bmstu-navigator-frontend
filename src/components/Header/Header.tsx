import route from "/src/assets/icons/route.png";
import user from "/src/assets/icons/user.png";
import styles from "./header.module.scss";
import { Link } from "react-router-dom";
import pic from "/src/assets/icons/2.png";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.header__logo}>
          <Link to={""} style={{ textDecoration: "none", color: "white" }}>
            <div>Навигация МГТУ<img src={pic} alt="Route" /></div>
          </Link>
        </div>

        <div className={styles.header__profile}>
          <div className={styles.route}>
            <img src={route} alt="Route" />
          </div>
          <div className={styles.user}>
          <Link to="/Bmstu-navigator-frontend/auth">
            <img src={user} alt="User" />
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

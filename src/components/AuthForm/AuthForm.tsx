import Button from "../Button/Button"
import styles from "./AuthForm.module.scss"
import { Link } from "react-router-dom"
import auth from "/src/assets/icons/auth.gif";

const AuthForm = () => {
  return (
    <div className={styles.authform}>
      <form className={styles.authform__block}>
        <h1>Авторизация<img src={auth} alt="Route" /></h1>
        <input
          className={styles.authform__block_input}
          name="email"
          type="text"
          placeholder="Введите email..."
        ></input>
        <input
          className={styles.authform__block_input}
          name="password"
          type="password"
          placeholder="Введите пароль..."
        ></input>

        <Button>Войти</Button>
        <span>
          Если у вас нету аккаунта, &nbsp;
          <Link
            className={styles.reglink}
            to={"/Bmstu-navigator-frontend/registration"}
          >
            Зарегистрируйтесь
          </Link>
        </span>
      </form>
    </div>
  )
}

export default AuthForm
import React, { useEffect, useState } from "react";
import Button from "../../../components/Button/Button";
import styles from "./routeinfo.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Response } from "../../../types";
import defRoute from "../../../assets/icons/ГЗ-Э.png";
import { cardInfoProps } from "../../../types";
import { DOMEN } from "../../../consts";
import { RouteMock } from "../../../consts";
import axios from "axios";
import { updateCart } from "../../../store/userSlice";
import { toast } from "react-toastify";
type RouteInfoProps = {
  id: string;
};

const RouteInfo: React.FC<RouteInfoProps> = ({ id }) => {
  const dispatch = useDispatch();
  const [mock, setMock] = useState(false);
  const [info, setInfo] = useState<cardInfoProps | undefined>({
    id: 0,
    name: "",
    status: true,
    transition: "",
    buildings:"",
    transition_time: 0,
    description: "",
    image: ""
  });

  const getInfo = async () => {
    try {
      const responce = await axios(`http://localhost:8000/Service/${id}`, {
        method: "GET",
      });
      setInfo(responce.data);
    } catch (error) {
      setMock(true);
      let filteredGroups: cardInfoProps | undefined = RouteMock.find(
        (group) => group.id == parseInt(id)
      );
      setInfo(filteredGroups);
      console.log("Ошибка при выполнении запроса:", error);
    }
  };

  const addRouteToApp = async (id: number) => {
    try {
      const response: Response = await axios(
        `http://localhost:8000/Service/${id}/add_to_request/`,
        {
          method: "POST",
          withCredentials: true,
        }
      );
      if (response.data) {
        dispatch(updateCart(response.data));
      }
      toast.success("Добавлено в мои маршруты");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  const addRouteToCart = (id: number) => {
    addRouteToApp(id);
  };

  return (
    <div className={styles.routeinfo}>
      <div className={styles.routeinfo__image}>
        {info && info.transition ? (
          <img src={info.transition} alt="&&&" style={{ height: '450px',width: '450px' }}/>
        ) : (
          <img
            className={styles.routeinfo__image_img}
            src={defRoute}
            alt="img"
          ></img>
        )}
      </div>
      <div className={styles.routeinfo__common}>
        <div className={styles.routeinfo__common_text}>
          <div className={styles.routeinfo__common_title}>
            {info && info.name}
          </div>
          <div className={styles.routeinfo__common_subtitle}>
            {info && info.description}
          </div>
        </div>
        <div className={styles.routeinfo__common_actions}>
          <div className={styles.routeinfo__common_time}>
            {info && info.transition_time} минут
          </div>
          <Button>В маршрут</Button>
        </div>
      </div>
    </div>
  );
};

export default RouteInfo;

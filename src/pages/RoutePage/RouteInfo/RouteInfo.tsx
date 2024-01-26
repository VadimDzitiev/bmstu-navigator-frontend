import React, { useEffect, useState } from "react";
import Button from "../../../components/Button/Button";
import defRoute from "../../../assets/icons/ГЗ-Э.png";
import styles from "./routeinfo.module.scss";
import { cardInfoProps } from "../../../types";
import { RouteMock } from "../../../consts";

type RouteInfoProps = {
 id: string;
};

const RouteInfo: React.FC<RouteInfoProps> = ({ id }) => {
 const [info, setInfo] = useState<cardInfoProps | undefined>({
    id: 0,
    name: "",
    status: true,
    transition: "",
    buildings:"",
    transition_time: 0,
    description: "",
 });

 useEffect(() => {
    fetch(`http://localhost:8000/Service/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const route = data;
        console.log(route);
        setInfo(route);
      })
      .catch((error) => {
        let filteredGroups: cardInfoProps | undefined = RouteMock.find(
          (group: cardInfoProps) => group.id == parseInt(id)
        );
        setInfo(filteredGroups);
        console.log("Ошибка при выполнении запроса:", error);
      });
 }, []);

 return (
    <div className={styles.routeinfo}>
      <div className={styles.routeinfo__image}>
        {info && info.transition ? (
          <img src={info.transition} alt="&&&" style={{ height: '450px',width: '450px'  }}/>
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

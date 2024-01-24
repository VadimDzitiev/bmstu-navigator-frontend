import React from "react";
import Button from "../Button/Button";
import styles from "./card.module.scss";

import defBuilding from "/src/assets/icons/ГЗ.png";
import { cardInfoProps } from "../../types";
import Cookies from "universal-cookie";
import axios from "axios";
import { updateCart } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
const cookies = new Cookies();
// import svg from "../../assets/react.svg"

const Card: React.FC<cardInfoProps> = ({ name, transition_time, description, transition, buildings, onAddClick,}) => {
  // const dispatch = useDispatch();
  return (
    <div className={styles.card}>
      <div className={styles.card__image}>
        {buildings ? (
          <div><img src={buildings} alt="&&&" style={{ height: '200px' }}/></div>
        ) : (
          <img
            className={styles.card__image_img}
            src={defBuilding}
            alt="image"
          ></img>
        )}
      </div>
      <div className={styles.card__inner}>
        <div className={styles.card__inner_title}>{name}</div>
        <div className={styles.card__inner_subtitle}>{description}</div>
        <div className={styles.card__inner_action}>
          <div className={styles.card__inner_action_price}>{transition_time} минут </div>
          <Button onClick={onAddClick}> В маршрут</Button>
        </div>
      </div>
    </div>
  );
};

export default Card;

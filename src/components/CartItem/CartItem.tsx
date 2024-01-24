import React, { useState } from "react";
import btnMinus from "/src/assets/icons/btn_minus.svg";
import btnPlus from "/src/assets/icons/btn_plus.svg";
import btnDel from "/src/assets/icons/btn_delete.svg";
import mock from "../../assets/icons/user.svg";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CartItem.module.scss";
import Cookies from "universal-cookie";
import { cartItemProps } from "../../types";
import axios from "axios";
import { RootState } from "../../store/store";

const cookies = new Cookies();
const CartItem: React.FC<cartItemProps> = ({
  id,
  name,
  transition_time,
  description,
  status,
  buildings,
  onDelete,
  updateAllow,
}) => {
  const handleItemRemove = () => {
    onDelete(id);
  };

  return (
    <div className={styles.cart__item}>
      { <div className={styles["cart__item-img"]}>
        <img src={buildings} alt="option" />
      </div> }
      <div className={styles["cart__item-info"]}>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
      <div className={styles["cart__item-count"]}>

      </div>
      <div className={styles["cart__item-price"]}>
        <b>{transition_time} минут</b>
      </div>
      {updateAllow && (
        <div onClick={handleItemRemove} className={styles["cart__item-remove"]}>
          <img src={btnDel}></img>
        </div>
      )}
    </div>
  );
};

export default CartItem;

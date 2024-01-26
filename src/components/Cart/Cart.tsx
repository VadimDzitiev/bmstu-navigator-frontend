import React, { useEffect, useState } from "react";
import CartItem from "../CartItem/CartItem";
import { Response } from "../../types";
import Cookies from "universal-cookie";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const cookies = new Cookies();
import { cartItemProps } from "../../types";

import styles from "./Cart.module.scss";
import Button from "../Button/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../store/store";
import { updateCart } from "../../store/userSlice";
import { toast } from "react-toastify";

const Cart = () => {
  const [cartItems, setCartItems] = useState<cartItemProps[]>([]);
  const [isCartMatched, setIsCartMatched] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>() as { id: string };
  const currentCart = useSelector(
    (state: RootState) => state.user.current_cart
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartApplication = useSelector(
    (state: RootState) => state.user.current_cart
  );

  const fetchCartData = async () => {
    try {
      const url = isCartMatched
        ? `http://localhost:8000/Requests/${cartApplication}/`
        : `http://localhost:8000/Requests/${id}/`;

      const response: Response = await axios(url, {
        method: "GET",
        withCredentials: true,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${cookies.get("access_token")}`,
        },
      });

      console.log(response.data);
      setCartItems(response.data.service);
    } catch (e) {
      console.log(e);
    }
  };

  const formApplication = async (status_id: number) => {
    try {
      const updatedData = {
        status: status_id,
      };

      const response: Response = await axios(
        `http://localhost:8000/Requests/update_by_user/`,
        {
          method: "PUT",
          data: updatedData,
          withCredentials: false,
        }
      );

      dispatch(updateCart(-1));
      navigate("/Bmstu-navigator/");
      toast.success("Заказ оформлен");
    } catch (e) {
      console.log(e);
    }
  };

  const deleteItem = async (itemId: number) => {
    try {
      const responce = await axios(
        `http://localhost:8000/Requests/${cartApplication}/delete_service/${itemId}/`,
        {
          method: "DELETE",
        }
      );
      console.log(responce);
      setCartItems((prevCartItems) =>
        prevCartItems.filter((item) => item.id !== itemId)
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (id) {
      setIsCartMatched(currentCart.toString() == id);
    }
  }, []);

  useEffect(() => {
    fetchCartData();
  }, [isCartMatched, currentCart]);

  if (isCartMatched) {
    return (
      <div className={styles.cart}>
        <div className={styles.cart__header}>
          <div className={styles.cart__header_title}>Корзина</div>
          <div
            className={styles.cart__header_clear}
            onClick={() => formApplication(2)}
          >
            Очистить корзину
          </div>
        </div>
        <div className={styles.cart__content}>
          {cartItems.map((route) => (
            <CartItem
              key={route.id}
              {...route}
              onDelete={deleteItem}
              updateAllow={true}
            />
          ))}
        </div>
        <div className={styles.cart__actions}>
          <Link to="/Bmstu_navigator/">
            <Button className={styles.cart__actions_back}>Назад</Button>
          </Link>

          <Button
            onClick={() => formApplication(3)}  
            className={styles.cart__actions_send}
          >
            Отправить заявку
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.cart}>
        <div className={styles.cart__header}>
          <div className={styles.cart__header_title}>Заявка №{id}</div>
        </div>
        <div className={styles.cart__content}>
          {cartItems.map((route) => (
            <CartItem
              key={route.id}
              {...route}
              onDelete={deleteItem}
              updateAllow={false}
            />
          ))}
        </div>
        <div className={styles.cart__actions}>
          <Link to="/Bmstu_navigator/history">
            <Button className={styles.cart__actions_back}>Назад</Button>
          </Link>
        </div>
      </div>
    );
  }
};

export default Cart;

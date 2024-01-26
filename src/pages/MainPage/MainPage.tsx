import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

// import InfoBlock from "../../components/InfoBlock/InfoBlock";
import Card from "../../components/Card/Card";
// import DropDown from "../../components/Dropdown/Dropdown";
import SliderFilter from "../../components/Slider/Slider";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Skeleton from "../../components/Skeleton/Skeleton";
import { setRoutes } from "../../store/filtersSlices";
import styles from "./mainpage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Route, { routeData } from "../../types";
import { cardInfoProps } from "../../types";
import { DOMEN, CATEGORIES } from "../../consts";
import { RouteMock } from "../../consts";
import { RootState } from "../../store/store";
import { Response } from "../../types";
import { updateCart } from "../../store/userSlice";
import { toast } from "react-toastify";
import { setInputValue } from "../../store/filtersSlices";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const MainPage = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector(
    (state: RootState) => state.filter.input_value
  );
  const sliderValue = useSelector(
    (state: RootState) => state.filter.price_range
  );
  // const routes = useSelector((state: RootState) => state.filter.routes);
  const [routes,setRoutes]=useState<routeData[]>([])
  useEffect(()=>{fetchData()},[sliderValue,searchValue])
  
  const addRouteToApp = async (id: number) => {
    try {
      const response: Response = await axios(
        `http://localhost:8000/Service/${id}/add_to_request/`,
        {
          method: "POST",
          withCredentials: true,
        }
      );
      console.log(response.data)
      if (response.data) {
        dispatch(updateCart(response.data.id));
      }
      toast.success("Добавлено в корзину");
    } catch (e) {
      console.log(e);
      toast.error("Сперва авторизируйтесь");
    }
  };

  const [isLoading, setIsLoading] = useState(true);
 
  const cardAddButtonClick = (
    id: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    e.preventDefault();
    addRouteToApp(id);
    fetchData();
  };

  const createMock = () => {
    let filteredRoutes: cardInfoProps[] = RouteMock.filter(
      (route) => route.status == true
    );
  }
  const fetchData = async () => {
    try {
      const params = searchValue
        ? `?search=${encodeURIComponent(searchValue)}&min_time=${sliderValue[0]}&max_time=${sliderValue[1]}`
        : `?min_time=${sliderValue[0]}&max_time=${sliderValue[1]}`;

      const response = await axios(`http://localhost:8000/Service/${params}`, {
        method: "GET",
        withCredentials: true,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${cookies.get("access_token")}`,
        },
      });
      console.log(response.data);
      const routes = response.data.service;
      if (response.data.app_id) {
        dispatch(updateCart(response.data.app_id));
      }
      setRoutes(routes)
      setIsLoading(false);
    } catch (error) {
      createMock();
      setIsLoading(false);
    }
  };
  return (
    <div className={styles.mainpage}>
      <div className={styles.container}>
        {/* <InfoBlock /> */}

        <div className={styles.mainpage__actions}>
          <div className={styles.mainpage__input}>
            <Input onChangeValue={(i) => dispatch(setInputValue(i))} />
            <Button>Поиск</Button>
          </div>

          <div className={styles.mainpage__filters}>
            <SliderFilter
              value={sliderValue}
              minimum={0}
              maximum={20}
              title="Минуты"
            />
          </div>
        </div>

        <div className={styles.mainpage__inner}>
          {isLoading ? (
            [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          ) : (
            routes.map((item) => (
              <Link
                to={`/Bmstu-navigator/${item.id}`}
                key={item.id}
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <Card
                    onAddClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                      cardAddButtonClick(item.id, e)
                    }
                    key={item.id}
                    {...item}
                  ></Card>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};


export default MainPage;

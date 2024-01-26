import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/Card/Card";
import SliderFilter from "../../components/Slider/Slider";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Skeleton from "../../components/Skeleton/Skeleton";
import styles from "./mainpage.module.scss";
import { cardInfoProps } from "../../types";
import { RouteMock } from "../../consts";

const MainPage = () => {
  const [items, setItems] = useState<cardInfoProps[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [sliderValues, setSliderValues] = useState([0, 20]);

  const handleSliderChange = (values: number[]) => {
    setSliderValues(values);
  };


  useEffect(() => {
    const params = searchValue
      ? `?search=${encodeURIComponent(searchValue)}&min_time=${
          sliderValues[0]}&max_time=${sliderValues[1]}`
      : `?min_time=${sliderValues[0]}&max_time=${
          sliderValues[1]
        }`;
    fetch(`http://localhost:8000/Service/${params}`) //!!!!!!!!!!!!!!!
      .then((response) => response.json())
      .then((data) => {
        const routes = data['service'];
        console.log(routes)
        setItems(routes);
        setIsLoading(false);
      })
      .catch(() => {
        createMock();
        setIsLoading(false);
      });
  }, [searchValue, sliderValues]);

  const createMock = () => {
    let filteredRoutes: cardInfoProps[] = RouteMock.filter(
      (route) => route.status == true
    );

    if (searchValue) {
      filteredRoutes = filteredRoutes.filter((route) =>
        route.name.includes(searchValue)
      );
    }

    if (sliderValues) {
      filteredRoutes = filteredRoutes.filter(
        (route) =>
          route.transition_time > sliderValues[0] && route.transition_time < sliderValues[1]
      );
    }
    setItems(filteredRoutes);
  };

  return (
    <div className={styles.mainpage}>
      <div className={styles.container}>
        {/* <InfoBlock /> */}
        <div className={styles.mainpage__actions}>
          <div className={styles.mainpage__input}>
            <Input onChangeValue={(i) => setSearchValue(i)} />
            <Button>Поиск</Button>
          </div>
          <div className={styles.mainpage__filters}>
            <SliderFilter
              onChangeValues={handleSliderChange}
              minimum={0}
              maximum={20}
              title="Время"
            />
          </div>
        </div>

        <div className={styles.mainpage__inner}>
          {isLoading
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            : items.map((item: cardInfoProps) => (
                <Link
                  to={`/Bmstu-navigator-frontend/${item.id}`}
                  key={item.id}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Card key={item.id} {...item} />
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;

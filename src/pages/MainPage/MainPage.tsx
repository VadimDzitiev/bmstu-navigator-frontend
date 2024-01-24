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
import { setOptions } from "../../store/filtersSlices";

import styles from "./mainpage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Option, { optionData } from "../../types";
import { cardInfoProps } from "../../types";
import { DOMEN, CATEGORIES } from "../../consts";
import { OptionsMock } from "../../consts";
import { RootState } from "../../store/store";
import { Response } from "../../types";
import { updateCart } from "../../store/userSlice";
import { toast } from "react-toastify";
import { setInputValue } from "../../store/filtersSlices";
import Cookies from "universal-cookie";

const cookies = new Cookies();
// const MainPage = () => {
//   const [items, setItems] = useState<cardInfoProps[]>([]);

//   const [isLoading, setIsLoading] = useState(true);
//   const [searchValue, setSearchValue] = useState("");
//   const [sliderValues, setSliderValues] = useState([0, 20]);
//   const [categoryValue, setCategoryValue] = useState("Любая категория");

//   const handleSliderChange = (values: number[]) => {
//     setSliderValues(values);
//   };


//   useEffect(() => {
//     const params = searchValue
//       ? `?search=${encodeURIComponent(searchValue)}&min_time=${
//           sliderValues[0]
//         }&max_time=${sliderValues[1]}`
//       : `?min_time=${sliderValues[0]}&max_time=${
//           sliderValues[1]
//         }`;
//     fetch(`http://localhost:8000/Service/${params}`) //!!!!!!!!!!!!!!!
//       .then((response) => response.json())
//       .then((data) => {
//         const options = data['service'];
//         console.log(options)
//         setItems(options);
//         setIsLoading(false);
//       })
//       .catch(() => {
//         createMock();
//         setIsLoading(false);
//       });
//   }, [searchValue, sliderValues, categoryValue]);

//   const createMock = () => {
//     let filteredOptions: cardInfoProps[] = OptionsMock.filter(
//       (option) => option.status == true
//     );

//     if (searchValue) {
//       filteredOptions = filteredOptions.filter((option) =>
//         option.name.includes(searchValue)
//       );
//     }

//     if (sliderValues) {
//       filteredOptions = filteredOptions.filter(
//         (option) =>
//           option.transition_time > sliderValues[0] && option.transition_time < sliderValues[1]
//       );
//     }

//     if (categoryValue != "Любая категория") {
//       filteredOptions = filteredOptions.filter(
//         (option) => option.name == categoryValue
//       );
//     }
//     setItems(filteredOptions);
//   };

//   return (
//     <div className={styles.mainpage}>
//       <div className={styles.container}>
//         <InfoBlock />
//         <div className={styles.mainpage__actions}>
//           <div className={styles.mainpage__input}>
//             <Input onChangeValue={(i) => setSearchValue(i)} />
//             <Button>Поиск</Button>
//           </div>
//           <div className={styles.mainpage__filters}>
//             {/* <SliderFilter
//               onChangeValues={handleSliderChange}
//               minimum={0}
//               maximum={20}
//               title="Время"
//             /> */}
//           </div>
//         </div>

//         <div className={styles.mainpage__inner}>
//           {isLoading
//             ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
//             : items.map((item: cardInfoProps) => (
//                 <Link
//                   to={`/Bmstu-navigator/${item.id}`}
//                   key={item.id}
//                   style={{ textDecoration: "none", color: "black" }}
//                 >
//                   <Card key={item.id} {...item} />
//                 </Link>
//               ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainPage;


const MainPage = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector(
    (state: RootState) => state.filter.input_value
  );
  const sliderValue = useSelector(
    (state: RootState) => state.filter.price_range
  );
  // const options = useSelector((state: RootState) => state.filter.options);
  const [options,setOptions]=useState<optionData[]>([])
  useEffect(()=>{fetchData()},[sliderValue,searchValue])
  
  const addOptionToApp = async (id: number) => {
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
    addOptionToApp(id);
    fetchData();
  };

  const createMock = () => {
    let filteredOptions: cardInfoProps[] = OptionsMock.filter(
      (option) => option.status == true
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
      const options = response.data.service;
      if (response.data.app_id) {
        dispatch(updateCart(response.data.app_id));
      }
      setOptions(options)
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
            options.map((item) => (
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

import React, { useCallback } from "react";

import styles from "./input.module.scss";

import debounce from "lodash.debounce";
import classNames from "classnames";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  searchValue: string
  className?: string
  isDate?: true
  name?: string
  value?: string;
  onChangeValue: (value: string) => void;
};

const Input: React.FC<InputProps> = ({ onChangeValue, searchValue, className, isDate, name, }) => {
  // const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   onChangeValue(event.target.value);
  // };

  const onUpdateSearch = useCallback(
    debounce((str) => {
      onChangeValue(str);
    }, 1000),
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateSearch(event.target.value);
  };

  return (
    <div className={classNames(styles["input"], className)}>
      <form>
        <input
          value={searchValue}
          onChange={onChangeInput}
          className={styles.input__block}
          type={isDate ? "date" : "text"}
          name={name ? name : "name"}
          placeholder="Начните поиск..."
        ></input>
      </form>
    </div>
  );
};

export default Input;


// import React, { useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import styles from "./input.module.scss";

// import debounce from "lodash.debounce";
// import { RootState } from "../../store/store";

// export type InputProps = Omit<
//   React.InputHTMLAttributes<HTMLInputElement>,
//   "onChange" | "value"
// > & {
//   value?: string;
//   onChangeValue: (value: string) => void;
// };

// const Input: React.FC<InputProps> = ({ onChangeValue }) => {
//   const onUpdateSearch = useCallback(
//     debounce((str) => {
//       onChangeValue(str);
//     }, 0),
//     []
//   ); //вот тут надо подумать как дебаунсить эту историю, чтобы при этом значение в сторе обновлялось сразу, а запросы не улетали мгновенно

//   const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
//     onUpdateSearch(event.target.value);
//   };

//   const searchValue = useSelector(
//     (state: RootState) => state.filter.input_value
//   );

//   return (
//     <div className={styles.input}>
//       <form>
//         <input
//           value={searchValue}
//           onChange={onChangeInput}
//           className={styles.input__block}
//           type="text"
//           placeholder="Начните поиск..."
//         ></input>
//       </form>
//     </div>
//   );
// };

// export default Input;


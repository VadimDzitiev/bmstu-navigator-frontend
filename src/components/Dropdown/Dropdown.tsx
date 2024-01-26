import { Dropdown } from "react-bootstrap";

import styles from "./dropdown.module.scss";
import { useState } from "react";

import Route from "../../types";

export type DropDownProps = {
  route: Route[];
  defaultTitle: string;
  onChangeValue: (selectedRoute: Route) => void; // Добавленный проп
};

const DropDown: React.FC<DropDownProps> = ({
  route,
  defaultTitle,
  onChangeValue,
}) => {
  const [title, setTitle] = useState<Route>(route[0]);

  const handleSelect = (selectedRoute: Route) => {
    setTitle(selectedRoute);
    onChangeValue(selectedRoute);
  };

  return (
    <Dropdown className={styles.dropdown}>
      <Dropdown.Toggle className={styles.dropdown__toggle}>
        {title ? title.name : defaultTitle}
      </Dropdown.Toggle>

      <Dropdown.Menu className={styles.dropdown__menu}>
        {route.map((route) => (
          <Dropdown.Item onClick={() => handleSelect(route)} key={route.id}>
            {route.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDown;

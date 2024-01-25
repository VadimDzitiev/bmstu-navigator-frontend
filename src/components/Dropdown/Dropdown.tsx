import { Dropdown } from "react-bootstrap"
import { useDispatch } from "react-redux"
import styles from "./dropdown.module.scss"
import {
  setDropdownValueId,
  setDropdownValueName,
} from "../../store/filtersSlices"
import Route from "../../types"

export type DropDownProps = {
  routes: Route[]
  title: string
  handleSelect: (value: Route) => void
}

const DropDown: React.FC<DropDownProps> = ({
  routes,
  title,
  handleSelect,
}) => {
  return (
    <Dropdown className={styles.dropdown}>
      <Dropdown.Toggle className={styles.dropdown__toggle}>
        {title}
      </Dropdown.Toggle>

      <Dropdown.Menu className={styles.dropdown__menu}>
        {routes.map((route) => (
          <Dropdown.Item onClick={() => handleSelect(route)} key={route.id}>
            {route.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default DropDown

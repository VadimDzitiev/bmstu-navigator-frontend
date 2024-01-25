import React from "react"
import RouteEdit from "../../components/RoutesEdit/RouteEdit"
import styles from "./routeadminpanel.module.scss"

const RouteAdminPanel = () => {
  return (
    <div className={styles["route-edit_page"]}>
      <RouteEdit />
    </div>
  )
}

export default RouteAdminPanel

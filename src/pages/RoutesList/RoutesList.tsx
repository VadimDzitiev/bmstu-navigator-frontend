import React from "react"
import RoutesTable from "../../components/RoutesTable/RoutesTable"
import styles from "./routeslist.module.scss"
const RoutesList = () => {
  return (
    <div className={styles.routeslist_page}>
      <RoutesTable />
    </div>
  )
}

export default RoutesList

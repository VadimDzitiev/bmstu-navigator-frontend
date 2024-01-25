import RouteInfo from "./RouteInfo/RouteInfo";

import styles from "./RoutePage.module.scss";
import { useParams } from "react-router-dom";

const RoutePage = () => {
  const { id } = useParams<{ id: string }>() as { id: string };
  return (
    <div className={styles.routepage}>
      <div className={styles.container}>
        <RouteInfo id={id} />
      </div>
    </div>
  );
};

export default RoutePage;
import RouteInfo from "./RouteInfo/RouteInfo";
import styles from "/src/pages/RoutePage/routepage.module.scss";
import { useParams } from "react-router-dom";

const RoutPage = () => {
  const { id } = useParams<{ id: string }>() as { id: string };
  return (
    <div className={styles.RoutPage}>
      <div className={styles.container}>
        <RouteInfo id={id} />
      </div>
    </div>
  );
};

export default RoutPage;
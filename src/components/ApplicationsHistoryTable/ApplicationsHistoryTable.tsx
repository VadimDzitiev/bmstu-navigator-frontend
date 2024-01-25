import React, { useEffect, useState } from "react";
import { useTable, Column } from "react-table";
import axios from "axios";
import { Response, Status, requestData } from "../../types";
import moment from "moment";
import tick from "../../assets/icons/tick.png"
import close from "../../assets/icons/delete.png"
import styles from "./ApplicationsHistoryTable.module.scss";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Input from "../Input/Input";
import DropDown from "../Dropdown/Dropdown";
import { setAppDropdownValueId, setAppDropdownValueName, setAppEndDate, setAppInputValue, setAppStartDate } from "../../store/adminfilters";
import { STATUSES } from "../../consts";
const cookies = new Cookies();

const ApplicationsHistoryTable = () => {
  const dispatch = useDispatch();
  const [application, setApplication] = useState<requestData[]>([]);
  const isModerator = useSelector((state: RootState) => state.user.is_moderator)
  const categoryValue = useSelector(
    (state: RootState) => state.moderApp.dropdown_value
  )
  const inputValue = useSelector(
    (state: RootState) => state.moderApp.input_value
  )
  const startDay = useSelector(
    (state: RootState) => state.moderApp.date_value.start_date
  )
  const endDay = useSelector(
    (state: RootState) => state.moderApp.date_value.end_date
  )
  const fetchAppsData = async () => {
    try {
      const params = `?start_day=${startDay}&end_day=${endDay}&status=${encodeURIComponent(categoryValue.id)}`
      axios.defaults.withCredentials = true;
      const response: Response = await axios(
        `http://localhost:8000/Requests/${params}`,
        {
          method: "GET",
          //   credentials: 'include',
          withCredentials: true,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${cookies.get("access_token")}`,
          },
        }
      );
      if (response.status == 200) {
        const sortedApplications = response.data.sort(
          (a: { creation_date: Date }, b: { creation_date: Date }) => {
            const dateA = new Date(a.creation_date).getTime()
            const dateB = new Date(b.creation_date).getTime()
            return dateB - dateA // for descending order
          }
        )
        console.log(response.data)
        setApplication(sortedApplications)
      }
      console.log(response.data)
    } catch (e) {
      console.log(e);
    }
  };
  const formApplication = async (application_id: number, status_id: number) => {
    try {
      const updatedData = {
        status: status_id,
      }

      const response: Response = await axios(
        `http://localhost:8000/Requests/${application_id}/update_by_admin/`,
        {
          method: "PUT",
          data: updatedData,
          withCredentials: true,
          headers: {
            "Content-type": "application/json",
          },
        }
      )

      console.log(response)
    } catch (e) {
      console.log(e)
    }
  }
  
  const handleSelect = (Selected: Status) => {
    dispatch(setAppDropdownValueName(Selected.name))
    dispatch(setAppDropdownValueId(Selected.id))
  }
  useEffect(() => {
    // fetchAppsData()
    const intervalId = setInterval(() => {
      fetchAppsData()
    }, 1000)
    return () => clearInterval(intervalId)
  }, []);

  const data = application.filter((item) =>
    item.user.email
      .toString()
      .toLowerCase()
      .includes(inputValue.toLowerCase())
  )
  const columns: Array<Column<{}>> = React.useMemo(
    () => [
      {
        Header: "№",
        accessor: "id",
      },
      {
        Header: "Статус",
        accessor: "status",
        Cell: ({ value }) => {
          let statusText = "";
          switch (value) {
            case 1:
              statusText = "Черновик";
              break;
            case 2:
              statusText = "Удален";
              break;
            case 3:
              statusText = "В работе";
              break;
            case 4:
              statusText = "Завершен";
              break;
            case 5:
              statusText = "Отклонен";
              break;
            default:
              statusText = "";
          }
          return <span>{statusText}</span>;
        },
      },
      {
        Header: "Дата создания",
        accessor: "creation_date",
        Cell: ({ value }) => (
          <span>
            {value ? moment(value).format("DD.MM.YYYY HH:mm") : "Данные отсутствуют"}
          </span>
        ),
      },
      {
        Header: "Дата формирования",
        accessor: "formation_date",
        Cell: ({ value }) => (
          <span>
            {value ? moment(value).format("DD.MM.YYYY HH:mm") : "Данные отсутствуют"}
          </span>
        ),
      },
      {
        Header: "Дата завершения",
        accessor: "completion_date",
        Cell: ({ value }) => (
          <span>
            {value ? moment(value).format("DD.MM.YYYY HH:mm") : "Данные отсутствуют"}
          </span>
        ),
      },
      {
        Header: "Заказчик",
        accessor: "user.email",
      },
      {
        Header: "Информация",
        Cell: ({ cell }) => (
          <Link
            style={{
              textDecoration: "underline",
              color: "black",
            }}
            to={`/Bmstu-navigator/Requests/${cell.row.values.id}`}
          >
            Подробнее&gt;
          </Link>
          // <Button onClick={() => console.log("aaa")}>Открыть</Button>
        ),
      },
      {
        Header: "Действие",
        accessor: "action",
        Cell: ({ row }) => (
          <div className={styles.moder_action}>
            {row.values.status === 3 ? (
              <>
                <img
                  onClick={() => formApplication(row.values.id, 4)}
                  className={styles.moder_actionbutton}
                  style = {{width:20,height:20}}
                  src={tick}
                ></img>
                <img
                  onClick={() => formApplication(row.values.id, 5)}
                  className={styles.moder_actionbutton}
                  style = {{width:20,height:20}}
                  src={close}
                ></img>
              </>
            ) : null}
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    
    <>
    {isModerator && (
        <div className={styles.filters}>
          <Input
            className={styles.input}
            searchValue={inputValue}
            onChangeValue={(i) => dispatch(setAppInputValue(i))}
          />
          <DropDown
            handleSelect={handleSelect}
            routes={STATUSES}
            title={categoryValue.name}
          />
          <div style={{ fontSize: "30px", marginLeft:"80px" }}>с</div>
          <Input
            isDate={true}
            placeholder="DD-MM-YYYY"
            searchValue={startDay}
            onChangeValue={(i) => dispatch(setAppStartDate(i))}
          />
          <div style={{ fontSize: "30px" }}>до</div>
          <Input
            isDate={true}
            placeholder="DD-MM-YYYY"
            searchValue={endDay}
            onChangeValue={(i) => dispatch(setAppEndDate(i))}
          />
        </div>
      )}
    <div className={styles.content}>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </>
  );
};

export default ApplicationsHistoryTable;

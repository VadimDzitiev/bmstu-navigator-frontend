import axios from "axios"
import React, { useEffect, useState } from "react"
import { useTable, Column } from "react-table"
import routeData from "../../types"
import { Response } from "../../types"
import styles from "./routestable.module.scss"
import Button from "../Button/Button"
import deleteIcom from "../../assets/icons/delete.png"
import { Link } from "react-router-dom"

const RoutesTable = () => {
  const [routes, setRoutes] = useState<routeData[]>([])

  const fetchRoutes = async () => {
    try {
      axios.defaults.withCredentials = true
      const response: Response = await axios(`http://localhost:8000/Service/`, {
        method: "GET",

        withCredentials: true,
      })
      console.log(response.data);
      const routes = response.data.service;
      setRoutes(routes)
    } catch (e) {
      console.log(e)
    }
  }
  const columns: Array<Column<{}>> = React.useMemo(
    () => [
      {
        Header: "№",
        accessor: "id",
      },
      {
        Header: "Название",
        accessor: "name",
      },
      {
        Header: "Описание",
        accessor: "description",
      },
      {
        Header: "Время маршрута",
        accessor: "transition_time",
      },
      {
        Header: "Статус",
        accessor: "status",
        Cell: ({ value }) => {
          let status = ""
          value == true ? (status = "Действителен") : (status = "Недействителен")
          return <span>{status}</span>
        },
      },
      {
        Header: "Действие",
        accessor: "action",
        Cell: ({ cell }) => (
          <div className={styles.moder_action}>
            <>
              <Link
                to={`/Bmstu-navigator/routes-list/${cell.row.values.id}`}
              >
                <img
                  className={styles.moder_action__button}
                  ></img>
              </Link>

              <img
                className={styles.moder_action__button}
                src={deleteIcom}
              ></img>
            </>
          </div>
        ),
      },
      {
        Header: "Изображение",
        accessor: "buildings",
        Cell: ({ value }) => {
          return <img style={{ width: 100 }} alt="aaa" src={value}></img>
        },
      },
    ],
    []
  )
  useEffect(() => {
    fetchRoutes()
  }, [])

  const data = routes

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data })
  
    console.log(data);

  return (
    <>
      <div className={styles.content}>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className={styles.addbutton}>
        <Link to={`/Bmstu-navigator/routes-list/0`}>
          <Button>Добавить новую опцию</Button>
        </Link>
      </div>
    </>
  )
}

export default RoutesTable

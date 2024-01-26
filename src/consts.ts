export const DOMEN = "http://127.0.0.1:8000/";

import R1 from "/src/assets/mocking/ГЗ-Э Маршрут.png";
import R2 from "/src/assets/mocking/МТ-ГЗ Маршрут.png";
import R3 from "/src/assets/mocking/Э-СМ Маршрут.png";
import R4 from "/src/assets/mocking/СМ-УЛК Маршрут.png";
import R5 from "/src/assets/mocking/УЛК-СК Маршрут.png";
import mgtu from "/src/assets/mocking/2.png";
export const RouteMock = [
  {
    id: 1,
    name: "МТ - ГЗ",
    transition_time: 6,
    description: "Маршрут межда кампусами МТ - ГЗ",
    status: true,
    buildings: mgtu,
    transition : R1,
  },
  {
    id: 2,
    name: "ГЗ - Э",
    transition_time: 8,
    description: "Маршрут межда кампусами ГЗ - Э",
    status: true,
    buildings: mgtu,
    transition : R2,
  },
  {
    id: 3,
    name: "Э - СМ",
    transition_time: 4,
    description: "Маршрут межда кампусами Э - СМ",
    status: true,
    buildings: mgtu,
    transition : R3,
  },
  {
    id: 4,
    name: "СМ - УЛК",
    transition_time: 4,
    description: "Маршрут межда кампусами СМ - УЛК",
    status: true,
    buildings: mgtu,
    transition : R4,
  },
  {
    id: 5,
    name: "УЛК - СК",
    transition_time: 13,
    description: "Маршрут межда кампусами УЛК - СК",
    status: true,
    buildings: mgtu,
    transition : R5,
  },
];

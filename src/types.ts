import { AxiosResponse } from "axios";
import { MouseEventHandler } from "react";

export default interface Route {
  id: number;
  name: string;

}
export interface Status {
  id: number;
  name: string;
}
export interface routeData {
  id: number;
  name: string;
  transition_time: number;
  description: string;
  status: boolean;
  buildings: string;
  transition: string;
  image?: string;
}

export type Response = Promise<AxiosResponse> | any

export type cardInfoProps = {
  id: number;
  name: string;
  transition_time: number;
  description: string;
  status: boolean;
  buildings: string;
  transition: string; 
  image?: string;
  onAddClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export interface Dates {
  start_date: string
  end_date: string
}

export type cartItemProps = {
  id: number;
  name: string;
  transition_time: number;
  description: string;
  status: boolean;
  buildings:string;
  transition?:string;
  updateAllow: boolean;
  onDelete: (id: number) => void;
};


export type requestData = {
  id: number;
  status: number;
  completion_date:string;
  creation_date:string;
  formation_date:string;
  moderator:string;
  user:Customer;
  transition_time:string;
}

interface Customer {
  email: string
}
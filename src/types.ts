import { AxiosResponse } from "axios";
import { MouseEventHandler } from "react";

export default interface Option {
  id: number;
  name: string;

}

export interface optionData {
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

export default interface Route {
  id: number;
  name: string;

}

import { AxiosResponse } from "axios"

export type Response = Promise<AxiosResponse> | any

export type cardInfoProps = {
  id: number;
  name: string;
  transition_time: number;
  description: string;
  status: boolean;
  buildings: string,
  transition: string,  
};

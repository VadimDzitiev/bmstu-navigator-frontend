import { configureStore } from "@reduxjs/toolkit";
import Route, { Dates, routeData } from "../types";
import userReducer from "./userSlice";
import filterReducer from "./filtersSlices";
import moderAppReducer from "./adminfilters"
export interface RootState {
  user: {
    user_id: BigInteger;
    user_email: string;
    is_authenticated: boolean;
    is_moderator: boolean;
    current_cart: number;
  };
  filter: {
    price_range: number[];
    input_value: string;
    dropdown_value: Route;
    routes: routeData[];
  };
  moderApp: {
    input_value: string
    dropdown_value: Route
    date_value: Dates
  };
}

const store = configureStore({
  reducer: {
    user: userReducer,
    filter: filterReducer,
    moderApp: moderAppReducer,
  },
});

export default store;

// Экспортируйте тип RootState
// export type RootState = ReturnType<typeof store.getState>;

import { INIT_STATE } from "./states";
import { createSelector } from "reselect";

const selectData = (state) => state.bookingReducer || INIT_STATE

export {}
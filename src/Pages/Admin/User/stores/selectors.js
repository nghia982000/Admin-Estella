import { INIT_STATE } from "./states";
import { createSelector } from "reselect";

const selectData = (state) => state.userReducers || INIT_STATE

export {}
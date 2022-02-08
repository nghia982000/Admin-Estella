import { INIT_STATE } from "./states";
import { createSelector } from "reselect";

const selectData = (state) => state.loginReducers || INIT_STATE

export {}
import { INIT_STATE } from "./states";
import { createSelector } from "reselect";

const selectData = (state) => state.systemReducers || INIT_STATE

export {}
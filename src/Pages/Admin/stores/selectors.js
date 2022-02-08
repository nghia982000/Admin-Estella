import { INIT_STATE } from "./states";
import { createSelector } from "reselect";

const selectData = (state) => state.adminReducers || INIT_STATE

export {}
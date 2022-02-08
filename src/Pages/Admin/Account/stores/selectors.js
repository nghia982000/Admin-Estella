import { INIT_STATE } from "./states";
import { createSelector } from "reselect";

const selectData = (state) => state.accountReducers || INIT_STATE

export {
}
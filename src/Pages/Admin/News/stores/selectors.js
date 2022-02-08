import { INIT_STATE } from "./states";
import { createSelector } from "reselect";

const selectData = (state) => state.newsReducers || INIT_STATE
const selectDetailNews = createSelector(selectData, (state) => state.dataDetailNews)

export {
    selectDetailNews
}
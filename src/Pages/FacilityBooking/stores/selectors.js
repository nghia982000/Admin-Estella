import { INIT_STATE } from "./states";
import { createSelector } from "reselect";

const selectData = (state) => state.facilityBookingReducers || INIT_STATE
const selectFacilityBooking = createSelector(selectData, (state) => state.dataFacilityBooking)
const selectBooking = createSelector(selectData, (state) => state.dataBooking)
export {
    selectFacilityBooking,
    selectBooking
}
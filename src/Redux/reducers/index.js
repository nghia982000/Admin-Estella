import { combineReducers } from "redux"
import loginReducers from "../../Pages/Login/stores/reducers"
import userReducers from "../../Pages/Admin/User/stores/reducers"
import  adminReducers from "../../Pages/Admin/stores/reducers"
import  newsReducers from "../../Pages/Admin/News/stores/reducers"
import accountReducers from '../../Pages/Admin/Account/stores/reducers'
import systemReducers from "../../Pages/Admin/Services/System/stores/reducers"
import bookingReducers from "../../Pages/Admin/Services/Booking/stores/reducers"
import facilityBookingReducers from "../../Pages/FacilityBooking/stores/reducers"

export default function createReducer() {
  const rootReducer = combineReducers({
    loginReducers,
    userReducers,
    bookingReducers,
    adminReducers,
    newsReducers,
    accountReducers,
    systemReducers,
    facilityBookingReducers
  })
  return rootReducer
}
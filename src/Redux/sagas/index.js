import { all } from "redux-saga/effects"

import * as Login from "../../Pages/Login/stores/sagas"
import * as User from "../../Pages/Admin/User/stores/sagas"
import * as Admin from "../../Pages/Admin/stores/sagas"
import * as News from "../../Pages/Admin/News/stores/sagas"
import * as Account from "../../Pages/Admin/Account/stores/sagas"
import * as System from "../../Pages/Admin/Services/System/stores/sagas"
import * as Booking from "../../Pages/Admin/Services/Booking/stores/sagas"
import * as FacilityBooking from "../../Pages/FacilityBooking/stores/sagas"

export default function* () {
  yield all([
    Login.sagaLogin(),
    
    Admin.sagaChangePassword(),

    User.sagaGetAll(),
    User.sagaGetResident(),
    User.sagaGetTenant(),
    User.sagaGetAdmin(),
    User.sagaGetReception(),
    User.sagaGetAccountant(),
    User.sagaGetSecurity(),
    User.sagaGetGuest(),
    User.sagaDeleteUser(),
    User.sagaCreateUser(),

    News.sagaGetAll(),
    News.sagaDeleteNews(),
    News.sagaCreateNews(),
    News.sagaUpdateNews(),
    News.sagaDetailNews(),

    Account.sagaGetAll(),
    Account.sagaCreateAccount(),

    System.sagaGetAll(),
    System.sagaCreateService(),
    System.sagaDeleteService(),



    Booking.sagaGetAll(),
    Booking.sagaGetDetail(),

    FacilityBooking.sagaGetAll(),
    FacilityBooking.sagaGetAllBooking(),
    FacilityBooking.sagaGetBookingDetail(),
    FacilityBooking.sagaBookingSubmit(),

  ])
}

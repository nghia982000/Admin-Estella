import { takeLatest, call, put } from 'redux-saga/effects'
import * as api from "../../../Api/facilityBooking"
import {
  GET_ALL,
  GET_ALL_BOOKING,
  GET__BOOKING_DETAIL,
  BOOKING_SUBMIT
} from './constants'
import {
  saveGetAll,
  saveGetAllBooking
} from './actions'

function* getAll({payload}) {
  try {
      const data = yield call(api.getAll,payload)
      console.log(data.data.result.data)
      yield put(saveGetAll(data.data.result.data))
  } catch (error) {
      console.log(error)
  }
}
export function* sagaGetAll() {
  yield takeLatest(GET_ALL, getAll)
}
//--------------------
function* getAllBooking({payload}) {
  try {
      const data = yield call(api.getAllBooking,payload)
      console.log(data.data.result.data)
      yield put(saveGetAllBooking(data.data.result.data))
  } catch (error) {
      console.log(error)
  }
}
export function* sagaGetAllBooking() {
  yield takeLatest(GET_ALL_BOOKING, getAllBooking)
}
//--------------------------
function* getBookingDetail({ payload, resolve }) {
  try {
    const response = yield call(api.getBookingDetail, payload)
    resolve(response.data)
  } catch (err) {
    console.error(err)
    resolve(null)
  }
}
export function* sagaGetBookingDetail() {
  yield takeLatest(GET__BOOKING_DETAIL, getBookingDetail)
}
//--------------------------
function* bookingSubmit({ payload, resolve }) {
  try {
    const response = yield call(api.getBookingSubmit, payload)
    resolve(response.data)
  } catch (err) {
    console.error(err)
    resolve(null)
  }
}
export function* sagaBookingSubmit() {
  yield takeLatest(BOOKING_SUBMIT, bookingSubmit)
}

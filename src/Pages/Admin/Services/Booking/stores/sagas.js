import { takeLatest, call } from 'redux-saga/effects';
import * as api from "../../../../../Api/booking";
import {
  GET_BOOKING,
  GET_DETAIL
} from './constant';

function* getAll({ payload, resolve }) {
  try {
    const response = yield call(api.getBooking, payload)
    resolve(response.data)
  } catch (err) {
    console.error(err)
    resolve(null)
  }
}

export function*  sagaGetAll() {
    yield takeLatest(GET_BOOKING, getAll)
}

function* getDetail({ payload, resolve }) {
  try {
    const response = yield call(api.getDetail, payload)
    resolve(response)
  } catch (err) {
    console.error(err)
    resolve(null)
  }
}

export function*  sagaGetDetail() {
  yield takeLatest(GET_DETAIL, getDetail)
}

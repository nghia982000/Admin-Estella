import { takeLatest, call, put } from 'redux-saga/effects'
import * as api from "../../../Api/changePassword"
import {
  CHANGE_PASSWORD
} from './constants'

function* changePassword({ payload, resolve }) {
  try {
    const response = yield call(api.changePassword, payload)
    resolve(response.data)
  } catch (err) {
    console.error(err)
    resolve(null)
  }
}

export function*  sagaChangePassword() {
    yield takeLatest(CHANGE_PASSWORD, changePassword)
}
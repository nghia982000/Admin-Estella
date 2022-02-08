import { takeLatest, call, put } from 'redux-saga/effects'
import * as api from "../../../Api/login"
import {
    LOGIN
} from './constants'

function* login({ payload, resolve }) {
  try {
    const response = yield call(api.login, payload)
    resolve(response.data)
  } catch (err) {
    console.error(err)
    resolve(null)
  }
}

export function*  sagaLogin() {
    yield takeLatest(LOGIN, login)
}
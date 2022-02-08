import { takeLatest, call, put } from 'redux-saga/effects'
import * as api from "../../../../Api/account"
import {
  GET_ALL_ACCOUNT,
  CREATE_ACCOUNT
} from './constants'
function* getAll({ resolve }) {
  try {
    const response = yield call(api.getAll)
    resolve(response.data)
  } catch (err) {
    console.error(err)
    resolve(null)
  }
}
export function* sagaGetAll() {
  yield takeLatest(GET_ALL_ACCOUNT, getAll)
}
function* createAccount({ payload, resolve }) {
  try {
    console.log('call api create')
    const response = yield call(api.createAccount, payload)
    console.log(response)
    resolve(response)
  } catch (err) {
    console.error(err)
    resolve(null)
  }
}
export function* sagaCreateAccount() {
  yield takeLatest(CREATE_ACCOUNT, createAccount)
}


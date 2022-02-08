import { takeLatest, call, put } from 'redux-saga/effects'
import * as api from "../../../../../Api/system"
import {
  GET_ALL_SERVICE,
  CREATE_SERVICE,
  DELETE_SERVICE
} from './constants'

function* getAll({ payload, resolve }) {
  try {
    console.log(payload)
    const response = yield call(api.getAllService, payload)
    resolve(response.data)
  } catch (err) {
    console.error(err)
    resolve(null)
  }
}
export function* sagaGetAll() {
  yield takeLatest(GET_ALL_SERVICE, getAll)
}
function* createService({ payload, resolve }) {
  try {
    console.log('call api create')
    const response = yield call(api.createService, payload)
    console.log(response)
    resolve(response)
  } catch (err) {
    console.error(err)
    resolve(null)
  }
}
export function* sagaCreateService() {
  yield takeLatest(CREATE_SERVICE, createService)
}
//---------------------------------------------------------
function* deleteService({ payload, resolve }) {
  try {
    console.log('call api create')
    const response = yield call(api.deleteSystem, payload)
    console.log(response)
    resolve(response)
  } catch (err) {
    console.error(err)
    resolve(null)
  }
}
export function* sagaDeleteService() {
  yield takeLatest(DELETE_SERVICE, deleteService)
}
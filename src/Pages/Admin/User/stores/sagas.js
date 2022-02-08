import { takeLatest, call, put } from 'redux-saga/effects'
import * as api from "../../../../Api/user"
import {
  GET_ALL,
  GET_RESIDENT,
  GET_TENANT,
  GET_ADMIN,
  GET_RECEPTION,
  GET_ACCOUNTANT,
  GET_SECURITY,
  GET_GUEST,
  DELETE_USER,
  CREATE_USER
} from './constants'

function* getAll({ payload, resolve }) {
  try {
    const response = yield call(api.getAll, payload)
    resolve(response.data)
  } catch (err) {
    console.error(err)
    resolve(null)
  }
}
export function* sagaGetAll() {
  yield takeLatest(GET_ALL, getAll)
}
//----------------------------------
function* getResident({ payload, resolve }) {
  try {
    const response = yield call(api.getResident, payload)
    resolve(response.data)
  } catch (err) {
    console.error(err)
    resolve(null)
  }
}
export function* sagaGetResident() {
  yield takeLatest(GET_RESIDENT, getResident)
}
//-------------------------------------
function* getTenant({ payload, resolve }) {
  try {
    const response = yield call(api.getTenant, payload)
    resolve(response.data)
  } catch (err) {
    console.error(err)
    resolve(null)
  }
}
export function* sagaGetTenant() {
  yield takeLatest(GET_TENANT, getTenant)
}
//-------------------------------------
function* getAdmin({ payload, resolve }) {
  try {
    const response = yield call(api.getAdmin, payload)
    resolve(response.data)
  } catch (err) {
    console.error(err)
    resolve(null)
  }
}
export function* sagaGetAdmin() {
  yield takeLatest(GET_ADMIN, getAdmin)
}
//-------------------------------------
function* getReception({ payload, resolve }) {
  try {
    const response = yield call(api.getReception, payload)
    resolve(response.data)
  } catch (err) {
    console.error(err)
    resolve(null)
  }
}
export function* sagaGetReception() {
  yield takeLatest(GET_RECEPTION, getReception)
}
//-------------------------------------
function* getAccountant({ payload, resolve }) {
  try {
    const response = yield call(api.getAccountant, payload)
    resolve(response.data)
  } catch (err) {
    console.error(err)
    resolve(null)
  }
}
export function* sagaGetAccountant() {
  yield takeLatest(GET_ACCOUNTANT, getAccountant)
}
//-------------------------------------
function* getSecurity({ payload, resolve }) {
  try {
    const response = yield call(api.getSecurity, payload)
    resolve(response.data)
  } catch (err) {
    console.error(err)
    resolve(null)
  }
}
export function* sagaGetSecurity() {
  yield takeLatest(GET_SECURITY, getSecurity)
}
//-------------------------------------
function* getGuest({ payload, resolve }) {
  try {
    const response = yield call(api.getGuest, payload)
    resolve(response.data)
  } catch (err) {
    console.error(err)
    resolve(null)
  }
}
export function* sagaGetGuest() {
  yield takeLatest(GET_GUEST, getGuest)
}
//-------------------------------------
function* deleteUser({ payload, resolve }) {
  try {
    const response = yield call(api.deleteUser, payload)
    resolve(response.data)
  } catch (err) {
    console.error(err)
    resolve(null)
  }
}
export function* sagaDeleteUser() {
  yield takeLatest(DELETE_USER, deleteUser)
}
//-------------------------------------
function* createUser({ payload, resolve }) {
  try {
    console.log('call api create')
    const response = yield call(api.createUser, payload)
    console.log(response)
    resolve(response)
  } catch (err) {
    console.error(err)
    resolve(null)
  }
}
export function* sagaCreateUser() {
  yield takeLatest(CREATE_USER, createUser)
}
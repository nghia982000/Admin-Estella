import { takeLatest, call, put } from 'redux-saga/effects'
import * as api from "../../../../Api/news"
import {
  GET_ALL_NEWS,
  DELETE_NEWS,
  CREATE_NEWS,
  UPDATE_NEWS,
  DETAIL_NEWS,
} from './constants'
import {saveDetaiNews,statusForm} from './actions'
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
  yield takeLatest(GET_ALL_NEWS, getAll)
}

// //-------------------------------------
function* deleteNews({ payload, resolve }) {
  try {
    const response = yield call(api.deleteNews, payload)
    resolve(response.data)
  } catch (err) {
    console.error(err)
    resolve(null)
  }
}
export function* sagaDeleteNews() {
  yield takeLatest(DELETE_NEWS, deleteNews)
}
//-------------------------------------
function* createNews({ payload, resolve }) {
  try {
    console.log('call api create')
    const response = yield call(api.createNews, payload)
    console.log(response)
    resolve(response)
  } catch (err) {
    console.error(err)
    resolve(null)
  }
}
export function* sagaCreateNews() {
  yield takeLatest(CREATE_NEWS, createNews)
}
//-------------------------------------
function* updateNews({ payload, resolve }) {
  try {
    console.log('call api create')
    const response = yield call(api.updateNews, payload)
    console.log(response)
    resolve(response)
  } catch (err) {
    console.error(err)
    resolve(null)
  }
}
export function* sagaUpdateNews() {
  yield takeLatest(UPDATE_NEWS, updateNews)
}
//-------------------------------------
function* detailNews({ payload, resolve }) {
  try {
    console.log('call api create')
    const response = yield call(api.detailNews, payload)
    console.log(response)
    yield put(saveDetaiNews(response.data.result))
    console.log(response)
    resolve(response)
  } catch (err) {
    console.error(err)
    resolve(null)
  }
}
export function* sagaDetailNews() {
  yield takeLatest(DETAIL_NEWS, detailNews)
}

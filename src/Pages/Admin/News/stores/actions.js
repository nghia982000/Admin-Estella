import {
    GET_ALL_NEWS,
    DELETE_NEWS,
    CREATE_NEWS,
    UPDATE_NEWS,
    DETAIL_NEWS,
    SAVE_DETAIL_NEWS,
    STATUS_FORM
} from './constants'
export const asyncGetAll = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({ 
        type: GET_ALL_NEWS, 
        payload, resolve 
    })
)

//-----------------------
export const asyncDelete = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({ 
        type: DELETE_NEWS, 
        payload, resolve 
    })
)
//-----------------------
export const asyncCreate = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({ 
        type: CREATE_NEWS, 
        payload, resolve 
    })
)
//-----------------------
export const asyncUpdate = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({ 
        type: UPDATE_NEWS, 
        payload, resolve 
    })
)
//-----------------------
export const asyncDetail = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({ 
        type: DETAIL_NEWS, 
        payload, resolve 
    })
)
//------------------------------------
export function saveDetaiNews(payload) {
  return {
      type: SAVE_DETAIL_NEWS,
      payload,
  }
}
//------------------------------------
export function statusForm(payload) {
  return {
      type: STATUS_FORM,
      payload,
  }
}
import {
  GET_ALL_SERVICE,
  CREATE_SERVICE,
  DELETE_SERVICE
} from './constants'
export const asyncGetAll = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({ 
        type: GET_ALL_SERVICE, 
        payload, resolve 
    })
)
export const asyncCreate = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({ 
        type: CREATE_SERVICE, 
        payload, resolve 
    })
)
export const asyncDelete = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({ 
        type: DELETE_SERVICE, 
        payload, resolve 
    })
)

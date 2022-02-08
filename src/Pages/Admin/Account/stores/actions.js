import {
  GET_ALL_ACCOUNT,
  CREATE_ACCOUNT
} from './constants'
export const asyncGetAll = (dispatch) => () =>
  new Promise((resolve) =>
    dispatch({ 
        type: GET_ALL_ACCOUNT, 
        resolve 
    })
)
export const asyncCreate = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({ 
        type: CREATE_ACCOUNT, 
        payload, resolve 
    })
)
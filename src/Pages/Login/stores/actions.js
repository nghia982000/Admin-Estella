import {
    LOGIN
} from './constants'
export const asyncLogin = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({ 
        type: LOGIN, 
        payload, resolve 
    })
)
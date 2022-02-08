import {
    CHANGE_PASSWORD
} from './constants'
export const asyncChangePassword = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({ 
        type: CHANGE_PASSWORD, 
        payload, resolve 
    })
)
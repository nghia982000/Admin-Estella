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
export const asyncGetAll = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({ 
        type: GET_ALL, 
        payload, resolve 
    })
)
export const asyncGetResident = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({ 
        type: GET_RESIDENT, 
        payload, resolve 
    })
)
export const asyncGetTenant = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({ 
        type: GET_TENANT, 
        payload, resolve 
    })
)
export const asyncGetAdmin = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({ 
        type: GET_ADMIN, 
        payload, resolve 
    })
)
export const asyncGetReception = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({ 
        type: GET_RECEPTION, 
        payload, resolve 
    })
)
export const asyncGetAccountant = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({ 
        type: GET_ACCOUNTANT, 
        payload, resolve 
    })
)
export const asyncGetSecurity = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({ 
        type: GET_SECURITY, 
        payload, resolve 
    })
)
export const asyncGetGuest = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({ 
        type: GET_GUEST, 
        payload, resolve 
    })
)
//-----------------------
export const asyncDelete = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({ 
        type: DELETE_USER, 
        payload, resolve 
    })
)
//-----------------------
export const asyncCreate = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({ 
        type: CREATE_USER, 
        payload, resolve 
    })
)
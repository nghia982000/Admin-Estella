import {
  GET_ALL,
  SAVE_GET_ALL,
  GET_ALL_BOOKING,
  SAVE_GET_ALL_BOOKING,
  GET__BOOKING_DETAIL,
  BOOKING_SUBMIT
} from './constants'
export function getAll(payload) {
  return {
      type: GET_ALL,
      payload,
  }
}
export function saveGetAll(payload) {
  return {
      type: SAVE_GET_ALL,
      payload,
  }
}
export function getAllBooking(payload) {
  return {
      type: GET_ALL_BOOKING,
      payload,
  }
}
export function saveGetAllBooking(payload) {
  return {
      type: SAVE_GET_ALL_BOOKING,
      payload,
  }
}
export const asyncGetBookingDetail = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({ 
        type: GET__BOOKING_DETAIL, 
        payload, resolve 
    })
)
export const asyncBookingSubmit = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({ 
        type: BOOKING_SUBMIT, 
        payload, resolve 
    })
)
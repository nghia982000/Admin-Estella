import { GET_BOOKING, GET_DETAIL } from "./constant";

export const asyncGetAllBooking = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({
      type: GET_BOOKING,
      payload,
      resolve,
    })
  );

export const asyncGetDetail = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({
      type: GET_DETAIL,
      payload,
      resolve,
    })
  );

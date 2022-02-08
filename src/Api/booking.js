import request from './until'
export const getBooking = (payload) => {
  return request(`https://quanlycudan.azurewebsites.net/api/Services/get-all-booking`, {
    method: "post",
    data: payload,
  })
}

export const getDetail = (payload) => {
  return request(`https://quanlycudan.azurewebsites.net/api/Services/get-service-booking-detail/${payload}`, {
    method: "post",
  })
}
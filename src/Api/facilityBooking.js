import request from './until'
export const getAll = (payload) => {
    return request(`https://quanlycudan.azurewebsites.net/api/services/get-all`, {
        method: "post",
        data: payload,
    })
}
export const getAllBooking = (payload) => {
    return request(`https://quanlycudan.azurewebsites.net/api/services/get-all-booking`, {
        method: "post",
        data: payload,
    })
}
export const getBookingDetail = (payload) => {
    return request(`https://quanlycudan.azurewebsites.net/api/services/get-service-booking-detail`, {
        method: "post",
        data: payload,
    })
}
export const getBookingSubmit = (payload) => {
    return request(`https://quanlycudan.azurewebsites.net/api/Services/submit`, {
        method: "post",
        data: payload,
    })
}
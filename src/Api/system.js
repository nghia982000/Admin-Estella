import request from './until'
export const getAllService = (payload) => {
    return request(`https://quanlycudan.azurewebsites.net/api/services/get-all`, {
        method: "post",
        data: payload,
    })
}
export const createService = (payload) => {
    return request(`https://quanlycudan.azurewebsites.net/api/services/create`, {
        method: "post",
        data: payload,
    })
}
export const deleteSystem = (payload) => {
    return request(`https://quanlycudan.azurewebsites.net/api/services/delete/${payload}`, {
        method: "post",
        data: payload,
    })
}


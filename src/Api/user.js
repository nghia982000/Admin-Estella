import request from './until'
export const getAll = (payload) => {
    return request(`https://quanlycudan.azurewebsites.net/api/Users/get-all/All`, {
        method: "post",
        data: payload,
    })
}
export const getResident = (payload) => {
    return request(`https://quanlycudan.azurewebsites.net/api/Users/get-all/Resident`, {
        method: "post",
        data: payload,
    })
}
export const getTenant = (payload) => {
    return request(`https://quanlycudan.azurewebsites.net/api/Users/get-all/Tenant`, {
        method: "post",
        data: payload,
    })
}
export const getAdmin = (payload) => {
    return request(`https://quanlycudan.azurewebsites.net/api/Users/get-all/Admin`, {
        method: "post",
        data: payload,
    })
}
export const getReception = (payload) => {
    return request(`https://quanlycudan.azurewebsites.net/api/Users/get-all/Reception`, {
        method: "post",
        data: payload,
    })
}
export const getAccountant = (payload) => {
    return request(`https://quanlycudan.azurewebsites.net/api/Users/get-all/Accountant`, {
        method: "post",
        data: payload,
    })
}
export const getSecurity = (payload) => {
    return request(`https://quanlycudan.azurewebsites.net/api/Users/get-all/Security`, {
        method: "post",
        data: payload,
    })
}
export const getGuest = (payload) => {
    return request(`https://quanlycudan.azurewebsites.net/api/Users/get-all/Guest`, {
        method: "post",
        data: payload,
    })
}
//------------------------------------------------
export const deleteUser = (payload) => {
    return request(`https://quanlycudan.azurewebsites.net/api/Users/delete/${payload}`, {
        method: "post"
    })
}
//------------------------------------------------
export const createUser = (payload) => {
    return request(`https://quanlycudan.azurewebsites.net/api/Users/create`, {
        method: "post",
        data: payload
    })
}

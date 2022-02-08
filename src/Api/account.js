import request from './until'
export const getAll = () => {
    return request(`https://quanlycudan.azurewebsites.net/api/Residence/get-all-users`, {
        method: "post"
    })
}
export const createAccount = (payload) => {
    return request(`https://quanlycudan.azurewebsites.net/api/Residence/create-user`, {
        method: "post",
        data: payload
    })
}
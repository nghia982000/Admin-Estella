import request from './until'
export const getAll = (payload) => {
    return request(`https://quanlycudan.azurewebsites.net/api/news/get-all`, {
        method: "post",
        data: payload,
    })
}
export const deleteNews = (payload) => {
    return request(`https://quanlycudan.azurewebsites.net/api/news/delete/${payload}`, {
        method: "post"
    })
}
export const createNews=(params)=>{
    return request(`https://quanlycudan.azurewebsites.net/api/news/create`, {
        method: 'post',
        requestType: "form",
        data: params,
    })
}
export const updateNews=(payload)=>{
    return request(`https://quanlycudan.azurewebsites.net/api/news/update/${payload.id}`, {
        method: 'post',
        requestType: "form",
        data: payload.formData,
    })
}
export const detailNews = (payload) => {
    return request(`https://quanlycudan.azurewebsites.net/api/news/get-detail/${payload}`, {
        method: "post"
    })
}
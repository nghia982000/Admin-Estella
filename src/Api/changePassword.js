import request from './until'
export const changePassword = (payload) => {
  return request(`https://quanlycudan.azurewebsites.net/api/Users/change-password`, {
    method: "post",
    data: payload,
  })
}
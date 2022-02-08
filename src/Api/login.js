import request from './until'
export const login = (payload) => {
  return request(`https://quanlycudan.azurewebsites.net/api/users/authenticate`, {
    method: "post",
    data: payload,
  })
}
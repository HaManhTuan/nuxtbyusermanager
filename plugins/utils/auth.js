import Cookies from 'js-cookie'

export function getToken() {
  return Cookies.get('token')
}

export function setToken(token, minutes = 0) {
  const time = new Date(new Date().getTime() + minutes * 60 * 1000)
  return Cookies.set('token', token, { expires: time })
}

export function removeToken() {
  return Cookies.remove('token')
}

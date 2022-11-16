
import VueCookies from 'vue-cookies'
function setCookie (name, value) {
  localStorage.setItem(name, value)
  VueCookies.set(name, value)
}

function getCookie (name) {
  if (localStorage.getItem(name)) {
    return localStorage.getItem(name)
  } else {
    return VueCookies.get(name)
  }
}

function removeCookie (name) {
  localStorage.removeItem(name)
  VueCookies.remove(name)
}

export default {
  setCookie,
  getCookie,
  removeCookie
}

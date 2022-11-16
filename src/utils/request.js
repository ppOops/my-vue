import axios from 'axios'
import store from '@/store'
import auth from '@/utils/auth'
import router from '@/router'

// 使用当前域名
function apiurl () {
  let apiUrl = ''
  if (window.location.host.indexOf('localhost') !== -1 || window.location.host.indexOf('10.75') !== -1) {
    apiUrl = process.env.VUE_APP_BASE_API
  } else {
    apiUrl = window.location.protocol + '//' + window.location.host
  }
  return apiUrl
}

axios.defaults.baseURL = apiurl()
// axios.defaults.baseURL = process.env.VUE_APP_BASE_API
axios.defaults.timeout = 10000
axios.defaults.headers['Content-Type'] = 'application/json charset=UTF-8'
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded charset=UTF-8'
// axios.defaults.transformRequhest = [function (data) {
//   var ret = ''
//   for (const it in data) {
//     ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
//   }
//   return ret
// }]
axios.interceptors.request.use(
  config => {
    // 判断token 请求加上
    if (store.getters.user_token || auth.getCookie('user_token')) {
      config.headers.Token = store.getters.user_token || auth.getCookie('user_token')
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    if (parseInt(response.status) === 200) {
      const res = response.data
      if (res.ret_code && res.ret_code === 1) {
        return Promise.resolve(response)
      } else {
        // this.$toast({
        //   message: res.ret_msg || res.msg || '系统错误',
        //   icon: 'warning-o'
        // })
        return Promise.resolve(response)
      }
    }
  },
  error => {
    if (error.response) {
      if (error.response.status === 403) {
        // store.commit('REMOVE_TOKEN')
        // this.$toast({
        //   message: '登录已失效,请重新登录',
        //   icon: 'warning-o'
        // })
        router.push('/login')
      } else {
        return Promise.reject(error.response)
      }
    } else {
      if (error.message.indexOf('Network Error') !== -1) {
        // this.$toast({
        //   message: '网络错误',
        //   icon: 'warning-o'
        // })
      } else {
        // this.$toast({
        //   message: error.message,
        //   icon: 'warning-o'
        // })
      }
      return Promise.reject(error)
    }
  }
)

export async function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: params })
      .then(res => {
        resolve(res.data)
      }).catch(err => {
        if (parseInt(err.status) === 403) {
          reject(err)
        } else {
          reject(err.data)
        }
      })
  })
}
export function post (url, params, config) {
  return new Promise((resolve, reject) => {
    axios.post(url, params, config).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}
export function patch (url, params) {
  return new Promise((resolve, reject) => {
    axios.patch(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
export function put (url, params) {
  return new Promise((resolve, reject) => {
    axios.put(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
export function DELETE (url, params) {
  return new Promise((resolve, reject) => {
    axios.delete(url, { params: params })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

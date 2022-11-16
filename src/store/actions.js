
import * as api from '@/api/apis'
// import auth from '@/utils/auth'
export default {
  // 用户登录
  login ({ commit }, userInfo) {
    // ...
    return api.login().then(res => {
      commit('SET_USERINFO', res.user_info)
      return res
    }).catch(err => {
      return err
    })
  }
}

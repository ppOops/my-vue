/* api管理 post, patch, put, DELETE */
import { post } from '@/utils/request'
// 用户
function login (data) {
  return post('/xxx/login', data)
}

export {
  login
}

import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

import { createStore } from 'vuex'
export default createStore({
  state,
  getters,
  mutations,
  actions
})

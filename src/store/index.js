import Vue from 'vue'
import Vuex from 'vuex'
import {
  Login,
  Logout
} from '@/api'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isSaved: true,
    session: localStorage.getItem("session"),
    username: localStorage.getItem('username')
  },
  mutations: {
    "SAVED": (state) => {
      state.isSaved = !state.isSaved
    },
    "LOGIN": (state, session) => {
      localStorage.setItem("session", session)
      state.session = session
    },
    "LOGOUT": (state) => {
      localStorage.removeItem("session")
      state.session = null
    },
    "USERNAME": (state, username) => {
      localStorage.setItem('username', username)
      state.username = username
    }
  },
  actions: {
    LogIn({
      commit,
      state
    }, data) {
      return Login(data).then(data => {
        commit('LOGIN', data.session)
        commit('USERNAME', data.username)
        return Promise.resolve(data)
      })
    },
    LogOut({
      commit,
      state
    }) {
      return Logout().then(() => {
        commit('LOGOUT')
        return Promise.resolve()
      })
    }
  },
  modules: {}
})
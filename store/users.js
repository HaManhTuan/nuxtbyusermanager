import axios from 'axios'
import Cookies from 'js-cookie'
import { removeToken, setToken } from '../plugins/utils/auth'

export const state = () => ({
  lists: [],
  user: {},
  token: null
})

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },
  GET_USER(state, users) {
    state.lists = users
  },
  REMOVE_USER(state, id) {
    state.lists = state.lists.filter(item => item.id !== id)
  },
  ADD_USER(state, objUser) {
    let max = 0
    state.lists.forEach(list => {
      if (list.no > max) {
        max = list.no
      }
    })
    var no = { no: max + 1 }
    Object.assign(objUser, no)
    state.lists.push(objUser)
  },
  EDIT_USER(state, objUser) {
    state.lists.forEach(list => {
      if (list.id === objUser.id) {
        list.name = objUser.name
        list.age = objUser.age
        list.email = objUser.email
        list.gender = objUser.gender
      }
    })
  },
  SHOW_USER(state, user) {
    state.user = user
  },
  CLEAR_TOKEN(state) {
    state.token = null
  }
}

export const actions = {
  showUser({ commit }, id) {
    return axios.get(`https://user-manager-c67d2-default-rtdb.firebaseio.com/users/${id}.json`).then((response) => {
      commit('SHOW_USER', response.data)
    }).catch((error) => {
      console.log(error)
    })
  },
  getUsers({ commit }, lists) {
    return axios.get('https://user-manager-c67d2-default-rtdb.firebaseio.com/users.json').then((response) => {
      const listsArray = []
      for (const key in response.data) {
        listsArray.push({ ...response.data[key], id: key })
      }
      listsArray.map((item, index) => {
        item.no = ++index
      })
      commit('GET_USER', listsArray)
    }).catch((error) => {
      console.log(error)
    })
  },
  addUser({ commit, state }, objUser) {
    return axios.post('https://user-manager-c67d2-default-rtdb.firebaseio.com/users.json?auth=' + state.token, objUser).then((response) => {
      commit('ADD_USER', { ...objUser, id: response.data.name })
    })
  },
  editUser({ commit, state }, objUser) {
    return axios.put('https://user-manager-c67d2-default-rtdb.firebaseio.com/users/' + objUser.id + '.json?auth=' + state.token, objUser).then((response) => {
      commit('EDIT_USER', response.data)
    })
  },
  removeUser({ commit, state }, id) {
    return axios.delete('https://user-manager-c67d2-default-rtdb.firebaseio.com/users/' + id + '.json?auth=' + state.token).then((response) => {
      commit('REMOVE_USER', id)
    }).catch((error) => {
      console.log(error)
    })
  },
  authenticatorUser({ commit, store }, crendentials) {
    return new Promise((resolve, reject) => {
      let apiURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.fbApiKey}`
      if (!crendentials.isLogin) {
        apiURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.fbApiKey}`
      }
      this.$axios.$post(apiURL, {
        email: crendentials.email,
        password: crendentials.password,
        returnSecureToken: true
      }).then((result) => {
        commit('SET_TOKEN', result.idToken)
        setToken(result.idToken, result.expiresIn)
        resolve({ success: true })
      })
    })
  },
  initAuth({ commit }, req) {
    let token
    if (req) {
      if (!req.headers.cookie) {
        removeToken()
        commit('CLEAR_TOKEN')
        return false
      }
      const tokenKey = req.headers.cookie.split(';').find(t => t.trim().startsWith('token='))
      if (!tokenKey) {
        removeToken()
        commit('CLEAR_TOKEN')
        return false
      }
      token = tokenKey.split('=')[1]
      commit('SET_TOKEN', token)
    }
  },
  logout({ commit }) {
    Cookies.remove('token')
    commit('CLEAR_TOKEN')
  }
}

export const getters = {
  lists(state) {
    return state.lists
  },
  isAuthenticated(state) {
    return state.token != null
  }
}


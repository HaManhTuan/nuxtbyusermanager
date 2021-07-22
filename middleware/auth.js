export default function({ store, req, redirect, route }) {
  store.dispatch('users/initAuth', req)
  if (!store.getters['users/isAuthenticated']) {
    redirect('/login')
  }
}

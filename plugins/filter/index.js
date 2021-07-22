import Vue from 'vue'
Vue.filter('toUpperCase', (val) => {
  return val.toString().toUpperCase()
})
Vue.filter('toLowerCase', (val) => {
  return val.toString().toLowerCase()
})
Vue.filter('filterGender', (val) => {
  if (val === 1) {
    return 'male'
  } else {
    if (val === 2) {
      return 'female'
    } else {
      return 'other genders'
    }
  }
})

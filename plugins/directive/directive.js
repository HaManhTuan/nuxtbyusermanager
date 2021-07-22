import Vue from 'vue'

Vue.directive('custom', {
  bind(el, binding, vnode) {
    var delay = 0
    if (binding.modifiers['delay'] === 'delay') {
      delay = 3000
    }
    setTimeout(() => {
      if (binding.arg === 'background') {
        el.style.backgroundColor = binding.value
      } else {
        el.style.color = binding.value
      }
    }, delay)
  }
})

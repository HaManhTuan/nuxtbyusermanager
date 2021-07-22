export const state = () => ({
  listsFake: [],
  fake: {}
})

export const mutations = {
  SHOW_FAKE(state, fakeId) {
    state.fake = state.listsFake.find(fake => fake.id.toString() === fakeId.toString())
  },
  ADD_FAKE(state, newFake) {
    let max = 0
    state.listsFake.forEach(fake => {
      if (fake.id > max) {
        max = fake.id + 1
      }
    })
    Object.assign(newFake, { id: max > 0 ? max : 1 })
    state.listsFake.push(newFake)
  },
  EDIT_FAKE(state, editFake) {
    state.listsFake.forEach(fake => {
      if (fake.id.toString() === editFake.id.toString()) {
        fake.name = editFake.name
        fake.email = editFake.email
        fake.age = editFake.age
        fake.gender = editFake.gender
      }
    })
  },
  REMOVE_FAKE(state, idFake) {
    state.listsFake = state.listsFake.filter(fake => fake.id !== idFake)
  }
}

export const actions = {
  showFake({ commit }, fakeId) {
    commit('SHOW_FAKE', fakeId)
  },
  addFake({ commit }, newFake) {
    commit('ADD_FAKE', newFake)
  },
  editFake({ commit }, editFake) {
    commit('EDIT_FAKE', editFake)
  },
  removeFake({ commit }, idFake) {
    commit('REMOVE_FAKE', idFake)
  }
}

export const getters = {
  fakes(state) {
    return state.listsFake
  }
}


export const state = () => ({
  vov: null,
})

export const mutations = {
  setVov(state, payload) {
    if (!state.vov)
      state.vov = {
        ...payload,
        items: payload.items.filter((episode) =>
          episode.contentSnippet.includes('Lindsay')
        ),
      }
  },
}

export const actions = {
  updateVov({ commit }, payload) {
    commit('setVov', payload)
  },
}

const state = {
	currentUser: null
}

const mutations = {
	'LOGIN_USER'(state, payload) {
		state.currentUser = payload
	},
	'LOGOUT_USER'(state) {
		state.currentUser = null
	}
}

const actions = {
	loginUser: ({commit}, payload) => {
		commit('LOGIN_USER', payload)
	},
	logoutUser: ({commit}) => {
		commit('LOGOUT_USER')
	}
}

const getters = {
	currentUser: state => state.currentUser,
}

export default {
	state,
	mutations,
	actions,
	getters,
}
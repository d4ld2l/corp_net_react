const initialState = {}

function normalizeRole(roles) {
  const actions = {}
  roles.forEach(role => {
    actions[role.name] = true
  })
  return actions
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PROFILE_ROLE_RES':
      return { ...state, ...normalizeRole(action.payload) }
    default:
      return state
  }
}

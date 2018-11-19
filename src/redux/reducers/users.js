const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USERS_RES':
      return action.payload
    default:
      return state
  }
}

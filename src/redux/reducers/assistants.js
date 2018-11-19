const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ASSISTANTS_RES':
      return action.payload
    default:
      return state
  }
}

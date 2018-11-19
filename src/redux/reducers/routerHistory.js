const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case 'PUSH_ROUTE_HISTORY':
      return [action.payload, ...state.slice(0, 8)]
    default:
      return state
  }
}

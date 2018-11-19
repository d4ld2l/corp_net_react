const initialState = {
  stats: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ANALYTICS_STATS_RES':
      return { ...state, stats: action.payload }
    case 'GET_FILTERED_ANALYTICS_STATS_RES':
      return { ...state, stats: action.payload }
    default:
      return state
  }
}

const initialState = {
  data: [],
  current: null
}

export default (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case 'GET_SERVICES_RES':
      return {
        ...state,
        data: payload
      }
    case 'RELEASE_SERVICES':
      return initialState
    case 'GET_SERVICE_RES':
      return {
        ...state,
        current: payload
      }
    case 'RELEASE_SERVICE':
      return {
        ...state,
        current: null
      }
    default:
      return state
  }
}

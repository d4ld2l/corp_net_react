import { unionBy, differenceBy } from 'lodash'

const initialState = {
  data: [],
  counters: [],
  current: [],
  scope: '',
  status_codes: '',
  search: {
    now: false,
    query: '',
    data: []
  },
  page: 1,
  perPage: 10,
  scroll: true
}

export default (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case 'GET_STB_PARTICIPANTS_RES':
      return {
        ...state,
        current: payload
      }
    case 'SET_SEARCH_STB_PARTICIPANTS_RES':
      return {
        ...state,
        search: {
          ...state.search,
          query: payload,
        }
      }
    case 'RESET_STB_PARTICIPANTS':
      return initialState
    default:
      return state
  }
}

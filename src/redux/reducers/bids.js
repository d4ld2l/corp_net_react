import { unionBy, differenceBy } from 'lodash'

const initialState = {
  data: [],
  counters: [],
  current: null,
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
    case 'GET_BIDS_RES':
      return {
        ...state,
        data: payload.loadMore ? unionBy(state.data, payload.data.data, 'id') : payload.data.data,
        counters: payload.data.counters,
        scope: payload.scope,
        status_codes: payload.status_codes,
        scroll: payload.scroll || differenceBy(payload.data.data, state.data, 'id').length > 0,
        page: payload.page || 1
      }
    case 'GET_BID_RES':
    case 'GET_BID_COMMENT_RES':
    case 'SEND_BID_COMMENT_RES':
    case 'UPDATE_BID_COMMENT_RES':
    case 'DELETE_BID_COMMENT_RES':
      return {
        ...state,
        current: payload
      }
    case 'RELEASE_BID':
      return initialState
    default:
      return state
  }
}

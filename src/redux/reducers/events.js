import type { Action } from '../../types/actions'
import type { EventsState as State } from '../../types/states'

const initialState = {
  data: [],
  current: {},
  types: [],
  participants: {},
}

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'GET_EVENTS_RES':
      return { ...state, data: action.payload }
    case 'GET_EVENT_RES':
      return { ...state, current: action.payload }
    case 'GET_PARTICIPANTS_RES':
      return { ...state, participants: action.payload }
    case 'GET_EVENT_TYPES_RES':
      return { ...state, types: action.payload }
    case 'POST_EVENT_RES':
      return { ...state, data: [].concat(state.data, action.payload) }
    case 'PUT_EVENT_RES':
      return {
        ...state,
        data: state.data.map(it => (it.id === action.payload.id ? action.payload : it)),
      }
    case 'DELETE_EVENT_REQ':
      return { ...state, data: state.data.filter(it => it.id !== action.payload) }
    default:
      return state
  }
}

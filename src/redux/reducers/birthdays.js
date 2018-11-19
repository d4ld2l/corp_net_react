import type { Action } from '../../types/actions'
import type { BirthdayState as State } from '../../types/states'

const initialState = {
  current: {},
}

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'GET_BIRTHDAYS_CURRENT_RES':
      return { ...state, current: action.payload }
    case 'GET_BIRTHDAYS_CURRENT_REQ':
    case 'GET_BIRTHDAYS_CURRENT_FAIL':
      return state
    default:
      return state
  }
}

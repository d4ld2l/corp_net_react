import type { Action } from '../../types/actions'
import type { LegalUnitsState as State } from '../../types/states'

const initialState = []

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'GET_LEGAL_UNITS_RES':
      return action.payload
    case 'RELEASE_LEGAL_UNITS':
      return initialState
    default:
      return state
  }
}

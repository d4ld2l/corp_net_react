import type { Action } from '../../types/actions'
import type { CustomersState as State } from '../../types/states'

const initialState = []

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'GET_CUSTOMERS_RES':
      return action.payload
    case 'RELEASE_CUSTOMERS':
      return initialState
    default:
      return state
  }
}

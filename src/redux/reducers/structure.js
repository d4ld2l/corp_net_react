import type { Action } from '../../types/actions'
import type { StructureState as State } from '../../types/states'

const initialState = []

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'STRUCTURE_UPDATE':
      return action.payload
    case 'STRUCTURE_PUSH':
      return [...state, action.payload]
    case 'STRUCTURE_GO_BACK':
      return state.slice(0, state.length - 1)
    case 'STRUCTURE_GO_TO':
      return state.slice(0, action.payload)
    case 'STRUCTURE_TOGGLE_PARTICIPANTS':
      return state.map(
        it => (it === action.payload ? { ...it, dropdownActive: !it.dropdownActive } : it)
      )
    default:
      return state
  }
}

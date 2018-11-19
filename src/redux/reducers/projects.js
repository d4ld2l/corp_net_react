import type { Action } from '../../types/actions'
import type { ProjectsState as State } from '../../types/states'

const initialState = []

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'GET_PROJECTS_RES':
      return action.payload
    case 'RELEASE_PROJECTS':
      return initialState
    default:
      return state
  }
}

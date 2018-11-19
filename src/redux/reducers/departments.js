import { Departments } from '../../presenters'
import type { Action } from '../../types/actions'
import type { DepartmentsState as State } from '../../types/states'

const initialState = Departments([])

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'GET_DEPARTMENTS_TREE_RES':
    case 'GET_DEPARTMENTS_RES':
      return Departments(action.payload)
    case 'RELEASE_DEPARTMENTS_TREE':
      return initialState
    case 'GET_DEPARTMENTS_TREE_REQ':
    case 'GET_DEPARTMENTS_TREE_FAIL':
      return Departments(state)
    default:
      return Departments(state)
  }
}

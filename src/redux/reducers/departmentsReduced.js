import type { Action } from '../../types/actions'
import type { DepartmentsState as State } from '../../types/states'

const initialState = []

function reductionLevel(departments) {
  let result = []
  departments.forEach(item => {
    result = [].concat(result, item.departments_tree)
  })
  return result
}

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'GET_DEPARTMENTS_TREE_TRIPLE_RES':
      return reductionLevel(action.payload)
    case 'RELEASE_DEPARTMENTS_TRIPLE_TREE':
      return initialState
    case 'GET_DEPARTMENTS_TREE_TRIPLE_REQ':
    case 'GET_DEPARTMENTS_TREE_TRIPLE_FAIL':
      return state
    default:
      return state
  }
}

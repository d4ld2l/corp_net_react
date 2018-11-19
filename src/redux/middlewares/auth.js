import path from 'ramda/src/pathOr'
import { logoutUser } from '../actions/loginActions'

export const auth = ({ dispatch }) => next => action => {
  if (action.type.match(/(_FAIL)$/g)) {
    const status = path(200, ['error', 'response', 'status'], action)

    if (status == 401 || status == 403) {
      dispatch(logoutUser())
    }
  }
  next(action)
}

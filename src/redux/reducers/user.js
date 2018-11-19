import type { Action } from '../../types/actions'
import type { UserState as State } from '../../types/states'
import get from 'lodash/get'

const initialState = {
  isAuthenticated: false,
}

export default (state: State = initialState, action: Action): State => {
  const { payload } = action

  switch (action.type) {
    case 'LOGIN_USER_RES':
      return { ...state, ...action.payload, isAuthenticated: true }
    case 'GET_PROFILE_INFO_RES':
      return { ...state, ...action.payload }
    case 'LOGOUT_USER_RES':
      return state
    case 'LOGIN_USER_FAIL':
      return { ...state, ...action.payload, isSignin: true }
    case 'UPLOAD_EMPLOYEE_PHOTO_RES':
    case 'UPDATE_EMPLOYEE_PHOTO_RES':
    // case 'DELETE_EMPLOYEE_PHOTO_RES':
    // case 'SET_EMPLOYEE_PHOTO_RES':
      return {
        ...state,
        photo: get(payload, 'data.cropped_photo.url') ? payload.data.cropped_photo : payload.data.photo,
        current_account_photo_id: payload.data.id
      }
    default:
      return state
  }
}

// case 'LOGOUT_USER_RES': return { ...state, isAuthenticated: false }

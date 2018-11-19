import api from '../../api'

import type { Dispatch, ThunkAction } from '../../types/actions'
import { getProfileRole } from './profileRoleActions'

export const getProfileInfo = (): ThunkAction => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: 'GET_PROFILE_INFO_REQ' })

    const profile = await api.profiles.me()
    dispatch({ type: 'GET_PROFILE_INFO_RES', payload: profile.data })
    dispatch(getProfileRole())
  } catch (error) {
    dispatch({ type: 'GET_PROFILE_INFO_FAIL', payload: error.message })
  }
}

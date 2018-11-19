import api from '../../api'

import type { Dispatch, ThunkAction } from '../../types/actions'

export const getProfileRole = (): ThunkAction => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: 'GET_PROFILE_ROLE_REQ' })

    const profile = await api.permissions.my()
    dispatch({ type: 'GET_PROFILE_ROLE_RES', payload: profile.data })
  } catch (error) {
    dispatch({ type: 'GET_PROFILE_ROLE_FAIL', payload: error.message })
  }
}

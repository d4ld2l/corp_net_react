import api from 'api-folder'

import type { Dispatch, ThunkAction } from 'types-folder/actions'

export const getUsersCounter = (): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_USERS_COUNTER_REQ' })
  try {
    const req = await api.system.usersCounter()
    dispatch({ type: 'GET_USERS_COUNTER_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_USERS_COUNTER_FAIL', payload: error.message })
  }
}

export const updateApplicationSettings = () => async (dispatch, gState) => {
  dispatch({ type: "APPLICATION_SETTINGS_UPDATE_REQ" })
  try {
    const res = await api.settings.update()
    await dispatch({
      type: "APPLICATION_SETTINGS_UPDATE_RES",
      payload: res.data.settings
    })
    window.shrSettings = gState().system.settings
  } catch (e) {
    dispatch({
      type: "APPLICATION_SETTINGS_UPDATE_FAIL",
      payload: e
    })
  }
}

import api from 'api-folder'

export const loginSettings = (domain = null) => async (dispatch) => {
  dispatch({ type: 'GET_LOGIN_SETTINGS_REQ' })
  const params = {}
  try {
    const req = await api.ui.logginSettings(params)
    dispatch({ type: 'GET_LOGIN_SETTINGS_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_LOGIN_SETTINGS_FAIL', payload: error.message })
  }
}

import api from '../../api'

import type { Dispatch, ThunkAction } from '../../types/actions'

export const getServices = (): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_SERVICES_REQ' })

  try {
    const req = await api.services.all()
    dispatch({ type: 'GET_SERVICES_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_SERVICES_FAIL', payload: error.message })
  }
}

export const getService = (id: number): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_SERVICE_REQ' })

  try {
    const req = await api.services.find(id)
    dispatch({ type: 'GET_SERVICE_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_SERVICE_FAIL', payload: error.message })
  }
}

export const releaseServices = (): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'RELEASE_SERVICES' })
}

export const releaseService = (): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'RELEASE_SERVICE' })
}

import api from '../../api'

import type { Dispatch, ThunkAction } from '../../types/actions'

export const getLegalUnits = (): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_LEGAL_UNITS_REQ' })

  try {
    const req = await api.legal_units.all()
    dispatch({ type: 'GET_LEGAL_UNITS_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_LEGAL_UNITS_FAIL', payload: error.message })
  }
}

export const releaseLegalUnits = (): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'RELEASE_LEGAL_UNITS' })
}

import api from '../../api'

import type { Dispatch, ThunkAction } from '../../types/actions'

export const getCustomers = (): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_CUSTOMERS_REQ' })

  try {
    const req = await api.customers.all()
    dispatch({ type: 'GET_CUSTOMERS_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_CUSTOMERS_FAIL', payload: error.message })
  }
}

export const releaseCustomers = (): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'RELEASE_CUSTOMERS' })
}

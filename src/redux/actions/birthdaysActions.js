import api from '../../api'

import type { Dispatch, ThunkAction } from '../../types/actions'
import type { BirthDatesNearestRaw } from '../../types/raws'

export const getBirthdaysCurrent = (): ThunkAction => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: 'GET_BIRTHDAYS_CURRENT_REQ' })
    const req = await api.birthdates.nearest()
    dispatch({ type: 'GET_BIRTHDAYS_CURRENT_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_BIRTHDAYS_CURRENT_FAIL', payload: error.message })
  }
}

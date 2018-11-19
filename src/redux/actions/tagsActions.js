import api from '../../api'

import type { Dispatch, ThunkAction } from '../../types/actions'

export const getAllTags = (): ThunkAction => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: 'GET_ALL_TAGS_REQ' })
    const req = await api.tags.all()
    dispatch({ type: 'GET_ALL_TAGS_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_ALL_TAGS_FAIL', payload: error.message })
  }
}

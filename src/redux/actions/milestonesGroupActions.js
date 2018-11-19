import api from '../../api'

import type { Dispatch, ThunkAction } from '../../types/actions'

export const getMilestonesGroup = (): ThunkAction => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: 'GET_MILESTONES_GROUP_REQ' })

    const milestonesGroup = await api.vacancy_stage_group()
    dispatch({ type: 'GET_MILESTONES_GROUP_RES', payload: milestonesGroup.data })
  } catch (error) {
    dispatch({ type: 'GET_MILESTONES_GROUP_FAIL', payload: error.message })
  }
}

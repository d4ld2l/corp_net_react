import api from '../../api'

import type { Dispatch, ThunkAction } from '../../types/actions'

export const getMilestonesTemplate = (): ThunkAction => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: 'GET_MILESTONES_TEMPLATE_REQ' })

    const milestonesTemplate = await api.template_stages()

    const payload = milestonesTemplate.data.map(item => {
      const element = item
      element.vacancy_stages = item.vacancy_stages.map(stage => {
        delete stage.id
        return stage
      })
      return element
    })
    dispatch({ type: 'GET_MILESTONES_TEMPLATE_RES', payload })
  } catch (error) {
    dispatch({ type: 'GET_MILESTONES_TEMPLATE_FAIL', payload: error.message })
  }
}

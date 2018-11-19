import type { Dispatch, ThunkAction, GetState } from '../../types/actions'
import api from '../../api'

export const getAnalyticsStats = (params): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_ANALYTICS_STATS_REQ' })

  try {
    const req = await api.analytics.filteredStats(params)
    dispatch({ type: 'GET_ANALYTICS_STATS_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_ANALYTICS_STATS_FAIL', payload: error.message })
  }
}

export const getFilteredAnalyticsStats = (params): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_FILTERED_ANALYTICS_STATS_REQ' })

  try {
    const req = await api.analytics.filteredStats(params)
    dispatch({ type: 'GET_FILTERED_ANALYTICS_STATS_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_FILTERED_ANALYTICS_STATS_FAIL', payload: error.message })
  }
}

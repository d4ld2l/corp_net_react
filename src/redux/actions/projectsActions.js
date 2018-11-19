import api from '../../api'

import type { Dispatch, ThunkAction } from '../../types/actions'

export const getProjects = (): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_PROJECTS_REQ' })

  try {
    const req = await api.projects.all(2000)
    dispatch({ type: 'GET_PROJECTS_RES', payload: req.data.projects })
  } catch (error) {
    dispatch({ type: 'GET_PROJECTS_FAIL', payload: error.message })
  }
}

export const releaseProjects = (): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'RELEASE_PROJECTS' })
}

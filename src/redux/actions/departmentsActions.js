import api from '../../api'

import type { Dispatch, ThunkAction } from '../../types/actions'

export const getDepartmentsTree = (): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_DEPARTMENTS_TREE_REQ' })

  try {
    const req = await api.departments.tree()
    dispatch({ type: 'GET_DEPARTMENTS_TREE_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_DEPARTMENTS_TREE_FAIL', payload: error.message })
  }
}

export const getDepartments = (): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_DEPARTMENTS_REQ' })

  try {
    const req = await api.departments.all()
    dispatch({ type: 'GET_DEPARTMENTS_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_DEPARTMENTS_FAIL', payload: error.message })
  }
}

export const getDepartmentsTripleTree = (): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_DEPARTMENTS_TREE_TRIPLE_REQ' })

  try {
    const req = await api.departments.tree()
    dispatch({ type: 'GET_DEPARTMENTS_TREE_TRIPLE_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_DEPARTMENTS_TREE_TRIPLE_FAIL', payload: error.message })
  }
}

export const releaseDepartmentsTree = (): ThunkAction => async (dispatch: Dispatch) =>
  dispatch({ type: 'RELEASE_DEPARTMENTS_TREE' })

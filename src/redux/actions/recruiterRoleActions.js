import api from '../../api'

import type { Dispatch, ThunkAction } from '../../types/actions'

export const getRecruiterRoleInfo = (): ThunkAction => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: 'GET_RECRUITER_ROLE_INFO_REQ' })

    const users = await api.dictionaries.getFiltredAccounts({ role_name: 'recruitment_recruiter' })
    dispatch({ type: 'GET_RECRUITER_ROLE_INFO_RES', payload: users.data })
  } catch (error) {
    dispatch({ type: 'GET_RECRUITER_ROLE_INFO_FAIL', payload: error.message })
  }
}

export const getRecruiterGeneralRoleInfo = (): ThunkAction => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: 'GET_GENERAL_RECRUITER_ROLE_INFO_REQ' })

    const users = await api.dictionaries.getFiltredAccounts({ role_name: 'recruitment_general_recruiter' })
    dispatch({ type: 'GET_GENERAL_RECRUITER_ROLE_INFO_RES', payload: users.data })
  } catch (error) {
    dispatch({ type: 'GET_GENERAL_RECRUITER_ROLE_INFO_FAIL', payload: error.message })
  }
}

export const getManagerRecruiterRoleInfo = (): ThunkAction => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: 'GET_MANAGER_RECRUITER_ROLE_INFO_REQ' })

    // роли
    // recruitment_manager
    // recruitment_recruiter
    // recruitment_general_recruiter

    const users = await api.dictionaries.getFiltredAccounts({ role_name: 'recruitment_manager' })

    dispatch({ type: 'GET_MANAGER_RECRUITER_ROLE_INFO_RES', payload: users.data })
  } catch (error) {
    dispatch({ type: 'GET_MANAGER_RECRUITER_ROLE_INFO_FAIL', payload: error.message })
  }
}

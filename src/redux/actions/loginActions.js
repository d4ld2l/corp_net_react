import { push } from 'react-router-redux'
import { appInit } from './appInitActions'
import { toastr } from 'react-redux-toastr'

import api from '../../api'

import type { Dispatch, ThunkAction } from '../../types/actions'
import type { UserRaw } from '../../types/raws'

export const loginUser = ({ email, password, pathname, search }): ThunkAction => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({ type: 'LOGIN_USER_REQ' })

    const response = await api.auth.signin({ email, password, search })
    const payload = response.data

    dispatch({ type: 'LOGIN_USER_RES', payload })

    if (payload.search.origin) {
      dispatch(push(payload.search.origin))
    } else {
      dispatch(push(pathname === '/login' ? '/' : pathname))
    }

    dispatch(appInit())
  } catch (error) {
    toastr.error('Неверный логин или пароль')
    dispatch({ type: 'LOGIN_USER_FAIL', payload: error.message })
  }
}

export const changePassword = ({ currentPass, password, passConfirmation }): ThunkAction => async (
  dispatch: Dispatch
) => {
  dispatch({ type: 'CHANGE_PASS_REQ' })
  try {
    const user = {
        current_password: currentPass,
        password: password,
        password_confirmation: passConfirmation,
    }

    const response = await api.auth.changePass({user})
    dispatch({ type: 'CHANGE_PASS_RES' })

    return response.data
  } catch (error) {
    dispatch({ type: 'CHANGE_PASS_FAIL', payload: error.message })
  }
}

export const generateNewPassword = (email): ThunkAction => async (
  dispatch: Dispatch
) => {
  dispatch({ type: 'GENERATE_NEW_PASSWORD_REQ' })
  try {
    const params = { email }

    const res = await api.auth.generateNewPass(params)
    dispatch({ type: 'GENERATE_NEW_PASSWORD_RES' })

    return res.data
  } catch (error) {
    dispatch({ type: 'GENERATE_NEW_PASSWORD_FAIL', payload: error.message })
  }
}

export const resetNewPassword = ({ password, passConfirmation, token }): ThunkAction => async (
  dispatch: Dispatch
) => {
  dispatch({ type: 'CHANGE_PASS_REQ' })
  try {
    const params = {
      password: password,
      passConfirmation: passConfirmation,
      token: token,

    }

    const response = await api.auth.resetNewPass(params)
    dispatch({ type: 'CHANGE_PASS_RES' })


    return response.data
  } catch (error) {
    dispatch({ type: 'CHANGE_PASS_FAIL', payload: error.message })
  }
}

export const logoutUser = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: 'LOGOUT_USER_REQ' })

    const request = await api.auth.logout()
    window.location.pathname = '/login'
    dispatch({ type: 'LOGOUT_USER_RES' })
  } catch (error) {
    window.location.pathname = '/login'
    dispatch({ type: 'LOGOUT_USER_FAIL', payload: error.message })
  }
}

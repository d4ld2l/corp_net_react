import api from '../../api'
import flatten from 'lodash/flatten'
import uniqBy from 'lodash/uniqBy'
import unionBy from 'lodash/unionBy'

import type { Dispatch, ThunkAction } from '../../types/actions'

export const getDistribution = (user_id): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_DISTRIBUTION_REQ' })
  try {
    const req = await api.distribution.all()
    dispatch({ type: 'GET_DISTRIBUTION_RES', payload: req.data, user_id })
  } catch (error) {
    dispatch({ type: 'GET_DISTRIBUTION_FAIL', payload: error.message })
  }
}

export const createDistribution = (): ThunkAction => async (dispatch: Dispatch, getState: GetState) => {
  dispatch({ type: 'CREATE_DISTRIBUTION_REQ' })
  const form = getState().form.NewDistribution.values || {}

  const accounts = getState().searchParticipants
  const account_projects = accounts.all ? [] :
    accounts.participants.map( (it) => {
      if (it.isUser()) {
        return ({ account_id: it.id })
      } else {
        return it.accounts.map( (it) => ({ account_id: it.id }) )
      }
    })
  const account_attributes = uniqBy(flatten(account_projects), 'account_id')

  const params = {
    mailing_list: form,
  }

  if (accounts.all) {
    const accounts = await api.dictionaries.getAccounts()
    params.mailing_list.account_mailing_lists_attributes = accounts.data.map(it => ({
      account_id: it.id,
    }))
  } else {
    params.mailing_list.account_mailing_lists_attributes = account_attributes
  }

  try {
    const req = await api.distribution.create(params)
    dispatch({ type: 'CREATE_DISTRIBUTION_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'CREATE_DISTRIBUTION_FAIL', payload: error.message })
  }
}

export const updateDistribution = (id, profile_mailing_lists): ThunkAction => async (dispatch: Dispatch, getState: GetState) => {
  dispatch({ type: 'UPDATE_DISTRIBUTION_REQ' })
  const form = getState().form.EditDistribution.values || {}
  const searchParticipants = getState().searchParticipants

  const accounts = getState().searchParticipants
  const account_projects = accounts.all ? [] :
    accounts.participants.map( (it) => {
      if (it.isUser()) {
        return ({ account_id: it.id })
      } else {
        return it.accounts.map( (it) => ({ account_id: it.id }) )
      }
    })

  const account_attributes = uniqBy(flatten(account_projects), 'account_id')

  const params = {
    mailing_list: form,
  }

  if (accounts.all) {

    const accountsDictionary = await api.dictionaries.getAccounts()
    const ac = profile_mailing_lists.map(({ account_id }) => (account_id) )

    params.mailing_list.account_mailing_lists_attributes = accountsDictionary.data.filter( it => !ac.includes(it.id) ).map( it => ({
      account_id: it.id
    }) )
  } else {

    params.mailing_list.account_mailing_lists_attributes = unionBy(profile_mailing_lists, account_attributes, 'account_id').map( it => {
      if ( account_attributes.find( i => i.account_id === it.account_id ) ) {
        return it
      } else {
        return ({
          ...it,
          _destroy: true,
        })
      }
    })
  }

  try {
    const req = await api.distribution.update(id, params)
    dispatch({ type: 'UPDATE_DISTRIBUTION_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'UPDATE_DISTRIBUTION_FAIL', payload: error.message })
  }
}

export const deleteDistribution = (id): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'DELETE_DISTRIBUTION_REQ' })

  try {
    const req = await api.distribution.delete(id)
    dispatch({ type: 'DELETE_DISTRIBUTION_RES', payload: { data: req.data, id } })
  } catch (error) {
    dispatch({ type: 'DELETE_DISTRIBUTION_FAIL', payload: error.message })
  }
}



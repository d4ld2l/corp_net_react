import path from 'ramda/src/pathOr'

import { toastr } from 'react-redux-toastr'
import { push } from 'react-router-redux'
import moment from 'moment'

import api from '../../api'
import getBase64 from '../../helpers/getFileBase64'
import flatten from 'lodash/flatten'
import uniqBy from 'lodash/uniqBy'
import unionBy from 'lodash/unionBy'

import { Event } from '../../presenters'
import type { ThunkAction, Dispatch } from '../../types/actions'
import type { EventRaw, EventsRaw, EventTypesRaw, ParticipantsRaw } from '../../types/raws'

export const getEvents = (): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_EVENTS_REQ' })

  try {
    const req = await api.events.all()
    dispatch({ type: 'GET_EVENTS_RES', payload: req.data.map(Event) })
  } catch (error) {
    dispatch({ type: 'GET_EVENTS_FAIL', payload: error.message })
  }
}

export const getEventTypes = (): ThunkAction => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: 'GET_EVENT_TYPES_REQ' })
    const req = await api.events.types()
    dispatch({ type: 'GET_EVENT_TYPES_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_EVENT_TYPES_FAIL', payload: error.message })
  }
}

export const getEvent = (id: number): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_EVENT_REQ' })

  try {
    const req = await api.events.findById(id)
    dispatch({ type: 'GET_EVENT_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_EVENT_FAIL', payload: error.message })
  }
}

export const deleteEvent = (id: number): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'DELETE_EVENT_REQ', payload: id })

  try {
    const req = await api.events.delete(id)
    dispatch({ type: 'DELETE_EVENT_RES', payload: req.data })
    return req.status
  } catch (error) {
    dispatch({ type: 'DELETE_EVENT_FAIL', payload: error.message })
  }
}

export const createEvent = (state): ThunkAction => {
  // const searchParticipants = state.searchParticipants.forEventForm()

  const accounts = state.searchParticipants
  const account_projects = accounts.all ? [] :
    accounts.participants.map( (it) => {
      if (it.isUser()) {
        return ({ account_id: it.id })
      } else {
        return it.accounts.map( (it) => ({ account_id: it.id }) )
      }
    })

  const account_attributes = uniqBy(flatten(account_projects), 'account_id')
  const event = {
    ...path({}, ['NewEvent', 'values'], state.form),
    available_for_all: accounts.all,
    event_participants_attributes: account_attributes,
  }

  event.event_type_id = event.event_type_id.value
  return async dispatch => {
    dispatch({ type: 'POST_EVENT_REQ' })

    try {
      if (event.file) {
        event.documents_attributes = []
        const base64 = await getBase64(event.file[0])
        event.documents_attributes.push({
          file: base64.target.result,
          name: event.file[0].name,
        })
      }

      const req = await api.events.create({ event })
      dispatch({ type: 'POST_EVENT_RES', payload: Event(req.data) })
      if (req.status === 200){
        toastr.success('Событие успешно создано')
      } else {
        toastr.error('На сервере произошла ошибка, попробуйте повторить позже.')
      }
      dispatch(push('/calendar'))
    } catch (error) {
      toastr.error('На сервере произошла ошибка, попробуйте повторить позже.')
      dispatch({ type: 'POST_EVENT_FAIL', payload: error.message })
    }
  }
}

export const updateEvent = (id, state): ThunkAction => {
  // const searchParticipants = state.searchParticipants.forEventForm(state.events.current)
  const accounts = state.searchParticipants
  const account_projects = accounts.all ? [] :
    accounts.participants.map( (it) => {
      if (it.isUser()) {
        return ({ account_id: it.account_id || it.id })
      } else {
        return it.accounts.map( (it) => ({ account_id: it.id }) )
      }
    })

  const account_attributes = uniqBy(flatten(account_projects), 'account_id')

  const event = {
    ...path({}, ['EditEvent', 'values'], state.form),
    available_for_all: accounts.all,
    event_participants_attributes: unionBy(state.events.current.participants_list, account_attributes, 'account_id').map( it => {
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

  event.event_type_id = event.event_type_id.value
  return async dispatch => {
    dispatch({ type: 'PUT_EVENT_REQ' })

    try {
      if (event.file) {
        event.documents_attributes = []
        const base64 = await getBase64(event.file[0])
        event.documents_attributes.push({
          file: base64.target.result,
          name: event.file[0].name,
        })
      }

      const req = await api.events.update(id, { event })
      dispatch({ type: 'PUT_EVENT_RES', payload: Event(req.data) })
      return req.status
    } catch (error) {
      dispatch({ type: 'PUT_EVENT_FAIL', payload: error.message })
    }
  }
}

export const getParticipants = (q: string): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_PARTICIPANTS_REQ' })

  try {
    const req = await api.events.searchParticipants(q)
    dispatch({ type: 'GET_PARTICIPANTS_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_PARTICIPANTS_FAIL', payload: error.message })
  }
}

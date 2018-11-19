import api from '../../api'
// import getBase64 from '../../helpers/getFileBase64'

import type { Dispatch, ThunkAction } from '../../types/actions'
import flatten from 'lodash/flatten'
import {uniqBy, unionBy, get, isEmpty} from 'lodash'
import moment from 'moment'

export const getAuthorBids = ({ status_codes, loadMore } = {}) => async (dispatch, getState) => {
  dispatch({ type: 'GET_BIDS_REQ', loadMore })

  const currentPage = getState().bids.page
  const perPage = getState().bids.perPage
  const size = getState().bids.data.length
  const scopeWas = getState().bids.scope
  status_codes = status_codes && (status_codes === 'all' ? status_codes : status_codes.join(','))

  let page, scroll
  let resetPagination = scopeWas !== 'author' || status_codes !== getState().bids.status_codes

  if (resetPagination) {
    page = 1
    scroll = true
  } else {
    // if last page has less items than perPage -> request it again
    page = loadMore && (size % perPage === 0) ? currentPage + 1 : currentPage
  }

  try {
    const params = status_codes ? { bid_stage_codes: status_codes } : {}
    const req = await api.bids.author(page, perPage, params)
    const payload = { data: req.data, page, scroll, scope: 'author', status_codes, loadMore }
    dispatch({ type: 'GET_BIDS_RES', payload })
  } catch (error) {
    dispatch({ type: 'GET_BIDS_FAIL', payload: error.message })
  }
}

export const getExecutorBids = ({ status_codes, loadMore } = {}) => async (dispatch, getState) => {
  dispatch({ type: 'GET_BIDS_REQ', loadMore })

  const currentPage = getState().bids.page
  const perPage = getState().bids.perPage
  const size = getState().bids.data.length
  const scopeWas = getState().bids.scope

  let page, scroll
  let resetPagination = scopeWas !== 'executor' || status_codes !== getState().bids.status_codes

  if (resetPagination) {
    page = 1
    scroll = true
  } else {
    // if last page has less items than perPage -> request it again
    page = loadMore && (size % perPage === 0) ? currentPage + 1 : currentPage
  }

  try {
    const params = status_codes ? { bid_stage_codes: status_codes } : {}
    const req = await api.bids.executor(page, perPage, params)
    const payload = { data: req.data, page, scroll, scope: 'executor', status_codes, loadMore }
    dispatch({ type: 'GET_BIDS_RES', payload })
  } catch (error) {
    dispatch({ type: 'GET_BIDS_FAIL', payload: error.message })
  }
}

export const getAssistants = (permission: string): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_ASSISTANTS_REQ' })
  try {
    const params = {
      permission_name: permission,
    }
    const req = await api.dictionaries.getFiltredAccounts(params)
    dispatch({ type: 'GET_ASSISTANTS_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_ASSISTANTS_FAIL', payload: error.message })
  }
}

export const getUsers = (): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_USERS_REQ' })
  try {
    const req = await api.users_admin.where({})
    dispatch({ type: 'GET_USERS_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_USERS_FAIL', payload: error.message })
  }
}

export const getBid = (id: number): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_BID_REQ' })

  try {
    const req = await api.bids.find(id)
    const allowed_states = await api.bids.allowed_states(id)

    dispatch({
      type: 'GET_BID_RES',
      payload: {
        ...req.data,
        allowed_states: allowed_states.data,
      },
    })

    return req.data
  } catch (error) {
    dispatch({ type: 'GET_BID_FAIL', payload: error.message })
  }
}

export const getBidComment = (id: number): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_BID_COMMENT_REQ' })

  try {
    const req = await api.bids.find(id)
    const allowed_states = await api.bids.allowed_states(id)

    dispatch({
      type: 'GET_BID_COMMENT_RES',
      payload: {
        ...req.data,
        allowed_states: allowed_states.data,
      },
    })
  } catch (error) {
    dispatch({ type: 'GET_BID_COMMENT_FAIL', payload: error.message })
  }
}

async function getCustomer(name: string) {
  const res = await api.customers.create({ name: name })
  return res.data
}
async function paramsExpenses(service_id: number, form: {}, user: {}) {
  try {
    let documents = []

    if (form.attachment && form.attachment.length > 0) {
      documents = form.attachment
    }

    let customer_id = form.customer.value

    if (typeof customer_id === 'string') {
      const customer = await getCustomer(customer_id)
      customer_id = customer.id
    }
    const params = {
      bid: {
        service_id,
        author_id: form.author_id || user.user_id,
        legal_unit_id: form.legal_unit.value,
        matching_user_id: form.matching_user && form.matching_user.value,
        creator_comment: form.creator_comment,
        assistant_id: form.matching_assistant && form.matching_assistant.value,
        creator_position: form.manager_position,
        comment: form.comment_meeting,
        representation_allowance_attributes: {
          id: form.representation_allowance_id,
          information_about_participant_attributes: {
            customer_id,
            project_id: form.project && form.project.value,
            participants_attributes: form.participants
              .filter(it => it.user_id)
              .map((it, index) => ({
                account_id: it.user_id.value,
                position: it.position,
                responsible: false,
                type_of_participant: 'belong_to_company',
              })),
            other_participants_attributes: form.other_participants.map((it, index) => ({
              counterparty_attributes: {
                customer_id,
                name: it.name,
                position: it.position,
                responsible: index === 0,
              },
            })),
          },
          meeting_information_attributes: {
            id: form.meeting_information_id,
            base64_document_attributes: documents,
            starts_at: form.date_time_meeting,
            place: form.name_meeting,
            address: form.address_meeting,
            aim: form.goal_meeting,
            result: form.results_meeting,
            amount: form.amount && form.amount.toString().replace(',', '.'),
          },
        },
      },
    }
    params.bid.representation_allowance_attributes.information_about_participant_attributes.participants_attributes.push(
      {
        account_id: form.manager.value,
        position: form.manager_position,
        responsible: true,
        type_of_participant: 'belong_to_company',
      }
    )

    return params
  } catch (error) {
    return null
  }
}

function paramsByod(service_id: number, form: {}, user: {}) {
  try {
    let documents = []

    if (form.attachment && form.attachment.length > 0) {
      documents = form.attachment
    }

    const params = {
      bid: {
        service_id,
        legal_unit_id: form.legal_unit.value,
        creator_id: form.manager.value,
        creator_position: form.manager_position,
        author_id: form.author_id || user.user_id,
        matching_user_id: form.matching_user && form.matching_user.value,
        assistant_id: form.matching_assistant && form.matching_assistant.value,
        creator_comment: form.creator_comment,
        byod_information_attributes: {
          id: form.byod_information_id,
          byod_type: (form.byod_type && form.byod_type.value) || 'buy_out',
          project_id: form.project && form.project.value,
          device_model: form.device_model,
          device_inventory_number: form.device_inventory_number,
          compensation_amount: form.compensation_amount && form.compensation_amount.toString().replace(',', '.'),
          documents_attributes: documents,
        },
      },
    }

    if (form.comment_meeting) {
      params.bid.comments_attributes = [{ user_id: user.user_id, body: form.comment_meeting }]
    }

    return params
  } catch (error) {
    return null
  }
}

function paramsTeamBuilding (service_id: number, form: {}, user: {}, accounts: {}, state ) {
  try {

    const accounts_stb = accounts.all ? [] :
      accounts.participants.map( (it) => {
        if (it.isUser()) {
          return ({ account_id: it.id, id: it.account_id })
        } else {
          return it.accounts.map( (it) => ({ account_id: it.id }) )
        }
      })
    const account_stb = uniqBy(flatten(accounts_stb), 'account_id')

    const account_stb_attributes = unionBy(get(state, 'bids.current.team_building_information.team_building_information_accounts', []), account_stb, 'account_id').map( it => {
      if ( account_stb.find( i => i.account_id === it.account_id ) ) {
        return it
      } else {
        return ({
          ...it,
          _destroy: true,
        })
      }
    })

    const ids = form.legal_units.map( it => it.value)
    const legal_units = [
      ...form.legal_unit_ids.filter(it => !ids.includes(it.legal_unit.id)).map(it => ({
        id: it.id,
        _destroy: true,
      })), ...form.legal_units.filter(it => !form.legal_unit_ids.map(it => it.legal_unit.id).includes(it.value)).map( it => ({
      id: it.tbl_legal_unit_id,
      legal_unit_id: it.value,
    }))]


    const params = {
      bid: {
        service_id: Number(service_id),
        legal_unit_id: form.legal_unit_id,
        creator_id: form.manager.value,
        creator_position: form.manager_position,
        author_id: form.author_id || user.user_id,
        matching_user_id: form.matching_user && form.matching_user.value,
        assistant_id: form.matching_assistant && form.matching_assistant.value,
        creator_comment: form.creator_comment,
        team_building_information_attributes: {
          id: form.team_building_information_id,
          additional_info: form.additional_info,
          approx_cost: form.approx_cost && typeof(form.approx_cost) === 'number' ?  form.approx_cost : Number(form.approx_cost.split(' ').join('')),
          event_date: moment(form.event_date).format('DD.MM.YYYY'),
          city: form.city,
          event_format: form.event_format,
          number_of_participants: Number(form.number_of_participants),
          project_id: form.project && form.project.value,
          team_building_information_accounts_attributes: account_stb_attributes,
          team_building_information_legal_units_attributes: legal_units,
        },
      },
    }

    if (form.comment_meeting) {
      params.bid.comments_attributes = [{ user_id: user.user_id, body: form.comment_meeting }]
    }

    return params
  } catch (error) {
    console.error(error)
    return null
  }
}

function getParams(service_id: number, service_name: string, form: {}, user, accounts, state = {}) {
  switch (service_name) {
    case 'Bring your own device':
      return paramsByod(service_id, form, user)
    case 'Оформление представительских расходов':
      return paramsExpenses(service_id, form, user)
    case 'Проведение TeamBuilding':
      return paramsTeamBuilding(service_id, form, user, accounts, state)
    default:
      return paramsExpenses(service_id, form, user)
  }
}

export const sendComment = (bid, profileId ): ThunkAction => async (dispatch: Dispatch, getState: GetState) => {
  const form = getState().form.NewComment.values || {}
  let documents = []
  if (form.attachment && form.attachment.length > 0) {
    documents = form.attachment
  }

  const params = {
    bid: {
      comments_attributes: [
        {
          account_id: profileId,
          body: form.comment,
          documents_attributes: documents,
        }
      ]
    }

  }

  dispatch({ type: 'GET_BID_COMMENT_REQ' })

  // try {
    const req = await api.bids.update(bid.id, params)

    dispatch({
      type: 'GET_BID_COMMENT_RES',
      payload: {
        ...req.data,
        allowed_states: bid.allowed_states,
      },
    })
    return req
  // } catch (error) {
  //   dispatch({ type: 'GET_BID_COMMENT_FAIL', payload: error.message })
  // }
}


export const updateComment = (bid, commentId ): ThunkAction => async (dispatch: Dispatch, getState: GetState) => {
  dispatch({ type: 'GET_BID_COMMENT_REQ' })

  const form = getState().form.EditComment.values || {}
  let documents = []
  if (form.attachment && form.attachment.length > 0) {
    documents = form.attachment
  }

  const params = {
    bid: {
      comments_attributes: [
        {
          id: commentId,
          body: form.comment,
          documents_attributes: documents,
        }
      ]
    }

  }

  try {
    const req = await api.bids.update(bid.id, params)
    dispatch({
      type: 'GET_BID_COMMENT_RES',
      payload: {
        ...req.data,
        allowed_states: bid.allowed_states,
      },
    })
    return req
  } catch (error) {
    dispatch({ type: 'GET_BID_COMMENT_FAIL', payload: error.message })
  }
}

export const deleteComment = (bid, commentId): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_BID_COMMENT_REQ' })

  const params = {
    bid: {
      comments_attributes: [
        {
          id: commentId,
          _destroy: true,
        }
      ]
    }
  }

  try {
    const req = await api.bids.update(bid.id, params)
    dispatch({
      type: 'GET_BID_COMMENT_RES',
      payload: {
        ...req.data,
        allowed_states: bid.allowed_states,
      },
    })
    return req
  } catch (error) {
    dispatch({ type: 'GET_BID_COMMENT_FAIL', payload: error.message })
  }
}

export const createBid = (service_id: number, service_name: string): ThunkAction => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  dispatch({ type: 'POST_CREATE_BID_REQ' })

  const form = getState().form.NewBid.values || {}
  const user = getState().user
  const accounts = getState().searchParticipants

  const params = await getParams(service_id, service_name, form, user, accounts, getState())

  try {
    const req = await api.bids.create(params)
    dispatch({ type: 'POST_CREATE_BID_RES', payload: req.data })
    return req.data
  } catch (error) {
    dispatch({ type: 'POST_CREATE_BID_FAIL', payload: error.message })
  }
}

export const updateBid = (id: number): ThunkAction => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  dispatch({ type: 'POST_UPDATE_BID_REQ' })
  console.log(getState().form)

  const form = getState().form.EditBid.values || {}
  const user = getState().user
  const accounts = getState().searchParticipants

  const params = await getParams(form.service_id, form.service_name, form, user, accounts, getState())

  try {
    console.log(params)
    const req = await api.bids.update(id, params)

    dispatch({ type: 'POST_UPDATE_BID_RES', payload: req.data })
    return req.data
  } catch (error) {
    dispatch({ type: 'POST_UPDATE_BID_FAIL', payload: error.message })
  }
}

export const releaseBid = (): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'RELEASE_BID' })
}

export const changeState = (id: number, state: string): ThunkAction => async (
  dispatch: Dispatch
) => {
  const res = await api.bids.change_state(id, state)
  return res.data
}

export const getStbParticipants = (id: number): ThunkAction => async (dispatch: Dispatch, getState: GetState) => {
  dispatch({ type: 'GET_STB_PARTICIPANTS_REQ' })

  const req = await api.bids.stbParticipants(id,{})

  await dispatch({
    type: 'GET_STB_PARTICIPANTS_RES',
    payload: {
      ...req,
    },
  })

  return req.data
}

export const setSearchStbParticipants = (id, search): ThunkAction => async (dispatch: Dispatch,  getState: GetState) => {
  await dispatch({ type: 'SET_SEARCH_STB_PARTICIPANTS_RES', payload: search })
  let params = {
    per_page: 10000,
    page: 1,
  }
  if (!isEmpty(getState().stbParticipants.search.query)) {
    params.q = getState().stbParticipants.search.query
  }
  const req = await api.bids.stbParticipants(id, params)

  await dispatch({
    type: 'GET_STB_PARTICIPANTS_RES',
    payload: {
      ...req,
    },
  })
}

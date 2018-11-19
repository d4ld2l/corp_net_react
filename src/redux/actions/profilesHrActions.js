import api from 'api-folder'
import type { Dispatch, ThunkAction } from 'types-folder/actions'
import moment from "moment/moment";
import isEmpty from 'lodash/isEmpty'

function createSearchParams(params){
  const search = {}
  if (params && params !== ''){
    search.q = params
  }
  return search
}

function createFilterParams(params) {
  const filter = {}
  if (params) {
    !isEmpty(params.legal_unit_ids) && (filter.legal_unit_ids = params.legal_unit_ids.map(it => it.value).join(','))
    !isEmpty(params.block) && (filter.block = params.block.map(it => it.value).join(','))
    !isEmpty(params.practice) && (filter.practice = params.practice.map(it => it.value).join(','))
    !isEmpty(params.department_ids) && (filter.department_ids = params.department_ids.map(it => it.value).join(','))
    !isEmpty(params.office_ids) && (filter.office_ids = params.office_ids.map(it => it.value).join(','))
    !isEmpty(params.wage_rate) && (filter.wage_rate = params.wage_rate.replace(',', '.'))
    !isEmpty(params.state) && ((params.state.value === 'Уволен') ? (filter.show_only = 'fired') : (filter.show_only = 'not_fired'))
    !isEmpty(params.contract_type_ids) && (filter.contract_type_ids = params.contract_type_ids.value)
    !isEmpty(params.wage_from) && (filter.wage_from = params.wage_from)
    !isEmpty(params.wage_to) && (filter.wage_to = params.wage_to)
    !isEmpty(params.is_default_legal_unit) && (filter.is_default_legal_unit = params.is_default_legal_unit.value)
    !isEmpty(params.structure_units) && (filter.structure_units = params.structure_units.value)
    !isEmpty(params.contract_ends_from) && (filter.contract_ends_from = moment(params.contract_ends_from).format('YYYY-MM-DD'))
    !isEmpty(params.contract_ends_to) && (filter.contract_ends_to = moment(params.contract_ends_to).format('YYYY-MM-DD'))
    !isEmpty(params.skill_list) && (filter.skill_names = params.skill_list.map(it => it.value).join(','))
  }
  return filter
}

export const getProfilesHrPagination = (page): ThunkAction => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  dispatch({ type: 'GET_PROFILES_HR_PAGINATION_REQ' })
  const per_page = 15
  const hr = true
  const filterParams = createFilterParams(getState().profilesHr.filter)
  const searchParams = createSearchParams(getState().profilesHr.searchParams)


  try {
    const req = await api.profilesHr.pagination(hr, page, per_page, searchParams, filterParams)
    dispatch({ type: 'GET_PROFILES_HR_PAGINATION_RES', payload: req.data, page, per_page })
  } catch (error) {
    dispatch({ type: 'GET_PROFILES_HR_PAGINATION_FAIL', payload: error.message })
  }
}

export const resetProfileHrFilter = (): ThunkAction => async (dispatch: Dispatch) =>
  dispatch({ type: 'RESET_PROFILE_HR_FILTER' })

export const getProfileHr = (profileId): ThunkAction => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  dispatch({ type: 'GET_PROFILE_HR_REQ' })
  const per_page = 15

  try {
    const req = await api.profilesHr.getProfileHr(profileId)
    dispatch({ type: 'GET_PROFILE_HR_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_PROFILE_HR_FAIL', payload: error.message })
  }
}

export const setSearch = (searchParams): ThunkAction => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  dispatch({ type: 'SET_SEARCH_PROFILES_HR_REQ' })

  try {
    dispatch({ type: 'SET_SEARCH_PROFILES_HR_RES', payload: searchParams })
    dispatch(getProfilesHrPagination(1))
  } catch (error) {
    dispatch({ type: 'SET_SEARCH_PROFILES_HR_FAIL', payload: error.message })
  }
}

export const setFilter = (filterParams): ThunkAction => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  dispatch({ type: 'SET_FILTER_PARAMS_PROFILES_HR_REQ' })
  const form = getState().form.Filtered.values || {}

  try {
    dispatch({ type: 'SET_FILTER_PARAMS_PROFILES_HR_RES', payload: form })
    dispatch(getProfilesHrPagination(1))
  } catch (error) {
    dispatch({ type: 'SET_FILTER_PARAMS_PROFILES_HR_FAIL', payload: error.message })
  }
}

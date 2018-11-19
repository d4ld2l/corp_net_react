import api from '../../api'
import type { Dispatch, ThunkAction } from '../../types/actions'
import moment from 'moment'
import flatten from 'lodash/flatten'
import uniqBy from 'lodash/uniqBy'

function createFilterParams(params) {
  const filter = {}
  if (params) {
    (params.product_list && params.product_list.length > 0) ? filter.products = params.product_list.map(({label}) => (label)).join(',') : null;
    (params.technology_list && params.technology_list.length > 0) ? filter.technologies = params.technology_list.map(({label}) => (label)).join(',') : null;
    (params.methodology_list && params.methodology_list.length > 0) ? filter.methodologies= params.methodology_list.map(({label}) => (label)).join(',') : null;
    params.customer ? filter.customer_id = params.customer.value : null
    params.legalUnit ? filter.legal_unit_id = params.legalUnit.value : null
    params.manager ? filter.manager_id = params.manager.value : null
    params.department ? filter.department_ids = params.department.map(({value}) => (value)).join(',') : null
    params.close_project ? filter.status = 'closed' : null
    params.begin_date ? filter.begin_date = moment(params.begin_date).format('YYYY.MM.DD') : null
    params.end_date ? filter.end_date = moment(params.end_date).format('YYYY.MM.DD') : null
  }
  return filter
}

function createSearchParams(params){
  const search = {}
  if (params && params !== ''){
    search.q = params
  }
  return search
}

export const toggleTab = (activeTabMy): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_PROJECTS_DATA_TOGGLE_TAB_RES', payload: activeTabMy })
  dispatch(getProjectsData(1, activeTabMy))
}

export const clearSearchFilter = (): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'CLEAR_SEARCH_FILTER_PROJECTS_DATA' })
}

export const toggleFilter = (filterOpen): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'TOGGLE_FILTER_PROJECTS_DATA', payload: filterOpen })
}

export const getProjectsData = (page, activeTabMy): ThunkAction => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  dispatch({ type: 'GET_PROJECTS_DATA_REQ' })
  const per_page = 15
  const filterParams = createFilterParams(getState().projectsData.filter)
  const searchParams = createSearchParams(getState().projectsData.searchParams)
  try {
    const req = await api.projectsData.pagination(page, per_page, activeTabMy, filterParams, searchParams)
    dispatch({ type: 'GET_PROJECTS_DATA_RES', payload: req.data, per_page })
  } catch (error) {
    dispatch({ type: 'GET_PROJECTS_DATA_FAIL', payload: error.message })
  }
}

export const getProjectsDataPagination = (page, activeTabMy): ThunkAction => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  dispatch({ type: 'GET_PROJECTS_DATA_PAGINATION_REQ' })
  const per_page = 15
  const filterParams = createFilterParams(getState().projectsData.filter)
  const searchParams = createSearchParams(getState().projectsData.searchParams)

  try {
    const req = await api.projectsData.pagination(page, per_page, activeTabMy, filterParams, searchParams)
    dispatch({ type: 'GET_PROJECTS_DATA_PAGINATION_RES', payload: req.data, per_page })
  } catch (error) {
    dispatch({ type: 'GET_PROJECTS_DATA_PAGINATION_FAIL', payload: error.message })
  }
}

export const getProject = (id): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_PROJECT_DATA_REQ' })
  try {
    const req = await api.projectsData.getProject(id)
    dispatch({ type: 'GET_PROJECT_DATA_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_PROJECT_DATA_FAIL', payload: error.message })
  }
}


export const createProject = (): ThunkAction => async (
  dispatch: Dispatch,
  getState: GetState,
) => {
  dispatch({ type: 'POST_CREATE_PROJECTS_REQ' })

  const form = getState().form.NewProject.values || {}
  const accounts = getState().searchParticipants
  const account_projects = accounts.all ? [] :
    accounts.participants.map( (it) => {
      if (it.isUser()) {
        return ({ account_id: it.id })
      } else {
        return it.accounts.map( (it) => ({ account_id: it.id }) )
      }
    })

  const account_projects_attributes = uniqBy(flatten(account_projects), 'account_id')

  const params = {
    project: {
      ...form,
      charge_code: form.charge_code ? (form.charge_code !== '' ? form.charge_code : null) : null,
      product_list: form.product_list && form.product_list.map(({name}) => (name)),
      technology_list: form.technology_list && form.technology_list.map(({name}) => (name)),
      methodology_list: form.methodology_list && form.methodology_list.map(({name}) => (name)),
      begin_date: form.begin_date && moment(form.begin_date),
      end_date: form.for_now ? null : (form.end_date && moment(form.end_date)),
      account_projects_attributes: accounts.all ? [] : account_projects_attributes,
      all_employees: accounts.all,
      manager_id: form.manager && form.manager.value,
      department_id: form.department && form.department.value,
      legal_unit_id: form.legal_unit && form.legal_unit.value,
      customer_projects_attributes: form.customer ? [
        {
          customer_id: form.customer.value,
        }
      ] : [],
    }
  }

  try {
    const req = await api.projectsData.create(params)
    dispatch({ type: 'POST_CREATE_PROJECTS_RES', payload: req.data })
    return req.data
  } catch (error) {
    dispatch({ type: 'POST_CREATE_PROJECTS_FAIL', payload: error.message })
  }
}

export const updateProject = (project): ThunkAction => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  dispatch({ type: 'POST_CREATE_PROJECTS_REQ' })

  const form = getState().form.NewProject.values || {}
  const accounts = getState().searchParticipants

  const params = {
    project: {
      ...form,
      charge_code: form.charge_code ? (form.charge_code !== '' ? form.charge_code : null) : null,
      product_list: form.product_list && form.product_list.map(({name}) => (name)),
      technology_list: form.technology_list && form.technology_list.map(({name}) => (name)),
      methodology_list: form.methodology_list && form.methodology_list.map(({name}) => (name)),
      begin_date: form.begin_date && moment(form.begin_date),
      end_date: form.for_now ? null : (form.end_date && moment(form.end_date)),
      account_projects_attributes: accounts.all ? [] : accounts.participants.map(({item:{account_id}}) => ({account_id: account_id})),
      all_employees: accounts.all,
      manager_id: form.manager && form.manager.value,
      department_id: form.department && form.department.value,
      legal_unit_id: form.legal_unit && form.legal_unit.value,
      customer_projects_attributes: form.customer ? [
        {
          id: (project.customer_projects[0] && project.customer_projects[0].customer_id === form.customer.value) &&
              project.customer_projects[0].id,
          customer_id: form.customer.value,
        }
      ] : [],
    }
  }

  try {
    const req = await api.projectsData.update(project.id, params)
    dispatch({ type: 'POST_CREATE_PROJECTS_RES', payload: req.data })
    return req.data
  } catch (error) {
    dispatch({ type: 'POST_CREATE_PROJECTS_FAIL', payload: error.message })
  }
}

export const setFilter = (activeTabMy): ThunkAction => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  dispatch({ type: 'SET_FILTER_PROJECTS_DATA_REQ' })

  const form = getState().form.Filtered.values || {}

  try {
    dispatch({ type: 'SET_FILTER_PROJECTS_DATA_RES', payload: form })
    dispatch(getProjectsData(1, activeTabMy))
  } catch (error) {
    dispatch({ type: 'SET_FILTER_PROJECTS_DATA_FAIL', payload: error.message })
  }
}

export const setSearch = (searchParams, activeTabMy): ThunkAction => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  dispatch({ type: 'SET_SEARCH_PROJECTS_DATA_REQ' })

  try {
    dispatch({ type: 'SET_SEARCH_PROJECTS_DATA_RES', payload: searchParams })
    dispatch(getProjectsData(1, activeTabMy))
  } catch (error) {
    dispatch({ type: 'SET_SEARCH_PROJECTS_DATA_FAIL', payload: error.message })
  }
}

export const getProjectsDictionary = (dictionary): ThunkAction => async (
  dispatch: Dispatch
) => {
  dispatch({ type: 'GET_PROJECTS_DICTIONARY_REQ' })

  try {
    const req = await api.projectsData.getDictionary({context: dictionary})
    dispatch({ type: 'GET_PROJECTS_DICTIONARY_RES', payload: req.data, dictionary })
  } catch (error) {
    dispatch({ type: 'GET_PROJECTS_DICTIONARY_FAIL', payload: error.message })
  }
}

export const getCustomerContacts = (customerId): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_CUSTOMER_CONTACTS_REQ' })

  try {
    const req = await api.customerContacts.all(customerId)
    dispatch({ type: 'GET_CUSTOMER_CONTACTS_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_CUSTOMER_CONTACTS_FAIL', payload: error.message })
  }
}

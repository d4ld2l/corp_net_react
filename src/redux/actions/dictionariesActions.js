import api from 'api-folder'

import type { Dispatch, ThunkAction } from 'types-folder/actions'

export const getDictionaryOffices = (): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_DICTIONARIES_OFFICES_REQ' })
  try {
    const req = await api.dictionaries.getOffices()
    dispatch({ type: 'GET_DICTIONARIES_OFFICES_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_DICTIONARIES_OFFICES_FAIL', payload: error.message })
  }
}

export const getDictionaryStructureUnits = (): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_DICTIONARIES_STRUCTURE_UNITS_REQ' })
  try {
    const req = await api.dictionaries.getStructureUnits()
    dispatch({ type: 'GET_DICTIONARIES_STRUCTURE_UNITS_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_DICTIONARIES_STRUCTURE_UNITS_FAIL', payload: error.message })
  }
}

export const getDictionaryContactTypes = (): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_DICTIONARIES_CONTACT_TYPES__REQ' })
  try {
    const req = await api.dictionaries.getContactTypes()
    dispatch({ type: 'GET_DICTIONARIES_CONTACT_TYPES_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_DICTIONARIES_CONTACT_TYPES_FAIL', payload: error.message })
  }
}

export const getDictionaryEmployeeStates = (): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_DICTIONARIES_EMPLOYEE_STATES__REQ' })
  try {
    const req = await api.dictionaries.getEmployeeStates()
    dispatch({ type: 'GET_DICTIONARIES_EMPLOYEE_STATES_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_DICTIONARIES_EMPLOYEE_STATES_FAIL', payload: error.message })
  }
}

export const getDictionaryPositions = (): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_DICTIONARIES_POSITIONS_REQ' })
  try {
    const req = await api.dictionaries.getPositions()
    dispatch({ type: 'GET_DICTIONARIES_POSITIONS_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_DICTIONARIES_POSITIONS_FAIL', payload: error.message })
  }
}

export const getDictionarySkills = (): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_DICTIONARIES_SKILLS_REQ' })
  try {
    const req = await api.dictionaries.getSkills()
    dispatch({ type: 'GET_DICTIONARIES_SKILLS_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_DICTIONARIES_SKILLS_FAIL', payload: error.message })
  }
}

export const getDictionaryCities = (): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_DICTIONARIES_CITIES_REQ' })
  try {
    const req = await api.dictionaries.getCities()
    dispatch({ type: 'GET_DICTIONARIES_CITIES_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_DICTIONARIES_CITIES_FAIL', payload: error.message })
  }
}

export const getDictionaryAccounts = (): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_DICTIONARIES_ACCOUNTS_REQ' })
  try {
    const req = await api.dictionaries.getAccounts()
    dispatch({ type: 'GET_DICTIONARIES_ACCOUNTS_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_DICTIONARIES_ACCOUNTS_FAIL', payload: error.message })
  }
}

export const getDictionaryVacancies = (params): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_DICTIONARIES_VACANCIES_REQ' })
  try {
    const req = await api.dictionaries.getVacancies(params)
    dispatch({ type: 'GET_DICTIONARIES_VACANCIES_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_DICTIONARIES_VACANCIES_FAIL', payload: error.message })
  }
}

export const getFilteredDictionaryAccounts = (params): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_FILTERED_DICTIONARIES_ACCOUNTS_REQ' })
  try {
    const req = await api.dictionaries.getFiltredAccounts(params)
    dispatch({ type: 'GET_FILTERED_DICTIONARIES_ACCOUNTS_RES', payload: req.data })
    return req.data
  } catch (error) {
    dispatch({ type: 'GET_FILTERED_DICTIONARIES_ACCOUNTS_FAIL', payload: error.message })
  }
}

export const getFilteredDictionaryAccountsOnlyWithLegalUnit = (params): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_FILTERED_DICTIONARIES_ACCOUNTS_ONLY_WITH_LEGAL_UNIT_REQ' })
  try {
    const req = await api.dictionaries.getFiltredAccounts(params)
    dispatch({ type: 'GET_FILTERED_DICTIONARIES_ACCOUNTS_ONLY_WITH_LEGAL_UNIT_RES', payload: req.data })
    return req.data
  } catch (error) {
    dispatch({ type: 'GET_FILTERED_DICTIONARIES_ACCOUNTS_ONLY_WITH_LEGAL_UNIT_FAIL', payload: error.message })
  }
}


export const getDictionaryProjects = (): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_DICTIONARIES_PROJECTS_REQ' })
  try {
    const req = await api.dictionaries.getProjects()
    dispatch({ type: 'GET_DICTIONARIES_PROJECTS_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_DICTIONARIES_PROJECTS_FAIL', payload: error.message })
  }
}

export const getDictionaryDepartment = (): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_DICTIONARIES_DEPARTMENTS_REQ' })
  try {
    const req = await api.dictionaries.getDepartment()
    dispatch({ type: 'GET_DICTIONARIES_DEPARTMENTS_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_DICTIONARIES_DEPARTMENTS_FAIL', payload: error.message })
  }
}

export const getDictionaryDepartmentNames = (): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_DICTIONARIES_DEPARTMENTS_NAMES_REQ' })
  try {
    const req = await api.dictionaries.getDepartmentNames()
    dispatch({ type: 'GET_DICTIONARIES_DEPARTMENTS_NAMES_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_DICTIONARIES_DEPARTMENTS_NAMES_FAIL', payload: error.message })
  }
}

export const getDictionaryProffessionalSpecializations = (): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_DICTIONARIES_PROFESSIONAL_SPECIALIZATIONS_REQ' })
  try {
    const req = await api.dictionaries.getProffessionalSpecializations()
    dispatch({ type: 'GET_DICTIONARIES_PROFESSIONAL_SPECIALIZATIONS_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_DICTIONARIES_PROFESSIONAL_SPECIALIZATIONS_FAIL', payload: error.message })
  }
}

export const getDictionaryCandidateSkills = (): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_DICTIONARIES_CANDIDATE_SKILLS_REQ' })
  try {
    const req = await api.dictionaries.getCandidateSkills()
    dispatch({ type: 'GET_DICTIONARIES_CANDIDATE_SKILLS_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_DICTIONARIES_CANDIDATE_SKILLS_FAIL', payload: error.message })
  }
}

export const getDictionaryLegalUnits = (): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'GET_DICTIONARIES_LEGAL_UNITS_REQ' })
  try {
    const req = await api.dictionaries.getLegalUnits()
    dispatch({ type: 'GET_DICTIONARIES_LEGAL_UNITS_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_DICTIONARIES_LEGAL_UNITS_FAIL', payload: error.message })
  }
}


const initialState = {
  offices: [],
  structureUnits: [],
  contactTypes: [],
  employeeStates: [],
  positions: [],
  skills: [],
  cities: [],
  accounts: [],
  projects: [],
  departments: [],
  departmentsName: [],
  professionalSpecializations: [],
  candidateSkills: [],
  filteredAccounts: [],
  filteredDictionaryAccountsOnlyWithLegalUnit: [],
  dictionaryVacancies: [],
  legalUnits: [],
}

export default (state = initialState, action) => {
  const { payload } = action
  switch (action.type) {
    case 'GET_DICTIONARIES_OFFICES_RES':
      return { ...state, offices: payload }
    case 'GET_DICTIONARIES_STRUCTURE_UNITS_RES':
      return { ...state, structureUnits: payload }
    case 'GET_DICTIONARIES_CONTACT_TYPES_RES':
      return { ...state, contactTypes: payload}
    case 'GET_DICTIONARIES_EMPLOYEE_STATES_RES':
      return { ...state, employeeStates: payload}
    case 'GET_DICTIONARIES_VACANCIES_RES':
      return { ...state, dictionaryVacancies: payload}
    case 'GET_DICTIONARIES_POSITIONS_RES':
      return { ...state, positions: payload}
    case 'GET_DICTIONARIES_SKILLS_RES':
      return { ...state, skills: payload}
    case 'GET_DICTIONARIES_CITIES_RES':
      return { ...state, cities: payload}
    case 'GET_DICTIONARIES_ACCOUNTS_RES':
      return { ...state, accounts: payload}
    case 'GET_FILTERED_DICTIONARIES_ACCOUNTS_RES':
      return { ...state, filteredAccounts: payload}
    case 'GET_FILTERED_DICTIONARIES_ACCOUNTS_ONLY_WITH_LEGAL_UNIT_RES':
      return { ...state, filteredDictionaryAccountsOnlyWithLegalUnit: payload}
    case 'GET_DICTIONARIES_PROJECTS_RES':
      return { ...state, projects: payload}
    case 'GET_DICTIONARIES_DEPARTMENTS_RES':
      return { ...state, departmens: payload}
    case 'GET_DICTIONARIES_DEPARTMENTS_NAMES_RES':
      return { ...state, departmentsName: payload}
    case 'GET_DICTIONARIES_PROFESSIONAL_SPECIALIZATIONS_RES':
      return { ...state, professionalSpecializations: payload}
    case 'GET_DICTIONARIES_CANDIDATE_SKILLS_RES':
      return { ...state, candidateSkills: payload}
    case 'GET_DICTIONARIES_LEGAL_UNITS_RES':
      return { ...state, legalUnits: payload }
    default:
      return state
  }
}

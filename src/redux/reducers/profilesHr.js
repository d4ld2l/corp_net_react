const initialState = {
  data: [],
  current: {},
  showCardProfile: false,
  scroll: true,
  page: 1,
  filterOpen: false,
  searchParams: '',
  legalUnitIds: [],
  count: 0,
  filter: {
    legal_unit_ids: null,
    department_ids: null,
    block: [],
    practice: [],
    office_ids: null,
    wage_rate: null,
    contract_type_ids: null,
    wage_from: null,
    wage_to: null,
    show_only: null,
    contract_ends_from: null,
    contract_ends_to: null,
    is_default_legal_unit: null,
    structure_units: null,
    state: null,
    skill_list: null,
  },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PROFILES_HR_PAGINATION_RES':
      return { ...state,
        data: action.page === 1 ? action.payload.data : [].concat(state.data, action.payload.data),
        page: action.page + 1,
        scroll: action.per_page === action.payload.data.length,
        count: action.payload.count,
      }
    case 'GET_PROFILE_HR_RES':
      return { ...state, current: action.payload}
    case 'RESET_PROFILE_HR_FILTER':
      return { ...initialState }
    case 'TOGGLE_SHOW_CARD_PROFILE':
      return { ...state, showCardProfile: action.payload }
    case 'TOGGLE_FILTER_PROFILES_HR':
      return { ...state, filterOpen: action.payload}
    case 'SET_SEARCH_PROFILES_HR_RES':
      return{
        ...state,
        searchParams: action.payload,
        showCardProfile: false,
      }
    case 'SET_FILTER_PARAMS_PROFILES_HR_RES':
      return {
        ...state,
        filter: action.payload,
        showCardProfile: false,
        filterOpen: false,
      }
    case 'CHANGE_LEGAL_UNIT_FIELD':
      return {
        ...state,
        legalUnitIds: action.payload,
      }
    default:
      return state
  }
}

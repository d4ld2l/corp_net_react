import type { Action } from '../../types/actions'
import type { EmployeesState as State } from '../../types/states'

const initialState = {
  data: [],
  all: false,
  current: {},
  openLinkedCandidateModal: false,
  search: [],
  isSearch: false,
  scroll: true,
  scope: '',
  value: '',
  page: 1,
  filterOpen: false,
  searchParams: '',
  legalUnitIds: [],
  searchPage: 1,
  searchScroll: true,
  sorting: false,
  sortingValue: '',
  sortingData: [],
  sortingPage: 1,
  sortingScroll: true,
  newRequest: false,
  filter: {
    legal_unit_ids: null,
    department_ids: null,
    block: [],
    practice: [],
    city_list: null,
    position_list: null,
    skill_list: null,
    state: null,
  },
}

export default (state: State = initialState, action: Action): State => {
  const { payload } = action

  switch (action.type) {
    case 'GET_PAGINATION_EMPLOYEES_RES':
      return { ...state,
        data: action.page === 1 ? action.payload.data : [].concat(state.data, action.payload.data),
        page: action.page + 1,
        scroll: action.per_page === action.payload.data.length,
        all: false,
      }
    case 'GET_PAGINATION_EMPLOYEES_FILTER_RES':
      return { ...state,
        data: action.page === 1 ? action.payload.data : [].concat(state.data, action.payload.data),
        page: action.page + 1,
        scroll: action.per_page === action.payload.data.length,
        all: false,
      }
    case 'GET_EMPLOYEES_RES':
      return { ...state, data: action.payload.data, all: true, scroll: false }
    case 'GET_EMPLOYEE_RES':
      return {
        ...state,
        current: {
          account_photos: state.current.account_photos, // preserve photos
          ...action.payload
        }
      }
    case 'TOGGLE_FILTER_EMPLOYEE':
      return { ...state, filterOpen: action.payload}
    case 'GET_EMPLOYEE_SEARCH_RES':
      return { ...state, search: action.newSearch ? action.payload.data : [].concat(state.search, action.payload.data), isSearch: true, searchScroll: action.payload.data.length > 0, searchPage: action.newSearch ? 2 : (state.searchPage + 1), value: action.value }
    case 'GET_EMPLOYEE_SORT_RES':
      return { ...state, sortingData: action.newSort ? action.payload.data : [].concat(state.sortingData, action.payload.data), sorting: true, sortingScroll: action.payload.data.length > 0, sortingPage: action.newSort ? 2 : (state.sortingPage + 1), sortingValue: action.value }
    case 'RESET_EMPLOYEE_SEARCH':
      return { ...state, search: [], isSearch: false, searchScroll: true, searchPage: 1, value: ''}
    case 'RESET_PAGINATION_EMPLOYEE_SEARCH':
      return { ...state, search: [], isSearch: false, searchScroll: true, searchPage: 1, value: ''}
    case 'RESET_EMPLOYEE_SORT':
      return { ...state, sortingData: [], sorting: false, sortingScroll: true, sortingPage: 1, sortingValue: ''}
    case 'RESET_EMPLOYEE_FILTER':
      return { ...initialState }
    case 'SET_SEARCH_EMPLOYEES_RES':
      return{
        ...state,
        searchParams: action.payload,
      }
    case 'SET_FILTER_PARAMS_EMPLOYEES_RES':
      return {
        ...state,
        filter: action.payload,
        filterOpen: false,
      }
    case 'CHANGE_LEGAL_UNIT_FIELD':
      return {
        ...state,
        legalUnitIds: action.payload,
      }
    case 'UNCONFIRM_EMPLOYEE_SKILL_RES':
    case 'CONFIRM_EMPLOYEE_SKILL_RES':
      if(state.current.id){
        return {
          ...state,
          current: {
            ...state.current,
            account_skills: state.current.account_skills.map( skill => {
              if (skill.id === action.payload.account_skill.id) {
                return action.payload.account_skill
              } else {
                return skill
              }
            })
          }
        }
      }
    case 'GET_EMPLOYEE_PHOTOS_RES':
      return {
        ...state,
        current: {
          ...state.current,
          account_photos: payload.account_photos
        }
      }
    case 'UPLOAD_EMPLOYEE_PHOTO_RES':
      return {
        ...state,
        current: {
          ...state.current,
          photo: payload.employee.photo,
          account_photos: state.current.account_photos.concat(payload.data)
        }
      }
    case 'UPDATE_EMPLOYEE_PHOTO_RES':
      return {
        ...state,
        current: {
          ...state.current,
          photo: payload.employee.photo,
          account_photos: state.current.account_photos.map(p => p.id === payload.data.id ? payload.data : p)
        }
      }
    case 'DELETE_EMPLOYEE_PHOTO_RES':
      return {
        ...state,
        current: {
          ...state.current,
          photo: payload.employee.photo,
          account_photos: state.current.account_photos.filter(photo => photo.id !== payload.id)
        }
      }
    case 'SET_EMPLOYEE_PHOTO_RES':
      return {
        ...state,
        current: {
          ...state.current,
          photo: payload.employee.photo,
        }
      }
    default:
      return state
  }
}

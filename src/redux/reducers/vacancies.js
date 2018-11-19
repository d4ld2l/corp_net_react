import type { Action } from '../../types/actions'
import type { VacanciesState as State } from '../../types/states'

const initialState = {
  data: [],
  all: [],
  current: {},
  currentCandidates: [],
  selectVacancies: [],
  currentSelectVacancies: {},
  stageVacancies: [],
  scroll: true,
  stats: {},
  myVacancies: [],
}

function updateVacancy(vacancies, payload) {
  return vacancies.map(vacancy => {
    if (vacancy.id === payload.id) {
      return payload
    } else {
      return vacancy
    }
  })
}

function removeVacancy(vacancies, payload) {
  return vacancies.filter(vacancy => vacancy.id !== payload.id)
}

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'GET_VACANCIES_RES':
      return {
        ...state,
        data: action.payload,
      }
    case 'GET_ALL_VACANCIES_RES':
      return {
        ...state,
        all: action.page === 1 ? action.payload : state.all.concat(action.payload),
        scroll: action.payload.length > 0,
      }
    case 'RESET_VACANCIES':
      return {
        ...state,
        all: initialState.all,
        scroll: initialState.scroll,
      }
    case 'GET_CURRENT_VACANCY_RES':
      return { ...state, current: action.payload }
    case 'RESET_CURRENT_VACANCY':
      return { ...state, current: initialState.current }
    case 'GET_VACANCIES_STATS_RES':
      return { ...state, stats: action.payload }
    case 'SELECT_LINKED_VACANCIES':
      return {
        ...state,
        currentSelectVacancies: action.payload,
      }
    case 'RESET_LINKED_VACANCIES':
      return {
        ...state,
        currentSelectVacancies: initialState.currentSelectVacancies,
      }
    case 'GET_VACANCIES_WITH_STAGE_RES':
      return {
        ...state,
        stageVacancies: action.payload,
      }
    case 'GET_MY_VACANCIES_RES':
      return {
        ...state,
        selectVacancies: action.payload.map(it => ({
          value: it.id,
          label: it.name,
        })),
        myVacancies: action.payload,
      }
    case 'LINK_CANDIDATES_TO_VACANCY_RES':
      return {
        ...state,
        all: updateVacancy(state.all, action.payload),
      }
    case 'SET_VACANCY_STATE_RES':
      return {
        ...state,
        all: removeVacancy(state.all, action.payload)
      }
    default:
      return state
  }
}

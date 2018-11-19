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
  stats: {},
  myVacancies: [],

  vacancyStages: [],
  page: 1,
  perPage: 15,
  scroll: true,
  filter: {
    vacancy_stage_id: null,
  },
  searchParams: null,
  showCandidateCard: false,
  currentCandidate: {},
  checkAllVacancyCandidate: false,
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
        filter: initialState.filter
      }
    case 'RESET_VACANCIES':
      return {
        ...state,
        all: initialState.all,
        scroll: initialState.scroll,
        showCandidateCard: false,
        currentCandidate: {},
      }
    case 'GET_CURRENT_VACANCY_RES':
    case 'UPDATE_VACANCY_RES':
      return { ...state, current: action.payload }
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
        filter: initialState.filter
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
    case 'GET_VACANCY_STAGES_RES':
      return {
        ...state,
        vacancyStages: action.payload.vacancy_stages,
      }
    case 'GET_VACANCY_CANDIDATES_RES':
      return {
        ...state,
        currentCandidates: action.page === 1 ? action.payload.data : [...state.currentCandidates, ...action.payload.data],
        scroll: state.perPage === action.payload.data.length,
        page: action.page + 1,
        checkAllVacancyCandidate: false,
      }
    case 'SET_FILTER_VACANSY_CANDIDATES':
      return {
        ...state,
        filter: {
          vacancy_stage_id: action.payload,
        },
        page: 1,
        showCandidateCard: false,
      }
    case 'SET_SEARCH_VACANSY_CANDIDATES':
      return {
        ...state,
        searchParams: action.payload,
        page: 1,
        showCandidateCard: false,
      }
    case 'OPEN_VACANCY_CANDIDATE_CARD':
      return {
        ...state,
        showCandidateCard: true,
      }
    case 'CLOSE_VACANCY_CANDIDATE_CARD':
      return {
        ...state,
        showCandidateCard: false,
      }
    case 'GET_VACANCY_CANDIDATE_RES':
      return {
        ...state,
        currentCandidate: action.payload,
      }
    case 'POST_CANDIDATE_RATE_RES':
      return {
        ...state,
        currentCandidates: state.currentCandidates.map( it => {
          if (it.id === action.payload.candidate_vacancy_id){
            return {
              ...it,
              current_candidate_rating: action.payload,
            }
          } else {
            return it
          }
        })
      }
    case 'TRANSFER_CANDIDATE_RES':
      if (state.filter.vacancy_stage_id) {
        return {
          ...state,
          currentCandidates: state.currentCandidates.filter( it => it.candidate.id !== action.payload.candidateId )
        }
      } else {
        return {
          ...state,
          currentCandidates: state.currentCandidates.map( it => {
            if (it.candidate.id === action.payload.candidateId){
              return {
                ...it,
                current_candidate_rating: null,
                current_vacancy_stage: state.current.vacancy_stages
                  .find(it => it.id === action.payload.stageId),
              }
            } else {
              return it
            }
          })
        }
      }
      case 'TRANSFER_CANDIDATES_RES':
      if (state.filter.vacancy_stage_id) {
        return {
          ...state,
          currentCandidates: state.currentCandidates.filter((it) => !action.payload.linkedCandidates.includes(it.candidate.id))
        }
      } else {
        return {
          ...state,
          currentCandidates: state.currentCandidates.map( it => {
            if (action.payload.linkedCandidates.includes(it.candidate.id)){
              return {
                ...it,
                current_candidate_rating: null,
                current_vacancy_stage: state.current.vacancy_stages
                  .find(it => it.id === action.payload.stageId),
              }
            } else {
              return it
            }
          })
        }
      }
    case 'TOGGLE_CHECK_VACANCY_CANDIDATE':
      return {
        ...state,
        currentCandidates: state.currentCandidates.map( it => {
          if (it.id === action.payload) {
            return {
              ...it,
              isChecked: !it.isChecked,
            }
          } else {
            return it
          }
          }
        )
      }
    case 'CLEAR_LINKED_VACANCY_CANDIDATES':
      return {
        ...state,
        currentCandidates: state.currentCandidates.map( it => ({
          ...it,
          isChecked: false,
        }))
      }
    case 'TOGGLE_DISABLED_ALL_CHECKED_VACANCY_OF_CANDIDATES':
      return {
        ...state,
        checkAllVacancyCandidate: false,
        currentCandidates: state.currentCandidates.map( it => ({
          ...it,
          isChecked: false,
        })),
      }
    case 'TOGGLE_CHECK_ALL_VACANCY_CANDIDATES':
      return {
        ...state,
        checkAllVacancyCandidate: !state.checkAllVacancyCandidate,
        currentCandidates: state.currentCandidates.map( it => ({
          ...it,
          isChecked: !state.checkAllVacancyCandidate,
        })),
      }
    default:
      return state
  }
}

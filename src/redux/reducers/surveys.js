import type { Action } from '../../types/actions'
import type { SurveysState as State } from '../../types/states'
import { unionBy, differenceBy } from 'lodash'

const initialState = {
  data: [],
  count: {
    new: 0,
    passed: 0,
    created: 0
  },
  scope: 'new', // all, new, passed, created
  current: {},
  result: {},
  search: {
    now: false,
    query: '',
    data: []
  },
  page: 1,
  perPage: 15,
  scroll: true
}

export default (state: State = initialState, action: Action): State => {
  const { type, payload } = action

  switch (type) {
    case 'GET_SURVEYS_RES':
      var { surveys, new_count, passed_count, my_count } = payload.data

      return {
        ...state,
        data: payload.loadMore ? unionBy(state.data, surveys, 'id') : surveys,
        count: {
          new: new_count,
          passed: passed_count,
          created: my_count
        },
        scope: payload.scope,
        scroll: differenceBy(surveys, state.data, 'id').length > 0,
        page: payload.page || 1
      }
    case 'GET_SURVEY_RES':
      return { ...state, current: payload }
    case 'GET_SAVE_SURVEY_RES':
      return { ...state, result: payload }
    case 'SEARCH_SURVEYS_RES':
      var { surveys } = payload.data

      return {
        ...state,
        search: {
          ...state.search,
          now: true,
          query: payload.query,
          data: payload.loadMore ? unionBy(state.search.data, surveys, 'id') : surveys
        },
        scroll: differenceBy(surveys, state.search.data, 'id').length > 0,
        page: payload.page
      }
    case 'RESET_SEARCH_SURVEYS':
      return { ...state, search: initialState.search }
    case 'DELETE_SURVEY_RES':
      return {
        ...state,
        data: state.data.filter(it => it.id !== payload),
        count: {
          ...state.count,
          created: state.count.created - 1,
        }
      }
    case 'POST_SAVE_SURVEY_RES':
    case 'POST_CREATE_SURVEY_RES':
      return { ...state, scope: 'created' }
    case 'PUBLIC_SURVEY_RES':
      return {
        ...state,
        data: state.data.map(it => {
          if (it.id === payload.id){
            return payload
          } else {
            return it
          }
        }),
        count: {
          ...state.count,
          new: payload.passed ? state.count.new : state.count.new + 1,
          passed: payload.passed ? state.count.passed + 1 : state.count.passed,
        }
      }
    case 'UNPUBLIC_SURVEY_RES':
      return {
        ...state,
        data: state.data.map(it => {
          if (it.id === payload.id){
            return payload
          } else {
            return it
          }
        }),
        count: {
          ...state.count,
          new: payload.passed ? state.count.new : state.count.new - 1,
          passed: payload.passed ? state.count.passed - 1 : state.count.passed,
        }
      }
    case 'GET_SURVEYS_REQ':
    case 'GET_SURVEYS_FAIL':
    case 'GET_SURVEY_REQ':
    case 'GET_SURVEY_FAIL':
    case 'GET_SAVE_SURVEY_REQ':
    case 'GET_SAVE_SURVEY_FAIL':
    case 'SEARCH_SURVEYS_REQ':
    case 'SEARCH_SURVEYS_FAIL':
      return state
    default:
      return state
  }
}

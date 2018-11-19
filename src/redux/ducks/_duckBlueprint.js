// BLUEPRINT TO BUILD YOUR OWN DUCK
// reducer, actions and epics are required to be exported
// tip: bind actions to target components

import api from 'api-folder'
import { actionTemplate } from './constants'
import { toastr } from 'react-redux-toastr'
import { reset } from 'redux-form'

import { ofType } from 'redux-observable'
import { map } from 'rxjs/operators'

// REDUX STORENAME
export const storeName = '_duckBlueptint'
export const storeFormName = '_duckBlueptintForm'

// ACTION CONFIGURATION
const ACTION = actionTemplate(storeName)

// REDUX TYPES
const INIT = ACTION('INIT')

const LOAD_REQ = ACTION('LOAD_REQ')

const LOAD_RES = ACTION('LOAD_RES')

const LOAD_FAIL = ACTION('LOAD_FAIL')

const CHANGE_TAB = ACTION('CHANGE_TAB')
const SHOW_CREATE_FORM = ACTION('SHOW_CREATE_FORM')

// CONSTANTS
const TABS = [
  {
    name: 'Все',
    id: 'total',
    count: undefined,
    disabled: 'loading...',
  },
  {
    name: 'Мои',
    id: 'created_by_me',
    count: undefined,
    disabled: 'loading...',
  },
]

const initialState = {
  tabs: {
    items: TABS,
    current: TABS[0].id,
  },
  loading: false,
}

// REDUCER
export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case INIT:
      return {
        ...initialState,
        loading: true,
      }
    case LOAD_RES:
      return loadResp(...arguments)
    default:
      return state
  }
}

// REDUX ACTIONS
export const actions = {
  // initiate topics on page load
  init: () => async dispatch => {
    await dispatch({ type: INIT })
  },
  // load actions
  load: params => async dispatch => {
    dispatch({ type: LOAD_REQ })

    try {
      const res = await api.something.all(params)
      dispatch({ type: LOAD_RES, payload: res.data })
    } catch (e) {
      toastr.error('Не удалось загрузить данные с сервера')
      dispatch({ type: LOAD_FAIL, payload: e })
    }
  },
  // specific actions
  changeTab: ({ id }) => ({ type: CHANGE_TAB, payload: { id } }),
  // form events
  submitForm: async (values, dispatch, props) => {
    // some logic here
    return { someData: 'onComplete' }
  },
  // show something
  showCreateForm: () => ({ type: SHOW_CREATE_FORM }),
}

// EPICS
export const epics = {
  simpleEpic: action$ => action$.pipe(ofType(CHANGE_TAB), map(() => actions.load())),
}

// SUPPORT FUNCTIONS
function loadResp(state, { payload }) {
  return { ...state }
}

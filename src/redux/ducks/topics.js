// Pattern for prettier run
// prettier --config ./.prettierrc  --write './src/redux/ducks/topics.js' && prettier --config ./.prettierrc  --write './src/containers/IntranetContainer/Discussion/**/*.{js,jsx}'

import api from 'api-folder'
import serialize from 'lib-folder/serialize'
import { actionTemplate } from './constants'
import { getDictionaryAccounts } from 'redux-folder/actions/dictionariesActions'
import { toastr } from 'react-redux-toastr'
import {
  get,
  nth,
  last,
  first,
  take,
  takeRight,
  uniqBy,
  compact,
  isEmpty,
  isUndefined,
  includes,
  reverse,
  findLast,
  filter as _filter,
} from 'lodash'
import { arrayPush, change, initialize, reset, destroy } from 'redux-form'

import { ofType } from 'redux-observable'
import { of, concat } from 'rxjs'
import { flatMap, mergeMap, map, debounceTime, filter, takeUntil, catchError } from 'rxjs/operators'
import moment from 'moment'

// REDUX STORENAME
export const storeName = 'topics'
export const storeFormName = 'discussionForm'
export const storeFormFieldName = 'EmployeeSkillForm'

// ACTION CONFIGURATION
const ACTION = actionTemplate(storeName)

// REDUX TYPES
const INIT = ACTION('INIT')

const LOAD_REQ = ACTION('LOAD_REQ')
const CREATE_REQ = ACTION('CREATE_REQ')
const UPDATE_REQ = ACTION('UPDATE_REQ')
const DELETE_REQ = ACTION('DELETE_REQ')
const CLOSE_REQ = ACTION('CLOSE_REQ')
const OPEN_REQ = ACTION('OPEN_REQ')
const JOIN_REQ = ACTION('JOIN_REQ')
const LEAVE_REQ = ACTION('LEAVE_REQ')
const FILTERS_PARAMS_REQ = ACTION('FILTERS_PARAMS_REQ')
const REQUEST_SOCKET_HANDSHAKE_KEY_REQ = ACTION('REQUEST_SOCKET_HANDSHAKE_KEY_REQ')
const ADD_TO_FAVORITE_REQ = ACTION('ADD_TO_FAVORITE_REQ')
const REMOVE_FROM_FAVORITE_REQ = ACTION('REMOVE_FROM_FAVORITE_REQ')
const LIKE_TOPIC_REQ = ACTION('LIKE_TOPIC_REQ')
const DISLIKE_TOPIC_REQ = ACTION('DISLIKE_TOPIC_REQ')
const LOAD_COMMENTS_REQ = ACTION('LOAD_COMMENTS_REQ')
const LOAD_UP_COMMENTS_REQ = ACTION('LOAD_UP_COMMENTS_REQ')
const LOAD_DOWN_COMMENTS_REQ = ACTION('LOAD_DOWN_COMMENTS_REQ')
const LOAD_COMMENTS_LAST_PAGE_REQ = ACTION('LOAD_COMMENTS_LAST_PAGE_REQ')
const MARK_AS_READ_COMMENTS_REQ = ACTION('MARK_AS_READ_COMMENTS_REQ')
const CREATE_COMMENT_REQ = ACTION('CREATE_COMMENT_REQ')
const UPDATE_COMMENT_REQ = ACTION('UPDATE_COMMENT_REQ')
const DELETE_COMMENT_REQ = ACTION('DELETE_COMMENT_REQ')
const LIKE_COMMENT_REQ = ACTION('LIKE_COMMENT_REQ')
const DISLIKE_COMMENT_REQ = ACTION('DISLIKE_COMMENT_REQ')
const COUNTERS_REQ = ACTION('COUNTERS_REQ')

const LOAD_RES = ACTION('LOAD_RES')
const CREATE_RES = ACTION('CREATE_RES')
const UPDATE_RES = ACTION('UPDATE_RES')
const DELETE_RES = ACTION('DELETE_RES')
const CLOSE_RES = ACTION('CLOSE_RES')
const OPEN_RES = ACTION('OPEN_RES')
const JOIN_RES = ACTION('JOIN_RES')
const LEAVE_RES = ACTION('LEAVE_RES')
const FILTERS_PARAMS_RES = ACTION('FILTERS_PARAMS_RES')
const REQUEST_SOCKET_HANDSHAKE_KEY_RES = ACTION('REQUEST_SOCKET_HANDSHAKE_KEY_RES')
const ADD_TO_FAVORITE_RES = ACTION('ADD_TO_FAVORITE_RES')
const REMOVE_FROM_FAVORITE_RES = ACTION('REMOVE_FROM_FAVORITE_RES')
const LIKE_TOPIC_RES = ACTION('LIKE_TOPIC_RES')
const DISLIKE_TOPIC_RES = ACTION('DISLIKE_TOPIC_RES')
const LOAD_COMMENTS_RES = ACTION('LOAD_COMMENTS_RES')
const LOAD_UP_COMMENTS_RES = ACTION('LOAD_UP_COMMENTS_RES')
const LOAD_DOWN_COMMENTS_RES = ACTION('LOAD_DOWN_COMMENTS_RES')
const LOAD_COMMENTS_LAST_PAGE_RES = ACTION('LOAD_COMMENTS_LAST_PAGE_RES')
const MARK_AS_READ_COMMENTS_RES = ACTION('MARK_AS_READ_COMMENTS_RES')
const CREATE_COMMENT_RES = ACTION('CREATE_COMMENT_RES')
const UPDATE_COMMENT_RES = ACTION('UPDATE_COMMENT_RES')
const DELETE_COMMENT_RES = ACTION('DELETE_COMMENT_RES')
const LIKE_COMMENT_RES = ACTION('LIKE_COMMENT_RES')
const DISLIKE_COMMENT_RES = ACTION('DISLIKE_COMMENT_RES')
const COUNTERS_RES = ACTION('COUNTERS_RES')

const LOAD_FAIL = ACTION('LOAD_FAIL')
const CREATE_FAIL = ACTION('CREATE_FAIL')
const UPDATE_FAIL = ACTION('UPDATE_FAIL')
const DELETE_FAIL = ACTION('DELETE_FAIL')
const CLOSE_FAIL = ACTION('CLOSE_FAIL')
const OPEN_FAIL = ACTION('OPEN_FAIL')
const JOIN_FAIL = ACTION('JOIN_FAIL')
const LEAVE_FAIL = ACTION('LEAVE_FAIL')
const FILTERS_PARAMS_FAIL = ACTION('FILTERS_PARAMS_FAIL')
const REQUEST_SOCKET_HANDSHAKE_KEY_FAIL = ACTION('REQUEST_SOCKET_HANDSHAKE_KEY_FAIL')
const ADD_TO_FAVORITE_FAIL = ACTION('ADD_TO_FAVORITE_FAIL')
const REMOVE_FROM_FAVORITE_FAIL = ACTION('REMOVE_FROM_FAVORITE_FAIL')
const LIKE_TOPIC_FAIL = ACTION('LIKE_TOPIC_FAIL')
const DISLIKE_TOPIC_FAIL = ACTION('DISLIKE_TOPIC_FAIL')
const LOAD_COMMENTS_FAIL = ACTION('LOAD_COMMENTS_FAIL')
const LOAD_UP_COMMENTS_FAIL = ACTION('LOAD_UP_COMMENTS_FAIL')
const LOAD_DOWN_COMMENTS_FAIL = ACTION('LOAD_DOWN_COMMENTS_FAIL')
const LOAD_COMMENTS_LAST_PAGE_FAIL = ACTION('LOAD_COMMENTS_LAST_PAGE_FAIL')
const MARK_AS_READ_COMMENTS_FAIL = ACTION('MARK_AS_READ_COMMENTS_FAIL')
const CREATE_COMMENT_FAIL = ACTION('CREATE_COMMENT_FAIL')
const UPDATE_COMMENT_FAIL = ACTION('UPDATE_COMMENT_FAIL')
const DELETE_COMMENT_FAIL = ACTION('DELETE_COMMENT_FAIL')
const LIKE_COMMENT_FAIL = ACTION('LIKE_COMMENT_FAIL')
const DISLIKE_COMMENT_FAIL = ACTION('DISLIKE_COMMENT_FAIL')
const COUNTERS_FAIL = ACTION('COUNTERS_FAIL')

const CHANGE_TAB = ACTION('CHANGE_TAB')
const SHOW_CREATE_FORM = ACTION('SHOW_CREATE_FORM')
const SHOW_EDIT_FORM = ACTION('SHOW_EDIT_FORM')
const SHOW_CARD = ACTION('SHOW_CARD')
const SHOW_MEMBERS = ACTION('SHOW_MEMBERS')
const TOGGLE_FILTERS = ACTION('TOGGLE_FILTERS')
const CHAGE_FILTER_PARAM = ACTION('CHAGE_FILTER_PARAM')
const CLOSE_ALL = ACTION('CLOSE_ALL')
const TOGGLE_CARD_ADDITIONAL_INFO = ACTION('TOGGLE_CARD_ADDITIONAL_INFO')
const UNREADED_COMMENT_BECOME_VISIBLE = ACTION('UNREADED_COMMENT_BECOME_VISIBLE')
const SET_NEXT_COMMENTS_DOWN_PAGE = ACTION('SET_NEXT_COMMENTS_DOWN_PAGE')
const SET_UP = ACTION('SET_UP')
const SET_FOREIGN_ENTITY = ACTION('SET_FOREIGN_ENTITY')
const SET_API_ADAPTER = ACTION('SET_API_ADAPTER')

const MESSAGE_FROM_WEBSOCKET_RECIEVED = ACTION('MESSAGE_FROM_WEBSOCKET_RECIEVED')
const ESTABLISHING_WEBSOCKET_CONNECTION = ACTION('ESTABLISHING_WEBSOCKET_CONNECTION')
const WEBSOCET_CONNECTION_FAILED = ACTION('WEBSOCET_CONNECTION_FAILED')

// CONSTANTS
const authorFilter = [
  {
    text: 'Любой',
    value: 'Any',
    name: 'any',
  },
]

const categoryFilter = [
  {
    text: 'Любая',
    value: 'Any',
    name: 'any',
  },
]

const dateFilter = [
  {
    text: 'Любая',
    value: 'Any',
    name: 'any',
  },
  {
    text: 'Час',
    value: `${moment()
      .subtract(1, 'hour')
      .format('YYYY-MM-DDTHH:mm')}`,
    name: 'hour',
  },
  {
    text: '5 часов',
    value: `${moment()
      .subtract(5, 'hours')
      .format('YYYY-MM-DDTHH:mm')}`,
    name: '5_hours',
  },
  {
    text: 'День',
    value: `${moment()
      .subtract(1, 'day')
      .format('YYYY-MM-DDTHH:mm')}`,
    name: 'day',
  },
  {
    text: 'Неделя',
    value: `${moment()
      .subtract(1, 'week')
      .format('YYYY-MM-DDTHH:mm')}`,
    name: 'week',
  },
]

const stateFilter = [
  {
    text: 'Любое',
    value: 'Any',
    name: 'any',
  },
  {
    text: 'Открытые',
    value: 'opened',
    name: 'opened',
  },
  {
    text: 'Закрытые',
    value: 'closed',
    name: 'closed',
  },
]

const typeFilter = [
  {
    text: 'Любые',
    value: 'Any',
    name: 'any',
  },
  {
    text: 'Непрочитанные',
    value: '1',
    name: 'unreaded',
  },
  {
    text: 'Прочитанные',
    value: '0',
    name: 'readed',
  },
]

const TABLE_HEADERS = [
  {
    id: 'empty',
    name: '',
  },
  {
    id: 'name',
    name: 'Название обсуждения',
  },
  {
    id: 'author',
    name: 'Автор',
  },
]

const TABS = [
  {
    name: 'Активные',
    id: 'active',
    count: undefined,
    disabled: 'loading...',
  },
  {
    name: 'Доступные',
    id: 'available',
    count: undefined,
    disabled: 'loading...',
  },
  {
    name: 'Избранные',
    id: 'favorites',
    count: undefined,
    disabled: 'loading...',
  },
]

export const humanizedCategoryName = {
  Discussion: 'Диалоги',
  Survey: 'Опросы',
  Event: 'События',
  Project: 'Проекты',
  MailingList: 'Команды',
  Bid: 'Заявки',
  Task: 'Задачи',
  Vacancy: 'Вакансии',
}

const initialState = {
  apiAdapter: api.discussion,
  foreignEntity: false,
  nextDiscussionPage: {
    page: 1,
    per_page: 15,
    scope: TABS[0].id,
  },
  loading: false,
  discussions: [],
  discussionsTriggerid: undefined,
  activeDiscussion: {},
  activeEntity: undefined, // undefined, Card, Form, Members
  nextCommentsUpPage: {
    page: 1,
    per_page: 15,
  },
  nextCommentsDownPage: {
    page: 1,
    per_page: 15,
  },
  commentsTopTriggerId: undefined,
  commentsBottomTriggerId: undefined,
  currentCommentPage: 1,
  loadingUpComments: false,
  loadingDownComments: false,
  comments: [],
  tabs: {
    items: TABS,
    discussionsCount: '',
    current: TABS[0].id,
  },
  select: {
    items: [],
    showMenu: false,
  },
  card: {
    showAdditionalInfo: false,
    showInput: false,
    showContextMenu: false,
  },
  selectOptions: {
    authorFilter,
    categoryFilter,
    dateFilter,
    stateFilter,
    typeFilter,
  },
  filter: {
    show: false,
    params: {
      q: undefined,
      unread: undefined,
      author_id: undefined,
      discussable_type: undefined,
      created_at: undefined,
      state: undefined,
    },
  },
  searchCount: undefined,
  tableHeaders: TABLE_HEADERS,
}

// REDUCER
export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case INIT:
      return {
        ...initialState,
        loading: true,
      }
    case SET_UP:
      return {
        ...state,
        ...action.payload,
      }
    case SET_FOREIGN_ENTITY:
      return {
        ...state,
        foreignEntity: action.payload,
      }
    case SET_API_ADAPTER:
      return {
        ...state,
        apiAdapter: action.payload,
      }
    case LOAD_RES:
      return loadAllResp(...arguments)
    case LOAD_COMMENTS_RES:
      return loadCommentsResp(...arguments)
    case LOAD_UP_COMMENTS_RES:
      return loadUpCommentsResp(...arguments)
    case LOAD_DOWN_COMMENTS_RES:
      return loadDownCommentsResp(...arguments)
    case LOAD_COMMENTS_LAST_PAGE_RES:
      return loadCommentsLastPageResp(...arguments)
    case UPDATE_RES:
      return updateResp(...arguments)
    case CREATE_RES:
      return createResp(...arguments)
    case DELETE_RES:
      return deleteResp(...arguments)
    case CLOSE_RES:
      return toggleState('closed', ...arguments)
    case OPEN_RES:
      return toggleState('opened', ...arguments)
    case JOIN_RES:
    case LEAVE_RES:
      return toggleStatus(...arguments)
    case FILTERS_PARAMS_RES:
      return writeFilterParams(...arguments)
    case ADD_TO_FAVORITE_RES:
      return addToFavorites(...arguments)
    case REMOVE_FROM_FAVORITE_RES:
      return removeFromFavorites(...arguments)
    case LIKE_TOPIC_RES:
      return likeTopic(...arguments)
    case DISLIKE_TOPIC_RES:
      return dislikeTopic(...arguments)
    case CREATE_COMMENT_REQ:
      return createCommentReq(...arguments)
    case CREATE_COMMENT_RES:
      return createComment(...arguments)
    case UPDATE_COMMENT_RES:
      return updateComment(...arguments)
    case DELETE_COMMENT_RES:
      return deleteComment(...arguments)
    case CHANGE_TAB:
      return changeTab(...arguments)
    case SHOW_CARD:
      return showCard(...arguments)
    case SHOW_MEMBERS:
      return showMembers(...arguments)
    case LIKE_COMMENT_RES:
      return likeComment(...arguments)
    case DISLIKE_COMMENT_RES:
      return dislikeComment(...arguments)
    case COUNTERS_RES:
      return updateCounters(...arguments)
    case MESSAGE_FROM_WEBSOCKET_RECIEVED:
      return webSocketMessageRecieved(...arguments)
    case SET_NEXT_COMMENTS_DOWN_PAGE:
      return {
        ...state,
        nextCommentsDownPage: action.payload,
      }
    case SHOW_CREATE_FORM:
      return {
        ...state,
        activeDiscussion: initialState.activeDiscussion,
        activeEntity: 'Form',
      }
    case SHOW_EDIT_FORM:
      return {
        ...state,
        activeDiscussion: action.payload,
        activeEntity: 'Form',
      }
    case TOGGLE_FILTERS:
      return {
        ...state,
        filter: {
          ...state.filter,
          show: !state.filter.show,
        },
      }
    case CHAGE_FILTER_PARAM:
      return {
        ...state,
        nextDiscussionPage: {
          ...initialState.nextDiscussionPage,
          scope: state.tabs.current,
        },
        discussions: initialState.discussions,
        filter: {
          ...state.filter,
          params: {
            ...state.filter.params,
            ...action.payload,
          },
        },
      }
    case CLOSE_ALL:
      return {
        ...state,
        activeDiscussion: initialState.activeDiscussion,
        activeEntity: initialState.activeEntity,
        comments: initialState.comments,
      }
    case TOGGLE_CARD_ADDITIONAL_INFO:
      return {
        ...state,
        card: {
          ...state.card,
          showAdditionalInfo: !state.card.showAdditionalInfo,
        },
      }
    case MARK_AS_READ_COMMENTS_RES:
      return markAsRead(...arguments)
    case LOAD_UP_COMMENTS_REQ:
      return {
        ...state,
        loadingUpComments: true,
      }
    case LOAD_DOWN_COMMENTS_REQ:
    case LOAD_COMMENTS_LAST_PAGE_REQ:
    case LOAD_COMMENTS_REQ:
      return {
        ...state,
        loadingDownComments: true,
      }
    case LOAD_REQ:
      return {
        ...state,
        loading: true,
      }
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}

// REDUX ACTIONS
export const actions = {
  // initiate topics on page load
  initTopics: () => async (dispatch, gState) => {
    const { enabledComponents = {} } = gState().system
    if (!enabledComponents.shr_discussions) return
    await dispatch({ type: INIT })
    const pathname = get(gState(), 'router.location.pathname')
    await dispatch({ type: SET_UP, payload: selectEntity(pathname) })
    // TODO: show loading or disable button
    dispatch(actions.loadFilters())
    if (get(gState(), 'dictionaries.accounts.length', 0) === 0)
      await dispatch(getDictionaryAccounts())
    await dispatch(actions.loadTopics())
  },
  // load actions
  loadTopics: () => async (dispatch, gState) => {
    dispatch({ type: LOAD_REQ })

    try {
      const {
        apiAdapter,
        foreignEntity,
        nextDiscussionPage,
        filter: { params },
      } = gState()[storeName]
      const res =
        foreignEntity && !isUndefined(foreignEntity.id)
          ? await apiAdapter.all(foreignEntity.id, { ...params, ...nextDiscussionPage })
          : await apiAdapter.all({ ...params, ...nextDiscussionPage })
      dispatch({ type: LOAD_RES, payload: res.data })
    } catch (e) {
      toastr.error('Не удалось загрузить данные с сервера')
      dispatch({ type: LOAD_FAIL, payload: e })
    }
  },
  loadFilters: () => async (dispatch, gState) => {
    dispatch({ type: FILTERS_PARAMS_REQ })

    try {
      const res = await api.discussion.filters()
      dispatch({ type: FILTERS_PARAMS_RES, payload: res.data })
    } catch (e) {
      toastr.error('Не удалось загрузить данные по конфигурации фильтров с сервера')
      dispatch({ type: FILTERS_PARAMS_FAIL, payload: e })
    }
  },
  loadCounters: () => async (dispatch, gState) => {
    if (gState()[storeName].foreignEntity) return false
    dispatch({ type: COUNTERS_REQ })

    try {
      const res = await api.discussion.counters()
      dispatch({ type: COUNTERS_RES, payload: res.data })
    } catch (e) {
      toastr.error('Не удалось загрузить данные по счетчикам табов с сервера')
      dispatch({ type: COUNTERS_FAIL, payload: e })
    }
  },
  initSocketConnection: () => async (dispatch, gState) => {
    const { enabledComponents = {} } = gState().system
    if (!enabledComponents.shr_discussions) return

    dispatch({ type: REQUEST_SOCKET_HANDSHAKE_KEY_REQ })

    try {
      const res = await api.requestSocketHandshakeKey()
      const ticket = get(res, 'headers.x-ws-ticket', undefined)
      if (res.data.success && ticket) {
        dispatch({ type: REQUEST_SOCKET_HANDSHAKE_KEY_RES, payload: ticket })
      } else {
        throw `real time connection error`
      }
    } catch (e) {
      dispatch({ type: REQUEST_SOCKET_HANDSHAKE_KEY_FAIL, payload: e })
    }
  },
  createTopic: topic => async (dispatch, gState) => {
    dispatch({ type: CREATE_REQ })

    try {
      const { apiAdapter, foreignEntity } = gState()[storeName]
      const res =
        foreignEntity && !isUndefined(foreignEntity.id)
          ? await apiAdapter.create(foreignEntity.id, topic)
          : await apiAdapter.create(topic)
      if (isUndefined(res.data.errors)) {
        await dispatch({ type: CREATE_RES, payload: res.data })
        dispatch(actions.loadTopics())
      } else {
        throw res.data.errors
      }
    } catch (e) {
      toastr.error('Не удалось создать обсуждение из-за ошибки на сервере, попробуйте чуть позже')
      dispatch({ type: CREATE_FAIL, payload: e })
    }
  },
  updateTopic: (id, topic) => async (dispatch, gState) => {
    dispatch({ type: UPDATE_REQ })

    try {
      const res = await api.discussion.update(id, topic)
      if (isUndefined(res.data.errors)) {
        await dispatch({ type: UPDATE_RES, payload: res.data })
        await dispatch(actions.loadComments())
      } else {
        throw res.data.errors
      }
    } catch (e) {
      toastr.error('Не удалось обновить обсуждение из-за ошибки на сервере, попробуйте чуть позже')
      dispatch({ type: UPDATE_FAIL, payload: e })
    }
  },
  deleteTopics: topicIds => async dispatch => {
    if (!window.confirm('Вы уверены, что хотите удалить топик?')) return
    dispatch({ type: DELETE_REQ })

    try {
      const res = await api.discussion.delete(topicIds)
      if (isUndefined(res.data.errors)) {
        dispatch({ type: DELETE_RES, payload: res.data, topicIds })
      } else {
        throw res.data.errors
      }
    } catch (e) {
      toastr.error('Не удалось удалить обсуждение из-за ошибки на сервере, попробуйте чуть позже')
      dispatch({ type: DELETE_FAIL, payload: e })
    }
  },
  closeTopics: topicIds => async dispatch => {
    if (!window.confirm('Вы уверены, что хотите закрыть топик?')) return
    dispatch({ type: CLOSE_REQ })

    try {
      const res = await api.discussion.close(topicIds)
      if (isUndefined(res.data.errors)) {
        dispatch({ type: CLOSE_RES, payload: topicIds, data: res.data })
      } else {
        throw res.data.errors
      }
    } catch (e) {
      toastr.error('Не удалось закрыть обсуждение из-за ошибки на сервере, попробуйте чуть позже')
      dispatch({ type: CLOSE_FAIL, payload: e })
    }
  },
  openTopics: topicIds => async dispatch => {
    if (!window.confirm('Вы уверены, что хотите открыть топик?')) return
    dispatch({ type: OPEN_REQ })

    try {
      const res = await api.discussion.open(topicIds)
      if (isUndefined(res.data.errors)) {
        dispatch({ type: OPEN_RES, payload: topicIds, data: res.data })
      } else {
        throw res.data.errors
      }
    } catch (e) {
      toastr.error('Не удалось открыть обсуждение из-за ошибки на сервере, попробуйте чуть позже')
      dispatch({ type: OPEN_FAIL, payload: e })
    }
  },
  joinTopic: topicId => async dispatch => {
    dispatch({ type: JOIN_REQ })

    try {
      const res = await api.discussion.join(topicId)
      if (isUndefined(res.data.error)) {
        await dispatch({ type: JOIN_RES, payload: res.data })
        await dispatch(actions.loadTopics())
        await dispatch(actions.loadComments())
      } else {
        throw res.data.errors
      }
    } catch (e) {
      toastr.error('Не удалось из-за ошибки на сервере, попробуйте чуть позже')
      dispatch({ type: JOIN_FAIL, payload: e })
    }
  },
  leaveTopic: topicId => async dispatch => {
    if (!window.confirm('Вы уверены, что хотите покинуть топик?')) return
    dispatch({ type: LEAVE_REQ })

    try {
      const res = await api.discussion.leave(topicId)
      if (isUndefined(res.data.error)) {
        dispatch({ type: LEAVE_RES, payload: res.data })
      } else {
        throw res.data.errors
      }
    } catch (e) {
      toastr.error('Не удалось из-за ошибки на сервере, попробуйте чуть позже')
      dispatch({ type: LEAVE_FAIL, payload: e })
    }
  },
  addToFavorites: ids => async (dispatch, gState) => {
    dispatch({ type: ADD_TO_FAVORITE_REQ })

    try {
      const res = await api.discussion.favorites.add(ids)
      if (res.data.success) {
        dispatch({ type: ADD_TO_FAVORITE_RES, payload: ids })
      } else {
        toastr.error('Не удалось добавить в избранное')
        dispatch({ type: ADD_TO_FAVORITE_FAIL, payload: 'Не удалось добавить в избранное' })
      }
    } catch (e) {
      toastr.error('Не удалось добавить в избранное')
      dispatch({ type: ADD_TO_FAVORITE_FAIL, payload: e })
    }
  },
  removeFromFavorites: ids => async (dispatch, gState) => {
    dispatch({ type: REMOVE_FROM_FAVORITE_REQ })

    try {
      const res = await api.discussion.favorites.remove(ids)
      if (res.data.success) {
        dispatch({ type: REMOVE_FROM_FAVORITE_RES, payload: ids })
      } else {
        toastr.error('Не удалось удалить из избранного')
        dispatch({ type: REMOVE_FROM_FAVORITE_FAIL, payload: 'Не удалось удалить из избранного' })
      }
    } catch (e) {
      toastr.error('Не удалось добавить в избранное')
      dispatch({ type: REMOVE_FROM_FAVORITE_FAIL, payload: e })
    }
  },
  likeTopic: id => async (dispatch, gState) => {
    dispatch({ type: LIKE_TOPIC_REQ })

    try {
      const res = await api.discussion.like(id)
      if (res.data.success) {
        dispatch({ type: LIKE_TOPIC_RES, payload: id })
      } else {
        toastr.warning(res.data.message)
        dispatch({ type: LIKE_TOPIC_FAIL, payload: res.data.message })
      }
    } catch (e) {
      toastr.error('Ошибка, на сервере! Не удалось поставить лайк')
      dispatch({ type: LIKE_TOPIC_FAIL, payload: e })
    }
  },
  dislikeTopic: id => async (dispatch, gState) => {
    dispatch({ type: DISLIKE_TOPIC_REQ })

    try {
      const res = await api.discussion.dislike(id)
      if (res.data.success) {
        dispatch({ type: DISLIKE_TOPIC_RES, payload: id })
      } else {
        toastr.warning(res.data.message)
        dispatch({ type: DISLIKE_TOPIC_FAIL, payload: res.data.message })
      }
    } catch (e) {
      toastr.error('Ошибка, на сервере! Не удалось убрать лайк')
      dispatch({ type: DISLIKE_TOPIC_FAIL, payload: e })
    }
  },
  // comments actions
  loadComments: () => async (dispatch, gState) => {
    dispatch({ type: LOAD_COMMENTS_REQ })

    try {
      const {
        activeDiscussion: { id },
      } = gState()[storeName]
      const res = await api.discussion.comment.all(id, {})
      dispatch({ type: LOAD_COMMENTS_RES, payload: res.data })
      if (res.data.comments.length === 0) dispatch(actions.markAsRead(id, 0))
    } catch (e) {
      toastr.error('Не удалось загрузить данные с сервера')
      dispatch({ type: LOAD_COMMENTS_FAIL, payload: e })
    }
  },
  loadUpComments: () => async (dispatch, gState) => {
    dispatch({ type: LOAD_UP_COMMENTS_REQ })

    try {
      const {
        nextCommentsUpPage,
        activeDiscussion: { id },
      } = gState()[storeName]
      const res = await api.discussion.comment.all(id, nextCommentsUpPage)
      dispatch({ type: LOAD_UP_COMMENTS_RES, payload: res.data })
    } catch (e) {
      toastr.error('Не удалось загрузить данные с сервера')
      dispatch({ type: LOAD_UP_COMMENTS_FAIL, payload: e })
    }
  },
  loadDownComments: () => async (dispatch, gState) => {
    dispatch({ type: LOAD_DOWN_COMMENTS_REQ })

    try {
      const {
        nextCommentsDownPage,
        activeDiscussion: { id },
      } = gState()[storeName]
      const res = await api.discussion.comment.all(id, nextCommentsDownPage)
      await dispatch({ type: LOAD_DOWN_COMMENTS_RES, payload: res.data })
    } catch (e) {
      toastr.error('Не удалось загрузить данные с сервера')
      dispatch({ type: LOAD_DOWN_COMMENTS_FAIL, payload: e })
    }
  },
  loadCommentsLastPage: callback => async (dispatch, gState) => {
    dispatch({ type: LOAD_COMMENTS_LAST_PAGE_REQ })

    try {
      const {
        activeDiscussion: { id },
      } = gState()[storeName]
      const res = await api.discussion.comment.all(id, { last: true })
      await dispatch({ type: LOAD_COMMENTS_LAST_PAGE_RES, payload: res.data })
      if (gState()[storeName].nextCommentsUpPage) await dispatch(actions.loadUpComments())
      await callback()
    } catch (e) {
      toastr.error('Не удалось загрузить данные с сервера')
      dispatch({ type: LOAD_COMMENTS_LAST_PAGE_FAIL, payload: e })
    }
  },
  createComment: (activeDiscussionId, comment) => async (dispatch, gState) => {
    const { user } = gState()
    const stamp = `tmp-${(Date.now() / 1000) | 0}`
    const tmpComment = {
      id: stamp,
      account: { ...user },
      account_id: user.id,
      created_at: new Date(),
      read: true,
      service: false,
      can_delete: false,
      can_edit: false,
      already_liked: false,
      likes_count: 0,
      body: comment.comment.body,
      documents: comment.comment.documents_attributes,
      photos: comment.comment.photos_attributes,
      tmp: true,
    }
    await dispatch({ type: CREATE_COMMENT_REQ, payload: { comment: tmpComment } })

    const { nextCommentsDownPage } = gState()[storeName]
    if (!nextCommentsDownPage) {
      const comments = document.querySelectorAll(`.discussion-comments__item`)
      comments.length > 0 && last(comments).scrollIntoView()
    }
    try {
      const res = await api.discussion.comment.create(activeDiscussionId, comment)
      if (isUndefined(res.data.errors)) {
        await dispatch(actions.destroyForm())
        await dispatch({ type: CREATE_COMMENT_RES, payload: { ...res.data, stamp } })

        if (nextCommentsDownPage)
          await dispatch(
            actions.loadCommentsLastPage(() => {
              const unreadedComments = document.querySelectorAll(`.discussion-comments__item`)
              unreadedComments.length > 0 && last(unreadedComments).scrollIntoView()
            })
          )
        document.querySelector(`.discussion-card__write-a-comment input`).focus()
      } else {
        throw res.data.errors
      }
    } catch (e) {
      toastr.error('Не удалось создать комментарий из-за ошибки на сервере, попробуйте чуть позже')
      dispatch({ type: CREATE_COMMENT_FAIL, payload: e })
    }
  },
  updateComment: (activeDiscussionId, commentId, comment) => async (dispatch, gState) => {
    dispatch({ type: UPDATE_COMMENT_REQ })
    try {
      const res = await api.discussion.comment.update(activeDiscussionId, commentId, comment)
      if (isUndefined(res.data.errors)) {
        await dispatch(actions.destroyForm())
        await dispatch({ type: UPDATE_COMMENT_RES, payload: res.data })
        document.querySelector(`.discussion-card__write-a-comment input`).focus()
      } else {
        throw res.data.errors
      }
    } catch (e) {
      toastr.error('Не удалось обновить комментарий из-за ошибки на сервере, попробуйте чуть позже')
      dispatch({ type: UPDATE_COMMENT_FAIL, payload: e })
    }
  },
  deleteComment: id => async (dispatch, gState) => {
    if (!window.confirm('Вы уверены, что хотите удалить комментарий?')) return
    dispatch({ type: DELETE_COMMENT_REQ })
    try {
      const { activeDiscussion } = gState()[storeName]
      const res = await api.discussion.comment.delete(activeDiscussion.id, id)
      if (isUndefined(res.data.errors)) {
        dispatch({ type: DELETE_COMMENT_RES, payload: res.data.comment })
      } else {
        throw res.data.errors
      }
    } catch (e) {
      toastr.error('Не удалось удалить комментарий из-за ошибки на сервере, попробуйте чуть позже')
      dispatch({ type: DELETE_COMMENT_FAIL, payload: e })
    }
  },
  editComment: id => async (dispatch, gState) => {
    const { body = '', photos = [], documents = [] } =
      gState()[storeName].comments.find(it => it.id === id) || {}
    const attachment = [
      ...photos.map(({ id, name, file: { url } }) => ({
        id,
        name,
        url,
        type: 'photos_attributes',
      })),
      ...documents.map(({ id, name, file: { url } }) => ({
        id,
        name,
        url,
        type: 'documents_attributes',
      })),
    ]
    dispatch(
      initialize(storeFormName, {
        id,
        body,
        attachment,
      })
    )
  },
  markAsRead: (topicId, commentId) => async (dispatch, gState) => {
    dispatch({ type: MARK_AS_READ_COMMENTS_REQ })

    try {
      const res = await api.discussion.comment.markAsRead(topicId, commentId)
      if (res.data.success) {
        dispatch({
          type: MARK_AS_READ_COMMENTS_RES,
          payload: { commentId, unread_count: res.data.unread_count },
        })
      } else {
        throw 'Не удалось загрузить данные на сервер'
      }
    } catch (e) {
      toastr.error('Не удалось загрузить данные на сервер')
      dispatch({ type: MARK_AS_READ_COMMENTS_FAIL, payload: e })
    }
  },
  likeComment: id => async (dispatch, gState) => {
    dispatch({ type: LIKE_COMMENT_REQ })

    try {
      const { activeDiscussion } = gState()[storeName]
      const res = await api.discussion.comment.like(activeDiscussion.id, id)
      if (res.data.success) {
        dispatch({ type: LIKE_COMMENT_RES, payload: id })
      } else {
        toastr.warning(res.data.message)
        dispatch({ type: LIKE_COMMENT_FAIL, payload: res.data.message })
      }
    } catch (e) {
      toastr.error('Ошибка, на сервере! Не удалось поставить лайк')
      dispatch({ type: LIKE_COMMENT_FAIL, payload: e })
    }
  },
  dislikeComment: id => async (dispatch, gState) => {
    dispatch({ type: DISLIKE_COMMENT_REQ })

    try {
      const { activeDiscussion } = gState()[storeName]
      const res = await api.discussion.comment.dislike(activeDiscussion.id, id)
      if (res.data.success) {
        dispatch({ type: DISLIKE_COMMENT_RES, payload: id })
      } else {
        toastr.warning(res.data.message)
        dispatch({ type: DISLIKE_COMMENT_FAIL, payload: res.data.message })
      }
    } catch (e) {
      toastr.error('Ошибка, на сервере! Не удалось убрать лайк')
      dispatch({ type: DISLIKE_COMMENT_FAIL, payload: e })
    }
  },
  // specific actions
  changeFilterParam: param => ({ type: CHAGE_FILTER_PARAM, payload: param }),
  changeTab: ({ id }) => (dispatch, gState) => dispatch({ type: CHANGE_TAB, payload: { id } }),
  unreadedCommentBecomeVisible: params => ({
    type: UNREADED_COMMENT_BECOME_VISIBLE,
    payload: params,
  }),
  // form events
  pushNewEmployee: employee => dispatch => {
    dispatch(arrayPush(storeFormName, 'discussers', employee))
    dispatch(change(storeFormName, 'members', ''))
  },
  pushNewEmployeeSkill: () => dispatch => {
    dispatch(change(storeFormFieldName, 'skills', ''))
  },
  submitForm: async (values, dispatch, props) => {
    const { activeDiscussion } = props
    const { name, body, attachment = [], discussers = [], available_to_all = false } = values
    const reqData = {
      discussion: {
        name,
        body,
        available_to_all,
        discussers_attributes: discussers.map(it => ({
          id: it.record_id,
          account_id: it.id,
          _destroy: it._destroy,
        })),
        photos_attributes: attachment
          .filter(it => it.type === 'photos_attributes')
          .map(it => ({ ...it, type: undefined })),
        documents_attributes: attachment
          .filter(it => it.type === 'documents_attributes')
          .map(it => ({ ...it, type: undefined })),
      },
    }
    await dispatch(reset(storeFormName))
    await dispatch(destroy(storeFormName))
    if (activeDiscussion.id) {
      await dispatch(actions.updateTopic(activeDiscussion.id, reqData))
    } else {
      await dispatch(actions.createTopic(reqData))
    }
    return reqData
  },
  submitCommentForm: async (values, dispatch, props) => {
    await dispatch(reset(storeFormName))
    const { activeDiscussion } = props
    const { id = undefined, body, attachment = [] } = values
    const reqData = {
      comment: {
        id,
        body,
        photos_attributes: attachment
          .filter(it => it.type === 'photos_attributes')
          .map(it => ({ ...it, type: undefined })),
        documents_attributes: attachment
          .filter(it => it.type === 'documents_attributes')
          .map(it => ({ ...it, type: undefined })),
      },
    }
    if (id) {
      await dispatch(actions.updateComment(activeDiscussion.id, id, reqData))
    } else {
      await dispatch(actions.createComment(activeDiscussion.id, reqData))
    }
    return reqData
  },
  destroyForm: () => destroy(storeFormName),
  // show something
  editLastComment: () => async (dispatch, gState) => {
    if (get(gState(), `form.${storeFormName}.values.id`, undefined) || get(gState(), `form.${storeFormName}.values.body`, '') !== '') return false
    const { comments } = gState()[storeName]
    const { user } = gState()
    const lastComment = findLast(comments, {'account_id': user.id})
    await dispatch(actions.editComment(lastComment.id))
    return true
  },
  toggleFilters: topic => ({ type: TOGGLE_FILTERS }),
  toggleCardAdditionalInfo: () => ({ type: TOGGLE_CARD_ADDITIONAL_INFO }),
  showCard: topic => async dispatch => {
    await dispatch({ type: SHOW_CARD, payload: topic })
    document.querySelector(`.discussion-card__write-a-comment input`).focus()
  },
  showMembers: topic => ({ type: SHOW_MEMBERS, payload: topic }),
  showCreateForm: () => dispatch => {
    dispatch({ type: SHOW_CREATE_FORM })
    dispatch(reset(storeFormName))
  },
  showEditForm: topic => ({ type: SHOW_EDIT_FORM, payload: topic }),
  closeAll: () => ({ type: CLOSE_ALL }),
}

// EPICS
export const epics = {
  initOnLocationEnter: action$ =>
    action$.pipe(
      ofType('@@router/LOCATION_CHANGE'),
      filter(action => {
        if (get(action, 'payload.pathname') === '/discussion') return true
        return false
      }),
      map(() => actions.initTopics())
    ),
  loadOnTabChange: action$ =>
    action$.pipe(
      ofType(CHANGE_TAB),
      map(() => actions.loadTopics())
    ),
  changeFilterParam: action$ =>
    action$.pipe(
      ofType(CHAGE_FILTER_PARAM),
      debounceTime(400),
      map(() => actions.loadTopics())
    ),
  loadCounters: action$ =>
    action$.pipe(
      ofType(DELETE_RES),
      map(() => actions.loadCounters())
    ),
  pushNewEmployee: action$ =>
    action$.pipe(
      ofType('@@redux-form/CHANGE'),
      filter(action => {
        if (
          action.meta.form === storeFormName &&
          action.meta.field === 'members' &&
          get(action, 'payload.employee.id', false)
        )
          return true
        return false
      }),
      map(action => actions.pushNewEmployee(action.payload.employee))
    ),
  pushNewEmployeeSkill: action$ =>
    action$.pipe(
      ofType('@@redux-form/CHANGE'),
      filter(action => {
        if (
          action.meta.form === storeFormFieldName &&
          action.meta.field === 'skills' &&
          get(action, 'payload', false)
        )
          return true
        return false
      }),
      map(() => actions.pushNewEmployeeSkill())
    ),
  loadCommentsOnCardShow: (action$, store) =>
    action$.pipe(
      ofType(SHOW_CARD),
      flatMap(action => concat(of(actions.destroyForm()), of(actions.loadComments())))
    ),
  loadCommentsUpCommentsOnStart: (action$, store) =>
    action$.pipe(
      ofType(LOAD_COMMENTS_RES),
      filter(action => {
        if (get(store, `value[${storeName}].nextCommentsUpPage`, false)) return true
        return false
      }),
      map(() => actions.loadUpComments())
    ),
  markAsRead: action$ =>
    action$.pipe(
      ofType(UNREADED_COMMENT_BECOME_VISIBLE),
      debounceTime(400),
      map(action => actions.markAsRead(...action.payload))
    ),
  establishWebSocketConnection: (action$, store, { webSocket }) =>
    action$.pipe(
      ofType(REQUEST_SOCKET_HANDSHAKE_KEY_RES),
      flatMap(action =>
        concat(
          of({ type: ESTABLISHING_WEBSOCKET_CONNECTION }),
          webSocket(
            `${process.env.WEBSOCKET_HOST || 'ws://ws.dev.shr.phoenixit.ru/ws'}${serialize({
              token: action.payload,
            })}`
          ).pipe(
            mergeMap(payload =>
              of({
                type: MESSAGE_FROM_WEBSOCKET_RECIEVED,
                payload,
                gState: store.value,
              })
            ),
            catchError(error =>
              of({
                type: WEBSOCET_CONNECTION_FAILED,
                payload: error,
                error: true,
              })
            )
          )
        )
      )
    ),
}

// SUPPORT FUNCTIONS
function loadAllResp(state, { payload }) {
  const tabs = TABS.map(it => ({
    ...it,
    disabled: undefined,
    count: payload[`${it.id}_count`],
  }))

  const nextDiscussionPage =
    payload.discussions.length < state.nextDiscussionPage.per_page
      ? undefined
      : {
          ...state.nextDiscussionPage,
          page: state.nextDiscussionPage.page + 1,
        }
  const newDiscussions = _filter(payload.discussions, { status: state.tabs.current })
  const discussions = [...state.discussions, ...newDiscussions]
  return {
    ...state,
    searchCount: payload.search_count,
    loading: false,
    nextDiscussionPage,
    selectOptions: {
      ...state.selectOptions,
      authorFilter: addNewAuthors(...arguments),
    },
    discussionsTriggerid: get(first(takeRight(discussions, 3)), 'id'),
    discussions,
    tabs: {
      ...state.tabs,
      discussionsCount: tabs.reduce(countDiscussions, 0),
      items: tabs,
    },
  }

  function addNewAuthors(state, { payload: { discussions } }) {
    const authorFilter = [...state.selectOptions.authorFilter]
    discussions.map(({ author }) => {
      if (isUndefined(author)) return 'no author found'
      const { id, full_name } = author
      authorFilter.push({
        text: full_name,
        value: `${id}`,
        name: `author-${id}`,
      })
    })
    return uniqBy(authorFilter, 'value')
  }
}

function createResp(state, { payload }) {
  const tabsItems = state.tabs.items.map(it =>
    'active' === it.id
      ? {
          ...it,
          count: it.count + 1,
        }
      : it
  )
  return {
    ...initialState,
    apiAdapter: state.apiAdapter,
    foreignEntity: state.foreignEntity,
    selectOptions: state.selectOptions,
    nextDiscussionPage: {
      ...initialState.nextDiscussionPage,
      scope: 'active',
    },
    tabs: {
      ...state.tabs,
      discussionsCount: tabsItems.reduce(countDiscussions, 0),
      items: tabsItems,
      current: 'active',
    },
    discussions: initialState.discussions,
    activeDiscussion: payload,
    activeEntity: 'Card',
    comments: initialState.comments,
  }
}

function updateResp(state, { payload }) {
  const discussions = [...state.discussions]
  const objIndex = discussions.findIndex(obj => obj.id === payload.id)
  if (objIndex !== -1) discussions[objIndex] = payload

  return {
    ...state,
    discussions,
    activeDiscussion: payload,
    activeEntity: 'Card',
    comments: initialState.comments,
  }
}

function deleteResp(state, { payload, topicIds }) {
  const tabsItems = state.tabs.items.map(it =>
    state.tabs.current === it.id
      ? {
          ...it,
          count: it.count - 1,
        }
      : it
  )
  const discussions = state.discussions.filter(it => !topicIds.includes(it.id))
  return {
    ...state,
    discussions,
    discussionsTriggerid: get(first(takeRight(discussions, 3)), 'id'),
    activeDiscussion: initialState.activeDiscussion,
    activeEntity: initialState.activeEntity,
    comments: initialState.comments,
    tabs: {
      ...state.tabs,
      discussionsCount: tabsItems.reduce(countDiscussions, 0),
      items: tabsItems,
    },
  }
}

function toggleState(newState, state, { payload }) {
  const discussions = [...state.discussions]
  const alteredDiscussions = discussions
    .filter(it => payload.includes(it.id))
    .map(it => ({
      ...it,
      state: newState,
    }))

  return {
    ...state,
    discussions: uniqBy([...alteredDiscussions, ...discussions], 'id'),
    activeDiscussion: payload.includes(state.activeDiscussion.id)
      ? { ...state.activeDiscussion, state: newState }
      : state.activeDiscussion,
  }
}

function toggleStatus(state, { payload }) {
  if (payload.status === 'active') {
    return {
      ...initialState,
      apiAdapter: state.apiAdapter,
      foreignEntity: state.foreignEntity,
      selectOptions: state.selectOptions,
      nextDiscussionPage: {
        ...initialState.nextDiscussionPage,
        scope: payload.status,
      },
      tabs: {
        ...state.tabs,
        current: payload.status,
      },
      discussions: initialState.discussions,
      activeDiscussion: payload,
      activeEntity: 'Card',
    }
  } else {
    return {
      ...state,
      discussions: state.discussions.filter(it => it.id !== payload.id),
      activeDiscussion: initialState.activeDiscussion,
      activeEntity: initialState.activeEntity,
    }
  }
}

function writeFilterParams(state, { payload }) {
  return {
    ...state,
    selectOptions: {
      ...state.selectOptions,
      authorFilter: addNewAuthors(...arguments),
      categoryFilter: addCategories(...arguments),
    },
  }

  function addNewAuthors(state, { payload: { authors } }) {
    const authorFilter = [...state.selectOptions.authorFilter]
    authors.map(({ id, full_name }) =>
      authorFilter.push({
        text: full_name,
        value: `${id}`,
        name: `author-${id}`,
      })
    )
    return uniqBy(authorFilter, 'value')
  }

  function addCategories(state, { payload: { categories } }) {
    const categoryFilter = [...state.selectOptions.categoryFilter]
    compact(categories).map(it =>
      categoryFilter.push({
        text: humanizedCategoryName[`${it}`],
        value: it,
        name: `type-${it || 'topics'}`,
      })
    )
    return uniqBy(categoryFilter, 'value')
  }
}

function addToFavorites(state, { payload }) {
  const items = [...state.tabs.items]
  const objIndex = items.findIndex(obj => obj.id === 'favorites')
  if (objIndex !== -1)
    items[objIndex] = {
      ...items[objIndex],
      count: items[objIndex].count + payload.length,
    }
  return {
    ...state,
    tabs: {
      ...state.tabs,
      items,
    },
    activeDiscussion: payload.includes(state.activeDiscussion.id)
      ? {
          ...state.activeDiscussion,
          in_favorites: true,
        }
      : state.activeDiscussion,
    discussions: state.discussions.map(it => {
      if (payload.includes(it.id)) {
        return {
          ...it,
          in_favorites: true,
        }
      } else {
        return it
      }
    }),
  }
}

function removeFromFavorites(state, { payload }) {
  const items = [...state.tabs.items]
  const objIndex = items.findIndex(obj => obj.id === 'favorites')
  if (objIndex !== -1)
    items[objIndex] = {
      ...items[objIndex],
      count: items[objIndex].count - payload.length,
    }
  return {
    ...state,
    tabs: {
      ...state.tabs,
      items,
    },
    activeDiscussion: payload.includes(state.activeDiscussion.id)
      ? {
          ...state.activeDiscussion,
          in_favorites: false,
        }
      : state.activeDiscussion,
    discussions: compact(
      state.discussions.map(it => {
        if (payload.includes(it.id)) {
          if (state.tabs.current === 'favorites') return null
          return {
            ...it,
            in_favorites: false,
          }
        } else {
          return it
        }
      })
    ),
  }
}

function likeTopic(state, { payload }) {
  const discussions = [...state.discussions]
  let activeDiscussion = { ...state.activeDiscussion }
  const objIndex = discussions.findIndex(obj => obj.id === payload)
  if (objIndex !== -1)
    discussions[objIndex] = {
      ...discussions[objIndex],
      already_liked: true,
    }
  if (activeDiscussion.id === payload) activeDiscussion.already_liked = true
  return {
    ...state,
    discussions,
    activeDiscussion,
  }
}

function dislikeTopic(state, { payload }) {
  const discussions = [...state.discussions]
  let activeDiscussion = { ...state.activeDiscussion }
  const objIndex = discussions.findIndex(obj => obj.id === payload)
  if (objIndex !== -1)
    discussions[objIndex] = {
      ...discussions[objIndex],
      already_liked: false,
    }
  if (activeDiscussion.id === payload) activeDiscussion.already_liked = false
  return {
    ...state,
    discussions,
    activeDiscussion,
  }
}

function changeTab(state, { payload: { id } }) {
  return {
    ...initialState,
    apiAdapter: state.apiAdapter,
    foreignEntity: state.foreignEntity,
    selectOptions: state.selectOptions,
    nextDiscussionPage: {
      ...initialState.nextDiscussionPage,
      scope: id,
    },
    tabs: {
      ...state.tabs,
      current: id,
    },
  }
}

function showCard(state, { payload }) {
  if (payload) {
    return {
      ...state,
      activeDiscussion: payload,
      activeEntity: 'Card',
      card: initialState.card,
      comments: initialState.comments,
      currentCommentsPage: initialState.currentCommentsPage,
    }
  } else if (state.activeDiscussion.id) {
    return {
      ...state,
      activeEntity: 'Card',
      card: initialState.card,
      comments: initialState.comments,
      currentCommentsPage: initialState.currentCommentsPage,
    }
  } else {
    return {
      ...state,
      activeEntity: initialState.activeEntity,
    }
  }
}

function showMembers(state, { payload }) {
  if (payload) {
    return {
      ...state,
      activeDiscussion: payload,
      activeEntity: 'Members',
    }
  } else if (state.activeDiscussion.id) {
    return {
      ...state,
      activeEntity: 'Members',
    }
  } else {
    return {
      ...state,
      activeEntity: initialState.activeEntity,
    }
  }
}

function updateCounters(state, { payload }) {
  const tabs = TABS.map(it => ({
    ...it,
    disabled: undefined,
    count: payload[`${it.id}_count`],
  }))

  return {
    ...state,
    tabs: {
      ...state.tabs,
      discussionsCount: tabs.reduce(countDiscussions, 0),
      items: tabs,
    },
  }
}

function loadCommentsResp(state, { payload: { comments, current_page } }) {
  const nextCommentsUpPage =
    current_page - 1 === 0
      ? undefined
      : {
          ...initialState.nextCommentsUpPage,
          page: current_page - 1,
        }
  const nextCommentsDownPage =
    comments.length < initialState.nextCommentsDownPage.per_page
      ? undefined
      : {
          ...initialState.nextCommentsDownPage,
          page: parseInt(current_page) + 1,
        }

  return {
    ...state,
    comments,
    nextCommentsUpPage,
    nextCommentsDownPage,
    commentsTopTriggerId: get(last(take(comments, 3)), 'id'),
    commentsBottomTriggerId: get(first(takeRight(comments, 3)), 'id'),
    currentCommentPage: parseInt(current_page),
    loadingDownComments: false,
  }
}

function loadUpCommentsResp(state, { payload: { comments, current_page } }) {
  const nextCommentsUpPage =
    current_page - 1 === 0
      ? undefined
      : {
          ...initialState.nextCommentsUpPage,
          page: parseInt(current_page) - 1,
        }

  const newComments = uniqBy([...comments, ...state.comments], 'id')
  return {
    ...state,
    comments: newComments,
    nextCommentsUpPage,
    commentsTopTriggerId: get(last(take(newComments, 3)), 'id'),
    commentsBottomTriggerId: get(first(takeRight(newComments, 3)), 'id'),
    loadingUpComments: false,
  }
}

function loadDownCommentsResp(state, { payload: { comments, current_page } }) {
  const nextCommentsDownPage =
    comments.length < initialState.nextCommentsDownPage.per_page
      ? undefined
      : {
          ...initialState.nextCommentsDownPage,
          page: parseInt(current_page) + 1,
        }
  const newComments = uniqBy([...state.comments, ...comments], 'id')
  return {
    ...state,
    comments: newComments,
    nextCommentsDownPage,
    commentsTopTriggerId: get(last(take(newComments, 3)), 'id'),
    commentsBottomTriggerId: get(first(takeRight(newComments, 3)), 'id'),
    currentCommentPage: parseInt(current_page),
    loadingDownComments: false,
  }
}

function loadCommentsLastPageResp(state, { payload: { comments, current_page } }) {
  const nextCommentsUpPage =
    current_page - 1 === 0
      ? undefined
      : {
          ...initialState.nextCommentsUpPage,
          page: current_page - 1,
        }

  return {
    ...state,
    comments,
    nextCommentsUpPage,
    nextCommentsDownPage: undefined,
    currentCommentPage: parseInt(current_page),
    commentsTopTriggerId: get(last(take(comments, 3)), 'id'),
    commentsBottomTriggerId: get(first(takeRight(comments, 3)), 'id'),
    loadingDownComments: false,
  }
}

function createCommentReq(state, { payload: { comment } }) {
  const discussions = [...state.discussions]
  const activeDiscussion = {
    ...state.activeDiscussion,
    messages_count: state.activeDiscussion.messages_count + 1,
  }
  const objIndex = discussions.findIndex(obj => obj.id === activeDiscussion.id)
  if (objIndex !== -1)
    discussions[objIndex] = {
      ...discussions[objIndex],
      messages_count: discussions[objIndex].messages_count + 1,
    }

  return {
    ...state,
    discussions,
    activeDiscussion,
    comments: uniqBy([...state.comments, comment], 'id'),
  }
}

function createComment(state, { payload: { comment, stamp } }) {
  const commentResp = {
    ...comment,
    read: true,
    can_delete: true,
    can_edit: true,
    tmp: false,
  }
  const comments = [...state.comments]
  const objIndex = comments.findIndex(obj => obj.id === stamp)
  if (objIndex !== -1)
    comments[objIndex] = {
      ...comments[objIndex],
      ...commentResp,
    }

  return {
    ...state,
    comments,
  }
}

function updateComment(state, { payload: { comment = {} } }) {
  const comments = [...state.comments]
  const objIndex = comments.findIndex(obj => obj.id === comment.id)
  if (objIndex !== -1)
    comments[objIndex] = {
      ...comments[objIndex],
      ...comment,
    }

  return {
    ...state,
    comments,
  }
}

function deleteComment(state, { payload }) {
  const comments = [...state.comments]
  const objIndex = comments.findIndex(obj => obj.id === payload.id)
  if (objIndex !== -1)
    comments[objIndex] = {
      ...comments[objIndex],
      ...payload,
    }
  return {
    ...state,
    comments,
  }
}

function markAsRead(state, { payload: { commentId, unread_count } }) {
  const activeDiscussion = { ...state.activeDiscussion, unread_count }
  const discussions = [...state.discussions]
  const objIndex = discussions.findIndex(obj => obj.id === activeDiscussion.id)
  if (objIndex !== -1)
    discussions[objIndex] = {
      ...discussions[objIndex],
      unread_count,
    }

  const comments = state.comments.map(it => ({
    ...it,
    read: it.id <= commentId ? true : it.read,
  }))

  return {
    ...state,
    discussions,
    activeDiscussion,
    comments,
  }
}

function likeComment(state, { payload }) {
  const comments = [...state.comments]
  const objIndex = comments.findIndex(obj => obj.id === payload)
  if (objIndex !== -1)
    comments[objIndex] = {
      ...comments[objIndex],
      likes_count: comments[objIndex].likes_count + 1,
      already_liked: true,
    }
  return {
    ...state,
    comments,
  }
}

function dislikeComment(state, { payload }) {
  const comments = [...state.comments]
  const objIndex = comments.findIndex(obj => obj.id === payload)
  if (objIndex !== -1)
    comments[objIndex] = {
      ...comments[objIndex],
      likes_count: comments[objIndex].likes_count - 1,
      already_liked: false,
    }
  return {
    ...state,
    comments,
  }
}

function webSocketMessageRecieved(state, { payload, gState }) {
  const meta = JSON.parse(get(payload, 'meta', '{}'))
  const data = JSON.parse(get(payload, 'data', '{}'))
  switch (meta.type) {
    case 'discussion_active':
      return discussionCreateHandler(state, data, 'active')
    case 'discussion_available':
      return discussionCreateHandler(state, data, 'available')
    case 'discussion_updated':
      return discussionUpdateHandler(state, data)
    case 'discussion_deleted':
      return discussionDeleteHandler(state, data)
    case 'discussion_comment_created':
      return commentCreateHandler(state, data, gState)
    case 'discussion_comment_edited':
      return commentUpdateHandler(state, data)
    case 'discussion_comment_updated':
      return commentUpdateHandler(state, data)
    case 'discussion_comment_deleted':
      return commentDeleteHandler(state, data)
    default:
      return state
  }

  function discussionCreateHandler(state, data, status) {
    if (
      Object.entries(state.filter.params).find(([key, value]) => value !== undefined) ||
      (state.foreignEntity &&
        (state.foreignEntity.type !== data.discussable_type ||
          state.foreignEntity.id !== data.discussable_id))
    )
      return state
    const tabsItems = state.tabs.items.map(it => {
      if (it.id === 'active' && status === 'active') {
        return {
          ...it,
          count: it.count + 1,
        }
      } else if (
        it.id === 'available' &&
        status === 'active' &&
        data.created_at !== data.updated_at
      ) {
        return {
          ...it,
          count: it.count - 1,
        }
      } else if (
        it.id === 'active' &&
        status === 'available' &&
        data.created_at !== data.updated_at
      ) {
        return {
          ...it,
          count: it.count - 1,
        }
      } else if (it.id === 'available' && status === 'available') {
        return {
          ...it,
          count: it.count + 1,
        }
      } else {
        return it
      }
    })
    const discussion = {
      unread_count: data.messages_count,
      discussers_count: data.discussers.length,
      is_read: false,
      in_favorites: false,
      already_liked: false,
      ...data,
      status: status,
    }

    return {
      ...state,
      discussions:
        state.tabs.current === status
          ? [discussion, ...state.discussions]
          : state.discussions.filter(it => it.id !== data.id),
      selectOptions: {
        ...state.selectOptions,
        authorFilter: addNewAuthor(...arguments),
      },
      discussionsTriggerid: get(first(takeRight(state.discussions, 3)), 'id'),
      activeDiscussion:
        get(state, 'activeDiscussion.id') === discussion.id ? discussion : state.activeDiscussion,
      activeEntity: status === 'available' ? initialState.activeEntity : state.activeEntity,
      tabs: {
        ...state.tabs,
        discussionsCount: tabsItems.reduce(countDiscussions, 0),
        items: tabsItems,
      },
    }

    function addNewAuthor(state, { author }) {
      if (isUndefined(author)) return state.selectOptions.authorFilter
      const { id, full_name } = author
      const authorFilter = [...state.selectOptions.authorFilter]
      authorFilter.push({
        text: full_name,
        value: `${id}`,
        name: `author-${id}`,
      })
      return uniqBy(authorFilter, 'value')
    }
  }

  function discussionUpdateHandler(state, data) {
    const discussions = [...state.discussions]
    const objIndex = discussions.findIndex(obj => obj.id === data.id)
    if (objIndex !== -1)
      discussions[objIndex] = {
        ...discussions[objIndex],
        ...data,
      }

    return {
      ...state,
      discussions,
      activeDiscussion:
        state.activeDiscussion.id === data.id
          ? { ...discussions[objIndex] }
          : state.activeDiscussion,
    }
  }

  function discussionDeleteHandler(state, data) {
    const tabsItems = state.tabs.items.map(it =>
      state.tabs.current === it.id
        ? {
            ...it,
            count: it.count - 1,
          }
        : it
    )

    const isCurrentDiscussion = state.activeDiscussion.id === data.id
    const discussions = state.discussions.filter(it => it.id !== data.id)
    return {
      ...state,
      discussions,
      discussionsTriggerid: get(first(takeRight(discussions, 3)), 'id'),
      activeDiscussion: isCurrentDiscussion
        ? initialState.activeDiscussion
        : state.activeDiscussion,
      activeEntity: isCurrentDiscussion ? initialState.activeEntity : state.activeEntity,
      tabs: {
        ...state.tabs,
        discussionsCount: tabsItems.reduce(countDiscussions, 0),
        items: tabsItems,
      },
    }
  }

  function commentCreateHandler(state, data, gState) {
    const comment = {
      ...data,
      read: data.author_id === gState.user.id ? true : false,
      can_delete: data.author_id === gState.user.id ? true : false,
      can_edit: data.author_id === gState.user.id ? true : false,
    }
    const discussions = [...state.discussions]
    const objIndex = data.author_id !== gState.user.id ? discussions.findIndex(obj => obj.id === comment.commentable_id) : -1
    if (objIndex !== -1)
      discussions[objIndex] = {
        ...discussions[objIndex],
        messages_count: discussions[objIndex].messages_count + 1,
        unread_count: discussions[objIndex].unread_count + 1,
      }
    if (
      state.activeDiscussion.id === comment.commentable_id &&
      state.nextCommentsDownPage === undefined
    ) {
      return {
        ...state,
        comments: uniqBy([...state.comments, comment], 'id'),
        discussions,
      }
    } else {
      return {
        ...state,
        discussions,
      }
    }
  }

  function commentUpdateHandler(state, data) {
    const comments = [...state.comments]
    const objIndex = comments.findIndex(obj => obj.id === data.id)
    if (objIndex !== -1)
      comments[objIndex] = {
        ...comments[objIndex],
        ...data,
      }
    return {
      ...state,
      comments,
    }
  }

  function commentDeleteHandler(state, data) {
    const comments = [...state.comments]
    const objIndex = comments.findIndex(obj => obj.id === data.id)
    if (objIndex !== -1)
      comments[objIndex] = {
        ...comments[objIndex],
        ...data,
      }
    return {
      ...state,
      comments,
    }
  }
}

function countDiscussions(acc, it) {
  return ['active', 'available'].includes(it.id) ? acc + it.count : acc
}

function selectEntity(pathname) {
  const pathItems = reverse(pathname.split(/\/|\?/))
  const resourceName = nth(pathItems, 1)
  const resourceId = parseInt(nth(pathItems, 0))

  const mapping = {
    discussion: {
      apiAdapter: api.discussion,
      foreignEntity: {},
    },
    bids: {
      apiAdapter: api.bids.discussions,
      foreignEntity: {
        type: 'Bid',
      },
    },
    surveys: {
      apiAdapter: api.surveys.discussions,
      foreignEntity: {
        type: 'Survey',
      },
    },
    vacancies: {
      apiAdapter: api.vacancies.discussions,
      foreignEntity: {
        type: 'Vacancy',
      },
    },
    projects: {
      apiAdapter: api.projects.discussions,
      foreignEntity: {
        type: 'Project',
      },
    },
    events: {
      apiAdapter: api.events.discussions,
      foreignEntity: {
        type: 'Event',
      },
    },
    tasks: {
      apiAdapter: api.tasks.discussions,
      foreignEntity: {
        type: 'Task',
      },
    },
    distribution: {
      apiAdapter: api.distribution.discussions,
      foreignEntity: {
        type: 'MailingList',
      },
    },
  }

  return {
    foreignEntity: resourceId
      ? {
          id: resourceId,
          ...mapping[resourceName]['foreignEntity'],
        }
      : false,
    apiAdapter: resourceId
      ? mapping[resourceName]['apiAdapter']
      : mapping['discussion']['apiAdapter'],
  }
}

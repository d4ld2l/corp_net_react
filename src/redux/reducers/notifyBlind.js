// Pattern for prettier run
// prettier --config ./.prettierrc  --write './src/redux/reducers/notifyBlind.js' && prettier --config ./.prettierrc  --write './src/containers/IntranetContainer/NotifyBlind/**/*.{js,jsx}'

const initialState = {
  isShow: false,
  showSearch: false,
  showFilters: false,
  // isNoteCard: false,
  // isTaskCard: false,
  // isSubtaskCard: false,
  // isFavorites: false,
  // isParticipants: false,
  // isLikeNote: false,
  // isLikeComment: false,
  // isCreateDiscussion: false,
  tab: 'discussions', // discussions, tasks
  view: null, // null - closed, index, show, new, edit, participants
}

export default (state = initialState, action) => {
  const { payload } = action

  switch (action.type) {
    case 'INIT_NOTIFY_BLIND':
      return {
        ...state,
        tab: action.payload.shr_discussions ? 'discussions' : 'tasks',
      }
    case 'TOGGLE_NOTIFY_BLIND':
      return {
        ...state,
        view: state.view ? initialState.view : 'index',
      }
    case 'NOTIFY_BLIND_TOGGLE_SEARCH':
      return {
        ...state,
        showFilters: false,
        showSearch: !state.showSearch,
      }
    case 'NOTIFY_BLIND_TOGGLE_FILTERS':
      return {
        ...state,
        showFilters: !state.showFilters,
        showSearch: false,
      }
    case 'NOTIFY_BLIND_CHANGE_TAB':
      return {
        ...state,
        tab: payload.tab,
        view: 'index',
      }
    case 'NOTIFY_BLIND_CHANGE_VIEW':
      return {
        ...state,
        tab: payload.tab || state.tab,
        view: payload.view,
      }
    case 'TOGGLE_OPEN_FORM_TASK':
      return {
        ...state,
        tab: 'tasks',
        view: 'index',
      }
    // case 'TOGGLE_NOTIFY_NOTE_CARD':
    //   return { ...state, isNoteCard: payload }
    // case 'TOGGLE_NOTIFY_TASK_CARD':
    //   return { ...state, isTaskCard: payload }
    // case 'TOGGLE_NOTIFY_SUBTASK_CARD':
    //   return { ...state, isSubtaskCard: payload }
    // case 'ADD_TO_FAVORITES':
    //   return { ...state, isFavorites: payload }
    // case 'TOGGLE_PARTICIPANTS':
    //   return { ...state, isParticipants: payload }
    // case 'I_LIKE_IT_NOTE':
    //   return { ...state, isLikeNote: payload }
    // case 'I_LIKE_IT_COMMENT':
    //   return { ...state, isLikeComment: payload }
    // case 'CREATE_DISCUSSION':
    //   return { ...state, isCreateDiscussion: payload }
    // case 'CREATE_TASK':
    //   return { ...state, isCreateTask: payload }
    default:
      return state
  }
}

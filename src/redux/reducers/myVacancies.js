const initialState = {
  data: [],
  page: 1,
  scroll: true,
  stats: {},
  currentTab: 'worked',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'RESET_MY_VACANCIES_STORE':
      return {
        ...initialState,
      }
    case 'GET_MY_VACANCIES_RES':
      return {
        ...state,
        data: action.page === 1 ? action.payload : [...state.data, ...action.payload],
        page: action.page + 1,
        scroll: action.per_page === action.payload.length,
      }
    case 'GET_VACANCIES_STATS_RES':
      return { ...state, stats: action.payload }
    case 'CHANGE_MY_VACANCIES_TAB':
      return { ...state, currentTab: action.payload, page: 1 }
    default:
      return state
  }
}

const initialState = {
  data: [],
  begin_assessment: false,
  complete_assessment: false,
  to_assessment: false,
  sessions: [],
  session: {},
  sessionResult: {},
  page: 1,
  perPage: 15,
  scroll: true,
  searchParams: {},
  filterParams: {
    status: 'in_progress',
  },
}

export default (state = initialState, action) => {

  switch (action.type) {
    case 'BEGIN_ASSESSMENT':
      return {
        ...state,
        begin_assessment: !state.begin_assessment,
        nextCompetence: action.nextCompetence
      }
    case 'COMPLETE_ASSESSMENT':
      return {
        ...state,
        begin_assessment: state.begin_assessment,
        complete_assessment: !state.complete_assessment,
      }
    case 'TO_ASSESSMENTS':
      return {
        ...state,
        begin_assessment: false,
        complete_assessment: false,
        to_assessment: false,
      }
    case 'CHANGE_ARRAY_INDEX_COMPETENCE':
      return {
        ...state,
        nextCompetence: action.nextCompetence
      }
    case 'GET_ASSESSMENT_SESSIONS_RES':
      return {
        ...state,
        sessions: action.page === 1  ? action.payload : [...state.sessions, ...action.payload],
        page: action.page + 1,
        scroll: action.payload.length === state.perPage,
      }
    case 'CHANGE_STATUS_FILTER_ASSESSMENT':
      return {
        ...state,
        filterParams: {
          status: action.payload,
        },
        page: 1,
      }
    case 'RESET_ASSESSMENT_SESSION':
      return {
        ...state,
        begin_assessment: initialState.begin_assessment,
        complete_assessment: initialState.complete_assessment,
        to_assessment: initialState.to_assessment,
        session: initialState.session,
      }
    case 'GET_ASSESSMENT_SESSION_RES':
      return {
        ...state,
        session: action.payload
      }
    case 'SEND_ASSESSMENT_SESSION_RES':
      return {
        ...state,
        sessions: state.sessions.filter( it => it.id !== action.payload.assessment_session_id )
      }
    case 'SET_SEARCH_ASSESSMENT_SESSIONS_RES':
      return {
        ...state,
        searchParams: action.payload,
        page: 1,
      }
    case 'LOAD_ASSESSMENT_RES':
      return {
        ...state,
        sessionResult: action.payload,
      }
    default:
      return state
  }
}

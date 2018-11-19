const initialState = {
  scroll: false,
  page: 1,
  data: [],
  activeCount: 0,
  goneCount: 0,
  totalCount: 0,
  activeTab: 'total',
  searchParams: '',
  currentProfileProject: {},
}

function changeParticipant(list, payload, activeTab) {
  if (activeTab === 'total'){
    return list.map(participant => {
      if (participant.id === payload.id) {
        return {
          ...payload,
          profile: participant.profile,
        }
      }
      return participant
    })
  } else {
    return list.filter(participant => participant.id !== payload.id)
  }
}

function updateData (list, payload, activeTab) {
  if (activeTab === 'total'){
    return list.map(participant => {
      if (participant.id === payload.id) {
        return payload
      }
      return participant
    })
  } else {
    return list
  }
}

export default (state = initialState, action) => {
  switch (action.type) {

    case 'GET_PROFILES_PROJECT_RES':
      return { ...state,
        data: action.payload.account_projects,
        scroll:  action.payload.account_projects.length === action.per_page,
        totalCount: action.payload.total,
        activeCount: action.payload.active,
        goneCount: action.payload.gone,
        page: 2 }
    case 'GET_PROFILES_PROJECT_PAGINATION_RES':
      return { ...state,
        data: [].concat(state.data, action.payload.account_projects),
        scroll:  action.payload.account_projects.length === action.per_page,
        page: (state.page + 1) }
    case 'TOGGLE_TAB_PROFILES_PROJECT':
      return { ...state, activeTab: action.payload }
    case 'DELETE_PARTICIPANT_FROM_PROJECT_RES':
      return { ...state, activeCount: state.activeCount - 1, goneCount: state.goneCount + 1, data: changeParticipant(state.data, action.payload, state.activeTab)}
    case 'REPAIR_PARTICIPANT_IN_PROJECT_RES':
      return { ...state, activeCount: state.activeCount + 1, goneCount: state.goneCount - 1, data: changeParticipant(state.data, action.payload, state.activeTab)}
    case 'SET_SEARCH_PROFILES_PROJECT_RES':
      return { ...state, searchParams: action.payload }
    case 'GET_PROFILE_PROJECT_RES':
      return { ...state, currentProfileProject: action.payload }
    case 'POST_UPDATE_PROFILE_PROJECT_RES':
      return { ...state, data: updateData(state.data, action.payload, state.activeTab)}
    case 'RESET_PROFILES_PROJECT':
      return { ...state,
        scroll: false,
        page: 1,
        data: [],
        activeCount: null,
        goneCount: null,
        totalCount: null,
        searchParams: '',
      }
    case 'GET_EMPLOYEE_RES':
      return { ...state, currentProfileProject: {
          ...state.currentProfileProject,
          account: action.payload
        }}
    case 'UNCONFIRM_EMPLOYEE_SKILL_RES':
    case 'CONFIRM_EMPLOYEE_SKILL_RES':
      if (state.currentProfileProject) {
        return {
          ...state,
          currentProfileProject: {
            ...state.currentProfileProject,
            account:{
              ...state.currentProfileProject.account,
              account_skills: state.currentProfileProject.account.account_skills.map( skill => {
                if (skill.id === action.payload.account_skill.id) {
                  return action.payload.account_skill
                } else {
                  return skill
                }
              })
            }
          }
        }
      }
    default:
      return state
  }
}

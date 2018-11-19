const initialState = {
  data: [],
  personalGroups: [],
  availableGroups: [],
}

function personalGroups(data, user_id) {
  return data ? data.filter(group => group.creator.id === user_id) : []
}

function shareGroups(data, user_id) {
  return data ? data.filter(group => group.creator.id !== user_id) : []
}

function deleteGroup(groups, payload) {
  if (payload.data.success) {
    return groups.filter(group => payload.id !== group.id)
  }
  return groups
}

function updateGroup(groups, payload) {
  return groups.map(group => {
    if (group.id === payload.id) {
      return payload
    } else {
      return group
    }
  })
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DISTRIBUTION_RES':
      return { ...state, data: action.payload || [], personalGroups: personalGroups(action.payload, action.user_id), availableGroups: shareGroups(action.payload, action.user_id) }
    case 'CREATE_DISTRIBUTION_RES':
      return { ...state, data: [].concat(action.payload, state.data), personalGroups: [].concat(action.payload, state.personalGroups) }
    case 'DELETE_DISTRIBUTION_RES':
      return { ...state, data: deleteGroup(state.data, action.payload), personalGroups: deleteGroup(state.personalGroups, action.payload)}
    case 'UPDATE_DISTRIBUTION_RES':
      return { ...state, data: updateGroup(state.data, action.payload), personalGroups: updateGroup(state.personalGroups, action.payload) }
    default:
      return state
  }
}

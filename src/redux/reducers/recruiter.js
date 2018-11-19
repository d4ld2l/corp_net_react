import { splice, del } from 'immutable-arrays'

import type { Action } from '../../types/actions'
import type { RecruiterState as State } from '../../types/states'

const initialState = {
  newRequest: {
    editInfoTab: true,
    editFullTab: true,
    openSelectorEmployeesModal: false,
    employees: [],
    activeMilestone: null,
    milestonesTemplate: [],
    selectMilestonesTemplate: [],
    currentMilestonesTemplate: null,
    milestones: [],
    milestonesGroups: [],
    currentMilestonesGroup: null,
    selectRecruiterRole: [],
    selectGeneralRecruiterRole: [],
    selectManagerRecruiterRole: [],
  },
}

function getRecruiterRoleInfoResFunc(state, payload) {
  const selectRecruiterRole = payload.map(e => ({
    label: `${e.full_name}`,
    value: e.id,
  }))

  const newRequest = {
    ...state.newRequest,
    selectRecruiterRole,
  }

  return { ...state, newRequest }
}

function getRecruiterManagerRoleInfoResFunc(state, payload) {
  const selectManagerRecruiterRole = payload.map(e => ({
    label: `${e.full_name}`,
    value: e.id,
  }))

  const newRequest = {
    ...state.newRequest,
    selectManagerRecruiterRole,
  }

  return { ...state, newRequest }
}

function getRecruiterGeneralRoleInfoResFunc(state, payload) {
  const selectGeneralRecruiterRole = payload.map(e => ({
    label: `${e.full_name}`,
    value: e.id,
  }))

  const newRequest = {
    ...state.newRequest,
    selectGeneralRecruiterRole,
  }

  return { ...state, newRequest }
}

function changeMilestonesGroupsFunc(state, payload) {
  const milestones = state.newRequest.milestones.map(e => ({
    ...e,
    vacancy_stage_group_id: e.position === payload.position ? payload.value.id : e.vacancy_stage_group_id,
  }))

  const newRequest = {
    ...state.newRequest,
    milestones,
    currentMilestonesGroup: payload.value,
  }

  return { ...state, newRequest }
}

function changeMilestoneEvaluationFunc(state, payload) {
  const milestones = state.newRequest.milestones.map(e => ({
    ...e,
    evaluation_of_candidate: e.position === payload.position ? payload.value : e.evaluation_of_candidate,
  }))

  const newRequest = {
    ...state.newRequest,
    milestones,
  }
  return { ...state, newRequest }
}

function changeMilestoneNotificationFunc(state, payload) {
  const milestones = state.newRequest.milestones.map((e, idx) => ({
    ...e,
    position: idx,
    need_notification: e.position === payload.position ? payload.value : e.need_notification,
  }))

  const newRequest = {
    ...state.newRequest,
    milestones,
  }
  return { ...state, newRequest }
}

function getMilestonesTemplateFunc(state, payload) {
  const selectMilestonesTemplate = payload.map(e => ({ value: e.id, label: e.name }))

  const newRequest = {
    ...state.newRequest,
    milestonesTemplate: payload,
    selectMilestonesTemplate,
  }
  return { ...state, newRequest }
}

function setMilestonesTemplateFunc(state, payload) {
  const { milestonesTemplate } = state.newRequest
  const milestones = milestonesTemplate
    .find(e => e.id === payload)
    .vacancy_stages
    .map((item, idx) => ({...item, position: idx}))
  return { ...state, newRequest: { ...state.newRequest, milestones } }
}

function setMilestones(state, payload) {
  return { ...state, newRequest: { ...state.newRequest, milestones: payload.map((item, idx) => ({...item, position: idx})) } }
}

function resetMilestones(state) {
  return {
    ...state,
    newRequest: {
      ...state.newRequest,
      milestones: initialState.newRequest.milestones,
      currentMilestonesTemplate: initialState.newRequest.currentMilestonesTemplate,
    },
  }
}

function addEmployeesFunc(state, payload) {
  const employees = state.newRequest.employees
  employees.push(payload)
  return { ...state, newRequest: { ...state.newRequest, employees } }
}

function changeMilestonesFunc(state, payload) {
  const id = payload.find((e, i) => e.active && i)

  const newRequest = {
    ...state.newRequest,
    milestones: payload.map((item, idx) => ({...item, position: idx})),
    activeMilestone: id,
  }

  return { ...state, newRequest }
}

function selectMilestonesFunc(state, payload) {
  const { milestones } = state.newRequest

  const newMilestones = milestones.map((e, i) => ({ ...e, active: i === payload.position }))

  const currentMilestonesGroup = state.newRequest.milestonesGroups.find(
    e => e.id === payload.value.vacancy_stage_group_id
  )

  const newRequest = {
    ...state.newRequest,
    milestones: newMilestones,
    activeMilestone: payload.position,
    currentMilestonesGroup,
  }

  return { ...state, newRequest }
}

function renameMilestonesTitleFunc(state, payload) {
  const { milestones, activeMilestone } = state.newRequest

  const newMilestones = milestones.map((e, i) => ({
    ...e,
    name: i === activeMilestone ? payload.value : e.name,
  }))

  const newRequest = { ...state.newRequest, milestones: newMilestones }

  return { ...state, newRequest }
}

function addLeftMilestonesFunc(state, { milestone }) {
  const milestones = [...state.newRequest.milestones]
  const newActiveMilestone = milestone.position + 1

  milestones.splice(milestone.position, 0, {
    active: false,
    can_create_left: true,
    can_create_right: true,
    editable: true,
    evaluation_of_candidate: false,
    group_name: 'new',
    must_be_last: false,
    name: `Новый этап ${milestone.position}`,
    need_notification: false,
    template_stage_id: 1,
    type_of_rating: 'passing',
    vacancy_id: null,
    vacancy_stage_group_id: milestone.vacancy_stage_group_id,
  })

  return {
    ...state,
    newRequest: {
      ...state.newRequest,
      milestones: milestones.map((e, i) => ({ ...e, position: i, active: i === newActiveMilestone - 1 })),
      activeMilestone: newActiveMilestone,
    },
  }
}

function addRightMilestonesFunc(state, { milestone }) {
  const milestones = [...state.newRequest.milestones]

  const newActiveMilestone = milestone.position + 1
  milestones.splice(milestone.position + 1, 0, {
    active: false,
    can_create_left: true,
    can_create_right: true,
    editable: true,
    evaluation_of_candidate: false,
    group_name: 'new',
    must_be_last: false,
    name: `Новый этап ${milestone.position}`,
    need_notification: false,
    template_stage_id: 1,
    type_of_rating: 'passing',
    vacancy_id: null,
    vacancy_stage_group_id: milestone.vacancy_stage_group_id,
  })
  return {
    ...state,
    newRequest: {
      ...state.newRequest,
      milestones: milestones.map((e, i) => ({ ...e, position: i, active: i === newActiveMilestone })),
      activeMilestone: newActiveMilestone,
    },
  }
}

function deleteMilestonesFunc(state) {
  const { milestones, activeMilestone } = state.newRequest

  const newActiveMilestone = activeMilestone - 1

  const delMilestones = del(milestones, activeMilestone)

  const newMilestones = delMilestones.map((e, i) => ({ ...e, active: i === newActiveMilestone, position: i }))

  return {
    ...state,
    newRequest: {
      ...state.newRequest,
      milestones: newMilestones,
      activeMilestone: newActiveMilestone,
    },
  }
}

function createVacancyFunc(state) {
  const newRequest = {
    ...state.newRequest,
    currentMilestonesTemplate: null,
    currentMilestonesGroup: null,
  }

  return { ...state, newRequest }
}
export default (state = initialState, action) => {
  const { payload } = action

  switch (action.type) {
    case 'EDIT_NEW_REQUIEST_INFO_TAB':
      return { ...state, newRequest: { ...state.newRequest, editInfoTab: true } }

    case 'SAVE_NEW_REQUIEST_INFO_TAB':
      return { ...state, newRequest: { ...state.newRequest, editInfoTab: false } }

    case 'EDIT_NEW_REQUIEST_FULL_TAB':
      return { ...state, newRequest: { ...state.newRequest, editFullTab: true } }

    case 'SAVE_NEW_REQUIEST_FULL_TAB':
      return { ...state, newRequest: { ...state.newRequest, editFullTab: false } }

    case 'OPEN_SELECTOR_EMPLOYEES_MODAL':
      return { ...state, newRequest: { ...state.newRequest, openSelectorEmployeesModal: true } }

    case 'CLOSE_SELECTOR_EMPLOYEES_MODAL':
      return { ...state, newRequest: { ...state.newRequest, openSelectorEmployeesModal: false } }

    case 'SET_CURRENT_MILESTONES_TEMPLATE':
      return { ...state, newRequest: { ...state.newRequest, currentMilestonesTemplate: payload } }

    case 'GET_MILESTONES_GROUP_RES':
      return { ...state, newRequest: { ...state.newRequest, milestonesGroups: payload } }

    case 'CHANGE_MILESTONES_GROUPS':
      return changeMilestonesGroupsFunc(state, payload)
    case 'GET_MILESTONES_TEMPLATE_RES':
      return getMilestonesTemplateFunc(state, payload)
    case 'SELECT_MILESTONES':
      return selectMilestonesFunc(state, payload)
    case 'RENAME_MILESTONES_TITLE':
      return renameMilestonesTitleFunc(state, payload)
    case 'ADD_LEFT_MILESTONES':
      return addLeftMilestonesFunc(state, payload)
    case 'ADD_RIGHT_MILESTONES':
      return addRightMilestonesFunc(state, payload)
    case 'CHANGE_MILESTONES':
      return changeMilestonesFunc(state, payload)
    case 'DELETE_MILESTONES':
      return deleteMilestonesFunc(state, payload)
    case 'SET_MILESTONES_TEMPLATE':
      return setMilestonesTemplateFunc(state, payload)
    case 'SET_MILESTONES':
      return setMilestones(state, payload)
    case 'RESET_MILESTONES':
      return resetMilestones(state)
    case 'CHANGE_MILESTONE_NOTIFICATION':
      return changeMilestoneNotificationFunc(state, payload)
    case 'CHANGE_MILESTONE_EVALUATION':
      return changeMilestoneEvaluationFunc(state, payload)
    case 'GET_RECRUITER_ROLE_INFO_RES':
      return getRecruiterRoleInfoResFunc(state, payload)
    case 'GET_MANAGER_RECRUITER_ROLE_INFO_RES':
      return getRecruiterManagerRoleInfoResFunc(state, payload)
    case 'GET_GENERAL_RECRUITER_ROLE_INFO_RES':
      return getRecruiterGeneralRoleInfoResFunc(state, payload)

    case 'ADD_SELECTOR_EMPLOYEES':
      return addEmployeesFunc(state, payload)
    case 'CREATE_VACANCY_RES':
    case 'UPDATE_VACANCY_RES':
      return createVacancyFunc(state, payload)

    default:
      return state
  }
}

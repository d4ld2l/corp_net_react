import api from '../../api'
import type { Dispatch, ThunkAction } from '../../types/actions'
import {toggleTab} from "./projectsDataActions";
import moment from "moment/moment";

function createFilterParams(activeTab){
  switch (activeTab){
    case 'total':
      return {}
    case 'active':
      return {
        scope: 'active',
      }
    case 'gone':
      return {
        scope: 'gone',
      }
  }
}

function createSearchParams(params){
  const search = {}
  if (params && params !== ''){
    search.q = params
  }
  return search
}

export const getProfilesProject = (projectId, page): ThunkAction => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  dispatch({ type: 'GET_PROFILES_PROJECT_REQ' })
  const per_page = 15
  const filterParams = createFilterParams(getState().profilesProject.activeTab)
  const searchParams = createSearchParams(getState().profilesProject.searchParams)
  try {
    const req = await api.profilesProject.pagination(projectId, page, per_page, filterParams, searchParams)
    dispatch({ type: 'GET_PROFILES_PROJECT_RES', payload: req.data, per_page })
  } catch (error) {
    dispatch({ type: 'GET_PROFILES_PROJECT_FAIL', payload: error.message })
  }
}

export const getProfilesProjectPagination = (projectId, page): ThunkAction => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  dispatch({ type: 'GET_PROFILES_PROJECT_PAGINATION_REQ' })
  const per_page = 15
  const filterParams = createFilterParams(getState().profilesProject.activeTab)
  const searchParams = createSearchParams(getState().profilesProject.searchParams)
  try {
    const req = await api.profilesProject.pagination(projectId, page, per_page, filterParams, searchParams)
    dispatch({ type: 'GET_PROFILES_PROJECT_PAGINATION_RES', payload: req.data, per_page })
  } catch (error) {
    dispatch({ type: 'GET_PROFILES_PROJECT_PAGINATION_FAIL', payload: error.message })
  }
}

export const setSearch = (projectId, searchParams): ThunkAction => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  dispatch({ type: 'SET_SEARCH_PROFILES_PROJECT_REQ' })

  try {
    dispatch({ type: 'SET_SEARCH_PROFILES_PROJECT_RES', payload: searchParams })
    dispatch(getProfilesProject(projectId, 1))
  } catch (error) {
    dispatch({ type: 'SET_SEARCH_PROFILES_PROJECT_FAIL', payload: error.message })
  }
}

export const toggleTabProfilesProject = (tab, projectId): ThunkAction => async (
  dispatch: Dispatch
) => {
  dispatch({ type: 'TOGGLE_TAB_PROFILES_PROJECT', payload: tab })
  dispatch(getProfilesProject(projectId, 1))
}

export const deleteParticipantFromProject = (projectId, participantId): ThunkAction => async (
  dispatch: Dispatch
) => {
  dispatch({ type: 'DELETE_PARTICIPANT_FROM_PROJECT_REQ' })
  try {
    const req = await api.profilesProject.deleteParticipant(projectId, participantId)
    dispatch({ type: 'DELETE_PARTICIPANT_FROM_PROJECT_RES', payload: req.data.account_project })
    return req
  } catch (error) {
    dispatch({ type: 'DELETE_PARTICIPANT_FROM_PROJECT_FAIL', payload: error.message })
  }
}

export const repairParticipantInProject = (projectId, participantId): ThunkAction => async (
  dispatch: Dispatch
) => {
  dispatch({ type: 'REPAIR_PARTICIPANT_IN_PROJECT_REQ' })
  try {
    const req = await api.profilesProject.repairParticipant(projectId, participantId)
    dispatch({ type: 'REPAIR_PARTICIPANT_IN_PROJECT_RES', payload: req.data.account_project })
    return req
  } catch (error) {
    dispatch({ type: 'REPAIR_PARTICIPANT_IN_PROJECT_FAIL', payload: error.message })
  }
}

export const getProfileProject = (projectId, profileProjectId): ThunkAction => async (
  dispatch: Dispatch
) => {
  dispatch({ type: 'GET_PROFILE_PROJECT_REQ' })
  try {
    const req = await api.profilesProject.getProfileProject(projectId, profileProjectId)
    dispatch({ type: 'GET_PROFILE_PROJECT_RES', payload: req.data })
    return req
  } catch (error) {
    dispatch({ type: 'GET_PROFILE_PROJECT_FAIL', payload: error.message })
  }
}

export const createProfileProject = (projectId): ThunkAction => async (
  dispatch: Dispatch,
  getState: GetState,
) => {
  dispatch({ type: 'POST_CREATE_PROFILE_PROJECT_REQ' })

  const form = getState().form.NewParticipant.values || {}
  const params = {
    account_project: {
      project_id: projectId,
      account_id: form.participant.value,
      project_work_periods_attributes: form.project_work_periods_attributes.map((it) => ({
        role: it.role,
        duties: it.duties,
        begin_date: it.begin_date && moment(it.begin_date),
        end_date: it.for_now ? null : (it.end_date && moment(it.end_date)),
      })),
    }
  }
  try {
    const req = await api.profilesProject.createProfileProject(projectId, params)
    dispatch({ type: 'POST_CREATE_PROFILE_PROJECT_RES', payload: req.data })
    return req.data
  } catch (error) {
    dispatch({ type: 'POST_CREATE_PROFILE_PROJECT_FAIL', payload: error.message })
  }
}

export const updateProfileProject = (projectId, currentProfileProject): ThunkAction => async (
  dispatch: Dispatch,
  getState: GetState,
) => {
  dispatch({ type: 'POST_UPDATE_PROFILE_PROJECT_REQ' })

  const form = getState().form.NewParticipant.values || {}
  const skills = getState().searchSkills.skills.map( it => ({
    id: it.account_skill_id,
    skill_id: it.id,
    skill_attributes: it.id ? null : {name: it.name},
    _destroy: it._destroy,
  }))

  const workPeriods = (oldArr, newArr) => {
    const result = []
    oldArr.forEach(old => {
      const el = newArr.find(nw => old.id === nw.id)
      if (!el) result.push({ id: old.id, _destroy: true })
      if (el) result.push({
        id: el.id,
        role: el.role,
        duties: el.duties,
        begin_date: el.begin_date && moment(el.begin_date),
        end_date: el.for_now ? null : (el.end_date && moment(el.end_date)),
      })
    })
    newArr.filter((nw) => !nw.id).forEach(el => {
      result.push({
        role: el.role,
        duties: el.duties,
        begin_date: el.begin_date && moment(el.begin_date),
        end_date: el.for_now ? null : (el.end_date && moment(el.end_date)),
      })
    })
    return result
  }

  const params = {
    account_project: {
      id: currentProfileProject.id,
      project_work_periods_attributes: workPeriods(currentProfileProject.project_work_periods, form.project_work_periods_attributes),
      account_attributes: {
        account_skills_attributes: skills,
      }
    }
  }

  try {
    const req = await api.profilesProject.updateProfileProject(projectId, currentProfileProject.id,  params)
    dispatch({ type: 'POST_UPDATE_PROFILE_PROJECT_RES', payload: req.data.account_project })
    return req.data
  } catch (error) {
    dispatch({ type: 'POST_UPDATE_PROFILE_PROJECT_FAIL', payload: error.message })
  }
}

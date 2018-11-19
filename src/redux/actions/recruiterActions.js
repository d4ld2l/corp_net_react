import type { Dispatch, ThunkAction } from '../../types/actions'

export const editNewRequesInfoTab = (): ThunkAction => (dispatch: Dispatch) =>
  dispatch({ type: 'EDIT_NEW_REQUIEST_INFO_TAB' })

export const saveNewRequesInfoTab = (): ThunkAction => (dispatch: Dispatch) =>
  dispatch({ type: 'SAVE_NEW_REQUIEST_INFO_TAB' })

export const editNewRequesFullTab = (): ThunkAction => (dispatch: Dispatch) =>
  dispatch({ type: 'EDIT_NEW_REQUIEST_FULL_TAB' })

export const saveNewRequesFullTab = (): ThunkAction => (dispatch: Dispatch) =>
  dispatch({ type: 'SAVE_NEW_REQUIEST_FULL_TAB' })

export const openSelectorEmployeesModal = (): ThunkAction => (dispatch: Dispatch) =>
  dispatch({ type: 'OPEN_SELECTOR_EMPLOYEES_MODAL' })

export const closeSelectorEmployeesModal = (): ThunkAction => (dispatch: Dispatch) =>
  dispatch({ type: 'CLOSE_SELECTOR_EMPLOYEES_MODAL' })

export const addSelectorEmployees = (payload): ThunkAction => (dispatch: Dispatch) =>
  dispatch({ type: 'ADD_SELECTOR_EMPLOYEES', payload })

export const selectMilestones = (payload): ThunkAction => (dispatch: Dispatch) =>
  dispatch({ type: 'SELECT_MILESTONES', payload })

export const changeMilestones = (payload): ThunkAction => (dispatch: Dispatch) =>
  dispatch({ type: 'CHANGE_MILESTONES', payload })

export const renameMilestoneTitle = (payload): ThunkAction => (dispatch: Dispatch) =>
  dispatch({ type: 'RENAME_MILESTONES_TITLE', payload })

export const addLeftMilestone = (payload): ThunkAction => (dispatch: Dispatch) =>
  dispatch({ type: 'ADD_LEFT_MILESTONES', payload })

export const addRightMilestone = (payload): ThunkAction => (dispatch: Dispatch) =>
  dispatch({ type: 'ADD_RIGHT_MILESTONES', payload })

export const deleteMilestone = (payload): ThunkAction => (dispatch: Dispatch) =>
  dispatch({ type: 'DELETE_MILESTONES', payload })

export const setMilestonesTemplate = (payload): ThunkAction => (dispatch: Dispatch) =>
  dispatch({ type: 'SET_MILESTONES_TEMPLATE', payload })

export const setMilestones = (payload): ThunkAction => (dispatch: Dispatch) =>
  dispatch({ type: 'SET_MILESTONES', payload })

export const resetMilestones = (payload): ThunkAction => (dispatch: Dispatch) =>
  dispatch({ type: 'RESET_MILESTONES', payload })

export const setCurrentMilestonesTemplate = (payload): ThunkAction => (dispatch: Dispatch) =>
  dispatch({ type: 'SET_CURRENT_MILESTONES_TEMPLATE', payload })

export const changeMilestonesGroups = (payload): ThunkAction => (dispatch: Dispatch) =>
  dispatch({ type: 'CHANGE_MILESTONES_GROUPS', payload })

export const chnageMilestoneNotification = (payload): ThunkAction => (dispatch: Dispatch) =>
  dispatch({ type: 'CHANGE_MILESTONE_NOTIFICATION', payload })

export const chnageMilestoneEvaluation = (payload): ThunkAction => (dispatch: Dispatch) =>
  dispatch({ type: 'CHANGE_MILESTONE_EVALUATION', payload })

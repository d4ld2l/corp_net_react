import api from 'api-folder'
import type { Dispatch, ThunkAction } from 'types-folder/actions'
import { isEmpty } from 'lodash'
import { toastr } from 'react-redux-toastr'


export const beginAssessment = () => ({
  type: 'BEGIN_ASSESSMENT',
  nextCompetence: 0
})

export const completeAssessment = () => ({
  type: 'COMPLETE_ASSESSMENT'
})

export const toAssessments = () => ({
  type: 'TO_ASSESSMENTS'
})

export const nextCompetenceIndex = nextCompetence => ({
  type: 'CHANGE_ARRAY_INDEX_COMPETENCE',
  nextCompetence: ++nextCompetence
})

export const prevCompetenceIndex = nextCompetence => ({
  type: 'CHANGE_ARRAY_INDEX_COMPETENCE',
  nextCompetence: --nextCompetence
})


// register Sessions (assessment)

export const getAssessmentSessions = (page): ThunkAction => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  dispatch({ type: 'GET_ASSESSMENT_SESSIONS_REQ' })

  const per_page = getState().assessment.perPage
  const searchParams = getState().assessment.searchParams
  const filterParams = getState().assessment.filterParams

  try {
    const req = await api.assessment.getSessions(page, per_page, searchParams, filterParams)
    dispatch({ type: 'GET_ASSESSMENT_SESSIONS_RES', payload: req.data, page })
  } catch (error) {
    dispatch({ type: 'GET_ASSESSMENT_SESSIONS_FAIL', payload: error.message })
  }
}

export const changeStatusFilterAssessment = (status): ThunkAction => async (
  dispatch: Dispatch,
) => {
  await dispatch({ type: 'CHANGE_STATUS_FILTER_ASSESSMENT', payload: status })
  dispatch(getAssessmentSessions(1))
}

export const setSearchAssessments = (query): ThunkAction => async (dispatch: Dispatch) => {
  await dispatch({ type: 'SET_SEARCH_ASSESSMENT_SESSIONS_RES', payload: isEmpty(query) ? {} : {q:query} })
  dispatch(getAssessmentSessions(1))
}

export const resetAssessmentSession = () => ({
  type: 'RESET_ASSESSMENT_SESSION'
})

export const getAssessmentSession = (id: number): ThunkAction => async (
  dispatch: Dispatch
) => {
  dispatch({ type: 'GET_ASSESSMENT_SESSION_REQ' })

  try {
    const req = await api.assessment.getSession(id)
    dispatch({ type: 'GET_ASSESSMENT_SESSION_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'GET_ASSESSMENT_SESSION_FAIL', payload: error.message })
  }
}

function createIndicatorAttributes(skillValues){
  const indicatorIds = Object.keys(skillValues)
  return indicatorIds.filter(it => !it.includes('comment')).map((it) => ({
    indicator_id: Number(it.replace('_indicator', '')),
    rating_scale: 'six',
    rating: Number(skillValues[it]),
  }))
}

export const sendAssessmentSession = (id: number): ThunkAction => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  dispatch({ type: 'SEND_ASSESSMENT_SESSION_REQ' })

  const formValues = getState().form.Assessment.values
  const skillIds= Object.keys(formValues)

  const skillEvaluationsAttributes = skillIds.map(it => ({
    skill_id: Number(it.replace('_skill', '')),
    comment: formValues[it][`${it.replace('_skill', '')}_comment`],
    indicator_evaluations_attributes: createIndicatorAttributes(formValues[it]),
  }))

  const params = {
    session_evaluation: {
      skill_evaluations_attributes: skillEvaluationsAttributes,
    }
  }

  try {
    const req = await api.assessment.sendSession(id,params)
    if (req.data.id) {
      dispatch({ type: 'SEND_ASSESSMENT_SESSION_RES', payload: req.data })
      dispatch(completeAssessment())
      toastr.success('Ваша оценка зарегистрирована.')
    } else {
      toastr.error(req.data.errors[0])
    }
  } catch (error) {
    dispatch({ type: 'SEND_ASSESSMENT_SESSION_FAIL', payload: error.message })
  }
}

// card Assessment

export const loadAssessmentCard = (id): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'LOAD_ASSESSMENT_REQ' })
  try{
    const req = await api.assessment.getResult(id)
    dispatch({ type: 'LOAD_ASSESSMENT_RES', payload: req.data })
  } catch (error) {
    dispatch({ type: 'LOAD_ASSESSMENT_FAIL', payload: error.message })
  }
}

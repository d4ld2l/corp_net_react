import api from 'api-folder'
import { push } from 'react-router-redux'
import { toastr } from 'react-redux-toastr'
import { get, isUndefined } from 'lodash'

import {
  getCurrentCandidate,
  getSelectCandidates,
  clearSelectedCandidates,
} from 'redux-folder/actions/candidatesActions'


export function initComparison(id, atIndex = 0) {
  return async (dispatch, gState) => {
    try {
      await dispatch(clearSelectedCandidates())
      await dispatch(getCurrentCandidate(id))
      const { current } = gState().candidates
      if (current.similar_candidates < 1) {
        toastr.success('Дедубликация завершена!')
        dispatch(push(`/recruitment/candidates/${id}`))
        return
      }
      const ids = current.similar_candidates.map(item => item.id).join(',')
      await dispatch(getSelectCandidates(ids, current.similar_candidates.length))
      const { select } = gState().candidates
      await dispatch({
        type: 'SET_INITIAL_DISPLAYED_CANDIDATE',
        payload: formatCandidateForReducer([current, select[0]], atIndex),
      })
    } catch (e) {
      toastr.error('Произошла ошибка!')
      dispatch(push(`/recruitment/candidates/${id}`))
    }
  }
}

export function showNextCandidate() {
  return async (dispatch, gState) => {
    const { positionInArray } = gState().comparison
    const { current, select } = gState().candidates
    try {
      let nextArrayPosition = isUndefined(positionInArray) ? 0 : positionInArray + 1
      if (nextArrayPosition >= select.length) nextArrayPosition = 0
      await dispatch({
        type: 'CHANGE_DISPLAYED_CANDIDATE',
        payload: formatCandidateForReducer([current, select[nextArrayPosition]], nextArrayPosition),
      })
    } catch (e) {
      toastr.error('Произошла ошибка!')
      dispatch(push(`/recruitment/candidates/${current.id}`))
    }
  }
}

export function showPrevCandidate() {
  return async (dispatch, gState) => {
    const { positionInArray } = gState().comparison
    const { current, select } = gState().candidates
    try {
      let nextArrayPosition = isUndefined(positionInArray) ? 0 : positionInArray - 1
      if (nextArrayPosition < 0) nextArrayPosition = select.length - 1
      await dispatch({
        type: 'CHANGE_DISPLAYED_CANDIDATE',
        payload: formatCandidateForReducer([current, select[nextArrayPosition]], nextArrayPosition),
      })
    } catch (e) {
      toastr.error('Произошла ошибка!')
      dispatch(push(`/recruitment/candidates/${current.id}`))
    }
  }
}

export function changeSaveDecision(payload) {
  return { type: "CHANGE_SAVE_DECISION", payload }
}

export function saveOneCandidate() {
  return async (dispatch, gState) => {
    const state = gState()
    const { candidates: { current = {}, select = [] }, comparison: { positionInArray = null, candidates = [], select: { value: { value = null } } } } = state
    const comparedCandidate = select[positionInArray]
    let reqBody = {
      first_id: current.id,
      second_id: comparedCandidate.id,
      save_id: null,
    }
    reqBody.save_id = get(reqBody, value)
    try {
      const res = await api.comparison.saveOne(reqBody)
      if (res.data.status !== 'success')
        throw 'err'
      if (reqBody.save_id === current.id && candidates > 1) {
        await dispatch(showNextCandidate())
        await dispatch({ type: 'AFTER_COMPARISON_HOOK', payload: reqBody.save_id })
      } else {
        await dispatch(initComparison(reqBody.save_id))
      }
      await toastr.success('Кандидат успешно сохранен!')
    } catch (e) {
      toastr.error('Произошла ошибка!')
      dispatch(push(`/recruitment/candidates`))
    }
  }
}

export function saveBothCandidates() {
  return async (dispatch, gState) => {
    const state = gState()
    const { candidates: { current = {}, select = [] }, comparison: { positionInArray = null, candidates = [] } } = state
    const comparedCandidate = select[positionInArray]
    const reqBody = {
      first_id: current.id,
      second_id: comparedCandidate.id,
    }
    try {
      const res = await api.comparison.saveBoth(reqBody)
      if (res.data.status !== 'success')
        throw 'err'
      if (candidates > 1) {
        await dispatch(showNextCandidate())
        await dispatch({ type: 'AFTER_COMPARISON_HOOK', payload: reqBody.second_id })
      } else {
        await dispatch(initComparison(reqBody.first_id))
      }
      await toastr.success('Кандидаты успешно сохранены!')
    } catch (e) {
      toastr.error('Произошла ошибка!')
      dispatch(push(`/recruitment/candidates`))
    }
  }
}

function formatCandidateForReducer(candidates, positionInArray = 0){
  const formatedCandidates = candidates.map(formatCandidate)
  return {
    positionInArray,
    candidates: formatedCandidates,
    isAnyPdf: formatedCandidates.some(({ isPdf }) => isPdf),
    nonPdfItemsToDisplay: formatedCandidates.filter(({ isPdf }) => !isPdf),
  }
}

function isPdf(candidate){
  if (candidate && candidate.resume) {
    return candidate.resume.raw_resume_doc_id
  } else {
    toastr.error('Произошла ошибка!')
    return false
  }
}

function formatCandidate(candidate, index, candidates){
  return {
    candidate,
    options: {
      control_elements: ((index + 1) === candidates.length),
    },
    isPdf: isPdf(candidate),
  }
}

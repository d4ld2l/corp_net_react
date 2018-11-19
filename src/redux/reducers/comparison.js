import { xorBy } from 'lodash'

const comparisonVariants = [
  { label: 'Сохранить левое', value: 'first_id', cnClass: 'leave-before-hook' },
  { label: 'Сохранить правое', value: 'second_id', cnClass: 'leave-ahead-hook' },
]

const initialState = {
  candidates: [],
  nonPdfItemsToDisplay: [],
  positionInArray: undefined,
  isAnyPdf: false,
  select: {
    value: comparisonVariants[0],
    options: comparisonVariants
  }
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_INITIAL_DISPLAYED_CANDIDATE':
      return {
        ...state,
        ...payload
      }
    case 'CHANGE_DISPLAYED_CANDIDATE':
      return {
        ...state,
        ...payload
      }
    case 'AFTER_COMPARISON_HOOK':
      return {
        ...state,
        candidates: [...state.candidates.filter(it => (it.candidate.id !== payload))],
        select: {
          ...state.select,
          value: comparisonVariants[0],
        }
      }
    case 'CHANGE_SAVE_DECISION':
      return {
        ...state,
        select: {
          ...state.select,
          value: payload,
        }
      }
    default:
      return state
  }
}
